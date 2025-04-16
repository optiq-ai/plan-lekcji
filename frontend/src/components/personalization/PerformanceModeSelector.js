import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Slider,
  Divider,
  IconButton,
  Tooltip,
  Radio,
  RadioGroup,
  Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SpeedIcon from '@mui/icons-material/Speed';
import TuneIcon from '@mui/icons-material/Tune';
import MemoryIcon from '@mui/icons-material/Memory';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent wyboru trybu wydajnościowego
 * Umożliwia przełączanie między różnymi trybami wydajności aplikacji
 */
const PerformanceModeSelector = () => {
  const theme = useTheme();
  const { 
    performanceMode, 
    dataDetailLevel, 
    performancePriority, 
    animationsEnabled, 
    refreshRate, 
    backgroundLoading, 
    advancedVisualizations, 
    advancedAIFeatures,
    changePerformanceMode,
    updateCustomSettings
  } = usePerformance();
  
  const [localDataDetailLevel, setLocalDataDetailLevel] = useState(dataDetailLevel);
  const [localPerformancePriority, setLocalPerformancePriority] = useState(performancePriority);
  const [localAnimationsEnabled, setLocalAnimationsEnabled] = useState(animationsEnabled);
  const [localRefreshRate, setLocalRefreshRate] = useState(refreshRate);
  const [localBackgroundLoading, setLocalBackgroundLoading] = useState(backgroundLoading);
  const [localAdvancedVisualizations, setLocalAdvancedVisualizations] = useState(advancedVisualizations);
  const [localAdvancedAIFeatures, setLocalAdvancedAIFeatures] = useState(advancedAIFeatures);
  
  const [changesMade, setChangesMade] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Synchronizacja lokalnych stanów z kontekstem
  useEffect(() => {
    setLocalDataDetailLevel(dataDetailLevel);
    setLocalPerformancePriority(performancePriority);
    setLocalAnimationsEnabled(animationsEnabled);
    setLocalRefreshRate(refreshRate);
    setLocalBackgroundLoading(backgroundLoading);
    setLocalAdvancedVisualizations(advancedVisualizations);
    setLocalAdvancedAIFeatures(advancedAIFeatures);
    setChangesMade(false);
  }, [
    performanceMode,
    dataDetailLevel,
    performancePriority,
    animationsEnabled,
    refreshRate,
    backgroundLoading,
    advancedVisualizations,
    advancedAIFeatures
  ]);

  // Obsługa zmiany trybu wydajnościowego
  const handlePerformanceModeChange = (event) => {
    changePerformanceMode(event.target.value);
  };

  // Obsługa zmiany poziomu szczegółowości danych
  const handleDataDetailLevelChange = (event, newValue) => {
    setLocalDataDetailLevel(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany priorytetu wydajności
  const handlePerformancePriorityChange = (event, newValue) => {
    setLocalPerformancePriority(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany włączenia animacji
  const handleAnimationsEnabledChange = (event) => {
    setLocalAnimationsEnabled(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany częstotliwości odświeżania
  const handleRefreshRateChange = (event, newValue) => {
    setLocalRefreshRate(newValue);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany ładowania w tle
  const handleBackgroundLoadingChange = (event) => {
    setLocalBackgroundLoading(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany zaawansowanych wizualizacji
  const handleAdvancedVisualizationsChange = (event) => {
    setLocalAdvancedVisualizations(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Obsługa zmiany zaawansowanych funkcji AI
  const handleAdvancedAIFeaturesChange = (event) => {
    setLocalAdvancedAIFeatures(event.target.checked);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Zapisywanie niestandardowych ustawień
  const handleSaveCustomSettings = () => {
    updateCustomSettings({
      dataDetailLevel: localDataDetailLevel,
      performancePriority: localPerformancePriority,
      animationsEnabled: localAnimationsEnabled,
      refreshRate: localRefreshRate,
      backgroundLoading: localBackgroundLoading,
      advancedVisualizations: localAdvancedVisualizations,
      advancedAIFeatures: localAdvancedAIFeatures
    });
    
    setChangesMade(false);
    setSaveSuccess(true);
    
    // Ukrycie komunikatu o sukcesie po 3 sekundach
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Resetowanie niestandardowych ustawień
  const handleResetCustomSettings = () => {
    setLocalDataDetailLevel(70);
    setLocalPerformancePriority(50);
    setLocalAnimationsEnabled(true);
    setLocalRefreshRate(5);
    setLocalBackgroundLoading(true);
    setLocalAdvancedVisualizations(true);
    setLocalAdvancedAIFeatures(true);
    setChangesMade(true);
    setSaveSuccess(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SpeedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Tryb wydajnościowy</Typography>
        </Box>
        <Box>
          <Tooltip title="Informacje o trybach wydajności">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Wybierz tryb wydajności
        </Typography>
        
        <RadioGroup
          value={performanceMode}
          onChange={handlePerformanceModeChange}
          sx={{ mb: 2 }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Paper 
              elevation={performanceMode === 'high-performance' ? 3 : 1}
              sx={{ 
                p: 2, 
                flex: '1 1 300px',
                borderRadius: 2,
                cursor: 'pointer',
                border: 1,
                borderColor: performanceMode === 'high-performance' ? theme.palette.primary.main : theme.palette.divider,
                bgcolor: performanceMode === 'high-performance' ? `${theme.palette.primary.main}11` : theme.palette.background.default,
              }}
              onClick={() => changePerformanceMode('high-performance')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FlashOnIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                <Typography variant="subtitle1" fontWeight="bold">Wysoka wydajność</Typography>
                <Radio 
                  checked={performanceMode === 'high-performance'} 
                  value="high-performance"
                  sx={{ ml: 'auto' }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Maksymalna szybkość działania kosztem funkcjonalności. Idealne dla starszych urządzeń.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip size="small" label="Szybkie ładowanie" color="success" />
                <Chip size="small" label="Mniej animacji" />
                <Chip size="small" label="Podstawowe funkcje" />
              </Box>
            </Paper>
            
            <Paper 
              elevation={performanceMode === 'balanced' ? 3 : 1}
              sx={{ 
                p: 2, 
                flex: '1 1 300px',
                borderRadius: 2,
                cursor: 'pointer',
                border: 1,
                borderColor: performanceMode === 'balanced' ? theme.palette.primary.main : theme.palette.divider,
                bgcolor: performanceMode === 'balanced' ? `${theme.palette.primary.main}11` : theme.palette.background.default,
              }}
              onClick={() => changePerformanceMode('balanced')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TuneIcon sx={{ mr: 1, color: theme.palette.info.main }} />
                <Typography variant="subtitle1" fontWeight="bold">Zrównoważony</Typography>
                <Radio 
                  checked={performanceMode === 'balanced'} 
                  value="balanced"
                  sx={{ ml: 'auto' }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Optymalny balans między wydajnością a funkcjonalnością. Zalecany dla większości użytkowników.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip size="small" label="Dobra wydajność" color="primary" />
                <Chip size="small" label="Pełne funkcje" color="primary" />
                <Chip size="small" label="Animacje" color="primary" />
              </Box>
            </Paper>
            
            <Paper 
              elevation={performanceMode === 'feature-rich' ? 3 : 1}
              sx={{ 
                p: 2, 
                flex: '1 1 300px',
                borderRadius: 2,
                cursor: 'pointer',
                border: 1,
                borderColor: performanceMode === 'feature-rich' ? theme.palette.primary.main : theme.palette.divider,
                bgcolor: performanceMode === 'feature-rich' ? `${theme.palette.primary.main}11` : theme.palette.background.default,
              }}
              onClick={() => changePerformanceMode('feature-rich')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AutoAwesomeIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                <Typography variant="subtitle1" fontWeight="bold">Bogaty w funkcje</Typography>
                <Radio 
                  checked={performanceMode === 'feature-rich'} 
                  value="feature-rich"
                  sx={{ ml: 'auto' }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Maksymalna funkcjonalność i szczegółowość danych. Dla nowoczesnych urządzeń.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip size="small" label="Zaawansowane funkcje" color="secondary" />
                <Chip size="small" label="Pełne animacje" color="secondary" />
                <Chip size="small" label="Szczegółowe dane" color="secondary" />
              </Box>
            </Paper>
          </Box>
        </RadioGroup>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MemoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h6">Ustawienia niestandardowe</Typography>
          <Radio 
            checked={performanceMode === 'custom'} 
            value="custom"
            onChange={handlePerformanceModeChange}
            sx={{ ml: 1 }}
          />
        </Box>
        
        <Box sx={{ opacity: performanceMode === 'custom' ? 1 : 0.7, pointerEvents: performanceMode === 'custom' ? 'auto' : 'none' }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">Poziom szczegółowości danych</Typography>
              <Typography variant="body2" color="textSecondary">{localDataDetailLevel}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" color="textSecondary">Podstawowy</Typography>
              <Slider
                value={localDataDetailLevel}
                onChange={handleDataDetailLevelChange}
                sx={{ mx: 2 }}
              />
              <Typography variant="caption" color="textSecondary">Szczegółowy</Typography>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">Priorytet: Wydajność vs Funkcjonalność</Typography>
              <Typography variant="body2" color="textSecondary">{localPerformancePriority}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" color="textSecondary">Wydajność</Typography>
              <Slider
                value={localPerformancePriority}
                onChange={handlePerformancePriorityChange}
                sx={{ mx: 2 }}
              />
              <Typography variant="caption" color="textSecondary">Funkcjonalność</Typography>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">Częstotliwość odświeżania danych (sekundy)</Typography>
              <Typography variant="body2" color="textSecondary">{localRefreshRate}s</Typography>
            </Box>
            <Slider
              value={localRefreshRate}
              onChange={handleRefreshRateChange}
              min={1}
              max={30}
              step={1}
            />
          </Box>
          
          <FormGroup sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={localAnimationsEnabled} 
                  onChange={handleAnimationsEnabledChange}
                  color="primary"
                />
              }
              label="Animacje interfejsu"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={localBackgroundLoading} 
                  onChange={handleBackgroundLoadingChange}
                  color="primary"
                />
              }
              label="Ładowanie danych w tle"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={localAdvancedVisualizations} 
                  onChange={handleAdvancedVisualizationsChange}
                  color="primary"
                />
              }
              label="Zaawansowane wizualizacje"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={localAdvancedAIFeatures} 
                  onChange={handleAdvancedAIFeaturesChange}
                  color="primary"
                />
              }
              label="Zaawansowane funkcje AI"
            />
          </FormGroup>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveCustomSettings}
              disabled={!changesMade}
            >
              Zapisz ustawienia
            </Button>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleResetCustomSettings}
            >
              Resetuj
            </Button>
          </Box>
          
          {saveSuccess && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, color: theme.palette.success.main }}>
              <CheckCircleIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Ustawienia zostały zapisane</Typography>
            </Box>
          )}
        </Box>
      </Paper>
      
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Wpływ na funkcjonalność aplikacji
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Aktualny tryb: <Chip label={
                performanceMode === 'high-performance' ? 'Wysoka wydajność' :
                performanceMode === 'balanced' ? 'Zrównoważony' :
                performanceMode === 'feature-rich' ? 'Bogaty w funkcje' : 'Niestandardowy'
              } color={
                performanceMode === 'high-performance' ? 'warning' :
                performanceMode === 'balanced' ? 'primary' :
                performanceMode === 'feature-rich' ? 'secondary' : 'default'
              } size="small" />
            </Typography>
            
            <Typography variant="body2">
              {performanceMode === 'high-performance' && 'Aplikacja działa z maksymalną wydajnością, ale niektóre zaawansowane funkcje są wyłączone.'}
              {performanceMode === 'balanced' && 'Aplikacja działa z optymalnym balansem między wydajnością a funkcjonalnością.'}
              {performanceMode === 'feature-rich' && 'Aplikacja działa z pełną funkcjonalnością, ale może być wolniejsza na starszych urządzeniach.'}
              {performanceMode === 'custom' && 'Aplikacja działa z niestandardowymi ustawieniami wydajności.'}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Dostępne funkcje w bieżącym trybie:
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip 
              label="Animacje" 
              color={animationsEnabled ? 'success' : 'default'}
              variant={animationsEnabled ? 'filled' : 'outlined'}
              size="small"
            />
            <Chip 
              label="Zaawansowane wizualizacje" 
              color={advancedVisualizations ? 'success' : 'default'}
              variant={advancedVisualizations ? 'filled' : 'outlined'}
              size="small"
            />
            <Chip 
              label="Funkcje AI" 
              color={advancedAIFeatures ? 'success' : 'default'}
              variant={advancedAIFeatures ? 'filled' : 'outlined'}
              size="small"
            />
            <Chip 
              label="Ładowanie w tle" 
              color={backgroundLoading ? 'success' : 'default'}
              variant={backgroundLoading ? 'filled' : 'outlined'}
              size="small"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PerformanceModeSelector;
