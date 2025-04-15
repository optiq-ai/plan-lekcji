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
  CardHeader
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import LessonPlanService from '../../services/LessonPlanService';
import LessonService from '../../services/LessonService';
import SchoolService from '../../services/SchoolService';
import TeacherService from '../../services/TeacherService';
import ClassService from '../../services/ClassService';
import RoomService from '../../services/RoomService';

const SchoolPerformanceDashboard = ({ schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [schoolData, setSchoolData] = useState(null);
  const [lessonPlans, setLessonPlans] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    teacherUtilization: 0,
    roomUtilization: 0,
    averageClassLoad: 0,
    planQuality: 0,
    conflictRate: 0,
    optimizationRate: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!schoolId) return;
      
      try {
        setLoading(true);
        
        // Pobierz dane szkoły
        const schoolResponse = await SchoolService.getSchoolById(schoolId);
        setSchoolData(schoolResponse);
        
        // Pobierz plany lekcji dla szkoły
        const plansResponse = await LessonPlanService.getLessonPlansBySchool(schoolId);
        setLessonPlans(plansResponse);
        
        // Pobierz nauczycieli dla szkoły
        const teachersResponse = await TeacherService.getAllTeachers();
        setTeachers(teachersResponse);
        
        // Pobierz klasy dla szkoły
        const classesResponse = await ClassService.getClassesBySchool(schoolId);
        setClasses(classesResponse);
        
        // Pobierz sale dla szkoły
        const roomsResponse = await RoomService.getRoomsBySchool(schoolId);
        setRooms(roomsResponse);
        
        // Pobierz lekcje dla aktualnego planu (zakładamy, że pierwszy plan jest aktualny)
        if (plansResponse && plansResponse.length > 0) {
          const lessonsResponse = await LessonService.getLessonsByPlan(plansResponse[0].id);
          setLessons(lessonsResponse);
        }
        
        // Symulacja obliczania metryk
        calculateMetrics();
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId]);

  // Symulacja obliczania metryk
  const calculateMetrics = () => {
    // W rzeczywistej aplikacji byłyby to obliczenia na podstawie rzeczywistych danych
    setMetrics({
      teacherUtilization: Math.floor(Math.random() * 30) + 70, // 70-100%
      roomUtilization: Math.floor(Math.random() * 40) + 60, // 60-100%
      averageClassLoad: Math.floor(Math.random() * 3) + 6, // 6-9 lekcji dziennie
      planQuality: Math.floor(Math.random() * 20) + 75, // 75-95%
      conflictRate: Math.floor(Math.random() * 5), // 0-5%
      optimizationRate: Math.floor(Math.random() * 30) + 70 // 70-100%
    });
  };

  // Dane do wykresu wykorzystania nauczycieli
  const teacherUtilizationData = [
    { name: '0-50%', value: teachers.filter(t => Math.random() < 0.1).length },
    { name: '50-70%', value: teachers.filter(t => Math.random() < 0.2).length },
    { name: '70-85%', value: teachers.filter(t => Math.random() < 0.4).length },
    { name: '85-100%', value: teachers.filter(t => Math.random() < 0.3).length }
  ];

  // Dane do wykresu wykorzystania sal
  const roomUtilizationData = [
    { name: '0-30%', value: rooms.filter(r => Math.random() < 0.05).length },
    { name: '30-60%', value: rooms.filter(r => Math.random() < 0.15).length },
    { name: '60-80%', value: rooms.filter(r => Math.random() < 0.3).length },
    { name: '80-100%', value: rooms.filter(r => Math.random() < 0.5).length }
  ];

  // Dane do wykresu obciążenia klas
  const classLoadData = classes.map(c => ({
    name: c.name,
    load: Math.floor(Math.random() * 4) + 6 // 6-10 lekcji dziennie
  })).sort((a, b) => b.load - a.load).slice(0, 10);

  // Dane do wykresu jakości planu w czasie
  const planQualityTimeData = Array.from({ length: 10 }, (_, i) => ({
    name: `Tydzień ${i+1}`,
    quality: 70 + Math.floor(Math.random() * 5) + i
  }));

  // Kolory dla wykresów
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main
  ];

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
    // W rzeczywistej aplikacji tutaj byłoby pobieranie danych dla wybranego okresu
    calculateMetrics();
  };

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
          Dashboard wydajności
          {schoolData && ` - ${schoolData.name}`}
        </Typography>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="period-select-label">Okres</InputLabel>
          <Select
            labelId="period-select-label"
            id="period-select"
            value={selectedPeriod}
            label="Okres"
            onChange={handlePeriodChange}
          >
            <MenuItem value="current">Aktualny semestr</MenuItem>
            <MenuItem value="previous">Poprzedni semestr</MenuItem>
            <MenuItem value="year">Cały rok szkolny</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Karty z kluczowymi metrykami */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Wykorzystanie nauczycieli
              </Typography>
              <Typography variant="h3" color="primary">
                {metrics.teacherUtilization}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Średnie wykorzystanie czasu nauczycieli
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Wykorzystanie sal
              </Typography>
              <Typography variant="h3" color="secondary">
                {metrics.roomUtilization}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Średnie wykorzystanie sal lekcyjnych
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Jakość planu
              </Typography>
              <Typography variant="h3" color="success.main">
                {metrics.planQuality}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ocena jakości planu lekcji
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Średnie obciążenie klas
              </Typography>
              <Typography variant="h3" color="info.main">
                {metrics.averageClassLoad}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Średnia liczba lekcji dziennie
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Wskaźnik konfliktów
              </Typography>
              <Typography variant="h3" color="error.main">
                {metrics.conflictRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Procent lekcji z konfliktami
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Poziom optymalizacji
              </Typography>
              <Typography variant="h3" color="warning.main">
                {metrics.optimizationRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stopień optymalizacji planu
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Wykresy */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Wykorzystanie nauczycieli" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teacherUtilizationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {teacherUtilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Wykorzystanie sal" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomUtilizationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roomUtilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Obciążenie klas (top 10)" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classLoadData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 10]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="load" fill={theme.palette.primary.main} name="Średnia liczba lekcji dziennie" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Jakość planu w czasie" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={planQualityTimeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="quality" 
                      stroke={theme.palette.success.main} 
                      name="Jakość planu (%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" onClick={() => window.print()}>
          Drukuj raport
        </Button>
      </Box>
    </Paper>
  );
};

export default SchoolPerformanceDashboard;
