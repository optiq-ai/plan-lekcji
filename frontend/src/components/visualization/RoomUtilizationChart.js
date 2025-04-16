import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';

// Stylizowany kontener
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

// Stylizowany Paper dla zakładek
const StyledTabsContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

// Stylizowany Paper dla zawartości
const StyledContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(3),
}));

// Stylizowany Chip dla statusu
const StatusChip = styled(Chip)(({ theme, status }) => {
  let color = '#4caf50';
  let bgcolor = '#e8f5e9';
  
  if (status === 'zajęta') {
    color = '#f44336';
    bgcolor = '#ffebee';
  } else if (status === 'częściowo') {
    color = '#ff9800';
    bgcolor = '#fff3e0';
  }
  
  return {
    backgroundColor: bgcolor,
    color: color,
    fontWeight: 'bold',
    '& .MuiChip-icon': {
      color: color,
    },
  };
});

// Dane dla wykresu wykorzystania sal
const roomUtilizationData = [
  { name: 'W pełni wykorzystane', value: 42, color: '#f44336' },
  { name: 'Częściowo wykorzystane', value: 23, color: '#ffcdd2' },
  { name: 'Niewykorzystane', value: 27, color: '#ffffff' },
  { name: 'Zarezerwowane', value: 5, color: '#bbdefb' },
  { name: 'Nieczynn/Remont', value: 3, color: '#9e9e9e' },
];

