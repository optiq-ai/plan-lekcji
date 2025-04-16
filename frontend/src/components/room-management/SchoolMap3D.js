import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Grid,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Badge,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WifiIcon from '@mui/icons-material/Wifi';
import ComputerIcon from '@mui/icons-material/Computer';
import TableChartIcon from '@mui/icons-material/TableChart';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';
import AirIcon from '@mui/icons-material/Air';

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

// Stylizowany komponent sali
const RoomBox = styled(Box)(({ theme, color }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: color,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.getContrastText(color),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  },
}));

// Stylizowany komponent dla specjalnych elementów
const SpecialRoomBox = styled(Box)(({ theme, bgcolor }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: bgcolor || 'rgba(255, 255, 255, 0.8)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  },
}));

// Komponent strony zarządzania salami
const SchoolMap3D = () => {
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('103');
  const [floor, setFloor] = useState(1);
  
  // Kolory dla różnych typów sal
  const roomColors = {
    zajeta: '#ffcdd2',
    wolna: '#dcedc8',
    specjalistyczna: '#fff9c4',
    jezykowa: '#e1bee7',
    komputerowa: '#bbdefb',
  };

  // Dane sal na piętrze 1
  const floor1Rooms = [
    { id: '101', type: 'komputerowa', status: 'wolna' },
    { id: '102', type: 'jezykowa', status: 'zajeta' },
    { id: '103', type: 'ogolna', status: 'wolna', selected: true },
    { id: '104', type: 'fizyczna', status: 'zajeta' },
    { id: '105', type: 'ogolna', status: 'wolna' },
    { id: '106', type: 'specjalistyczna', status: 'wolna' },
    { id: '107', type: 'ogolna', status: 'zajeta' },
    { id: '108', type: 'biologiczna', status: 'wolna' },
    { id: '109', type: 'ogolna', status: 'zajeta' },
    { id: '110', type: 'chemiczna', status: 'wolna' },
  ];

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Obsługa wyboru sali
  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

  // Obsługa zmiany piętra
  const handleFloorChange = (newFloor) => {
    setFloor(newFloor);
  };

  // Renderowanie mapy 3D
  const render3DMap = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Piętro {floor} - Podgląd 3D
        </Typography>
        <Box>
          <IconButton onClick={() => handleFloorChange(Math.max(1, floor - 1))}>
            <ZoomOutMapIcon />
          </IconButton>
          <IconButton onClick={() => handleFloorChange(Math.min(3, floor + 1))}>
            <ZoomInMapIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ height: '400px' }}>
        {/* Lewa strona korytarza */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.komputerowa} 
                onClick={() => handleRoomSelect('101')}
                sx={{ border: selectedRoom === '101' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">101</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.jezykowa} 
                onClick={() => handleRoomSelect('102')}
                sx={{ border: selectedRoom === '102' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">102</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ height: '100%', bgcolor: '#f5f5f5', borderRadius: 1 }}></Box>
            </Grid>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.zajeta} 
                onClick={() => handleRoomSelect('104')}
                sx={{ border: selectedRoom === '104' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">104</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.wolna} 
                onClick={() => handleRoomSelect('105')}
                sx={{ border: selectedRoom === '105' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">105</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={8} sx={{ mt: 2 }}>
              <SpecialRoomBox bgcolor="#f5f5f5">
                <Typography variant="subtitle1">Schody</Typography>
              </SpecialRoomBox>
            </Grid>
          </Grid>
        </Grid>

        {/* Prawa strona korytarza */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.specjalistyczna} 
                onClick={() => handleRoomSelect('106')}
                sx={{ border: selectedRoom === '106' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">106</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.zajeta} 
                onClick={() => handleRoomSelect('107')}
                sx={{ border: selectedRoom === '107' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">107</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.wolna} 
                onClick={() => handleRoomSelect('108')}
                sx={{ border: selectedRoom === '108' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">108</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.zajeta} 
                onClick={() => handleRoomSelect('109')}
                sx={{ border: selectedRoom === '109' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">109</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={4}>
              <RoomBox 
                color={roomColors.wolna} 
                onClick={() => handleRoomSelect('110')}
                sx={{ border: selectedRoom === '110' ? '3px solid #3f51b5' : 'none' }}
              >
                <Typography variant="subtitle1">110</Typography>
              </RoomBox>
            </Grid>
            <Grid item xs={8} sx={{ mt: 2 }}>
              <SpecialRoomBox bgcolor="#e3f2fd">
                <Typography variant="subtitle1">Winda</Typography>
              </SpecialRoomBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip 
          label="Zajęta" 
          sx={{ bgcolor: roomColors.zajeta, color: 'rgba(0, 0, 0, 0.87)' }} 
        />
        <Chip 
          label="Wolna" 
          sx={{ bgcolor: roomColors.wolna, color: 'rgba(0, 0, 0, 0.87)' }} 
        />
        <Chip 
          label="Specjalistyczna" 
          sx={{ bgcolor: roomColors.specjalistyczna, color: 'rgba(0, 0, 0, 0.87)' }} 
        />
        <Chip 
          label="Językowa" 
          sx={{ bgcolor: roomColors.jezykowa, color: 'rgba(0, 0, 0, 0.87)' }} 
        />
        <Chip 
          label="Komputerowa" 
          sx={{ bgcolor: roomColors.komputerowa, color: 'rgba(0, 0, 0, 0.87)' }} 
        />
      </Box>
    </Box>
  );

  // Renderowanie szczegółów sali
  const renderRoomDetails = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sala {selectedRoom} - Szczegóły
      </Typography>

      <Box sx={{ 
        height: '200px', 
        bgcolor: '#f5f5f5', 
        borderRadius: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        mb: 3,
        position: 'relative'
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '2px dashed #3f51b5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Typography variant="body2" color="primary">
            Podgląd 360° sali
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Wyposażenie i parametry
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Pojemność:</Typography>
              <Typography variant="body2" fontWeight="bold">30 osób</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Powierzchnia:</Typography>
              <Typography variant="body2" fontWeight="bold">48m²</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Rzutnik:</Typography>
              <Typography variant="body2" fontWeight="bold">Tak</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Klimatyzacja:</Typography>
              <Typography variant="body2" fontWeight="bold">Tak</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Wentylacja:</Typography>
              <Typography variant="body2" fontWeight="bold">45%</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThermostatIcon color="primary" />
              <Typography variant="body2">Temperatura: 22.5°C</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WifiIcon color="primary" />
              <Typography variant="body2">WiFi: Tak</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ComputerIcon color="primary" />
              <Typography variant="body2">Komputer: Tak</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TableChartIcon color="primary" />
              <Typography variant="body2">Tablica interaktywna: Tak</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Statystyki wykorzystania
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Średnia zajętość:
        </Typography>
        <Box sx={{ 
          width: '100%', 
          height: '20px', 
          bgcolor: '#f5f5f5', 
          borderRadius: 5,
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            width: '70%', 
            height: '100%', 
            background: 'linear-gradient(90deg, #f44336 0%, #ff9800 100%)',
            borderRadius: 5
          }}></Box>
        </Box>
        <Typography variant="caption" color="textSecondary">
          70% (wysoka)
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Box sx={{ 
          width: '30px', 
          height: '30px', 
          bgcolor: '#f44336', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: 'white',
          borderRadius: 1
        }}>
          PON
        </Box>
        <Box sx={{ 
          width: '30px', 
          height: '30px', 
          bgcolor: '#ff9800', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: 'white',
          borderRadius: 1
        }}>
          WT
        </Box>
        <Box sx={{ 
          width: '30px', 
          height: '30px', 
          bgcolor: '#f44336', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: 'white',
          borderRadius: 1
        }}>
          ŚR
        </Box>
        <Box sx={{ 
          width: '30px', 
          height: '30px', 
          bgcolor: '#ff9800', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: 'white',
          borderRadius: 1
        }}>
          CZW
        </Box>
        <Box sx={{ 
          width: '30px', 
          height: '30px', 
          bgcolor: '#4caf50', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: 'white',
          borderRadius: 1
        }}>
          PT
        </Box>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Wzrost temperatury
      </Typography>
      <Box sx={{ 
        width: '100%', 
        height: '40px', 
        bgcolor: '#f5f5f5', 
        borderRadius: 1,
        position: 'relative',
        mb: 3
      }}>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          width: '100%',
          height: '2px',
          bgcolor: '#e0e0e0'
        }}></Box>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '10%',
          transform: 'translateY(-50%)',
          width: '80%',
          height: '2px',
          bgcolor: '#f44336'
        }}>
          <Box sx={{ 
            position: 'absolute',
            top: '-5px',
            right: 0,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            bgcolor: '#f44336'
          }}></Box>
        </Box>
      </Box>
    </Box>
  );

  // Renderowanie szybkiej rezerwacji
  const renderQuickReservation = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Szybka rezerwacja sali {selectedRoom}
      </Typography>
      
      <Box sx={{ 
        p: 2, 
        bgcolor: '#e8f5e9', 
        borderRadius: 1, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Box>
          <Typography variant="subtitle2" color="success.main">
            Aktualnie: Wolna
          </Typography>
          <Typography variant="body2">
            Najbliższe zajęcia: 10:45 - Fizyka
          </Typography>
          <Typography variant="body2">
            Dostępna do szybkiej rezerwacji
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Zarezerwuj teraz
        </Button>
      </Box>

      <Typography variant="body2" gutterBottom>
        Dostępna dzisiaj: 14:35-15:20, 15:30-16:15, 16:25-17:10
      </Typography>
      <Typography variant="body2" gutterBottom>
        Dostępna jutro: 8:00-8:45, 8:55-9:40, 13:40-14:25
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" color="primary">
          Pokaż kalendarz
        </Button>
        <Button variant="outlined" color="success">
          Udostępnij
        </Button>
      </Box>
    </Box>
  );

  // Renderowanie bieżących statystyk
  const renderCurrentStats = () => (
    <Box sx={{ 
      p: 2, 
      bgcolor: '#f5f5f5', 
      borderRadius: 1, 
      mb: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>
      <Typography variant="subtitle1" gutterBottom>
        Bieżące statystyki:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Zajętych sal:</Typography>
          <Chip 
            label="12" 
            color="error" 
            size="small" 
            sx={{ fontWeight: 'bold' }} 
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Wolnych sal:</Typography>
          <Chip 
            label="8" 
            color="success" 
            size="small" 
            sx={{ fontWeight: 'bold' }} 
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Temperatura:</Typography>
          <Chip 
            label="22.5°" 
            color="primary" 
            size="small" 
            sx={{ fontWeight: 'bold' }} 
            icon={<ThermostatIcon />}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <StyledContainer maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Super rozbudowana analiza sal
        </Typography>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Liceum Ogólnokształcące im. Jana Kochanowskiego • Warszawa • Semestr letni 2025
          </Typography>
        </Box>
      </Box>

      {renderCurrentStats()}

      <StyledTabsContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="zakładki analizy sal"
        >
          <Tab label="Mapa 3D" />
          <Tab label="Analiza zajętości" />
          <Tab label="Wyposażenie sal" />
          <Tab label="Rezerwacje" />
          <Tab label="Rekomendacje AI" />
        </Tabs>
      </StyledTabsContainer>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <StyledContentPaper>
            {activeTab === 0 && render3DMap()}
          </StyledContentPaper>
        </Grid>
        <Grid item xs={12} md={5}>
          <StyledContentPaper>
            {renderRoomDetails()}
          </StyledContentPaper>
          <StyledContentPaper>
            {renderQuickReservation()}
          </StyledContentPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default SchoolMap3D;
