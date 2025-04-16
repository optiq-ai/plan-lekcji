import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Tooltip,
  IconButton,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import InfoIcon from '@mui/icons-material/Info';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

/**
 * Komponent wizualizacji wykorzystania sal lekcyjnych
 * Pokazuje statystyki zajętości, wyposażenie i rekomendacje optymalizacji
 */
const RoomUtilizationChart = () => {
  const theme = useTheme();
  const [floor, setFloor] = useState('Wszystkie');
  const [roomType, setRoomType] = useState('Wszystkie');
  const [view, setView] = useState('Tygodniowy');
  const [classFilter, setClassFilter] = useState('Wszystkie');
  const [aiFilter, setAiFilter] = useState(false);
  const [utilizationData, setUtilizationData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Symulacja danych wykorzystania sal
  useEffect(() => {
    // W rzeczywistej aplikacji dane byłyby pobierane z API
    const mockUtilizationData = [
      { 
        id: 101, 
        name: 'Sala 101 (Informatyczna)', 
        type: 'Informatyczna',
        floor: 1,
        utilizationRate: 0.85,
        partialUtilizationRate: 0.10,
        freeRate: 0.05,
        classes: ['1A', '2B', '3A', '3C'],
        equipment: ['30 komputerów', 'Rzutnik', 'Tablica interaktywna'],
        nextAvailable: '14:35-15:20'
      },
      { 
        id: 102, 
        name: 'Sala 102 (Językowa)', 
        type: 'Językowa',
        floor: 1,
        utilizationRate: 0.45,
        partialUtilizationRate: 0.30,
        freeRate: 0.25,
        classes: ['1A', '1B', '2A', '2C'],
        equipment: ['Sprzęt audio', 'Rzutnik', 'Tablice językowe'],
        nextAvailable: '11:50-12:35'
      },
      { 
        id: 103, 
        name: 'Sala 103 (Ogólna)', 
        type: 'Ogólna',
        floor: 1,
        utilizationRate: 0.60,
        partialUtilizationRate: 0.20,
        freeRate: 0.20,
        classes: ['1A', '1B', '1C', '2A'],
        equipment: ['30 ławek', 'Rzutnik', 'Tablica'],
        nextAvailable: '10:45-11:30'
      },
      { 
        id: 104, 
        name: 'Sala 104 (Fizyczna)', 
        type: 'Specjalistyczna',
        floor: 1,
        utilizationRate: 0.40,
        partialUtilizationRate: 0.15,
        freeRate: 0.45,
        classes: ['2A', '2B', '3A', '3B'],
        equipment: ['Sprzęt laboratoryjny', 'Rzutnik', 'Stanowiska doświadczalne'],
        nextAvailable: '8:55-9:40'
      },
      { 
        id: 105, 
        name: 'Sala 105 (Ogólna)', 
        type: 'Ogólna',
        floor: 1,
        utilizationRate: 0.50,
        partialUtilizationRate: 0.25,
        freeRate: 0.25,
        classes: ['1A', '2B', '3A', '3C'],
        equipment: ['30 ławek', 'Rzutnik', 'Tablica'],
        nextAvailable: 'Wolna teraz'
      },
      { 
        id: 106, 
        name: 'Sala 106 (Chemiczna)', 
        type: 'Specjalistyczna',
        floor: 1,
        utilizationRate: 0.70,
        partialUtilizationRate: 0.20,
        freeRate: 0.10,
        classes: ['1C', '2A', '2C', '3B'],
        equipment: ['Dygestorium', 'Sprzęt laboratoryjny', 'Rzutnik'],
        nextAvailable: '13:40-14:25'
      },
      { 
        id: 107, 
        name: 'Sala 107 (Ogólna)', 
        type: 'Ogólna',
        floor: 1,
        utilizationRate: 0.55,
        partialUtilizationRate: 0.25,
        freeRate: 0.20,
        classes: ['1B', '2B', '3C'],
        equipment: ['30 ławek', 'Rzutnik', 'Tablica'],
        nextAvailable: '12:45-13:30'
      },
      { 
        id: 108, 
        name: 'Sala 108 (Biologiczna)', 
        type: 'Specjalistyczna',
        floor: 1,
        utilizationRate: 0.60,
        partialUtilizationRate: 0.20,
        freeRate: 0.20,
        classes: ['1A', '1C', '2A', '3B'],
        equipment: ['Mikroskopy', 'Modele anatomiczne', 'Rzutnik'],
        nextAvailable: '9:50-10:35'
      }
    ];

    // Filtrowanie danych na podstawie wybranych filtrów
    let filteredData = [...mockUtilizationData];
    
    if (floor !== 'Wszystkie') {
      filteredData = filteredData.filter(room => room.floor === parseInt(floor));
    }
    
    if (roomType !== 'Wszystkie') {
      filteredData = filteredData.filter(room => room.type === roomType);
    }
    
    if (classFilter !== 'Wszystkie') {
      filteredData = filteredData.filter(room => room.classes.includes(classFilter));
    }
    
    if (aiFilter) {
      // Symulacja filtrowania sal z potencjałem optymalizacji
      filteredData = filteredData.filter(room => 
        room.utilizationRate < 0.7 || room.utilizationRate > 0.9
      );
    }

    setUtilizationData(filteredData);
  }, [floor, roomType, view, classFilter, aiFilter]);

  // Dane dla wykresu kołowego
  const getPieChartData = () => {
    // Obliczanie średnich wartości dla wszystkich sal
    const totalRooms = utilizationData.length;
    if (totalRooms === 0) return [];
    
    const avgUtilization = utilizationData.reduce((sum, room) => sum + room.utilizationRate, 0) / totalRooms;
    const avgPartialUtilization = utilizationData.reduce((sum, room) => sum + room.partialUtilizationRate, 0) / totalRooms;
    const avgFree = utilizationData.reduce((sum, room) => sum + room.freeRate, 0) / totalRooms;
    
    return [
      { name: 'W pełni wykorzystane', value: Math.round(avgUtilization * 100) },
      { name: 'Częściowo wykorzystane', value: Math.round(avgPartialUtilization * 100) },
      { name: 'Niewykorzystane', value: Math.round(avgFree * 100) },
    ];
  };

  // Kolory dla wykresu kołowego
  const COLORS = [theme.palette.error.main, theme.palette.warning.light, theme.palette.success.light];

  // Obsługa kliknięcia na salę
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Zaawansowana analiza wykorzystania sal</Typography>
        <Box>
          <Tooltip title="Wydrukuj raport">
            <IconButton>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eksportuj do PDF">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Piętro</InputLabel>
            <Select
              value={floor}
              label="Piętro"
              onChange={(e) => setFloor(e.target.value)}
            >
              <MenuItem value="Wszystkie">Wszystkie</MenuItem>
              <MenuItem value="0">Parter</MenuItem>
              <MenuItem value="1">Piętro 1</MenuItem>
              <MenuItem value="2">Piętro 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Typ sali</InputLabel>
            <Select
              value={roomType}
              label="Typ sali"
              onChange={(e) => setRoomType(e.target.value)}
            >
              <MenuItem value="Wszystkie">Wszystkie</MenuItem>
              <MenuItem value="Ogólna">Ogólne</MenuItem>
              <MenuItem value="Informatyczna">Informatyczne</MenuItem>
              <MenuItem value="Językowa">Językowe</MenuItem>
              <MenuItem value="Specjalistyczna">Specjalistyczne</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Widok</InputLabel>
            <Select
              value={view}
              label="Widok"
              onChange={(e) => setView(e.target.value)}
            >
              <MenuItem value="Tygodniowy">Tygodniowy</MenuItem>
              <MenuItem value="Dzienny">Dzienny</MenuItem>
              <MenuItem value="Miesięczny">Miesięczny</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Klasa</InputLabel>
            <Select
              value={classFilter}
              label="Klasa"
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <MenuItem value="Wszystkie">Wszystkie</MenuItem>
              <MenuItem value="1A">1A</MenuItem>
              <MenuItem value="1B">1B</MenuItem>
              <MenuItem value="1C">1C</MenuItem>
              <MenuItem value="2A">2A</MenuItem>
              <MenuItem value="2B">2B</MenuItem>
              <MenuItem value="2C">2C</MenuItem>
              <MenuItem value="3A">3A</MenuItem>
              <MenuItem value="3B">3B</MenuItem>
              <MenuItem value="3C">3C</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button 
            variant={aiFilter ? "contained" : "outlined"}
            color="primary"
            startIcon={<InfoIcon />}
            onClick={() => setAiFilter(!aiFilter)}
            fullWidth
            sx={{ height: '100%' }}
          >
            AI: Pokazuje sale z potencjałem optymalizacji
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Heatmapa wykorzystania sal lekcyjnych
              </Typography>
              
              <Box sx={{ overflowX: 'auto' }}>
                <Box sx={{ minWidth: 600 }}>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Box sx={{ width: 200, fontWeight: 'bold' }}>
                      <Typography variant="body2">Sale / Godziny</Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>8:00-9:40</Typography>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>9:50-10:35</Typography>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>10:45-11:30</Typography>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>11:50-12:35</Typography>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>12:45-13:30</Typography>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>13:40-14:25</Typography>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>14:35-15:20</Typography>
                      <Typography variant="caption" sx={{ flex: 1, textAlign: 'center' }}>15:30-17:10</Typography>
                    </Box>
                  </Box>
                  
                  {utilizationData.map((room) => (
                    <Box 
                      key={room.id} 
                      sx={{ 
                        display: 'flex', 
                        mb: 1, 
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: theme.palette.action.hover,
                          borderRadius: 1
                        }
                      }}
                      onClick={() => handleRoomClick(room)}
                    >
                      <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">{room.name}</Typography>
                      </Box>
                      <Box sx={{ flex: 1, display: 'flex' }}>
                        {/* Symulacja zajętości sal w różnych godzinach */}
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: Math.random() > 0.5 ? theme.palette.error.main : 
                                  (Math.random() > 0.5 ? theme.palette.warning.light : theme.palette.success.light), 
                          height: 30, 
                          mx: 0.5,
                          borderRadius: 1
                        }}></Box>
                      </Box>
                    </Box>
                  ))}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                      <Box sx={{ width: 16, height: 16, bgcolor: theme.palette.error.main, mr: 0.5, borderRadius: 0.5 }}></Box>
                      <Typography variant="caption">Zajęta (100%)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                      <Box sx={{ width: 16, height: 16, bgcolor: theme.palette.warning.light, mr: 0.5, borderRadius: 0.5 }}></Box>
                      <Typography variant="caption">Częściowo zajęta (50%)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                      <Box sx={{ width: 16, height: 16, bgcolor: theme.palette.success.light, mr: 0.5, borderRadius: 0.5 }}></Box>
                      <Typography variant="caption">Wolna (0%)</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Analityka wykorzystania
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Średnie wykorzystanie sal
                  </Typography>
                  
                  <Box sx={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getPieChartData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          {getPieChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                      Optymalizacja AI
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      Wskaźnik efektywności: <Chip label="73%" color="primary" size="small" sx={{ ml: 1 }} />
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      Potencjał optymalizacji: <Chip label="18%" color="warning" size="small" sx={{ ml: 1 }} />
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      sx={{ mt: 2 }}
                    >
                      Generuj raport szczegółowy
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item>
              <Card>
                <CardContent>
                  {selectedRoom ? (
                    <>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {selectedRoom.name} - szczegóły
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2">
                          Pojemność: 30 osób • Powierzchnia: 48m²
                        </Typography>
                        <Typography variant="body2">
                          Wyposażenie: {selectedRoom.equipment.join(', ')}
                        </Typography>
                        <Typography variant="body2">
                          Średnie wykorzystanie: {Math.round(selectedRoom.utilizationRate * 100)}% • Klasy korzystające: {selectedRoom.classes.join(', ')}
                        </Typography>
                        
                        <Box sx={{ 
                          mt: 1, 
                          p: 1, 
                          bgcolor: theme.palette.success.light, 
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              Aktualnie: Wolna
                            </Typography>
                            <Typography variant="caption">
                              Najbliższe zajęcia: 10:45 - Fizyka
                            </Typography>
                            <Typography variant="caption" display="block">
                              Dostępna do szybkiej rezerwacji
                            </Typography>
                          </Box>
                          <Button 
                            variant="contained" 
                            size="small" 
                            color="primary"
                          >
                            Rezerwuj
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                      <MeetingRoomIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 1 }} />
                      <Typography variant="body2" color="textSecondary">
                        Wybierz salę z listy, aby zobaczyć szczegóły
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomUtilizationChart;
