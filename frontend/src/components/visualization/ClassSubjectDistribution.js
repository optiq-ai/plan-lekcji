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
  ToggleButtonGroup,
  ToggleButton
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
  Cell
} from 'recharts';
import SubjectService from '../../services/SubjectService';
import LessonService from '../../services/LessonService';
import ClassService from '../../services/ClassService';

const ClassSubjectDistribution = ({ classId, schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(classId || '');
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz klasy
        let classesResponse;
        if (schoolId) {
          classesResponse = await ClassService.getClassesBySchool(schoolId);
        } else {
          classesResponse = await ClassService.getAllClasses();
        }
        setClasses(classesResponse);
        
        if (classId || (classesResponse && classesResponse.length > 0)) {
          const targetClassId = classId || classesResponse[0].id;
          setSelectedClass(targetClassId);
          
          // Pobierz lekcje dla wybranej klasy
          const lessonsResponse = await LessonService.getLessonsByClass(targetClassId);
          setLessons(lessonsResponse);
        }
        
        // Pobierz wszystkie przedmioty
        const subjectsResponse = await SubjectService.getAllSubjects();
        setSubjects(subjectsResponse);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych rozkładu przedmiotów:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [classId, schoolId]);

  useEffect(() => {
    const fetchLessonsForClass = async () => {
      if (selectedClass) {
        try {
          setLoading(true);
          const lessonsResponse = await LessonService.getLessonsByClass(selectedClass);
          setLessons(lessonsResponse);
          setLoading(false);
        } catch (err) {
          console.error(`Błąd podczas pobierania lekcji dla klasy ${selectedClass}:`, err);
          setError('Wystąpił błąd podczas ładowania danych lekcji. Spróbuj ponownie później.');
          setLoading(false);
        }
      }
    };
    
    fetchLessonsForClass();
  }, [selectedClass]);

  // Funkcja do obliczania rozkładu przedmiotów
  const calculateSubjectDistribution = () => {
    const subjectCounts = {};
    
    // Inicjalizacja liczników przedmiotów
    subjects.forEach(subject => {
      subjectCounts[subject.id] = {
        id: subject.id,
        name: subject.name,
        count: 0,
        color: subject.color || theme.palette.primary.main
      };
    });
    
    // Zliczanie lekcji według przedmiotów
    lessons.forEach(lesson => {
      const subjectId = lesson.subjectId;
      if (subjectCounts[subjectId]) {
        subjectCounts[subjectId].count++;
      }
    });
    
    // Konwersja do tablicy i sortowanie według liczby lekcji (malejąco)
    return Object.values(subjectCounts)
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  };

  const subjectDistribution = calculateSubjectDistribution();
  
  // Kolory dla wykresu kołowego
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff8042'
  ];

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  const selectedClassData = classes.find(c => c.id === selectedClass);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h6">
          Rozkład przedmiotów
          {selectedClassData && ` - ${selectedClassData.name}`}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="class-select-label">Klasa</InputLabel>
            <Select
              labelId="class-select-label"
              id="class-select"
              value={selectedClass}
              label="Klasa"
              onChange={handleClassChange}
            >
              {classes.map(classItem => (
                <MenuItem key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            size="small"
          >
            <ToggleButton value="bar">
              Słupkowy
            </ToggleButton>
            <ToggleButton value="pie">
              Kołowy
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {subjectDistribution.length === 0 ? (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Brak danych o lekcjach dla wybranej klasy.</Typography>
        </Box>
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          {chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectDistribution}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  interval={0}
                />
                <YAxis label={{ value: 'Liczba lekcji', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Liczba lekcji" fill={theme.palette.primary.main}>
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="name"
                >
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} lekcji`, props.payload.name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ClassSubjectDistribution;
