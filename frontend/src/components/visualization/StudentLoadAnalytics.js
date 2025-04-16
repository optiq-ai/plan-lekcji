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
  Slider,
  Stack
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts';
import LessonService from '../../services/LessonService';
import ClassService from '../../services/ClassService';
import SubjectService from '../../services/SubjectService';

const StudentLoadAnalytics = ({ classId, schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(classId || '');
  const [difficultyWeight, setDifficultyWeight] = useState(5);

  const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];

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
        console.error('Błąd podczas pobierania danych obciążenia uczniów:', err);
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

  // Funkcja do obliczania obciążenia uczniów w ciągu dnia
  const calculateStudentLoad = () => {
    // Mapa przedmiotów z ich poziomami trudności (1-10)
    const subjectDifficulty = {};
    subjects.forEach(subject => {
      // Przykładowe poziomy trudności - w rzeczywistej aplikacji powinny być pobierane z bazy danych
      subjectDifficulty[subject.id] = subject.difficulty || 5;
    });
    
    // Inicjalizacja danych obciążenia dla każdego dnia
    const dailyLoad = daysOfWeek.map((day, index) => ({
      name: day,
      dayIndex: index + 1,
      lessonCount: 0,
      difficultyLoad: 0,
      hourlyLoad: Array(10).fill(0) // Obciążenie w każdej godzinie lekcyjnej
    }));
    
    // Obliczanie obciążenia na podstawie lekcji
    lessons.forEach(lesson => {
      const dayIndex = lesson.dayOfWeek - 1; // 1-5 -> 0-4
      const hourIndex = lesson.timeSlot?.number - 1 || 0; // Zakładamy, że timeSlot.number to numer lekcji (1-10)
      const subjectId = lesson.subjectId;
      
      if (dayIndex >= 0 && dayIndex < 5) {
        // Zwiększ liczbę lekcji w danym dniu
        dailyLoad[dayIndex].lessonCount++;
        
        // Dodaj obciążenie trudnością przedmiotu
        const difficulty = subjectDifficulty[subjectId] || 5;
        dailyLoad[dayIndex].difficultyLoad += difficulty * (difficultyWeight / 5);
        
        // Dodaj obciążenie godzinowe (uwzględniając zmęczenie w ciągu dnia)
        if (hourIndex >= 0 && hourIndex < 10) {
          // Współczynnik zmęczenia rośnie z każdą kolejną godziną lekcyjną
          const fatigueCoefficient = 1 + (hourIndex * 0.1);
          dailyLoad[dayIndex].hourlyLoad[hourIndex] = difficulty * fatigueCoefficient * (difficultyWeight / 5);
        }
      }
    });
    
    // Oblicz skumulowane obciążenie godzinowe
    dailyLoad.forEach(day => {
      let cumulativeLoad = 0;
      day.cumulativeHourlyLoad = day.hourlyLoad.map(load => {
        cumulativeLoad += load;
        return parseFloat(cumulativeLoad.toFixed(1));
      });
    });
    
    return dailyLoad;
  };

  const studentLoadData = calculateStudentLoad();
  
  // Przygotowanie danych dla wykresu obciążenia godzinowego
  const prepareHourlyLoadData = () => {
    const hourlyData = [];
    
    for (let hour = 0; hour < 10; hour++) {
      const hourData = {
        name: `Lekcja ${hour + 1}`,
        hour: hour + 1
      };
      
      daysOfWeek.forEach((day, dayIndex) => {
        hourData[day] = studentLoadData[dayIndex].hourlyLoad[hour];
      });
      
      hourlyData.push(hourData);
    }
    
    return hourlyData;
  };
  
  const hourlyLoadData = prepareHourlyLoadData();

  // Przygotowanie danych dla wykresu skumulowanego obciążenia
  const prepareCumulativeLoadData = () => {
    const cumulativeData = [];
    
    for (let hour = 0; hour < 10; hour++) {
      const hourData = {
        name: `Lekcja ${hour + 1}`,
        hour: hour + 1
      };
      
      daysOfWeek.forEach((day, dayIndex) => {
        hourData[day] = studentLoadData[dayIndex].cumulativeHourlyLoad[hour];
      });
      
      cumulativeData.push(hourData);
    }
    
    return cumulativeData;
  };
  
  const cumulativeLoadData = prepareCumulativeLoadData();

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDifficultyWeightChange = (event, newValue) => {
    setDifficultyWeight(newValue);
  };

  const selectedClassData = classes.find(c => c.id === selectedClass);

  // Kolory dla linii wykresu
  const lineColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main
  ];

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
          Analiza obciążenia uczniów
          {selectedClassData && ` - ${selectedClassData.name}`}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Waga trudności przedmiotów
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 2 }}>
          <Typography variant="body2">Niska</Typography>
          <Slider
            value={difficultyWeight}
            min={1}
            max={10}
            step={1}
            onChange={handleDifficultyWeightChange}
            valueLabelDisplay="auto"
            aria-labelledby="difficulty-weight-slider"
            sx={{ mx: 2 }}
          />
          <Typography variant="body2">Wysoka</Typography>
        </Stack>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Dzienne obciążenie uczniów
          </Typography>
          <Box sx={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={studentLoadData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="lessonCount" 
                  name="Liczba lekcji" 
                  stroke={theme.palette.primary.main} 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="difficultyLoad" 
                  name="Obciążenie trudnością" 
                  stroke={theme.palette.secondary.main} 
                />
                <ReferenceLine y={30} stroke="red" strokeDasharray="3 3">
                  <Label value="Limit obciążenia" position="insideBottomRight" />
                </ReferenceLine>
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Skumulowane obciążenie w ciągu dnia
          </Typography>
          <Box sx={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cumulativeLoadData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {daysOfWeek.map((day, index) => (
                  <Line 
                    key={day}
                    type="monotone" 
                    dataKey={day} 
                    name={day} 
                    stroke={lineColors[index % lineColors.length]} 
                    activeDot={{ r: 8 }} 
                  />
                ))}
                <ReferenceLine y={40} stroke="red" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentLoadAnalytics;
