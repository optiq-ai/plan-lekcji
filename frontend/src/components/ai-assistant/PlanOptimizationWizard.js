import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TuneIcon from '@mui/icons-material/Tune';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

/**
 * Komponent kreatora optymalizacji planu lekcji
 * Prowadzi użytkownika przez proces optymalizacji planu z wykorzystaniem AI
 */
const PlanOptimizationWizard = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [optimizationGoals, setOptimizationGoals] = useState({
    balanceTeacherLoad: true,
    maximizeRoomUsage: true,
    minimizeStudentLoad: true,
    avoidConflicts: true,
    considerPreferences: false
  });
  const [optimizationLevel, setOptimizationLevel] = useState('balanced');
  const [selectedClasses, setSelectedClasses] = useState(['1A', '2B']);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [optimizationScore, setOptimizationScore] = useState(0);

  // Symulacja danych klas i nauczycieli
  const classes = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];
  const teachers = [
    { id: 1, name: 'Anna Kowalska', subject: 'Matematyka' },
    { id: 2, name: 'Jan Nowak', subject: 'Język polski' },
    { id: 3, name: 'Piotr Wiśniewski', subject: 'Historia' },
    { id: 4, name: 'Alicja Dąbrowska', subject: 'Geografia' },
    { id: 5, name: 'Adam Malinowski', subject: 'Fizyka' }
  ];

  // Obsługa zmiany kroku
  const handleNext = () => {
    if (activeStep === 2) {
      runOptimization();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setOptimizationGoals({
      balanceTeacherLoad: true,
      maximizeRoomUsage: true,
      minimizeStudentLoad: true,
      avoidConflicts: true,
      considerPreferences: false
    });
    setOptimizationLevel('balanced');
    setSelectedClasses(['1A', '2B']);
    setSelectedTeachers([]);
    setOptimizationResults(null);
    setOptimizationScore(0);
  };

  // Obsługa zmiany celów optymalizacji
  const handleGoalChange = (name) => (event) => {
    setOptimizationGoals({
      ...optimizationGoals,
      [name]: event.target.checked
    });
  };

  // Obsługa zmiany poziomu optymalizacji
  const handleLevelChange = (event) => {
    setOptimizationLevel(event.target.value);
  };

  // Obsługa wyboru klas
  const handleClassToggle = (className) => () => {
    setSelectedClasses((prev) => {
      if (prev.includes(className)) {
        return prev.filter((c) => c !== className);
      } else {
        return [...prev, className];
      }
    });
  };

  // Obsługa wyboru nauczycieli
  const handleTeacherToggle = (teacherId) => () => {
    setSelectedTeachers((prev) => {
      if (prev.includes(teacherId)) {
        return prev.filter((id) => id !== teacherId);
      } else {
        return [...prev, teacherId];
      }
    });
  };

  // Symulacja procesu optymalizacji
  const runOptimization = () => {
    setLoading(true);
    
    // Symulacja opóźnienia procesu optymalizacji
    setTimeout(() => {
      // Symulacja wyników optymalizacji
      const mockResults = {
        changes: [
          {
            type: 'move',
            description: 'Przeniesienie matematyki z wtorku (8:00) na środę (10:45) dla klasy 1A',
            impact: 'high',
            reason: 'Lepsze rozłożenie trudnych przedmiotów w tygodniu'
          },
          {
            type: 'swap',
            description: 'Zamiana WF (poniedziałek) z fizyką (czwartek) dla klasy 2B',
            impact: 'medium',
            reason: 'Zrównoważenie obciążenia uczniów'
          },
          {
            type: 'room',
            description: 'Zmiana sali z 103 na 107 dla informatyki (piątek, 11:50)',
            impact: 'low',
            reason: 'Lepsze wykorzystanie sal specjalistycznych'
          }
        ],
        statistics: {
          teacherLoadImprovement: 15,
          roomUsageImprovement: 8,
          studentLoadImprovement: 22,
          conflictsResolved: 3
        }
      };
      
      setOptimizationResults(mockResults);
      
      // Obliczenie wyniku optymalizacji (0-100)
      const score = Math.min(
        100,
        mockResults.statistics.teacherLoadImprovement +
        mockResults.statistics.roomUsageImprovement +
        mockResults.statistics.studentLoadImprovement +
        mockResults.statistics.conflictsResolved * 5
      );
      
      setOptimizationScore(score);
      setLoading(false);
      setActiveStep(3); // Przejście do kroku z wynikami
    }, 3000);
  };

  // Symulacja zastosowania optymalizacji
  const applyOptimization = () => {
    setLoading(true);
    
    // Symulacja opóźnienia procesu zastosowania zmian
    setTimeout(() => {
      setLoading(false);
      setActiveStep(4); // Przejście do kroku końcowego
    }, 2000);
  };

  // Kroki kreatora
  const steps = [
    {
      label: 'Wybierz cele optymalizacji',
      description: 'Określ, co chcesz osiągnąć poprzez optymalizację planu lekcji.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Cele optymalizacji:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Zrównoważenie obciążenia nauczycieli" 
                      color={optimizationGoals.balanceTeacherLoad ? "primary" : "default"}
                      onClick={handleGoalChange('balanceTeacherLoad')}
                      sx={{ mr: 1 }}
                    />
                    <Tooltip title="Równomierne rozłożenie zajęć nauczycieli w tygodniu">
                      <InfoIcon fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Maksymalizacja wykorzystania sal" 
                      color={optimizationGoals.maximizeRoomUsage ? "primary" : "default"}
                      onClick={handleGoalChange('maximizeRoomUsage')}
                      sx={{ mr: 1 }}
                    />
                    <Tooltip title="Efektywne wykorzystanie sal specjalistycznych">
                      <InfoIcon fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Minimalizacja obciążenia uczniów" 
                      color={optimizationGoals.minimizeStudentLoad ? "primary" : "default"}
                      onClick={handleGoalChange('minimizeStudentLoad')}
                      sx={{ mr: 1 }}
                    />
                    <Tooltip title="Lepsze rozłożenie trudnych przedmiotów w tygodniu">
                      <InfoIcon fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label="Unikanie konfliktów" 
                      color={optimizationGoals.avoidConflicts ? "primary" : "default"}
                      onClick={handleGoalChange('avoidConflicts')}
                      sx={{ mr: 1 }}
                    />
                    <Tooltip title="Eliminacja nakładających się zajęć i innych konfliktów">
                      <InfoIcon fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      label="Uwzględnienie preferencji nauczycieli" 
                      color={optimizationGoals.considerPreferences ? "primary" : "default"}
                      onClick={handleGoalChange('considerPreferences')}
                      sx={{ mr: 1 }}
                    />
                    <Tooltip title="Branie pod uwagę preferencji dot. godzin nauczycieli">
                      <InfoIcon fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Poziom optymalizacji:
              </Typography>
              
              <FormControl fullWidth>
                <Select
                  value={optimizationLevel}
                  onChange={handleLevelChange}
                  displayEmpty
                >
                  <MenuItem value="minimal">Minimalny - tylko niezbędne zmiany</MenuItem>
                  <MenuItem value="balanced">Zbalansowany - rozsądna liczba zmian</MenuItem>
                  <MenuItem value="aggressive">Agresywny - maksymalna optymalizacja</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
      )
    },
    {
      label: 'Wybierz zakres optymalizacji',
      description: 'Określ, które klasy i nauczyciele mają być objęci optymalizacją.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Wybierz klasy do optymalizacji:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {classes.map((className) => (
                      <Chip
                        key={className}
                        label={className}
                        onClick={handleClassToggle(className)}
                        color={selectedClasses.includes(className) ? "primary" : "default"}
                        variant={selectedClasses.includes(className) ? "filled" : "outlined"}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSelectedClasses([])}
                    >
                      Wyczyść
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSelectedClasses([...classes])}
                    >
                      Wybierz wszystkie
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Wybierz nauczycieli do optymalizacji:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {teachers.map((teacher) => (
                      <Chip
                        key={teacher.id}
                        label={`${teacher.name} (${teacher.subject})`}
                        onClick={handleTeacherToggle(teacher.id)}
                        color={selectedTeachers.includes(teacher.id) ? "primary" : "default"}
                        variant={selectedTeachers.includes(teacher.id) ? "filled" : "outlined"}
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSelectedTeachers([])}
                    >
                      Wyczyść
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSelectedTeachers(teachers.map(t => t.id))}
                    >
                      Wybierz wszystkich
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      label: 'Podsumowanie i uruchomienie',
      description: 'Sprawdź ustawienia i uruchom proces optymalizacji.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Podsumowanie ustawień optymalizacji:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Cele optymalizacji:
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {optimizationGoals.balanceTeacherLoad && (
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                        Zrównoważenie obciążenia nauczycieli
                      </Typography>
                    )}
                    {optimizationGoals.maximizeRoomUsage && (
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                        Maksymalizacja wykorzystania sal
                      </Typography>
                    )}
                    {optimizationGoals.minimizeStudentLoad && (
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                        Minimalizacja obciążenia uczniów
                      </Typography>
                    )}
                    {optimizationGoals.avoidConflicts && (
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                        Unikanie konfliktów
                      </Typography>
                    )}
                    {optimizationGoals.considerPreferences && (
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                        Uwzględnienie preferencji nauczycieli
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Poziom optymalizacji:
                  </Typography>
                  <Typography variant="body2">
                    {optimizationLevel === 'minimal' && 'Minimalny - tylko niezbędne zmiany'}
                    {optimizationLevel === 'balanced' && 'Zbalansowany - rozsądna liczba zmian'}
                    {optimizationLevel === 'aggressive' && 'Agresywny - maksymalna optymalizacja'}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                    Wybrane klasy ({selectedClasses.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedClasses.map((className) => (
                      <Chip
                        key={className}
                        label={className}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                    Wybrani nauczyciele ({selectedTeachers.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedTeachers.map((id) => {
                      const teacher = teachers.find(t => t.id === id);
                      return (
                        <Chip
                          key={id}
                          label={teacher ? teacher.name : `Nauczyciel ${id}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      );
                    })}
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Proces optymalizacji może potrwać kilka minut, w zależności od złożoności planu i wybranych opcji.
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AutoFixHighIcon />}
                  onClick={handleNext}
                  disabled={selectedClasses.length === 0}
                  sx={{ minWidth: 200 }}
                >
                  Uruchom optymalizację
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )
    },
    {
      label: 'Wyniki optymalizacji',
      description: 'Przejrzyj wyniki i zdecyduj, czy chcesz zastosować zmiany.',
      content: (
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <CircularProgress size={60} sx={{ mb: 2 }} />
              <Typography variant="h6">
                Trwa optymalizacja planu...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Analizowanie możliwych zmian i generowanie optymalnego planu
              </Typography>
            </Box>
          ) : (
            optimizationResults && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">
                          Wynik optymalizacji
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h5" color="primary" fontWeight="bold">
                            {optimizationScore}/100 punktów
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ position: 'relative', height: 8, bgcolor: theme.palette.grey[200], borderRadius: 4, mb: 3 }}>
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            height: '100%', 
                            width: `${optimizationScore}%`,
                            bgcolor: optimizationScore > 80 ? theme.palette.success.main : 
                                    optimizationScore > 50 ? theme.palette.warning.main : 
                                    theme.palette.error.main,
                            borderRadius: 4
                          }} 
                        />
                      </Box>
                      
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Proponowane zmiany:
                      </Typography>
                      
                      {optimizationResults.changes.map((change, index) => (
                        <Paper
                          key={index}
                          elevation={1}
                          sx={{ 
                            p: 2, 
                            mb: 2, 
                            borderLeft: `4px solid ${
                              change.impact === 'high' ? theme.palette.error.main :
                              change.impact === 'medium' ? theme.palette.warning.main :
                              theme.palette.success.main
                            }`
                          }}
                        >
                          <Typography variant="body1">
                            {change.description}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Powód: {change.reason}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Chip 
                              label={`Wpływ: ${
                                change.impact === 'high' ? 'Wysoki' :
                                change.impact === 'medium' ? 'Średni' :
                                'Niski'
                              }`} 
                              size="small"
                              color={
                                change.impact === 'high' ? 'error' :
                                change.impact === 'medium' ? 'warning' :
                                'success'
                              }
                            />
                          </Box>
                        </Paper>
                      ))}
                      
                      <Divider sx={{ my: 3 }} />
                      
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Statystyki usprawnień:
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="h5" color="primary">
                              +{optimizationResults.statistics.teacherLoadImprovement}%
                            </Typography>
                            <Typography variant="body2">
                              Obciążenie nauczycieli
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="h5" color="primary">
                              +{optimizationResults.statistics.roomUsageImprovement}%
                            </Typography>
                            <Typography variant="body2">
                              Wykorzystanie sal
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="h5" color="primary">
                              +{optimizationResults.statistics.studentLoadImprovement}%
                            </Typography>
                            <Typography variant="body2">
                              Komfort uczniów
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="h5" color="primary">
                              {optimizationResults.statistics.conflictsResolved}
                            </Typography>
                            <Typography variant="body2">
                              Rozwiązane konflikty
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleReset}
                          sx={{ mr: 2 }}
                        >
                          Odrzuć zmiany
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={applyOptimization}
                        >
                          Zastosuj zmiany
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )
          )}
        </Box>
      )
    },
    {
      label: 'Zakończenie',
      description: 'Optymalizacja zakończona pomyślnie.',
      content: (
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <CircularProgress size={60} sx={{ mb: 2 }} />
              <Typography variant="h6">
                Trwa zastosowywanie zmian...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Aktualizowanie planu lekcji z nowymi ustawieniami
              </Typography>
            </Box>
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: theme.palette.success.main, mb: 2 }} />
                
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Optymalizacja zakończona pomyślnie!
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Wszystkie zaproponowane zmiany zostały zastosowane do planu lekcji.
                  Plan został zoptymalizowany zgodnie z wybranymi celami i parametrami.
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Zapisz raport
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RestartAltIcon />}
                    onClick={handleReset}
                  >
                    Nowa optymalizacja
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AutoFixHighIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Kreator optymalizacji planu</Typography>
        </Box>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant="subtitle1">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {step.description}
              </Typography>
              
              {step.content}
              
              <Box sx={{ mb: 2, mt: 3 }}>
                <div>
                  {index !== 3 && index !== 4 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      endIcon={<ArrowForwardIcon />}
                      disabled={(index === 1 && selectedClasses.length === 0) || loading}
                    >
                      {index === steps.length - 3 ? 'Uruchom optymalizację' : 'Dalej'}
                    </Button>
                  )}
                  
                  {index > 0 && index !== 4 && (
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      startIcon={<ArrowBackIcon />}
                      disabled={loading}
                    >
                      Wstecz
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default PlanOptimizationWizard;
