import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card,
  CardContent,
  Chip,
  Slider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import HistoryIcon from '@mui/icons-material/History';
import TuneIcon from '@mui/icons-material/Tune';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import BalanceIcon from '@mui/icons-material/Balance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PsychologyIcon from '@mui/icons-material/Psychology';

/**
 * Komponent konfiguratora parametrów planu lekcji
 * Umożliwia dostosowanie ustawień generowania planu przez AI
 */
const PlanConfigurationPanel = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [comfortPriority, setComfortPriority] = useState(70); // 0-100, gdzie 0 to priorytet uczniów, 100 to priorytet nauczycieli
  const [costOptimization, setCostOptimization] = useState(40); // 0-100, gdzie 0 to wysoki koszt, 100 to niski koszt
  const [loadDistribution, setLoadDistribution] = useState(20); // 0-100, gdzie 0 to równomierny, 100 to skondensowany
  const [startTime, setStartTime] = useState(8.25); // 8:15
  const [maxLessonsPerDay, setMaxLessonsPerDay] = useState(7); // 5-9 lekcji
  const [lunchBreakDuration, setLunchBreakDuration] = useState(25); // 0-30 minut
  const [preferences, setPreferences] = useState({
    avoidDifficultSubjectsAtEnd: true,
    pePlacementPreference: true,
    considerTeacherPreferences: false,
    maximizeSpecialRoomUsage: true
  });
  const [recommendedStyle, setRecommendedStyle] = useState('Uczniowski');

  // Symulacja ładowania rekomendacji AI
  useEffect(() => {
    const calculateRecommendation = () => {
      // Logika określająca rekomendowany styl na podstawie ustawień
      if (comfortPriority < 40) {
        return 'Uczniowski';
      } else if (comfortPriority > 70) {
        return 'Nauczycielski';
      } else if (costOptimization > 70) {
        return 'Ekonomiczny';
      } else {
        return 'Zbalansowany';
      }
    };

    setRecommendedStyle(calculateRecommendation());
  }, [comfortPriority, costOptimization, loadDistribution]);

  const handlePreferenceChange = (name) => (event) => {
    setPreferences({
      ...preferences,
      [name]: event.target.checked
    });
  };

  const handleSaveConfiguration = () => {
    setLoading(true);
    
    // Symulacja zapisywania konfiguracji
    setTimeout(() => {
      setLoading(false);
      // Tutaj byłoby wywołanie API do zapisania konfiguracji
      console.log('Konfiguracja zapisana:', {
        comfortPriority,
        costOptimization,
        loadDistribution,
        startTime,
        maxLessonsPerDay,
        lunchBreakDuration,
        preferences
      });
    }, 1500);
  };

  const formatStartTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Konfiguracja parametrów planu
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 3 }}>
        Dostosuj ustawienia aby AI stworzyło optymalny plan dla Twojej szkoły
      </Typography>

      <Grid container spacing={3}>
        {/* Równowaga i komfort */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BalanceIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6">Równowaga i komfort</Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Priorytet komfortu</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ minWidth: 60 }}>Uczniowie</Typography>
                  <Slider
                    value={comfortPriority}
                    onChange={(e, newValue) => setComfortPriority(newValue)}
                    aria-labelledby="comfort-priority-slider"
                    valueLabelDisplay="auto"
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" sx={{ minWidth: 70 }}>Nauczyciele</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Optymalizacja kosztowa</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ minWidth: 60 }}>Wysoki koszt</Typography>
                  <Slider
                    value={costOptimization}
                    onChange={(e, newValue) => setCostOptimization(newValue)}
                    aria-labelledby="cost-optimization-slider"
                    valueLabelDisplay="auto"
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" sx={{ minWidth: 70 }}>Niski koszt</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Rozkład obciążenia w tygodniu</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ minWidth: 60 }}>Równomierny</Typography>
                  <Slider
                    value={loadDistribution}
                    onChange={(e, newValue) => setLoadDistribution(newValue)}
                    aria-labelledby="load-distribution-slider"
                    valueLabelDisplay="auto"
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" sx={{ minWidth: 70 }}>Skondensowany</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Harmonogram czasowy */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScheduleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6">Harmonogram czasowy</Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Godzina rozpoczęcia zajęć</Typography>
                  <Typography variant="body2" fontWeight="bold">{formatStartTime(startTime)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ minWidth: 30 }}>7:00</Typography>
                  <Slider
                    value={startTime}
                    onChange={(e, newValue) => setStartTime(newValue)}
                    aria-labelledby="start-time-slider"
                    min={7}
                    max={9}
                    step={0.25}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatStartTime}
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" sx={{ minWidth: 30 }}>9:00</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Maksymalna liczba lekcji dziennie</Typography>
                  <Typography variant="body2" fontWeight="bold">{maxLessonsPerDay} lekcji</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ minWidth: 30 }}>5</Typography>
                  <Slider
                    value={maxLessonsPerDay}
                    onChange={(e, newValue) => setMaxLessonsPerDay(newValue)}
                    aria-labelledby="max-lessons-slider"
                    min={5}
                    max={9}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" sx={{ minWidth: 30 }}>9</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Długość przerwy obiadowej</Typography>
                  <Typography variant="body2" fontWeight="bold">{lunchBreakDuration} min</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ minWidth: 30 }}>Brak</Typography>
                  <Slider
                    value={lunchBreakDuration}
                    onChange={(e, newValue) => setLunchBreakDuration(newValue)}
                    aria-labelledby="lunch-break-slider"
                    min={0}
                    max={30}
                    step={5}
                    valueLabelDisplay="auto"
                    sx={{ mx: 2 }}
                  />
                  <Typography variant="caption" sx={{ minWidth: 30 }}>30 min</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferencje dydaktyczne */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PsychologyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6">Preferencje dydaktyczne</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={preferences.avoidDifficultSubjectsAtEnd} 
                    onChange={handlePreferenceChange('avoidDifficultSubjectsAtEnd')} 
                  />
                }
                label="Unikaj trudnych przedmiotów pod rząd"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={preferences.pePlacementPreference} 
                    onChange={handlePreferenceChange('pePlacementPreference')} 
                  />
                }
                label="Planuj WF po przedmiotach statycznych"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={preferences.considerTeacherPreferences} 
                    onChange={handlePreferenceChange('considerTeacherPreferences')} 
                  />
                }
                label="Uwzględnij preferencje nauczycieli"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={preferences.maximizeSpecialRoomUsage} 
                    onChange={handlePreferenceChange('maximizeSpecialRoomUsage')} 
                  />
                }
                label="Maksymalizuj wykorzystanie sal specjalistycznych"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Rekomendacja AI */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AutoFixHighIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Rekomendacja AI</Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                Na podstawie Twoich ustawień i charakterystyki szkoły AI sugeruje:
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Styl {recommendedStyle}
                </Typography>
                <Chip 
                  label="optymalny dla Twojej szkoły" 
                  sx={{ ml: 1, bgcolor: theme.palette.primary.dark, color: 'white' }} 
                />
              </Box>
              
              <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2 }}>
                Możesz zastosować tę rekomendację lub dostosować parametry według własnych preferencji.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          color="error" 
          sx={{ mr: 2 }}
          onClick={() => {
            setComfortPriority(50);
            setCostOptimization(50);
            setLoadDistribution(50);
            setStartTime(8);
            setMaxLessonsPerDay(7);
            setLunchBreakDuration(20);
            setPreferences({
              avoidDifficultSubjectsAtEnd: true,
              pePlacementPreference: true,
              considerTeacherPreferences: true,
              maximizeSpecialRoomUsage: true
            });
          }}
        >
          Resetuj
        </Button>
        <Button 
          variant="contained" 
          color="success"
          sx={{ mr: 2 }}
          onClick={handleSaveConfiguration}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Zapisz konfigurację'}
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {}}
        >
          Generuj plan
        </Button>
      </Box>
    </Box>
  );
};

export default PlanConfigurationPanel;
