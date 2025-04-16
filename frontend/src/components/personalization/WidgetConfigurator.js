import React, { useState } from 'react';
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
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import ExtensionIcon from '@mui/icons-material/Extension';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmartToyIcon from '@mui/icons-material/SmartToy';

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

// Stylizowany przełącznik
const StyledSwitch = styled(Box)(({ theme, active }) => ({
  width: 50,
  height: 24,
  backgroundColor: active ? theme.palette.primary.main : '#e0e0e0',
  borderRadius: 12,
  position: 'relative',
  cursor: 'pointer',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 2,
    left: active ? 'calc(100% - 22px)' : 2,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'left 0.3s',
  },
}));

// Dane widgetów
const widgetData = [
  {
    id: 'zastepstwa',
    title: 'Widget zastępstw',
    enabled: true,
    category: 'nauczyciele',
    content: {
      title: 'Zastępstwo 12.04.2025',
      description: 'Zastąp: mgr J. Nowak (polski) • s.103 • kl.2A',
      alert: {
        title: 'Odwołane zajęcia 15.04.2025',
        description: 'Historia • s.108 • kl.1B • Lekcja 4 (10:45-11:30)',
        type: 'warning'
      }
    }
  },
  {
    id: 'dyzury',
    title: 'Dyżury nauczycieli',
    enabled: true,
    category: 'nauczyciele',
    content: {
      days: ['PON', 'WT', 'ŚR', 'CZW', 'PT'],
      teachers: [
        { day: 'PON', name: 'J. Nowak', time: '10:00-10:30' },
        { day: 'WT', name: 'A. Kowalska', time: '12:00-12:30' },
        { day: 'ŚR', name: 'P. Zieliński', time: '9:00-9:30' },
        { day: 'CZW', name: 'M. Wójcik', time: '11:00-11:30' },
        { day: 'PT', name: 'T. Kalinowski', time: '13:00-13:30' }
      ]
    }
  },
  {
    id: 'sugestie',
    title: 'Sugestie optymalizacji AI',
    enabled: true,
    category: 'ai',
    content: {
      suggestions: [
        { id: 1, text: 'Zamień salę 103 z 108 w czwartek (mniej przemieszczania)' },
        { id: 2, text: 'Zmiana czasu WF z 3A i 3B w środę na piątek' },
        { id: 3, text: 'Zwiększ liczbę sal komputerowych we wtorki' }
      ]
    }
  },
  {
    id: 'przypomnienia',
    title: 'Przypominacze i wydarzenia',
    enabled: true,
    category: 'powiadomienia',
    content: {
      events: [
        { id: 1, title: 'Rada pedagogiczna', date: '12.04.2025', time: '14:00-16:00', location: 'Pokój nauczycielski', type: 'important' },
        { id: 2, title: 'Wycieczka kl. 2A', date: '15.04.2025', time: '8:00-15:00', location: 'Zamek Królewski', type: 'confirmed' },
        { id: 3, title: 'Dzień otwarty szkoły', date: '20.04.2025', time: '10:00-14:00', location: 'Cała szkoła', type: 'pending' }
      ]
    }
  },
  {
    id: 'meteo',
    title: 'Meteo-plan (Lekcje i pogoda)',
    enabled: true,
    category: 'inne',
    content: {
      forecast: [
        { date: '12.04.2025', wfOutside: true, weather: 'sunny', temperature: 22 },
        { date: '15.04.2025', wfOutside: false, weather: 'rainy', temperature: 12 },
        { date: '20.04.2025', wfOutside: true, weather: 'partly_cloudy', temperature: 18 }
      ]
    }
  },
  {
    id: 'konfigurator',
    title: 'Konfigurator widgetów',
    enabled: true,
    category: 'admin',
    content: {
      enabled: ['Zastępstwa', 'Dyżury nauczycieli', 'Sugestie optymalizacji AI', 'Przypominacze i wydarzenia', 'Meteo-plan'],
      available: ['Dostępność sal', 'Export i synchronizacja', 'Statystyki obciążenia', 'Historia zmian planu', 'Dziennik zastępstw']
    }
  }
];

