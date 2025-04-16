import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Tabs,
  Tab,
  Slider,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Radio,
  RadioGroup,
  TextField,
  InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PaletteIcon from '@mui/icons-material/Palette';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import StyleIcon from '@mui/icons-material/Style';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoIcon from '@mui/icons-material/Info';

/**
 * Komponent personalizacji interfejsu
 * Umożliwia dostosowanie wyglądu i funkcji aplikacji do potrzeb użytkownika
 */
const InterfacePersonalization = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [themeMode, setThemeMode] = useState('dark');
  const [primaryColor, setPrimaryColor] = useState('#4355b9');
  const [secondaryColor, setSecondaryColor] = useState('#7986cb');
  const [accentColor, setAccentColor] = useState('#ff4081');
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [fontSize, setFontSize] = useState(14);
  const [borderRadius, setBorderRadius] = useState(8);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [colorfulVisualizations, setColorfulVisualizations] = useState(true);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [efficiencyCharts, setEfficiencyCharts] = useState(true);
  const [interactiveRoomMaps, setInteractiveRoomMaps] = useState(true);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState(true);
  const [detailedLessonInfo, setDetailedLessonInfo] = useState(true);
  const [pageNotifications, setPageNotifications] = useState(true);
  const [starredShortcuts, setStarredShortcuts] = useState(true);
  const [dataDetailLevel, setDataDetailLevel] = useState(70);
  const [loadingSpeed, setLoadingSpeed] = useState(50);
  const [layoutType, setLayoutType] = useState('standard');
  const [changesMade, setChangesMade] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Obsługa zmiany trybu motywu
  const handleThemeModeChange = (event) => {
    setThemeMode(event.target.value);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany koloru podstawowego
  const handlePrimaryColorChange = (event) => {
    setPrimaryColor(event.target.value);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany koloru drugorzędnego
  const handleSecondaryColorChange = (event) => {
    setSecondaryColor(event.target.value);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany koloru akcentu
  const handleAccentColorChange = (event) => {
    setAccentColor(event.target.value);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany czcionki
  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany rozmiaru czcionki
  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany promienia zaokrąglenia
  const handleBorderRadiusChange = (event, newValue) => {
    setBorderRadius(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany włączenia animacji
  const handleAnimationsEnabledChange = (event) => {
    setAnimationsEnabled(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany kolorowych wizualizacji
  const handleColorfulVisualizationsChange = (event) => {
    setColorfulVisualizations(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany włączenia asystenta AI
  const handleAiAssistantEnabledChange = (event) => {
    setAiAssistantEnabled(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany wykresów efektywności
  const handleEfficiencyChartsChange = (event) => {
    setEfficiencyCharts(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany interaktywnych map sal
  const handleInteractiveRoomMapsChange = (event) => {
    setInteractiveRoomMaps(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany sugestii optymalizacji
  const handleOptimizationSuggestionsChange = (event) => {
    setOptimizationSuggestions(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany szczegółowych informacji o lekcjach
  const handleDetailedLessonInfoChange = (event) => {
    setDetailedLessonInfo(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany powiadomień na stronie
  const handlePageNotificationsChange = (event) => {
    setPageNotifications(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany skrótów gwiazdkowych
  const handleStarredShortcutsChange = (event) => {
    setStarredShortcuts(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany poziomu szczegółowości danych
  const handleDataDetailLevelChange = (event, newValue) => {
    setDataDetailLevel(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany szybkości ładowania
  const handleLoadingSpeedChange = (event, newValue) => {
    setLoadingSpeed(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany typu układu
  const handleLayoutTypeChange = (event) => {
    setLayoutType(event.target.value);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Symulacja zapisywania ustawień
  const handleSaveSettings = () => {
    // Symulacja opóźnienia zapisu
    setTimeout(() => {
      setChangesMade(false);
      setSaveSuccess(true);
      
      // Ukrycie komunikatu o sukcesie po 3 sekundach
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Symulacja resetowania ustawień
  const handleResetSettings = () => {
    setThemeMode('dark');
    setPrimaryColor('#4355b9');
    setSecondaryColor('#7986cb');
    setAccentColor('#ff4081');
    setFontFamily('Roboto');
    setFontSize(14);
    setBorderRadius(8);
    setAnimationsEnabled(true);
    setColorfulVisualizations(true);
    setAiAssistantEnabled(true);
    setEfficiencyCharts(true);
    setInteractiveRoomMaps(true);
    setOptimizationSuggestions(true);
    setDetailedLessonInfo(true);
    setPageNotifications(true);
    setStarredShortcuts(true);
    setDataDetailLevel(70);
    setLoadingSpeed(50);
    setLayoutType('standard');
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Symulacja sugerowania optymalnego układu przez AI
  const handleAISuggest = () => {
    // Symulacja opóźnienia analizy AI
    setTimeout(() => {
      setThemeMode('dark');
      setPrimaryColor('#3f51b5');
      setSecondaryColor('#5c6bc0');
      setAccentColor('#ff4081');
      setFontFamily('Roboto');
      setFontSize(14);
      setBorderRadius(12);
      setAnimationsEnabled(true);
      setColorfulVisualizations(true);
      setAiAssistantEnabled(true);
      setEfficiencyCharts(true);
      setInteractiveRoomMaps(true);
      setOptimizationSuggestions(true);
      setDetailedLessonInfo(true);
      setPageNotifications(true);
      setStarredShortcuts(true);
      setDataDetailLevel(60);
      setLoadingSpeed(70);
      setLayoutType('compact');
      setChangesMade(true);
      setSaveSuccess(false);
    }, 1500);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PaletteIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Personalizacja interfejsu</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
            onClick={handleAISuggest}
            sx={{ mr: 1 }}
          >
            Zaproponuj optymalny układ
          </Button>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Elementy interfejsu" />
          <Tab label="Style i kolory" />
          <Tab label="Powiadomienia" />
          <Tab label="Widoczność danych" />
          <Tab label="Profile ustawień" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Elementy widoku planu lekcji
                </Typography>
                
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={aiAssistantEnabled} 
                        onChange={handleAiAssistantEnabledChange}
                        color="primary"
                      />
                    }
                    label="Asystent AI"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={efficiencyCharts} 
                        onChange={handleEfficiencyChartsChange}
                        color="primary"
                      />
                    }
                    label="Wykresy efektywności"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={interactiveRoomMaps} 
                        onChange={handleInteractiveRoomMapsChange}
                        color="primary"
                      />
                    }
                    label="Interaktywne mapy sal"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={optimizationSuggestions} 
                        onChange={handleOptimizationSuggestionsChange}
                        color="primary"
                      />
                    }
                    label="Sugestie i optymalizacje"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={detailedLessonInfo} 
                        onChange={handleDetailedLessonInfoChange}
                        color="primary"
                      />
                    }
                    label="Szczegółowe dane o zajęciach"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={pageNotifications} 
                        onChange={handlePageNotificationsChange}
                        color="primary"
                      />
                    }
                    label="Powiadomienia na stronie"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={starredShortcuts} 
                        onChange={handleStarredShortcutsChange}
                        color="primary"
                      />
                    }
                    label="Skróty gwiazdkowe"
                  />
                </FormGroup>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Układ elementów
                </Typography>
                
                <RadioGroup
                  value={layoutType}
                  onChange={handleLayoutTypeChange}
                >
                  <FormControlLabel 
                    value="standard" 
                    control={<Radio color="primary" />} 
                    label="Standardowy" 
                  />
                  <FormControlLabel 
                    value="compact" 
                    control={<Radio color="primary" />} 
                    label="Kompaktowy" 
                  />
                  <FormControlLabel 
                    value="expanded" 
                    control={<Radio color="primary" />} 
                    label="Poszerzony" 
                  />
                  <FormControlLabel 
                    value="two-column" 
                    control={<Radio color="primary" />} 
                    label="Dwukolumnowy" 
                  />
                  <FormControlLabel 
                    value="tables" 
                    control={<Radio color="primary" />} 
                    label="Tabelaryczny" 
                  />
                  <FormControlLabel 
                    value="mobile" 
                    control={<Radio color="primary" />} 
                    label="Mobilny" 
                  />
                </RadioGroup>
                
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveSettings}
                    disabled={!changesMade}
                    fullWidth
                  >
                    Zastosuj układ
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Podgląd wybranych ustawień
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        height: 150, 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#f5f5f5'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Box sx={{ width: 30, height: 20, bgcolor: '#c8e6c9' }}></Box>
                        <Box sx={{ width: 30, height: 20, bgcolor: '#f8bbd0' }}></Box>
                        <Box sx={{ width: 30, height: 20, bgcolor: '#bbdefb' }}></Box>
                      </Box>
                      <Box sx={{ width: '100%', height: 60, bgcolor: '#e0e0e0' }}></Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        height: 150, 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#f5f5f5'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
                        <Box sx={{ width: '70%', height: 20, bgcolor: '#4caf50' }}></Box>
                        <Box sx={{ width: '40%', height: 20, bgcolor: '#f44336' }}></Box>
                        <Box sx={{ width: '90%', height: 20, bgcolor: '#2196f3' }}></Box>
                        <Box sx={{ width: '60%', height: 20, bgcolor: '#ff9800' }}></Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        height: 150, 
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#f5f5f5'
                      }}
                    >
                      <Box sx={{ width: '50%', height: '50%', display: 'flex', flexWrap: 'wrap' }}>
                        <Box sx={{ width: '50%', height: '50%', bgcolor: '#bbdefb' }}></Box>
                        <Box sx={{ width: '50%', height: '50%', bgcolor: '#f8bbd0' }}></Box>
                        <Box sx={{ width: '50%', height: '50%', bgcolor: '#c8e6c9' }}></Box>
                        <Box sx={{ width: '50%', height: '50%', bgcolor: '#ffe0b2' }}></Box>
                      </Box>
                      <Box sx={{ width: '30%', height: '80%', ml: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ width: '100%', height: '30%', bgcolor: '#3f51b5', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: '#fff' }}>AI</Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: '60%', bgcolor: '#e0e0e0', borderRadius: 1 }}></Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Motyw i kolory
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Tryb motywu
                  </Typography>
                  <RadioGroup
                    value={themeMode}
                    onChange={handleThemeModeChange}
                    row
                  >
                    <FormControlLabel 
                      value="light" 
                      control={<Radio color="primary" />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LightModeIcon sx={{ mr: 0.5 }} />
                          Jasny
                        </Box>
                      }
                    />
                    <FormControlLabel 
                      value="dark" 
                      control={<Radio color="primary" />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DarkModeIcon sx={{ mr: 0.5 }} />
                          Ciemny
                        </Box>
                      }
                    />
                    <FormControlLabel 
                      value="auto" 
                      control={<Radio color="primary" />} 
                      label="Automatyczny"
                    />
                  </RadioGroup>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Kolory
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Kolor podstawowy"
                      value={primaryColor}
                      onChange={handlePrimaryColorChange}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                bgcolor: primaryColor,
                                borderRadius: '50%',
                                border: '1px solid #ccc'
                              }} 
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Kolor drugorzędny"
                      value={secondaryColor}
                      onChange={handleSecondaryColorChange}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                bgcolor: secondaryColor,
                                borderRadius: '50%',
                                border: '1px solid #ccc'
                              }} 
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Kolor akcentu"
                      value={accentColor}
                      onChange={handleAccentColorChange}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                bgcolor: accentColor,
                                borderRadius: '50%',
                                border: '1px solid #ccc'
                              }} 
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Wizualizacje
                  </Typography>
                  
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={animationsEnabled} 
                          onChange={handleAnimationsEnabledChange}
                          color="primary"
                        />
                      }
                      label="Animacje interfejsu"
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={colorfulVisualizations} 
                          onChange={handleColorfulVisualizationsChange}
                          color="primary"
                        />
                      }
                      label="Wizualizacje kolorowe"
                    />
                  </FormGroup>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Typografia i kształty
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Czcionka
                  </Typography>
                  
                  <RadioGroup
                    value={fontFamily}
                    onChange={handleFontFamilyChange}
                  >
                    <FormControlLabel 
                      value="Roboto" 
                      control={<Radio color="primary" />} 
                      label="Roboto (domyślna)"
                    />
                    <FormControlLabel 
                      value="Open Sans" 
                      control={<Radio color="primary" />} 
                      label="Open Sans"
                    />
                    <FormControlLabel 
                      value="Montserrat" 
                      control={<Radio color="primary" />} 
                      label="Montserrat"
                    />
                    <FormControlLabel 
                      value="Lato" 
                      control={<Radio color="primary" />} 
                      label="Lato"
                    />
                    <FormControlLabel 
                      value="Poppins" 
                      control={<Radio color="primary" />} 
                      label="Poppins"
                    />
                  </RadioGroup>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">
                      Rozmiar czcionki
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {fontSize}px
                    </Typography>
                  </Box>
                  <Slider
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    step={1}
                    marks
                    min={12}
                    max={18}
                    valueLabelDisplay="auto"
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">
                      Zaokrąglenie rogów
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {borderRadius}px
                    </Typography>
                  </Box>
                  <Slider
                    value={borderRadius}
                    onChange={handleBorderRadiusChange}
                    step={2}
                    marks
                    min={0}
                    max={16}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Wydajność aplikacji
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">
                      Poziom szczegółowości
                    </Typography>
                    <Tooltip title="Określa ilość szczegółowych danych wyświetlanych w interfejsie">
                      <InfoIcon fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="textSecondary">Podstawowy</Typography>
                    <Slider
                      value={dataDetailLevel}
                      onChange={handleDataDetailLevelChange}
                      sx={{ mx: 2 }}
                    />
                    <Typography variant="caption" color="textSecondary">Pełny</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">
                      Szybkość ładowania vs funkcjonalność
                    </Typography>
                    <Tooltip title="Balans między szybkością działania a dostępnymi funkcjami">
                      <InfoIcon fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="textSecondary">Szybkość</Typography>
                    <Slider
                      value={loadingSpeed}
                      onChange={handleLoadingSpeedChange}
                      sx={{ mx: 2 }}
                    />
                    <Typography variant="caption" color="textSecondary">Funkcjonalność</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Typography variant="h6" sx={{ p: 3 }}>
          Zawartość zakładki Powiadomienia
        </Typography>
      )}

      {tabValue === 3 && (
        <Typography variant="h6" sx={{ p: 3 }}>
          Zawartość zakładki Widoczność danych
        </Typography>
      )}

      {tabValue === 4 && (
        <Typography variant="h6" sx={{ p: 3 }}>
          Zawartość zakładki Profile ustawień
        </Typography>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RestartAltIcon />}
          onClick={handleResetSettings}
        >
          Przywróć domyślne
        </Button>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
          >
            Anuluj zmiany
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
            disabled={!changesMade}
          >
            Zapisz ustawienia
          </Button>
        </Box>
      </Box>
      
      {saveSuccess && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', color: theme.palette.success.main }}>
          <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">
            Ustawienia zostały zapisane pomyślnie
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InterfacePersonalization;
