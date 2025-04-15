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
  Tooltip
} from '@mui/material';
import RoomService from '../../services/RoomService';
import LessonService from '../../services/LessonService';

const RoomUtilizationChart = ({ schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('daily'); // 'daily' lub 'hourly'

  const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  const hoursOfDay = Array.from({ length: 10 }, (_, i) => i + 1); // Godziny lekcyjne 1-10

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz sale
        let roomsResponse;
        if (schoolId) {
          roomsResponse = await RoomService.getRoomsBySchool(schoolId);
        } else {
          roomsResponse = await RoomService.getAllRooms();
        }
        setRooms(roomsResponse);
        
        // Pobierz wszystkie lekcje dla tych sal
        const lessonsPromises = roomsResponse.map(room => 
          LessonService.getLessonsByRoom(room.id)
        );
        
        const lessonsResults = await Promise.all(lessonsPromises);
        const allLessons = lessonsResults.flat();
        setLessons(allLessons);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych wykorzystania sal:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId]);

  // Funkcja do obliczania wykorzystania sal
  const calculateRoomUtilization = () => {
    const roomUtilization = {};
    
    // Inicjalizacja struktury danych
    rooms.forEach(room => {
      roomUtilization[room.id] = {
        room: room,
        dailyUsage: Array(5).fill(0), // Wykorzystanie dzienne (pon-pt)
        hourlyUsage: Array.from({ length: 5 }, () => Array(10).fill(0)), // Wykorzystanie godzinowe
        totalUsage: 0,
        maxCapacity: 5 * 10 // Maksymalna liczba lekcji w tygodniu (5 dni * 10 godzin)
      };
    });
    
    // Obliczanie wykorzystania na podstawie lekcji
    lessons.forEach(lesson => {
      const roomId = lesson.roomId;
      const dayIndex = lesson.dayOfWeek - 1; // 1-5 -> 0-4
      const hourIndex = lesson.timeSlot?.number - 1 || 0; // Zakładamy, że timeSlot.number to numer lekcji (1-10)
      
      if (roomUtilization[roomId]) {
        // Zwiększ wykorzystanie dzienne
        roomUtilization[roomId].dailyUsage[dayIndex]++;
        
        // Zwiększ wykorzystanie godzinowe
        if (hourIndex >= 0 && hourIndex < 10) {
          roomUtilization[roomId].hourlyUsage[dayIndex][hourIndex] = 1; // Sala jest zajęta w tej godzinie
        }
        
        // Zwiększ całkowite wykorzystanie
        roomUtilization[roomId].totalUsage++;
      }
    });
    
    // Oblicz procentowe wykorzystanie
    Object.values(roomUtilization).forEach(data => {
      data.utilizationPercentage = (data.totalUsage / data.maxCapacity) * 100;
    });
    
    return Object.values(roomUtilization);
  };

  const roomUtilizationData = calculateRoomUtilization();
  
  // Sortowanie sal według procentowego wykorzystania (malejąco)
  const sortedRoomUtilization = [...roomUtilizationData].sort((a, b) => 
    b.utilizationPercentage - a.utilizationPercentage
  );

  // Funkcja do określania koloru paska na podstawie wykorzystania
  const getUtilizationColor = (percentage) => {
    if (percentage < 30) return theme.palette.success.main;
    if (percentage < 70) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

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
          Wykorzystanie sal lekcyjnych
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
            <MenuItem value="hourly">Godzinowy</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {selectedView === 'daily' ? (
        <Grid container spacing={2}>
          {sortedRoomUtilization.map((data) => (
            <Grid item xs={12} key={data.room.id}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2">
                  {`${data.room.name} (${data.room.capacity} miejsc)`}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '100%',
                      mr: 1,
                      height: 20,
                      backgroundColor: theme.palette.grey[200],
                      borderRadius: 1,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Tooltip title={`${Math.round(data.utilizationPercentage)}% wykorzystania`}>
                      <Box
                        sx={{
                          width: `${data.utilizationPercentage}%`,
                          height: '100%',
                          backgroundColor: getUtilizationColor(data.utilizationPercentage),
                          position: 'absolute',
                          left: 0,
                          top: 0
                        }}
                      />
                    </Tooltip>
                  </Box>
                  <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                    {`${Math.round(data.utilizationPercentage)}%`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  {daysOfWeek.map((day, index) => (
                    <Tooltip key={index} title={`${day}: ${data.dailyUsage[index]} lekcji`}>
                      <Box
                        sx={{
                          flex: 1,
                          height: 30,
                          backgroundColor: theme.palette.grey[100],
                          borderRadius: 1,
                          mr: 0.5,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: `${(data.dailyUsage[index] / 10) * 100}%`,
                            backgroundColor: theme.palette.primary[300],
                            position: 'absolute',
                            left: 0,
                            bottom: 0
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <Typography variant="caption" fontWeight="bold">
                            {data.dailyUsage[index]}
                          </Typography>
                        </Box>
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
              <Divider sx={{ mt: 1, mb: 1 }} />
            </Grid>
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
          
          {/* Wiersze z salami i dniami */}
          {sortedRoomUtilization.slice(0, 10).map((data) => (
            daysOfWeek.map((day, dayIndex) => (
              <React.Fragment key={`${data.room.id}-${dayIndex}`}>
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
                      {dayIndex === 0 ? data.room.name : day}
                    </Typography>
                  </Paper>
                </Grid>
                
                {hoursOfDay.map((hour, hourIndex) => (
                  <Grid item xs key={`${data.room.id}-${dayIndex}-${hourIndex}`}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        height: 40,
                        backgroundColor: data.hourlyUsage[dayIndex][hourIndex] 
                          ? theme.palette.primary.main 
                          : theme.palette.grey[100],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {data.hourlyUsage[dayIndex][hourIndex] > 0 && (
                        <Typography variant="body2" fontWeight="bold" color="white">
                          ✓
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

export default RoomUtilizationChart;