// Dane dla heatmapy wykorzystania sal
const roomHeatmapData = [
  { 
    id: 'sala101', 
    name: 'Sala 101 (Informatyczna)', 
    hours: [
      { time: '8:00-8:45', status: 'zajęta' },
      { time: '8:55-9:40', status: 'zajęta' },
      { time: '9:50-10:35', status: 'zajęta' },
      { time: '10:45-11:30', status: 'zajęta' },
      { time: '11:50-12:25', status: 'wolna' },
      { time: '12:35-13:20', status: 'wolna' },
      { time: '13:30-14:15', status: 'wolna' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
  { 
    id: 'sala102', 
    name: 'Sala 102 (Językowa)', 
    hours: [
      { time: '8:00-8:45', status: 'zajęta' },
      { time: '8:55-9:40', status: 'zajęta' },
      { time: '9:50-10:35', status: 'wolna' },
      { time: '10:45-11:30', status: 'wolna' },
      { time: '11:50-12:25', status: 'zajęta' },
      { time: '12:35-13:20', status: 'zajęta' },
      { time: '13:30-14:15', status: 'zajęta' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
  { 
    id: 'sala103', 
    name: 'Sala 103 (Ogólna)', 
    hours: [
      { time: '8:00-8:45', status: 'zajęta' },
      { time: '8:55-9:40', status: 'zajęta' },
      { time: '9:50-10:35', status: 'zajęta' },
      { time: '10:45-11:30', status: 'wolna' },
      { time: '11:50-12:25', status: 'zajęta' },
      { time: '12:35-13:20', status: 'zajęta' },
      { time: '13:30-14:15', status: 'wolna' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
  { 
    id: 'sala104', 
    name: 'Sala 104 (Fizyczna)', 
    hours: [
      { time: '8:00-8:45', status: 'wolna' },
      { time: '8:55-9:40', status: 'wolna' },
      { time: '9:50-10:35', status: 'zajęta' },
      { time: '10:45-11:30', status: 'zajęta' },
      { time: '11:50-12:25', status: 'zajęta' },
      { time: '12:35-13:20', status: 'wolna' },
      { time: '13:30-14:15', status: 'wolna' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
  { 
    id: 'sala105', 
    name: 'Sala 105 (Ogólna)', 
    hours: [
      { time: '8:00-8:45', status: 'wolna' },
      { time: '8:55-9:40', status: 'zajęta' },
      { time: '9:50-10:35', status: 'zajęta' },
      { time: '10:45-11:30', status: 'zajęta' },
      { time: '11:50-12:25', status: 'zajęta' },
      { time: '12:35-13:20', status: 'wolna' },
      { time: '13:30-14:15', status: 'wolna' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
  { 
    id: 'sala106', 
    name: 'Sala 106 (Chemiczna)', 
    hours: [
      { time: '8:00-8:45', status: 'wolna' },
      { time: '8:55-9:40', status: 'wolna' },
      { time: '9:50-10:35', status: 'zajęta' },
      { time: '10:45-11:30', status: 'zajęta' },
      { time: '11:50-12:25', status: 'zajęta' },
      { time: '12:35-13:20', status: 'zajęta' },
      { time: '13:30-14:15', status: 'zajęta' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
  { 
    id: 'sala107', 
    name: 'Sala 107 (Ogólna)', 
    hours: [
      { time: '8:00-8:45', status: 'wolna' },
      { time: '8:55-9:40', status: 'wolna' },
      { time: '9:50-10:35', status: 'zajęta' },
      { time: '10:45-11:30', status: 'zajęta' },
      { time: '11:50-12:25', status: 'zajęta' },
      { time: '12:35-13:20', status: 'wolna' },
      { time: '13:30-14:15', status: 'wolna' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
  { 
    id: 'sala108', 
    name: 'Sala 108 (Biologiczna)', 
    hours: [
      { time: '8:00-8:45', status: 'wolna' },
      { time: '8:55-9:40', status: 'wolna' },
      { time: '9:50-10:35', status: 'zajęta' },
      { time: '10:45-11:30', status: 'zajęta' },
      { time: '11:50-12:25', status: 'zajęta' },
      { time: '12:35-13:20', status: 'zajęta' },
      { time: '13:30-14:15', status: 'wolna' },
      { time: '14:25-15:10', status: 'wolna' },
      { time: '15:20-16:05', status: 'wolna' },
      { time: '16:15-17:00', status: 'wolna' },
    ]
  },
];

// Komponent wykresu wykorzystania sal
const RoomUtilizationChart = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('sala105');
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa zmiany wybranej sali
  const handleRoomChange = (roomId) => {
    setSelectedRoom(roomId);
  };
  
  // Znajdź dane wybranej sali
  const selectedRoomData = roomHeatmapData.find(room => room.id === selectedRoom);
  
  // Renderowanie komórki heatmapy
  const renderHeatmapCell = (status) => {
    let bgcolor = status === 'zajęta' ? '#f44336' : '#e8f5e9';
    let width = '100%';
    
    if (status === 'częściowo') {
      bgcolor = '#ffcdd2';
      width = '50%';
    }
    
    return (
      <Box sx={{ 
        width: '100%', 
        height: 30, 
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          width: width, 
          height: '100%', 
          bgcolor: bgcolor,
        }}></Box>
      </Box>
    );
  };
  
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Zaawansowana analiza wykorzystania sal
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Liceum Ogólnokształcące im. Jana Kochanowskiego • Warszawa • Semestr letni 2025
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          placeholder="Wyszukaj salę lub filtry zaawansowane..."
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
      </Box>
      
      <StyledTabsContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="zakładki analizy sal"
        >
          <Tab label="Mapa interaktywna" />
          <Tab label="Analiza zajętości" />
          <Tab label="Wyposażenie sal" />
          <Tab label="Rezerwacje i konflikty" />
          <Tab label="Rekomendacje AI" />
        </Tabs>
      </StyledTabsContainer>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Piętro:</InputLabel>
              <Select
                value="wszystkie"
                label="Piętro:"
              >
                <MenuItem value="wszystkie">Wszystkie</MenuItem>
                <MenuItem value="parter">Parter</MenuItem>
                <MenuItem value="pietro1">Piętro 1</MenuItem>
                <MenuItem value="pietro2">Piętro 2</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Typ sali:</InputLabel>
              <Select
                value="wszystkie"
                label="Typ sali:"
              >
                <MenuItem value="wszystkie">Wszystkie</MenuItem>
                <MenuItem value="ogolne">Ogólne</MenuItem>
                <MenuItem value="specjalistyczne">Specjalistyczne</MenuItem>
                <MenuItem value="komputerowe">Komputerowe</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Widok:</InputLabel>
              <Select
                value="tygodniowy"
                label="Widok:"
              >
                <MenuItem value="dzienny">Dzienny</MenuItem>
                <MenuItem value="tygodniowy">Tygodniowy</MenuItem>
                <MenuItem value="miesięczny">Miesięczny</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Klasa:</InputLabel>
              <Select
                value="wszystkie"
                label="Klasa:"
              >
                <MenuItem value="wszystkie">Wszystkie</MenuItem>
                <MenuItem value="1a">1A</MenuItem>
                <MenuItem value="1b">1B</MenuItem>
                <MenuItem value="2a">2A</MenuItem>
                <MenuItem value="2b">2B</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>AI:</InputLabel>
              <Select
                value="optymalizacja"
                label="AI:"
              >
                <MenuItem value="optymalizacja">Pokazuje sale z potencjałem optymalizacji</MenuItem>
                <MenuItem value="konflikty">Pokazuje konflikty rezerwacji</MenuItem>
                <MenuItem value="rekomendacje">Pokazuje rekomendacje zmian</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analityka wykorzystania
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Średnie wykorzystanie sal
              </Typography>
              
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={roomUtilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {roomUtilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Optymalizacja AI
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Wskaźnik efektywności: 73%
                </Typography>
                <Box sx={{ 
                  width: '100%', 
                  height: 10, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 5,
                  overflow: 'hidden',
                  mb: 1
                }}>
                  <Box sx={{ 
                    width: '73%', 
                    height: '100%', 
                    bgcolor: '#3f51b5',
                    borderRadius: 5
                  }}></Box>
                </Box>
                <Typography variant="body2" gutterBottom>
                  Potencjał optymalizacji: 18%
                </Typography>
                <Box sx={{ 
                  width: '100%', 
                  height: 10, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 5,
                  overflow: 'hidden',
                  mb: 1
                }}>
                  <Box sx={{ 
                    width: '18%', 
                    height: '100%', 
                    bgcolor: '#f44336',
                    borderRadius: 5
                  }}></Box>
                </Box>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2 }}
              >
                Generuj raport szczegółowy
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Heatmapa wykorzystania sal lekcyjnych
          </Typography>
          
          <Box sx={{ mb: 3, overflowX: 'auto' }}>
            <Box sx={{ minWidth: 700 }}>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2">Sale / Godziny</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={1}>
                    {['8:00-9:40', '9:50-11:30', '11:50-13:30', '13:40-15:20', '15:30-17:10'].map((time) => (
                      <Grid item xs={2.4} key={time}>
                        <Typography variant="body2" align="center">{time}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              
              {roomHeatmapData.map((room) => (
                <Grid 
                  container 
                  spacing={1} 
                  sx={{ 
                    mb: 1, 
                    bgcolor: room.id === selectedRoom ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(63, 81, 181, 0.05)',
                    },
                  }}
                  key={room.id}
                  onClick={() => handleRoomChange(room.id)}
                >
                  <Grid item xs={3}>
                    <Typography variant="body2">{room.name}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container spacing={1}>
                      {[0, 1, 2, 3, 4].map((index) => (
                        <Grid item xs={2.4} key={index}>
                          {renderHeatmapCell(room.hours[index].status)}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
          
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Box sx={{ width: 20, height: 20, bgcolor: '#f44336', mr: 1 }}></Box>
              <Typography variant="body2">Zajęta (100%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Box sx={{ width: 20, height: 20, bgcolor: '#ffcdd2', mr: 1 }}></Box>
              <Typography variant="body2">Częściowo zajęta (50%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 20, height: 20, bgcolor: '#e8f5e9', mr: 1 }}></Box>
              <Typography variant="body2">Wolna (0%)</Typography>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sala {selectedRoomData?.name.split(' ')[1] || '105'} - szczegóły
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    Pojemność: 30 osób • Powierzchnia: 48m²
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Rodzaj: Sala ogólna • Klimatyzacja: Tak • Wentylacja: Tak • Tablica interaktywna: Tak • Komputer: Tak
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Średnie wykorzystanie: 70% • Klasy korzystające: 1A, 2B, 3A, 3C
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Aktualnie: Wolna
                    </Typography>
                    <StatusChip 
                      label="Wolna" 
                      status="wolna" 
                      size="small"
                      icon={<EventAvailableIcon />}
                    />
                  </Box>
                  
                  <Typography variant="body2" paragraph>
                    Najbliższe zajęcia: 10:45 - Fizyka - 2B
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Dostępna do szybkiej rezerwacji
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<EventAvailableIcon />}
                    >
                      Zarezerwuj teraz
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary"
                    >
                      Pokaż kalendarz
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary"
                    >
                      Udostępnij
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default RoomUtilizationChart;
