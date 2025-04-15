import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  useTheme,
  CircularProgress,
  Button,
  Slider,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  SmartToy as AIIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Help as HelpIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';
import PlanConfigurationService from '../../services/PlanConfigurationService';

const PlanConfigurationAssistant = ({ planId, schoolId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  // Konfiguracja planu
  const [planStyle, setPlanStyle] = useState('balanced');
  const [studentComfort, setStudentComfort] = useState(5);
  const [teacherComfort, setTeacherComfort] = useState(5);
  const [roomUtilization, setRoomUtilization] = useState(5);
  const [costEfficiency, setCostEfficiency] = useState(5);
  const [advancedMode, setAdvancedMode] = useState(false);
  
  // Zaawansowane parametry
  const [maxDailyLessons, setMaxDailyLessons] = useState(8);
  const [preferredStartTime, setPreferredStartTime] = useState('8:00');
  const [allowGaps, setAllowGaps] = useState(true);
  const [subjectGrouping, setSubjectGrouping] = useState('distributed');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz dane planu lekcji (jeśli podano planId)
        if (planId) {
          const planResponse = await LessonPlanService.getLessonPlanById(planId);
          setPlanData(planResponse);
          
          // Pobierz konfigurację planu
          const configResponse = await PlanConfigurationService.getPlanConfigurationById(planResponse.configurationId);
          setConfigData(configResponse);
          
          // Ustaw wartości konfiguracji
          if (configResponse) {
            setPlanStyle(configResponse.planStyle || 'balanced');
            setStudentComfort(configResponse.studentComfort || 5);
            setTeacherComfort(configResponse.teacherComfort || 5);
            setRoomUtilization(configResponse.roomUtilization || 5);
            setCostEfficiency(configResponse.costEfficiency || 5);
            setMaxDailyLessons(configResponse.maxDailyLessons || 8);
            setPreferredStartTime(configResponse.preferredStartTime || '8:00');
            setAllowGaps(configResponse.allowGaps !== undefined ? configResponse.allowGaps : true);
            setSubjectGrouping(configResponse.subjectGrouping || 'distributed');
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [planId]);

  // Funkcja do aktualizacji konfiguracji na podstawie wybranego stylu planu
  const updateConfigBasedOnStyle = (style) => {
    switch (style) {
      case 'student_focused':
        setStudentComfort(8);
        setTeacherComfort(4);
        setRoomUtilization(5);
        setCostEfficiency(3);
        break;
      case 'teacher_focused':
        setStudentComfort(4);
        setTeacherComfort(8);
        setRoomUtilization(5);
        setCostEfficiency(3);
        break;
      case 'cost_efficient':
        setStudentComfort(3);
        setTeacherComfort(3);
        setRoomUtilization(7);
        setCostEfficiency(9);
        break;
      case 'room_optimized':
        setStudentComfort(4);
        setTeacherComfort(4);
        setRoomUtilization(9);
        setCostEfficiency(7);
        break;
      case 'balanced':
      default:
        setStudentComfort(5);
        setTeacherComfort(5);
        setRoomUtilization(5);
        setCostEfficiency(5);
        break;
    }
  };

  // Obsługa zmiany stylu planu
  const handlePlanStyleChange = (event) => {
    const newStyle = event.target.value;
    setPlanStyle(newStyle);
    updateConfigBasedOnStyle(newStyle);
  };

  // Symulacja zapisywania konfiguracji
  const handleSaveConfiguration = async () => {
    setLoading(true);
    
    // Przygotuj dane konfiguracji
    const configurationData = {
      planStyle,
      studentComfort,
      teacherComfort,
      roomUtilization,
      costEfficiency,
      maxDailyLessons,
      preferredStartTime,
      allowGaps,
      subjectGrouping
    };
    
    try {
      // W rzeczywistej aplikacji byłoby to zapisanie konfiguracji do API
      setTimeout(() => {
        setConfigData(configurationData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Błąd podczas zapisywania konfiguracji:', err);
      setError('Wystąpił błąd podczas zapisywania konfiguracji. Spróbuj ponownie później.');
      setLoading(false);
    }
  };

  // Symulacja generowania planu na podstawie konfiguracji
  const handleGeneratePlan = async () => {
    setGenerating(true);
    
    try {
      // W rzeczywistej aplikacji byłoby to wywołanie API do generowania planu
      setTimeout(() => {
        setGenerating(false);
      }, 3000);
    } catch (err) {
      console.error('Błąd podczas generowania planu:', err);
      setError('Wystąpił błąd podczas generowania planu. Spróbuj ponownie później.');
      setGenerating(false);
    }
  };

  if (loading && !generating) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AIIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h6">
            Asystent konfiguracji planu
            {planData && ` - ${planData.name}`}
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={advancedMode}
                onChange={(e) => setAdvancedMode(e.target.checked)}
                color="primary"
              />
            }
            label="Tryb zaawansowany"
          />
          <Tooltip title="Ustawienia">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Styl planu lekcji
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="plan-style-label">Wybierz styl planu</InputLabel>
            <Select
              labelId="plan-style-label"
              id="plan-style"
              value={planStyle}
              label="Wybierz styl planu"
              onChange={handlePlanStyleChange}
            >
              <MenuItem value="balanced">Zbalansowany</MenuItem>
              <MenuItem value="student_focused">Zorientowany na uczniów</MenuItem>
              <MenuItem value="teacher_focused">Zorientowany na nauczycieli</MenuItem>
              <MenuItem value="cost_efficient">Ekonomiczny</MenuItem>
              <MenuItem value="room_optimized">Optymalizacja sal</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Parametry planu
            </Typography>
            
            <Stack spacing={3}>
              <Box>
                <Typography gutterBottom>
                  Komfort uczniów
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={studentComfort}
                      onChange={(e, newValue) => setStudentComfort(newValue)}
                      min={1}
                      max={10}
                      step={1}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {studentComfort}/10
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box>
                <Typography gutterBottom>
                  Komfort nauczycieli
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={teacherComfort}
                      onChange={(e, newValue) => setTeacherComfort(newValue)}
                      min={1}
                      max={10}
                      step={1}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {teacherComfort}/10
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box>
                <Typography gutterBottom>
                  Wykorzystanie sal
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={roomUtilization}
                      onChange={(e, newValue) => setRoomUtilization(newValue)}
                      min={1}
                      max={10}
                      step={1}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {roomUtilization}/10
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box>
                <Typography gutterBottom>
                  Efektywność kosztowa
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={costEfficiency}
                      onChange={(e, newValue) => setCostEfficiency(newValue)}
                      min={1}
                      max={10}
                      step={1}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {costEfficiency}/10
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {advancedMode && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Zaawansowane parametry
              </Typography>
              
              <Stack spacing={3}>
                <Box>
                  <Typography gutterBottom>
                    Maksymalna liczba lekcji dziennie
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        value={maxDailyLessons}
                        onChange={(e, newValue) => setMaxDailyLessons(newValue)}
                        min={5}
                        max={12}
                        step={1}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="text.secondary">
                        {maxDailyLessons}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Box>
                  <Typography gutterBottom>
                    Preferowana godzina rozpoczęcia
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={preferredStartTime}
                      onChange={(e) => setPreferredStartTime(e.target.value)}
                    >
                      <MenuItem value="7:00">7:00</MenuItem>
                      <MenuItem value="7:30">7:30</MenuItem>
                      <MenuItem value="8:00">8:00</MenuItem>
                      <MenuItem value="8:30">8:30</MenuItem>
                      <MenuItem value="9:00">9:00</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={allowGaps}
                        onChange={(e) => setAllowGaps(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Zezwalaj na okienka w planie"
                  />
                </Box>
                
                <Box>
                  <Typography gutterBottom>
                    Grupowanie przedmiotów
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={subjectGrouping}
                      onChange={(e) => setSubjectGrouping(e.target.value)}
                    >
                      <MenuItem value="distributed">Rozłożone (różne przedmioty każdego dnia)</MenuItem>
                      <MenuItem value="grouped">Zgrupowane (podobne przedmioty w te same dni)</MenuItem>
                      <MenuItem value="balanced">Zbalansowane</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
          )}
          
          <Box sx={{ mt: advancedMode ? 4 : 0 }}>
            <Typography variant="subtitle1" gutterBottom>
              Sugestie AI
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: theme.palette.grey[50] }}>
              <Typography variant="body2" paragraph>
                <strong>Sugestia AI:</strong> Na podstawie wybranych parametrów, asystent sugeruje zwiększenie komfortu uczniów i zmniejszenie nacisku na efektywność kosztową, aby uzyskać bardziej zrównoważony plan.
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => {
                  setStudentComfort(7);
                  setCostEfficiency(4);
                }}
              >
                Zastosuj sugestię
              </Button>
            </Paper>
            
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: theme.palette.grey[50] }}>
              <Typography variant="body2" paragraph>
                <strong>Analiza AI:</strong> Przy obecnych parametrach, plan będzie miał około 75% optymalności. Możesz zwiększyć wykorzystanie sal, aby poprawić ogólną efektywność planu.
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => {
                  setRoomUtilization(7);
                }}
              >
                Zastosuj sugestię
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => updateConfigBasedOnStyle(planStyle)}
        >
          Resetuj parametry
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleSaveConfiguration}
            disabled={loading}
          >
            Zapisz konfigurację
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={generating ? <CircularProgress size={20} color="inherit" /> : <AIIcon />}
            onClick={handleGeneratePlan}
            disabled={generating}
          >
            {generating ? 'Generowanie...' : 'Generuj plan'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PlanConfigurationAssistant;
