import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress
} from '@mui/material';
import RoomService from '../../services/RoomService';
import { useTheme } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';

/**
 * Komponent Meteo-plan łączący plan lekcji z prognozą pogody dla WF
 * Umożliwia planowanie zajęć WF z uwzględnieniem warunków pogodowych
 */
const MeteoPlan = () => {
  const theme = useTheme();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Przykładowe dane pogodowe
  const sampleWeatherData = [
    { 
      date: '12.04.2025', 
      wfOutdoor: 'ZALECANE', 
      temperature: 22, 
      conditions: 'sunny', 
      icon: <WbSunnyIcon sx={{ color: theme.palette.warning.main }} />
    },
    { 
      date: '13.04.2025', 
      wfOutdoor: 'NIEZALECANE', 
      temperature: 12, 
      conditions: 'rainy', 
      icon: <CloudIcon sx={{ color: theme.palette.grey[500] }} />
    },
    { 
      date: '14.04.2025', 
      wfOutdoor: 'NIEZALECANE', 
      temperature: 10, 
      conditions: 'windy', 
      icon: <CloudIcon sx={{ color: theme.palette.grey[500] }} />
    },
    { 
      date: '15.04.2025', 
      wfOutdoor: 'ZALECANE', 
      temperature: 18, 
      conditions: 'partly cloudy', 
      icon: <WbSunnyIcon sx={{ color: theme.palette.warning.main }} />
    },
    { 
      date: '16.04.2025', 
      wfOutdoor: 'ZALECANE', 
      temperature: 19, 
      conditions: 'sunny', 
      icon: <WbSunnyIcon sx={{ color: theme.palette.warning.main }} />
    },
    { 
      date: '17.04.2025', 
      wfOutdoor: 'NIEZALECANE', 
      temperature: 8, 
      conditions: 'cold', 
      icon: <AcUnitIcon sx={{ color: theme.palette.info.main }} />
    },
    { 
      date: '18.04.2025', 
      wfOutdoor: 'ZALECANE', 
      temperature: 20, 
      conditions: 'sunny', 
      icon: <WbSunnyIcon sx={{ color: theme.palette.warning.main }} />
    }
  ];

  // Przykładowe dane zajęć WF
  const wfLessons = [
    { 
      date: '12.04.2025', 
      class: '1A', 
      time: '10:45-11:30', 
      teacher: 'mgr Adam Malinowski', 
      location: 'boisko zewnętrzne',
      alternativeLocation: 'sala gimnastyczna'
    },
    { 
      date: '12.04.2025', 
      class: '2B', 
      time: '11:50-12:35', 
      teacher: 'mgr Tomasz Kaczmarek', 
      location: 'boisko zewnętrzne',
      alternativeLocation: 'sala gimnastyczna'
    },
    { 
      date: '13.04.2025', 
      class: '3A', 
      time: '8:55-9:40', 
      teacher: 'mgr Adam Malinowski', 
      location: 'boisko zewnętrzne',
      alternativeLocation: 'sala gimnastyczna'
    },
    { 
      date: '13.04.2025', 
      class: '1C', 
      time: '12:45-13:30', 
      teacher: 'mgr Tomasz Kaczmarek', 
      location: 'boisko zewnętrzne',
      alternativeLocation: 'sala gimnastyczna'
    }
  ];

  useEffect(() => {
    // Symulacja pobierania danych pogodowych z API
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // W rzeczywistej implementacji, tutaj byłoby wywołanie API pogodowego
        // const response = await weatherService.getWeatherForecast();
        // setWeatherData(response.data);
        
        // Używamy przykładowych danych
        setTimeout(() => {
          setWeatherData(sampleWeatherData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Nie udało się pobrać danych pogodowych');
        setLoading(false);
        console.error('Error fetching weather data:', err);
      }
    };

    fetchWeatherData();
  }, []);

  // Filtrowanie zajęć WF dla wybranej daty
  const getWfLessonsForDate = (date) => {
    return wfLessons.filter(lesson => lesson.date === date);
  };

  // Renderowanie karty z prognozą pogody
  const renderWeatherCard = (weatherItem) => {
    const isRecommended = weatherItem.wfOutdoor === 'ZALECANE';
    
    return (
      <Card 
        sx={{ 
          mb: 2, 
          border: 1, 
          borderColor: isRecommended ? theme.palette.success.main : theme.palette.error.main,
          boxShadow: 3
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem' }}>
                {weatherItem.icon}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">{weatherItem.date}</Typography>
              <Typography variant="body2">{weatherItem.temperature}°C</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: isRecommended ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: 'bold'
                }}
              >
                {weatherItem.wfOutdoor}
              </Typography>
              <Typography variant="body2">
                {isRecommended ? 'Dobre warunki na WF na zewnątrz' : 'Zalecane zajęcia w sali gimnastycznej'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button 
                variant="contained" 
                color={isRecommended ? "success" : "primary"}
                fullWidth
                onClick={() => setSelectedDate(weatherItem.date)}
              >
                Pokaż zajęcia
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Renderowanie listy zajęć WF
  const renderWfLessons = () => {
    const lessons = getWfLessonsForDate(selectedDate);
    const weatherForSelectedDate = weatherData.find(w => w.date === selectedDate);
    const isOutdoorRecommended = weatherForSelectedDate && weatherForSelectedDate.wfOutdoor === 'ZALECANE';
    
    if (lessons.length === 0) {
      return (
        <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
          <Typography variant="subtitle1">Brak zajęć WF w wybranym dniu</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Zajęcia WF - {selectedDate}
        </Typography>
        
        {lessons.map((lesson, index) => (
          <Card key={index} sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="subtitle1">{lesson.time}</Typography>
                  </Box>
                  <Typography variant="body2">Klasa {lesson.class}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">{lesson.teacher}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <MeetingRoomIcon sx={{ mr: 1, fontSize: '0.9rem', color: theme.palette.secondary.main }} />
                    <Typography variant="body2" sx={{ textDecoration: !isOutdoorRecommended && 'line-through' }}>
                      {lesson.location}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  {!isOutdoorRecommended && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Chip 
                        label="Zalecana zmiana lokalizacji" 
                        color="warning" 
                        size="small" 
                        sx={{ mb: 1 }} 
                      />
                      <Typography variant="body2">
                        Zalecane miejsce: <strong>{lesson.alternativeLocation}</strong>
                      </Typography>
                    </Box>
                  )}
                  {isOutdoorRecommended && (
                    <Chip 
                      label="Dobre warunki na zajęcia zewnętrzne" 
                      color="success" 
                      size="small" 
                    />
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Meteo-plan (Lekcje i pogoda)
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 3 }}>
        System planowania zajęć WF z uwzględnieniem warunków pogodowych
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Prognoza pogody na najbliższy tydzień
          </Typography>
          
          {weatherData.map((item, index) => (
            <Box key={index}>
              {renderWeatherCard(item)}
            </Box>
          ))}
          
          {renderWfLessons()}
        </Box>
      )}
    </Box>
  );
};

export default MeteoPlan;
