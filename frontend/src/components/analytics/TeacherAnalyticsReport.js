import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  useTheme,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tabs,
  Tab
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import TeacherService from '../../services/TeacherService';
import LessonService from '../../services/LessonService';
import SubjectService from '../../services/SubjectService';

const TeacherAnalyticsReport = ({ schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedView, setSelectedView] = useState(0);
  const [error, setError] = useState(null);
  const [teacherMetrics, setTeacherMetrics] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'totalLessons',
    direction: 'desc'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz nauczycieli
        const teachersResponse = await TeacherService.getAllTeachers();
        setTeachers(teachersResponse);
        
        if (teachersResponse.length > 0 && !selectedTeacher) {
          setSelectedTeacher(teachersResponse[0].id);
        }
        
        // Pobierz przedmioty
        const subjectsResponse = await SubjectService.getAllSubjects();
        setSubjects(subjectsResponse);
        
        // Pobierz lekcje dla wszystkich nauczycieli
        const lessonsPromises = teachersResponse.map(teacher => 
          LessonService.getLessonsByTeacher(teacher.id)
        );
        
        const lessonsResults = await Promise.all(lessonsPromises);
        const allLessons = lessonsResults.flat();
        setLessons(allLessons);
        
        // Oblicz metryki dla nauczycieli
        calculateTeacherMetrics(teachersResponse, allLessons, subjectsResponse);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId]);

  // Obliczanie metryk dla nauczycieli
  const calculateTeacherMetrics = (teachersData, lessonsData, subjectsData) => {
    const metrics = teachersData.map(teacher => {
      // Lekcje danego nauczyciela
      const teacherLessons = lessonsData.filter(lesson => lesson.teacherId === teacher.id);
      
      // Liczba lekcji według dni tygodnia
      const lessonsByDay = [0, 0, 0, 0, 0]; // pon-pt
      teacherLessons.forEach(lesson => {
        const dayIndex = lesson.dayOfWeek - 1;
        if (dayIndex >= 0 && dayIndex < 5) {
          lessonsByDay[dayIndex]++;
        }
      });
      
      // Liczba lekcji według przedmiotów
      const lessonsBySubject = {};
      subjectsData.forEach(subject => {
        lessonsBySubject[subject.id] = 0;
      });
      
      teacherLessons.forEach(lesson => {
        if (lessonsBySubject[lesson.subjectId] !== undefined) {
          lessonsBySubject[lesson.subjectId]++;
        }
      });
      
      // Obliczanie obciążenia
      const totalLessons = teacherLessons.length;
      const maxDailyLoad = Math.max(...lessonsByDay);
      const avgDailyLoad = totalLessons / 5;
      const loadVariance = lessonsByDay.reduce((sum, load) => sum + Math.pow(load - avgDailyLoad, 2), 0) / 5;
      
      // Obliczanie efektywności
      const efficiency = Math.min(100, Math.round((totalLessons / 30) * 100)); // Zakładamy, że 30 lekcji to 100% efektywności
      
      // Obliczanie różnorodności przedmiotów
      const subjectDiversity = Object.values(lessonsBySubject).filter(count => count > 0).length;
      
      return {
        id: teacher.id,
        name: `${teacher.lastName} ${teacher.firstName}`,
        totalLessons,
        lessonsByDay,
        lessonsBySubject,
        maxDailyLoad,
        avgDailyLoad: avgDailyLoad.toFixed(1),
        loadVariance: loadVariance.toFixed(1),
        efficiency,
        subjectDiversity,
        balanceScore: Math.round(100 - (loadVariance / 2)) // Przykładowa formuła na ocenę zrównoważenia planu
      };
    });
    
    setTeacherMetrics(metrics);
  };

  // Obsługa zmiany nauczyciela
  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  // Obsługa zmiany widoku
  const handleViewChange = (event, newValue) => {
    setSelectedView(newValue);
  };

  // Obsługa sortowania tabeli
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sortowanie danych nauczycieli
  const sortedTeacherMetrics = [...teacherMetrics].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Dane dla wybranego nauczyciela
  const selectedTeacherData = teacherMetrics.find(t => t.id === selectedTeacher);

  // Dane do wykresu radarowego dla wybranego nauczyciela
  const radarData = selectedTeacherData ? [
    {
      subject: 'Liczba lekcji',
      A: selectedTeacherData.efficiency,
      fullMark: 100,
    },
    {
      subject: 'Zrównoważenie',
      A: selectedTeacherData.balanceScore,
      fullMark: 100,
    },
    {
      subject: 'Różnorodność',
      A: Math.min(100, selectedTeacherData.subjectDiversity * 20),
      fullMark: 100,
    },
    {
      subject: 'Efektywność',
      A: selectedTeacherData.efficiency,
      fullMark: 100,
    },
    {
      subject: 'Elastyczność',
      A: Math.min(100, 100 - (selectedTeacherData.maxDailyLoad * 10)),
      fullMark: 100,
    },
  ] : [];

  // Dane do wykresu obciążenia według dni tygodnia
  const dayLoadData = selectedTeacherData ? [
    { name: 'Poniedziałek', load: selectedTeacherData.lessonsByDay[0] },
    { name: 'Wtorek', load: selectedTeacherData.lessonsByDay[1] },
    { name: 'Środa', load: selectedTeacherData.lessonsByDay[2] },
    { name: 'Czwartek', load: selectedTeacherData.lessonsByDay[3] },
    { name: 'Piątek', load: selectedTeacherData.lessonsByDay[4] }
  ] : [];

  // Dane do wykresu lekcji według przedmiotów
  const subjectLoadData = selectedTeacherData ? 
    subjects
      .filter(subject => selectedTeacherData.lessonsBySubject[subject.id] > 0)
      .map(subject => ({
        name: subject.name,
        count: selectedTeacherData.lessonsBySubject[subject.id]
      }))
      .sort((a, b) => b.count - a.count) : [];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h5">
          Analityka nauczycieli
        </Typography>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="teacher-select-label">Nauczyciel</InputLabel>
          <Select
            labelId="teacher-select-label"
            id="teacher-select"
            value={selectedTeacher}
            label="Nauczyciel"
            onChange={handleTeacherChange}
          >
            {teachers.map(teacher => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.lastName} {teacher.firstName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Tabs value={selectedView} onChange={handleViewChange} sx={{ mb: 2 }}>
        <Tab label="Indywidualna analiza" />
        <Tab label="Porównanie nauczycieli" />
      </Tabs>
      
      {selectedView === 0 && selectedTeacherData && (
        <Grid container spacing={3}>
          {/* Karta z podsumowaniem */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Podsumowanie dla: {selectedTeacherData.name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Całkowita liczba lekcji:
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {selectedTeacherData.totalLessons}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Średnie dzienne obciążenie:
                    </Typography>
                    <Typography variant="h4" color="secondary">
                      {selectedTeacherData.avgDailyLoad}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Maksymalne dzienne obciążenie:
                    </Typography>
                    <Typography variant="h4" color="error">
                      {selectedTeacherData.maxDailyLoad}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Liczba nauczanych przedmiotów:
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {selectedTeacherData.subjectDiversity}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Wykres radarowy */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Profil nauczyciela" />
              <CardContent>
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name={selectedTeacherData.name} dataKey="A" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Wykres obciążenia według dni */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Obciążenie według dni tygodnia" />
              <CardContent>
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dayLoadData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="load" name="Liczba lekcji" fill={theme.palette.primary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Wykres lekcji według przedmiotów */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Lekcje według przedmiotów" />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectLoadData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Liczba lekcji" fill={theme.palette.secondary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {selectedView === 1 && (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nauczyciel</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'totalLessons'}
                    direction={sortConfig.key === 'totalLessons' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('totalLessons')}
                  >
                    Liczba lekcji
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'avgDailyLoad'}
                    direction={sortConfig.key === 'avgDailyLoad' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('avgDailyLoad')}
                  >
                    Średnie obciążenie
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'maxDailyLoad'}
                    direction={sortConfig.key === 'maxDailyLoad' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('maxDailyLoad')}
                  >
                    Maks. obciążenie
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'loadVariance'}
                    direction={sortConfig.key === 'loadVariance' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('loadVariance')}
                  >
                    Wariancja obciążenia
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'subjectDiversity'}
                    direction={sortConfig.key === 'subjectDiversity' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('subjectDiversity')}
                  >
                    Liczba przedmiotów
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'balanceScore'}
                    direction={sortConfig.key === 'balanceScore' ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort('balanceScore')}
                  >
                    Ocena zrównoważenia
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTeacherMetrics.map((teacher) => (
                <TableRow
                  key={teacher.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  selected={teacher.id === selectedTeacher}
                  onClick={() => setSelectedTeacher(teacher.id)}
                >
                  <TableCell component="th" scope="row">
                    {teacher.name}
                  </TableCell>
                  <TableCell>{teacher.totalLessons}</TableCell>
                  <TableCell>{teacher.avgDailyLoad}</TableCell>
                  <TableCell>{teacher.maxDailyLoad}</TableCell>
                  <TableCell>{teacher.loadVariance}</TableCell>
                  <TableCell>{teacher.subjectDiversity}</TableCell>
                  <TableCell>{teacher.balanceScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" onClick={() => window.print()}>
          Drukuj raport
        </Button>
      </Box>
    </Paper>
  );
};

export default TeacherAnalyticsReport;