// Komponent widgetów i rozszerzeń
const WidgetConfigurator = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState('wszystkie');
  const theme = useTheme();
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa zmiany kategorii
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // Filtrowanie widgetów według kategorii
  const filteredWidgets = activeCategory === 'wszystkie' 
    ? widgetData 
    : widgetData.filter(widget => widget.category === activeCategory);
  
  // Renderowanie widgetu zastępstw
  const renderSubstitutionWidget = () => (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent sx={{ bgcolor: '#3f51b5', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Widget zastępstw</Typography>
          <StyledSwitch active={true} />
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Zastępstwo 12.04.2025
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Zastąp: mgr J. Nowak (polski) • s.103 • kl.2A
          </Typography>
        </Box>
        
        <Box sx={{ 
          p: 1.5, 
          bgcolor: '#fff3e0', 
          borderRadius: '4px',
          border: '1px solid #ffe0b2'
        }}>
          <Typography variant="subtitle2" color="error" gutterBottom>
            Odwołane zajęcia 15.04.2025
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Historia • s.108 • kl.1B • Lekcja 4 (10:45-11:30)
          </Typography>
        </Box>
        
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Zarządzaj zastępstwami
        </Button>
      </CardContent>
    </Card>
  );
  
  // Renderowanie widgetu dyżurów
  const renderDutyWidget = () => (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent sx={{ bgcolor: '#3f51b5', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Dyżury nauczycieli</Typography>
          <StyledSwitch active={true} />
        </Box>
      </CardContent>
      <CardContent>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={2.4}>
            <Typography variant="body2" align="center" fontWeight="bold">PON</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="body2" align="center" fontWeight="bold">WT</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="body2" align="center" fontWeight="bold">ŚR</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="body2" align="center" fontWeight="bold">CZW</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="body2" align="center" fontWeight="bold">PT</Typography>
          </Grid>
        </Grid>
        
        <Grid container spacing={1}>
          <Grid item xs={2.4}>
            <Box sx={{ 
              p: 1, 
              bgcolor: '#f5f5f5', 
              borderRadius: '4px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body2" align="center">J. Nowak</Typography>
              <Typography variant="caption" color="textSecondary" align="center">10:00-10:30</Typography>
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box sx={{ 
              p: 1, 
              bgcolor: '#f5f5f5', 
              borderRadius: '4px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body2" align="center">A. Kowalska</Typography>
              <Typography variant="caption" color="textSecondary" align="center">12:00-12:30</Typography>
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box sx={{ 
              p: 1, 
              bgcolor: '#f5f5f5', 
              borderRadius: '4px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body2" align="center">P. Zieliński</Typography>
              <Typography variant="caption" color="textSecondary" align="center">9:00-9:30</Typography>
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box sx={{ 
              p: 1, 
              bgcolor: '#f5f5f5', 
              borderRadius: '4px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body2" align="center">M. Wójcik</Typography>
              <Typography variant="caption" color="textSecondary" align="center">11:00-11:30</Typography>
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <Box sx={{ 
              p: 1, 
              bgcolor: '#f5f5f5', 
              borderRadius: '4px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body2" align="center">T. Kalinowski</Typography>
              <Typography variant="caption" color="textSecondary" align="center">13:00-13:30</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Typography variant="caption" color="textSecondary" align="center" sx={{ display: 'block', mt: 1 }}>
          Kliknij na komórkę, aby edytować dyżur
        </Typography>
      </CardContent>
    </Card>
  );
  
  // Renderowanie widgetu sugestii AI
  const renderAISuggestionsWidget = () => (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent sx={{ bgcolor: '#3f51b5', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Sugestie optymalizacji AI</Typography>
          <StyledSwitch active={true} />
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SmartToyIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" color="primary">
            Sugestie optymalizacji planu
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            1. Zamień salę 103 z 108 w czwartek (mniej przemieszczania)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            2. Zmiana czasu WF z 3A i 3B w środę na piątek
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            3. Zwiększ liczbę sal komputerowych we wtorki
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 1 }}
        >
          Zastosuj sugestie
        </Button>
      </CardContent>
    </Card>
  );
  
  // Renderowanie widgetu przypomnień
  const renderRemindersWidget = () => (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent sx={{ bgcolor: '#3f51b5', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Przypominacze i wydarzenia</Typography>
          <StyledSwitch active={true} />
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ 
          p: 1.5, 
          mb: 2,
          bgcolor: '#ffebee', 
          borderRadius: '4px',
          borderLeft: '4px solid #f44336'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Rada pedagogiczna
          </Typography>
          <Typography variant="body2" color="textSecondary">
            12.04.2025 • 14:00-16:00 • Pokój nauczycielski
          </Typography>
          <Chip 
            label="WAŻNE" 
            size="small" 
            sx={{ 
              mt: 1, 
              bgcolor: '#ffebee', 
              color: '#f44336', 
              borderColor: '#f44336',
              fontSize: '0.7rem'
            }} 
            variant="outlined" 
          />
        </Box>
        
        <Box sx={{ 
          p: 1.5, 
          mb: 2,
          bgcolor: '#e8f5e9', 
          borderRadius: '4px',
          borderLeft: '4px solid #4caf50'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Wycieczka kl. 2A
          </Typography>
          <Typography variant="body2" color="textSecondary">
            15.04.2025 • 8:00-15:00 • Zamek Królewski
          </Typography>
          <Chip 
            label="ZATWIERDZONE" 
            size="small" 
            sx={{ 
              mt: 1, 
              bgcolor: '#e8f5e9', 
              color: '#4caf50', 
              borderColor: '#4caf50',
              fontSize: '0.7rem'
            }} 
            variant="outlined" 
          />
        </Box>
        
        <Box sx={{ 
          p: 1.5, 
          bgcolor: '#fff8e1', 
          borderRadius: '4px',
          borderLeft: '4px solid #ff9800'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Dzień otwarty szkoły
          </Typography>
          <Typography variant="body2" color="textSecondary">
            20.04.2025 • 10:00-14:00 • Cała szkoła
          </Typography>
          <Chip 
            label="W TRAKCIE" 
            size="small" 
            sx={{ 
              mt: 1, 
              bgcolor: '#fff8e1', 
              color: '#ff9800', 
              borderColor: '#ff9800',
              fontSize: '0.7rem'
            }} 
            variant="outlined" 
          />
        </Box>
      </CardContent>
    </Card>
  );
  
  // Renderowanie widgetu meteo-planu
  const renderMeteoPlanWidget = () => (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent sx={{ bgcolor: '#3f51b5', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Meteo-plan (Lekcje i pogoda)</Typography>
          <StyledSwitch active={true} />
        </Box>
      </CardContent>
      <CardContent>
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <Typography variant="body2" fontWeight="bold">Data</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" fontWeight="bold">WF na zewnątrz</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" fontWeight="bold">Pogoda</Typography>
          </Grid>
        </Grid>
        
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <Typography variant="body2">12.04.2025</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="primary" fontWeight="bold">ZALECANE</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                component="span" 
                sx={{ 
                  display: 'inline-block', 
                  width: 20, 
                  height: 20, 
                  borderRadius: '50%', 
                  bgcolor: '#ffeb3b',
                  mr: 1
                }} 
              />
              <Typography variant="body2">22°C</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <Typography variant="body2">15.04.2025</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="error" fontWeight="bold">NIEZALECANE</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                component="span" 
                sx={{ 
                  display: 'inline-block', 
                  width: 20, 
                  height: 20, 
                  borderRadius: '50%', 
                  bgcolor: '#e0e0e0',
                  mr: 1
                }} 
              />
              <Typography variant="body2">12°C</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2">20.04.2025</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="primary" fontWeight="bold">ZALECANE</Typography>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                component="span" 
                sx={{ 
                  display: 'inline-block', 
                  width: 20, 
                  height: 20, 
                  borderRadius: '50%', 
                  bgcolor: '#ffeb3b',
                  mr: 1
                }} 
              />
              <Typography variant="body2">18°C</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  // Renderowanie widgetu konfiguratora
  const renderConfiguratorWidget = () => (
    <Card sx={{ mb: 3, overflow: 'visible' }}>
      <CardContent sx={{ bgcolor: '#3f51b5', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Konfigurator widgetów</Typography>
          <StyledSwitch active={true} />
        </Box>
      </CardContent>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Włączone widgety:
            </Typography>
            <Box sx={{ mb: 2 }}>
              {['Zastępstwa', 'Dyżury nauczycieli', 'Sugestie optymalizacji AI', 'Przypominacze i wydarzenia', 'Meteo-plan'].map((widget, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 0.5 
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '3px', 
                      bgcolor: '#4caf50',
                      mr: 1
                    }} 
                  />
                  <Typography variant="body2">{widget}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Dostępne widgety:
            </Typography>
            <Box>
              {['Dostępność sal', 'Export i synchronizacja', 'Statystyki obciążenia', 'Historia zmian planu', 'Dziennik zastępstw'].map((widget, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 0.5 
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '3px', 
                      bgcolor: '#e0e0e0',
                      mr: 1
                    }} 
                  />
                  <Typography variant="body2">{widget}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Zarządzaj widgetami
        </Button>
      </CardContent>
    </Card>
  );
  
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Inteligentny Plan Lekcji - Widgety i rozszerzenia
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Widgety i rozszerzenia funkcjonalne
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Dodatkowe narzędzia i funkcje dostępne dla użytkowników - możliwość włączania/wyłączania
      </Typography>
      
      <Box sx={{ 
        bgcolor: '#f5f5f5', 
        borderRadius: '30px', 
        p: 1, 
        display: 'flex', 
        justifyContent: 'center',
        mb: 3
      }}>
        <Button 
          variant={activeCategory === 'wszystkie' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleCategoryChange('wszystkie')}
          sx={{ borderRadius: '20px', mx: 0.5 }}
        >
          Wszystkie
        </Button>
        <Button 
          variant={activeCategory === 'nauczyciele' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleCategoryChange('nauczyciele')}
          sx={{ borderRadius: '20px', mx: 0.5 }}
        >
          Dla nauczycieli
        </Button>
        <Button 
          variant={activeCategory === 'uczniowie' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleCategoryChange('uczniowie')}
          sx={{ borderRadius: '20px', mx: 0.5 }}
        >
          Dla uczniów
        </Button>
        <Button 
          variant={activeCategory === 'admin' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleCategoryChange('admin')}
          sx={{ borderRadius: '20px', mx: 0.5 }}
        >
          Administracyjne
        </Button>
        <Button 
          variant={activeCategory === 'analiza' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleCategoryChange('analiza')}
          sx={{ borderRadius: '20px', mx: 0.5 }}
        >
          Analiza
        </Button>
        <Button 
          variant={activeCategory === 'powiadomienia' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleCategoryChange('powiadomienia')}
          sx={{ borderRadius: '20px', mx: 0.5 }}
        >
          Powiadomienia
        </Button>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          ml: 1,
          bgcolor: 'rgba(63, 81, 181, 0.08)',
          borderRadius: '20px',
          px: 2,
          py: 0.5
        }}>
          <SmartToyIcon color="primary" sx={{ mr: 0.5, fontSize: 18 }} />
          <Typography variant="body2" color="primary">
            Sugerowane
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          {renderSubstitutionWidget()}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {renderDutyWidget()}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {renderAISuggestionsWidget()}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {renderRemindersWidget()}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {renderMeteoPlanWidget()}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {renderConfiguratorWidget()}
        </Grid>
      </Grid>
      
      <Box sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
        <Typography variant="body2">
          Widgety i rozszerzenia można dowolnie włączać, wyłączać i konfigurować dla każdego użytkownika
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default WidgetConfigurator;
