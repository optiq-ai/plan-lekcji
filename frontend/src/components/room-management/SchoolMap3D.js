import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Tabs, 
  Tab, 
  Tooltip,
  IconButton,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RoomService from '../../services/RoomService';
import { useTheme } from '@mui/material/styles';

/**
 * Komponent interaktywnej mapy szkoły z rozkładem sal
 * Umożliwia wizualizację 3D rozkładu sal w szkole
 */
const SchoolMap3D = () => {
  const theme = useTheme();
  const [activeFloor, setActiveFloor] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  // Kolory dla różnych typów sal
  const roomColors = {
    'zajęta': theme.palette.error.light,
    'wolna': theme.palette.success.light,
    'specjalistyczna': theme.palette.warning.light,
    'językowa': theme.palette.info.light,
    'komputerowa': theme.palette.primary.light
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await RoomService.getAllRooms();
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError('Nie udało się pobrać danych o salach');
        setLoading(false);
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  const handleFloorChange = (floor) => {
    setActiveFloor(floor);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 1.5) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.6) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filtrowanie sal dla aktywnego piętra
  const floorRooms = rooms.filter(room => room.floor === activeFloor);

  // Przykładowe dane sal dla wizualizacji (gdy API nie zwraca danych)
  const sampleRooms = [
    { id: 101, name: '101', type: 'komputerowa', floor: 1, status: 'wolna', x: 0, y: 0 },
    { id: 102, name: '102', type: 'językowa', floor: 1, status: 'zajęta', x: 1, y: 0 },
    { id: 103, name: '103', type: 'ogólna', floor: 1, status: 'wolna', x: 0, y: 1 },
    { id: 104, name: '104', type: 'fizyczna', floor: 1, status: 'zajęta', x: 1, y: 1 },
    { id: 105, name: '105', type: 'ogólna', floor: 1, status: 'wolna', x: 0, y: 2 },
    { id: 106, name: '106', type: 'chemiczna', floor: 1, status: 'zajęta', x: 2, y: 0 },
    { id: 107, name: '107', type: 'ogólna', floor: 1, status: 'wolna', x: 2, y: 1 },
    { id: 108, name: '108', type: 'biologiczna', floor: 1, status: 'zajęta', x: 3, y: 0 },
    { id: 109, name: '109', type: 'ogólna', floor: 1, status: 'wolna', x: 3, y: 1 },
    { id: 110, name: '110', type: 'ogólna', floor: 1, status: 'zajęta', x: 3, y: 2 },
    { id: 201, name: '201', type: 'komputerowa', floor: 2, status: 'wolna', x: 0, y: 0 },
    { id: 202, name: '202', type: 'językowa', floor: 2, status: 'zajęta', x: 1, y: 0 },
  ];

  // Używamy przykładowych danych, jeśli API nie zwróciło danych
  const displayRooms = floorRooms.length > 0 ? floorRooms : sampleRooms.filter(room => room.floor === activeFloor);

  // Renderowanie siatki sal
  const renderRoomGrid = () => {
    // Określenie maksymalnych współrzędnych dla siatki
    const maxX = Math.max(...displayRooms.map(room => room.x)) + 1;
    const maxY = Math.max(...displayRooms.map(room => room.y)) + 1;
    
    // Tworzenie pustej siatki
    const grid = Array(maxY).fill().map(() => Array(maxX).fill(null));
    
    // Wypełnianie siatki salami
    displayRooms.forEach(room => {
      if (room.x !== undefined && room.y !== undefined) {
        grid[room.y][room.x] = room;
      }
    });

    return (
      <Box 
        sx={{ 
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease',
          transformOrigin: 'top left',
          mt: 2
        }}
      >
        {grid.map((row, rowIndex) => (
          <Grid container spacing={1} key={`row-${rowIndex}`} sx={{ mb: 1 }}>
            {row.map((room, colIndex) => (
              <Grid item key={`cell-${rowIndex}-${colIndex}`}>
                {room ? (
                  <Paper
                    elevation={3}
                    sx={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: roomColors[room.type] || roomColors[room.status] || theme.palette.grey[300],
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s ease'
                      }
                    }}
                  >
                    <Typography variant="h6">{room.name}</Typography>
                    <Typography variant="caption">{room.type}</Typography>
                  </Paper>
                ) : (
                  <Box sx={{ width: 80, height: 80 }} />
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    );
  };

  // Renderowanie legendy
  const renderLegend = () => {
    const legendItems = [
      { label: 'Zajęta', color: roomColors['zajęta'] },
      { label: 'Wolna', color: roomColors['wolna'] },
      { label: 'Specjalistyczna', color: roomColors['specjalistyczna'] },
      { label: 'Językowa', color: roomColors['językowa'] },
      { label: 'Komputerowa', color: roomColors['komputerowa'] }
    ];

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {legendItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: item.color,
                mr: 0.5,
                borderRadius: '2px'
              }}
            />
            <Typography variant="caption">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  // Renderowanie szczegółów wybranej sali
  const renderRoomDetails = () => {
    // Przykładowe dane szczegółowe sali
    const roomDetails = {
      id: 103,
      name: 'Sala 103',
      type: 'Ogólna',
      capacity: 30,
      area: 48,
      equipment: ['Rzutnik', 'Tablica', 'Klimatyzacja'],
      temperature: 22.5,
      humidity: 45,
      availability: [
        { date: 'Dzisiaj', times: ['14:35-15:20', '15:30-16:15', '16:25-17:10'] },
        { date: 'Jutro', times: ['8:00-8:45', '8:55-9:40', '13:40-14:25'] }
      ]
    };

    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">{roomDetails.name} - Szczegóły</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Pojemność: {roomDetails.capacity} osób</Typography>
              <Typography variant="body2">Powierzchnia: {roomDetails.area}m²</Typography>
            </Box>
            
            <Typography variant="subtitle2" sx={{ mt: 1 }}>Wyposażenie i parametry</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {roomDetails.equipment.map((item, index) => (
                <Chip key={index} label={item} size="small" />
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Typography variant="body2">Temperatura: {roomDetails.temperature}°C</Typography>
              <Typography variant="body2">Wilgotność: {roomDetails.humidity}%</Typography>
            </Box>
            
            <Typography variant="subtitle2" sx={{ mt: 1 }}>Dostępność</Typography>
            {roomDetails.availability.map((item, index) => (
              <Box key={index}>
                <Typography variant="body2">{item.date}: {item.times.join(', ')}</Typography>
              </Box>
            ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" size="small" sx={{ mr: 1 }}>Pokaż kalendarz</Button>
              <Button variant="contained" size="small">Zarezerwuj teraz</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Super rozbudowana analiza sal
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Liceum Ogólnokształcące im. Jana Kochanowskiego • Warszawa • Semestr letni 2025
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Mapa 3D" />
        <Tab label="Analiza zajętości" />
        <Tab label="Wyposażenie sal" />
        <Tab label="Rezerwacje" />
        <Tab label="Rekomendacje AI" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Piętro {activeFloor} - Podgląd 3D
            </Typography>
            <Box>
              <IconButton onClick={handleZoomOut}>
                <ZoomOutIcon />
              </IconButton>
              <IconButton onClick={handleZoomIn}>
                <ZoomInIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 3 }}>
              {loading ? (
                <Typography>Ładowanie mapy sal...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                renderRoomGrid()
              )}
              {renderLegend()}
            </Box>
            <Box sx={{ flex: 2 }}>
              {renderRoomDetails()}
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
            {[1, 2, 3].map(floor => (
              <Button
                key={floor}
                variant={activeFloor === floor ? "contained" : "outlined"}
                onClick={() => handleFloorChange(floor)}
              >
                Piętro {floor}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SchoolMap3D;
