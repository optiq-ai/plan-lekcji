import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  Tooltip, 
  IconButton,
  CircularProgress,
  useTheme
} from '@mui/material';
import { 
  InfoOutlined, 
  Edit, 
  ContentCopy, 
  Print,
  DownloadOutlined
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';
import LessonService from '../../services/LessonService';
import TimeSlotService from '../../services/TimeSlotService';

const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];

const LessonPlanGrid = ({ planId, classId, teacherId, roomId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz dane planu lekcji
        if (planId) {
          const planResponse = await LessonPlanService.getLessonPlanById(planId);
          setPlanData(planResponse);
          
          const lessonsResponse = await LessonService.getLessonsByPlan(planId);
          setLessons(lessonsResponse);
        } else if (classId) {
          const plansResponse = await LessonPlanService.getLessonPlansByClass(classId);
          if (plansResponse && plansResponse.length > 0) {
            setPlanData(plansResponse[0]);
            
            const lessonsResponse = await LessonService.getLessonsByClass(classId);
            setLessons(lessonsResponse);
          }
        } else if (teacherId) {
          const plansResponse = await LessonPlanService.getLessonPlansByTeacher(teacherId);
          if (plansResponse && plansResponse.length > 0) {
            setPlanData(plansResponse[0]);
            
            const lessonsResponse = await LessonService.getLessonsByTeacher(teacherId);
            setLessons(lessonsResponse);
          }
        } else if (roomId) {
          const lessonsResponse = await LessonService.getLessonsByRoom(roomId);
          setLessons(lessonsResponse);
        }
        
        // Pobierz przedziały czasowe
        const timeSlotsResponse = await TimeSlotService.getAllTimeSlots();
        setTimeSlots(timeSlotsResponse);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych planu lekcji:', err);
        setError('Wystąpił błąd podczas ładowania planu lekcji. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [planId, classId, teacherId, roomId]);

  // Funkcja pomocnicza do organizowania lekcji według dni i przedziałów czasowych
  const organizeByDayAndTime = () => {
    const organized = {};
    
    // Inicjalizacja struktury danych
    daysOfWeek.forEach(day => {
      organized[day] = {};
      timeSlots.forEach(slot => {
        organized[day][slot.id] = null;
      });
    });
    
    // Wypełnienie struktury lekcjami
    lessons.forEach(lesson => {
      const day = daysOfWeek[lesson.dayOfWeek - 1]; // Zakładamy, że dayOfWeek to liczba 1-5
      organized[day][lesson.timeSlotId] = lesson;
    });
    
    return organized;
  };

  const organizedLessons = lessons.length > 0 && timeSlots.length > 0 ? organizeByDayAndTime() : null;

  // Renderowanie komórki z lekcją
  const renderLessonCell = (lesson) => {
    if (!lesson) return <Box sx={{ height: '100%', p: 1 }}></Box>;
    
    return (
      <Box 
        sx={{ 
          height: '100%', 
          p: 1, 
          backgroundColor: lesson.subject?.color || theme.palette.primary.light,
          color: theme.palette.getContrastText(lesson.subject?.color || theme.palette.primary.light),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 1,
          '&:hover': {
            boxShadow: 3,
            cursor: 'pointer'
          }
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          {lesson.subject?.name || 'Przedmiot'}
        </Typography>
        <Typography variant="body2">
          {lesson.teacher?.lastName || 'Nauczyciel'}
        </Typography>
        <Typography variant="caption">
          {lesson.room?.name || 'Sala'}
        </Typography>
      </Box>
    );
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

  if (!organizedLessons) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Brak danych do wyświetlenia planu lekcji.</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6">
          {planData ? `Plan lekcji: ${planData.name}` : 'Plan lekcji'}
        </Typography>
        <Box>
          <Tooltip title="Informacje o planie">
            <IconButton size="small">
              <InfoOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edytuj plan">
            <IconButton size="small">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Kopiuj plan">
            <IconButton size="small">
              <ContentCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Drukuj plan">
            <IconButton size="small">
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pobierz plan">
            <IconButton size="small">
              <DownloadOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={1}>
        {/* Nagłówek z godzinami */}
        <Grid item xs={1}>
          <Box sx={{ height: 40 }}></Box>
        </Grid>
        {daysOfWeek.map((day, index) => (
          <Grid item xs={2} key={index}>
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
        
        {/* Wiersze z lekcjami */}
        {timeSlots.map((timeSlot) => (
          <React.Fragment key={timeSlot.id}>
            <Grid item xs={1}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 1, 
                  textAlign: 'center', 
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  height: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body2" fontWeight="bold">{timeSlot.number}</Typography>
                <Typography variant="caption">{`${timeSlot.startTime}-${timeSlot.endTime}`}</Typography>
              </Paper>
            </Grid>
            
            {daysOfWeek.map((day, index) => (
              <Grid item xs={2} key={`${day}-${timeSlot.id}`}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    height: 80,
                    '&:hover': {
                      boxShadow: 2
                    }
                  }}
                >
                  {renderLessonCell(organizedLessons[day][timeSlot.id])}
                </Paper>
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default LessonPlanGrid;
