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
  RadioGroup
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import TuneIcon from '@mui/icons-material/Tune';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoIcon from '@mui/icons-material/Info';

/**
 * Komponent konfiguratora widgetów
 * Umożliwia personalizację interfejsu poprzez włączanie/wyłączanie i konfigurację widgetów
 */
const WidgetConfigurator = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [availableWidgets, setAvailableWidgets] = useState([
    { id: 'substitutions', name: 'Zastępstwa', enabled: true, category: 'teachers', icon: 'calendar' },
    { id: 'teacher_duty', name: 'Dyżury nauczycieli', enabled: true, category: 'teachers', icon: 'person' },
    { id: 'ai_suggestions', name: 'Sugestie optymalizacji AI', enabled: true, category: 'ai', icon: 'lightbulb' },
    { id: 'reminders', name: 'Przypomnienia i wydarzenia', enabled: true, category: 'notifications', icon: 'alarm' },
    { id: 'meteo_plan', name: 'Meteo-plan', enabled: true, category: 'other', icon: 'weather' },
    { id: 'room_availability', name: 'Dostępność sal', enabled: false, category: 'rooms', icon: 'room' },
    { id: 'export_sync', name: 'Eksport i synchronizacja', enabled: false, category: 'other', icon: 'sync' },
    { id: 'statistics', name: 'Statystyki obciążenia', enabled: false, category: 'analytics', icon: 'chart' },
    { id: 'substitution_journal', name: 'Dziennik zastępstw', enabled: false, category: 'teachers', icon: 'book' },
    { id: 'change_history', name: 'Historia zmian planu', enabled: false, category: 'other', icon: 'history' }
  ]);
  
  const [widgetLayout, setWidgetLayout] = useState('standard');
  const [widgetAnimations, setWidgetAnimations] = useState(true);
  const [widgetNotifications, setWidgetNotifications] = useState(true);
  const [widgetRefreshRate, setWidgetRefreshRate] = useState(5);
  const [widgetDataDetail, setWidgetDataDetail] = useState(70);
  const [widgetPerformance, setWidgetPerformance] = useState(50);
  const [changesMade, setChangesMade] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Obsługa włączania/wyłączania widgetów
  const handleWidgetToggle = (widgetId) => {
    setAvailableWidgets(prevWidgets => 
      prevWidgets.map(widget => 
        widget.id === widgetId 
          ? { ...widget, enabled: !widget.enabled } 
          : widget
      )
    );
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany układu widgetów
  const handleLayoutChange = (event) => {
    setWidgetLayout(event.target.value);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany animacji widgetów
  const handleAnimationsChange = (event) => {
    setWidgetAnimations(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany powiadomień widgetów
  const handleNotificationsChange = (event) => {
    setWidgetNotifications(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany częstotliwości odświeżania
  const handleRefreshRateChange = (event, newValue) => {
    setWidgetRefreshRate(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany poziomu szczegółowości danych
  const handleDataDetailChange = (event, newValue) => {
    setWidgetDataDetail(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany priorytetu wydajności
  const handlePerformanceChange = (event, newValue) => {
    setWidgetPerformance(newValue);
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
    setWidgetLayout('standard');
    setWidgetAnimations(true);
    setWidgetNotifications(true);
    setWidgetRefreshRate(5);
    setWidgetDataDetail(70);
    setWidgetPerformance(50);
    setAvailableWidgets(prevWidgets => 
      prevWidgets.map(widget => ({
        ...widget,
        enabled: ['substitutions', 'teacher_duty', 'ai_suggestions', 'reminders', 'meteo_plan'].includes(widget.id)
      }))
    );
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Symulacja sugerowania optymalnego układu przez AI
  const handleAISuggest = () => {
    // Symulacja opóźnienia analizy AI
    setTimeout(() => {
      setWidgetLayout('compact');
      setWidgetAnimations(true);
      setWidgetNotifications(true);
      setWidgetRefreshRate(10);
      setWidgetDataDetail(50);
      setWidgetPerformance(70);
      setAvailableWidgets(prevWidgets => 
        prevWidgets.map(widget => ({
          ...widget,
          enabled: ['substitutions', 'teacher_duty', 'ai_suggestions', 'room_availability', 'statistics'].includes(widget.id)
        }))
      );
      setChangesMade(true);
      setSaveSuccess(false);
    }, 1500);
  };

  // Filtrowanie widgetów według kategorii
  const getFilteredWidgets = () => {
    if (tabValue === 0) {
      return availableWidgets;
    }
    
    const categories = ['teachers', 'rooms', 'ai', 'analytics', 'notifications', 'other'];
    const selectedCategory = categories[tabValue - 1];
    
    return availableWidgets.filter(widget => widget.category === selectedCategory);
  };

  // Renderowanie ikony widgetu
  const renderWidgetIcon = (iconName) => {
    switch (iconName) {
      case 'calendar':
        return <i className="fas fa-calendar-alt" />;
      case 'person':
        return <i className="fas fa-user" />;
      case 'lightbulb':
        return <i className="fas fa-lightbulb" />;
      case 'alarm':
        return <i className="fas fa-bell" />;
      case 'weather':
        return <i className="fas fa-cloud-sun" />;
      case 'room':
        return <i className="fas fa-door-open" />;
      case 'sync':
        return <i className="fas fa-sync" />;
      case 'chart':
        return <i className="fas fa-chart-bar" />;
      case 'book':
        return <i className="fas fa-book" />;
      case 'history':
        return <i className="fas fa-history" />;
      default:
        return <i className="fas fa-puzzle-piece" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ViewModuleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Konfigurator widgetów</Typography>
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
            <SettingsIcon />
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
          <Tab label="Wszystkie" />
          <Tab label="Dla nauczycieli" />
          <Tab label="Sale lekcyjne" />
          <Tab label="AI" />
          <Tab label="Analiza" />
          <Tab label="Powiadomienia" />
          <Tab label="Inne" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Włączone widgety:
              </Typography>
              
              <Grid container spacing={2}>
                {getFilteredWidgets().map((widget) => (
                  <Grid item xs={12} sm={6} md={4} key={widget.id}>
                    <Paper
                      elevation={widget.enabled ? 3 : 1}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: widget.enabled ? `${theme.palette.primary.main}11` : theme.palette.background.default,
                        border: 1,
                        borderColor: widget.enabled ? theme.palette.primary.main : theme.palette.divider,
                        transition: 'all 0.3s ease',
                        opacity: widget.enabled ? 1 : 0.6,
                        '&:hover': {
                          opacity: 1,
                          boxShadow: widget.enabled ? 6 : 2
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box 
                            sx={{ 
                              width: 36, 
                              height: 36, 
                              borderRadius: '50%', 
                              bgcolor: widget.enabled ? theme.palette.primary.main : theme.palette.grey[300],
                              color: widget.enabled ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 1.5
                            }}
                          >
                            {renderWidgetIcon(widget.icon)}
                          </Box>
                          <Typography variant="subtitle1">
                            {widget.name}
                          </Typography>
                        </Box>
                        <Switch
                          checked={widget.enabled}
                          onChange={() => handleWidgetToggle(widget.id)}
                          color="primary"
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              
              {getFilteredWidgets().length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    Brak widgetów w tej kategorii
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Układ elementów
              </Typography>
              
              <RadioGroup
                value={widgetLayout}
                onChange={handleLayoutChange}
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
              
              <Box sx={{ mt: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={widgetAnimations} 
                        onChange={handleAnimationsChange}
                        color="primary"
                      />
                    }
                    label="Animacje interfejsu"
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={widgetNotifications} 
                        onChange={handleNotificationsChange}
                        color="primary"
                      />
                    }
                    label="Powiadomienia na stronie"
                  />
                </FormGroup>
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
                  <Typography variant="body2">Poziom szczegółowości</Typography>
                  <Tooltip title="Określa ilość szczegółowych danych wyświetlanych w widgetach">
                    <InfoIcon fontSize="small" color="action" />
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" color="textSecondary">Podstawowy</Typography>
                  <Slider
                    value={widgetDataDetail}
                    onChange={handleDataDetailChange}
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" color="textSecondary">Pełny</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">Szybkość ładowania vs funkcjonalność</Typography>
                  <Tooltip title="Balans między szybkością działania a dostępnymi funkcjami">
                    <InfoIcon fontSize="small" color="action" />
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" color="textSecondary">Szybkość</Typography>
                  <Slider
                    value={widgetPerformance}
                    onChange={handlePerformanceChange}
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" color="textSecondary">Funkcjonalność</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">Częstotliwość odświeżania (sekundy)</Typography>
                  <Tooltip title="Jak często widgety pobierają nowe dane">
                    <InfoIcon fontSize="small" color="action" />
                  </Tooltip>
                </Box>
                <Slider
                  value={widgetRefreshRate}
                  onChange={handleRefreshRateChange}
                  step={5}
                  marks
                  min={5}
                  max={60}
                  valueLabelDisplay="auto"
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<RestartAltIcon />}
                  onClick={handleResetSettings}
                >
                  Przywróć domyślne
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
              
              {saveSuccess && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', color: theme.palette.success.main }}>
                  <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Ustawienia zostały zapisane pomyślnie
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="textSecondary">
          Widgety i rozszerzenia można dowolnie włączać, wyłączać i konfigurować dla każdego użytkownika
        </Typography>
      </Box>
    </Box>
  );
};

export default WidgetConfigurator;
