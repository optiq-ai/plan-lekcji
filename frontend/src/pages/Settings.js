import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Tabs,
  Tab
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Notifications,
  Language,
  Security,
  ColorLens,
  Accessibility,
  RocketLaunch,
  Settings as SettingsIcon,
  Save,
  Speed as SpeedIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PerformanceModeSelector from '../components/personalization/PerformanceModeSelector';

const Settings = () => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('pl');
  const [fontSize, setFontSize] = useState(14);
  const [colorScheme, setColorScheme] = useState('blue');
  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(5);
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSaveSettings = () => {
    // Tutaj byłaby logika zapisywania ustawień
    console.log('Zapisano ustawienia');
  };

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0, 100, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 200, 255, 0.05) 0%, transparent 50%)',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        color: theme.palette.primary.main,
        mb: 4,
        fontWeight: 'bold',
        textShadow: '0px 0px 8px rgba(0, 150, 255, 0.3)'
      }}>
        <RocketLaunch sx={{ mr: 1 }} /> Ustawienia systemu
      </Typography>
      
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Interfejs" icon={<Brightness4 />} iconPosition="start" />
          <Tab label="Powiadomienia" icon={<Notifications />} iconPosition="start" />
          <Tab label="Język i region" icon={<Language />} iconPosition="start" />
          <Tab label="Wydajność" icon={<SpeedIcon />} iconPosition="start" />
        </Tabs>
      </Paper>
      
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3} 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.1)}`
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                }}>
                  <Brightness4 sx={{ mr: 1 }} /> Wygląd interfejsu
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Tryb ciemny"
                  sx={{ mb: 2, width: '100%' }}
                />
                
                <Box sx={{ mb: 3 }}>
                  <Typography gutterBottom>Rozmiar czcionki: {fontSize}px</Typography>
                  <Slider
                    value={fontSize}
                    onChange={(e, newValue) => setFontSize(newValue)}
                    min={10}
                    max={20}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Box>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="color-scheme-label">Schemat kolorów</InputLabel>
                  <Select
                    labelId="color-scheme-label"
                    value={colorScheme}
                    label="Schemat kolorów"
                    onChange={(e) => setColorScheme(e.target.value)}
                  >
                    <MenuItem value="blue">Niebieski (domyślny)</MenuItem>
                    <MenuItem value="purple">Fioletowy</MenuItem>
                    <MenuItem value="green">Zielony</MenuItem>
                    <MenuItem value="orange">Pomarańczowy</MenuItem>
                    <MenuItem value="space">Kosmiczny</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3} 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.1)}`
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                }}>
                  <SettingsIcon sx={{ mr: 1 }} /> Automatyczne zapisywanie
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Włącz automatyczne zapisywanie"
                  sx={{ mb: 2, width: '100%' }}
                />
                
                <Box sx={{ mb: 2 }}>
                  <Typography gutterBottom>Interwał zapisywania: {autoSaveInterval} minut</Typography>
                  <Slider
                    value={autoSaveInterval}
                    onChange={(e, newValue) => setAutoSaveInterval(newValue)}
                    min={1}
                    max={30}
                    step={1}
                    marks={[
                      { value: 1, label: '1m' },
                      { value: 5, label: '5m' },
                      { value: 15, label: '15m' },
                      { value: 30, label: '30m' },
                    ]}
                    valueLabelDisplay="auto"
                    disabled={!autoSave}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3} 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.1)}`
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                }}>
                  <Notifications sx={{ mr: 1 }} /> Powiadomienia
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Włącz powiadomienia"
                  sx={{ mb: 2, width: '100%' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={true}
                      color="primary"
                      disabled={!notificationsEnabled}
                    />
                  }
                  label="Powiadomienia o zmianach w planie lekcji"
                  sx={{ mb: 1, width: '100%' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={true}
                      color="primary"
                      disabled={!notificationsEnabled}
                    />
                  }
                  label="Powiadomienia o zastępstwach"
                  sx={{ mb: 1, width: '100%' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={false}
                      color="primary"
                      disabled={!notificationsEnabled}
                    />
                  }
                  label="Powiadomienia o aktualizacjach systemu"
                  sx={{ mb: 1, width: '100%' }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3} 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.1)}`
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                }}>
                  <Language sx={{ mr: 1 }} /> Język i region
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="language-label">Język aplikacji</InputLabel>
                  <Select
                    labelId="language-label"
                    value={language}
                    label="Język aplikacji"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <MenuItem value="pl">Polski</MenuItem>
                    <MenuItem value="en">Angielski</MenuItem>
                    <MenuItem value="de">Niemiecki</MenuItem>
                    <MenuItem value="fr">Francuski</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="timezone-label">Strefa czasowa</InputLabel>
                  <Select
                    labelId="timezone-label"
                    value="Europe/Warsaw"
                    label="Strefa czasowa"
                  >
                    <MenuItem value="Europe/Warsaw">Europa/Warszawa (GMT+2)</MenuItem>
                    <MenuItem value="Europe/London">Europa/Londyn (GMT+1)</MenuItem>
                    <MenuItem value="America/New_York">Ameryka/Nowy Jork (GMT-4)</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 3 && (
        <PerformanceModeSelector />
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<Save />}
          onClick={handleSaveSettings}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: `0 4px 20px 0 ${alpha(theme.palette.primary.main, 0.5)}`,
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              boxShadow: `0 6px 25px 0 ${alpha(theme.palette.primary.main, 0.6)}`,
            }
          }}
        >
          Zapisz ustawienia
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
