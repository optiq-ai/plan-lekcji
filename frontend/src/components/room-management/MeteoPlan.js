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
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

// Stylizowany kontener
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

// Stylizowany Paper dla zawartości
const StyledContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(3),
}));

// Stylizowany Chip dla dni
const DayChip = styled(Chip)(({ theme, isactive, isrecommended }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: isactive === 'true' ? '#3f51b5' : isrecommended === 'true' ? '#e3f2fd' : '#f5f5f5',
  color: isactive === 'true' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
  fontWeight: isrecommended === 'true' ? 'bold' : 'normal',
  border: isrecommended === 'true' ? '1px dashed #3f51b5' : 'none',
  '&:hover': {
    backgroundColor: isactive === 'true' ? '#303f9f' : '#e0e0e0',
  },
}));

// Stylizowany Chip dla statusu
const StatusChip = styled(Chip)(({ theme, status }) => {
  let color = '#4caf50';
  let bgcolor = '#e8f5e9';
  
  if (status === 'niezalecane') {
    color = '#f44336';
    bgcolor = '#ffebee';
  } else if (status === 'ostrzezenie') {
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

// Komponent MeteoPlan
const MeteoPlan = () => {
  const [enableMeteo, setEnableMeteo] = useState(true);
  const [selectedDate, setSelectedDate] = useState('12.04.2025');
  
  // Dane pogodowe
  const weatherData = [
    { date: '12.04.2025', wfStatus: 'zalecane', temp: '22°C', icon: <WbSunnyIcon />, conditions: 'Słonecznie' },
    { date: '15.04.2025', wfStatus: 'niezalecane', temp: '12°C', icon: <CloudIcon />, conditions: 'Deszczowo' },
    { date: '20.04.2025', wfStatus: 'zalecane', temp: '19°C', icon: <WbSunnyIcon />, conditions: 'Słonecznie' },
  ];
  
  // Dane zajęć WF
  const wfClasses = [
    { 
      date: '12.04.2025', 
      classes: [
        { time: '8:00-8:45', class: '1A', teacher: 'mgr Kowalski', location: 'Boisko' },
        { time: '8:55-9:40', class: '2B', teacher: 'mgr Nowak', location: 'Sala gimnastyczna' },
        { time: '9:50-10:35', class: '3C', teacher: 'mgr Wiśniewski', location: 'Boisko' },
      ],
      recommendations: [
        { type: 'info', text: 'Idealne warunki na zajęcia na zewnątrz' },
        { type: 'info', text: 'Zalecane nawodnienie uczniów' },
      ]
    },
    { 
      date: '15.04.2025', 
      classes: [
        { time: '10:45-11:30', class: '1B', teacher: 'mgr Kowalski', location: 'Boisko' },
        { time: '11:40-12:25', class: '2A', teacher: 'mgr Nowak', location: 'Boisko' },
        { time: '12:35-13:20', class: '3B', teacher: 'mgr Wiśniewski', location: 'Boisko' },
      ],
      recommendations: [
        { type: 'warning', text: 'Prognozowane opady - zalecane przeniesienie zajęć do sali gimnastycznej' },
        { type: 'warning', text: 'Niska temperatura - uczniowie powinni mieć cieplejsze stroje' },
      ]
    },
    { 
      date: '20.04.2025', 
      classes: [
        { time: '8:00-8:45', class: '1C', teacher: 'mgr Kowalski', location: 'Boisko' },
        { time: '8:55-9:40', class: '2C', teacher: 'mgr Nowak', location: 'Boisko' },
        { time: '9:50-10:35', class: '3A', teacher: 'mgr Wiśniewski', location: 'Boisko' },
      ],
      recommendations: [
        { type: 'info', text: 'Dobre warunki na zajęcia na zewnątrz' },
        { type: 'info', text: 'Zalecane nawodnienie uczniów' },
      ]
    },
  ];
  
  // Znajdź dane pogodowe dla wybranej daty
  const selectedWeather = weatherData.find(w => w.date === selectedDate) || weatherData[0];
  
  // Znajdź dane zajęć dla wybranej daty
  const selectedClasses = wfClasses.find(c => c.date === selectedDate) || wfClasses[0];
  
  // Obsługa zmiany daty
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  // Obsługa włączania/wyłączania funkcji Meteo-Plan
  const handleMeteoToggle = () => {
    setEnableMeteo(!enableMeteo);
  };
  
  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Meteo-Plan (Lekcje i pogoda)
        </Typography>
        <FormControlLabel
          control={<Switch checked={enableMeteo} onChange={handleMeteoToggle} color="primary" />}
          label="Włącz rekomendacje pogodowe"
        />
      </Box>
      
      <StyledContentPaper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Wybierz datę
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
              {weatherData.map((weather) => (
                <DayChip
                  key={weather.date}
                  label={weather.date}
                  icon={weather.icon}
                  onClick={() => handleDateChange(weather.date)}
                  isactive={selectedDate === weather.date ? 'true' : 'false'}
                  isrecommended={weather.wfStatus === 'zalecane' ? 'true' : 'false'}
                />
              ))}
            </Box>
            
            <TextField
              label="Szukaj daty"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mt: 2 }}
            />
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Prognoza pogody
            </Typography>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedWeather.date}
                    </Typography>
                    <Typography variant="body1">
                      {selectedWeather.conditions}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Temperatura: {selectedWeather.temp}
                    </Typography>
                  </Box>
                  <Box sx={{ fontSize: '3rem' }}>
                    {selectedWeather.icon}
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <StatusChip
                    label={selectedWeather.wfStatus === 'zalecane' ? 'ZALECANE' : 'NIEZALECANE'}
                    status={selectedWeather.wfStatus}
                    icon={selectedWeather.wfStatus === 'zalecane' ? <EventAvailableIcon /> : <EventBusyIcon />}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Zajęcia WF w dniu {selectedDate}
            </Typography>
            <Box sx={{ mb: 3 }}>
              {selectedClasses.classes.map((cls, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Godzina
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {cls.time}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Klasa
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {cls.class}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Nauczyciel
                        </Typography>
                        <Typography variant="body1">
                          {cls.teacher}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Lokalizacja
                        </Typography>
                        <Typography variant="body1">
                          {cls.location}
                        </Typography>
                        {enableMeteo && selectedWeather.wfStatus === 'niezalecane' && cls.location === 'Boisko' && (
                          <Chip 
                            label="Zmień na salę" 
                            size="small" 
                            color="error" 
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
            
            {enableMeteo && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Rekomendacje AI
                </Typography>
                <Card sx={{ bgcolor: 'rgba(63, 81, 181, 0.05)' }}>
                  <CardContent>
                    {selectedClasses.recommendations.map((rec, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        {rec.type === 'warning' ? (
                          <WarningIcon color="warning" sx={{ mr: 1, mt: 0.5 }} />
                        ) : (
                          <InfoIcon color="info" sx={{ mr: 1, mt: 0.5 }} />
                        )}
                        <Typography variant="body1">
                          {rec.text}
                        </Typography>
                      </Box>
                    ))}
                    
                    {selectedWeather.wfStatus === 'niezalecane' && (
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary">
                          Przenieś wszystkie zajęcia do sali
                        </Button>
                        <Button variant="outlined">
                          Powiadom nauczycieli
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            )}
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Długoterminowa prognoza
              </Typography>
              <Grid container spacing={2}>
                {weatherData.map((weather) => (
                  <Grid item xs={4} key={weather.date}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1">
                          {weather.date}
                        </Typography>
                        <Box sx={{ fontSize: '2rem', my: 1 }}>
                          {weather.icon}
                        </Box>
                        <Typography variant="body2">
                          {weather.temp}
                        </Typography>
                        <StatusChip
                          label={weather.wfStatus === 'zalecane' ? 'ZALECANE' : 'NIEZALECANE'}
                          status={weather.wfStatus}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </StyledContentPaper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" startIcon={<InfoIcon />}>
          Ustawienia Meteo-Plan
        </Button>
        <Button variant="contained" color="primary">
          Zastosuj rekomendacje
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default MeteoPlan;
