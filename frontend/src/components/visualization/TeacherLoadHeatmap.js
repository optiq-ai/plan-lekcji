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
  MenuItem
} from '@mui/material';
import LessonService from '../../services/LessonService';
import TeacherService from '../../services/TeacherService';

const TeacherLoadHeatmap = ({ schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('daily'); // 'daily' lub 'weekly'

  const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  const hoursOfDay = Array.from({ length: 10 }, (_, i) => i + 1); // Godziny lekcyjne 1-10

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz nauczycieli
        const teachersResponse = await TeacherService.getAllTeachers();
        setTeachers(teachersResponse);
        
        // Pobierz wszystkie lekcje dla tych nauczycieli
        const lessonsPromises = teachersResponse.map(teacher => 
          LessonService.getLessonsByTeacher(teacher.id)
        );
        
        const lessonsResults = await Promise.all(lessonsPromises);
        const allLessons = lessonsResults.flat();
        setLessons(allLessons);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych do heatmapy:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId]);

  // Funkcja do obliczania obciążenia nauczycieli
  const calculateTeacherLoad = () => {
    const teacherLoad = {};
    
    // Inicjalizacja struktury danych
    teachers.forEach(teacher => {
      teacherLoad[teacher.id] = {
        teacher: teacher,
        dailyLoad: Array(5).fill(0), // Obciążenie dzienne (pon-pt)
        hourlyLoad: Array.from({ length: 5 }, () => Array(10).fill(0)), // Obciążenie godzinowe
        totalLoad: 0
      };
    });
    
    // Obliczanie obciążenia na podstawie lekcji
    lessons.forEach(lesson => {
      const teacherId = lesson.teacherId;
      const dayIndex = lesson.dayOfWeek - 1; // 1-5 -> 0-4
      const hourIndex = lesson.timeSlot?.number - 1 || 0; // Zakładamy, że timeSlot.number to numer lekcji (1-10)
      
      if (teacherLoad[teacherId]) {
        // Zwiększ obciążenie dzienne
        teacherLoad[teacherId].dailyLoad[dayIndex]++;
        
        // Zwiększ obciążenie godzinowe
        if (hourIndex >= 0 && hourIndex < 10) {
          teacherLoad[teacherId].hourlyLoad[dayIndex][hourIndex]++;
        }
        
        // Zwiększ całkowite obciążenie
        teacherLoad[teacherId].totalLoad++;
      }
    });
    
    return Object.values(teacherLoad);
  };

  const teacherLoadData = calculateTeacherLoad();
  
  // Sortowanie nauczycieli według całkowitego obciążenia (malejąco)
  const sortedTeacherLoad = [...teacherLoadData].sort((a, b) => b.totalLoad - a.totalLoad);

  // Funkcja do określania koloru komórki na podstawie obciążenia
  const getHeatmapColor = (value, max) => {
    if (value === 0) return theme.palette.grey[100];
    
    const intensity = Math.min(value / (max || 1), 1);
    
    // Gradient od jasnego do ciemnego koloru primary
    if (intensity < 0.3) return theme.palette.primary[100];
    if (intensity < 0.5) return theme.palette.primary[200];
    if (intensity < 0.7) return theme.palette.primary[300];
    if (intensity < 0.9) return theme.palette.primary[400];
    return theme.palette.primary[500];
  };

  // Znajdź maksymalne obciążenie dla skalowania kolorów
  const maxDailyLoad = Math.max(...sortedTeacherLoad.flatMap(data => data.dailyLoad));
  const maxHourlyLoad = Math.max(...sortedTeacherLoad.flatMap(data => data.hourlyLoad.flat()));

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
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
        <Typography variant="h6">
          Heatmapa obciążenia nauczycieli
        </Typography>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="view-select-label">Widok</InputLabel>
          <Select
            labelId="view-select-label"
            id="view-select"
            value={selectedView}
            label="Widok"
            onChange={handleViewChange}
          >
            <MenuItem value="daily">Dzienny</MenuItem>
            <MenuItem value="weekly">Tygodniowy</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {selectedView === 'daily' ? (
        <Grid container spacing={1}>
          {/* Nagłówek z dniami tygodnia */}
          <Grid item xs={3}>
            <Box sx={{ height: 40 }}></Box>
          </Grid>
          {daysOfWeek.map((day, index) => (
            <Grid item xs key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 1, 
                  textAlign: 'center', 
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">{day}</Typography>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={1}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 1, 
                textAlign: 'center', 
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">Suma</Typography>
            </Paper>
          </Grid>
          
          {/* Wiersze z nauczycielami */}
          {sortedTeacherLoad.map((data) => (
            <React.Fragment key={data.teacher.id}>
              <Grid item xs={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 1, 
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body2" noWrap>
                    {`${data.teacher.lastName} ${data.teacher.firstName}`}
                  </Typography>
                </Paper>
              </Grid>
              
              {data.dailyLoad.map((load, dayIndex) => (
                <Grid item xs key={`${data.teacher.id}-${dayIndex}`}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      height: 40,
                      backgroundColor: getHeatmapColor(load, maxDailyLoad),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {load}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
              
              <Grid item xs={1}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    height: 40,
                    backgroundColor: theme.palette.grey[200],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {data.totalLoad}
                  </Typography>
                </Paper>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={1}>
          {/* Nagłówek z godzinami */}
          <Grid item xs={3}>
            <Box sx={{ height: 40 }}></Box>
          </Grid>
          {hoursOfDay.map((hour) => (
            <Grid item xs key={hour}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 1, 
                  textAlign: 'center', 
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">{hour}</Typography>
              </Paper>
            </Grid>
          ))}
          
          {/* Wiersze z nauczycielami i dniami */}
          {sortedTeacherLoad.map((data) => (
            daysOfWeek.map((day, dayIndex) => (
              <React.Fragment key={`${data.teacher.id}-${dayIndex}`}>
                <Grid item xs={3}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 1, 
                      backgroundColor: dayIndex === 0 ? theme.palette.secondary.main : theme.palette.secondary.light,
                      color: dayIndex === 0 ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body2" noWrap>
                      {dayIndex === 0 ? `${data.teacher.lastName} ${data.teacher.firstName}` : day}
                    </Typography>
                  </Paper>
                </Grid>
                
                {hoursOfDay.map((hour, hourIndex) => (
                  <Grid item xs key={`${data.teacher.id}-${dayIndex}-${hourIndex}`}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        height: 40,
                        backgroundColor: getHeatmapColor(data.hourlyLoad[dayIndex][hourIndex], maxHourlyLoad),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {data.hourlyLoad[dayIndex][hourIndex] > 0 && (
                        <Typography variant="body2" fontWeight="bold">
                          {data.hourlyLoad[dayIndex][hourIndex]}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </React.Fragment>
            ))
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default TeacherLoadHeatmap;
