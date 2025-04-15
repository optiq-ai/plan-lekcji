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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import {
  SmartToy as AIIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Compare as CompareIcon
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';

const PlanOptimizationWizard = ({ planId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [optimizationInProgress, setOptimizationInProgress] = useState(false);
  const [error, setError] = useState(null);
  const [optimizationConfig, setOptimizationConfig] = useState({
    prioritizeStudentComfort: true,
    prioritizeTeacherComfort: true,
    prioritizeRoomUtilization: true,
    prioritizeSubjectDistribution: true,
    maxChangesAllowed: 'medium' // 'low', 'medium', 'high'
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!planId) return;
      
      try {
        setLoading(true);
        
        // Pobierz dane planu lekcji
        const planResponse = await LessonPlanService.getLessonPlanById(planId);
        setPlanData(planResponse);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych planu:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [planId]);

  // Kroki kreatora optymalizacji
  const steps = [
    {
      label: 'Analiza planu',
      description: 'Asystent AI analizuje obecny plan lekcji i identyfikuje obszary do optymalizacji.',
    },
    {
      label: 'Konfiguracja optymalizacji',
      description: 'Wybierz priorytety i parametry optymalizacji planu lekcji.',
    },
    {
      label: 'Generowanie propozycji',
      description: 'Asystent AI generuje propozycje zmian w planie lekcji.',
    },
    {
      label: 'Przegląd i zatwierdzenie',
      description: 'Przejrzyj proponowane zmiany i zatwierdź te, które chcesz zastosować.',
    },
  ];

  // Funkcja do przechodzenia do następnego kroku
  const handleNext = () => {
    if (activeStep === 0) {
      // Symulacja analizy planu
      setOptimizationInProgress(true);
      setTimeout(() => {
        setOptimizationResults({
          issues: [
            { id: 1, type: 'teacher_overload', description: 'Nauczyciel Jan Kowalski ma zbyt duże obciążenie w środy (8 lekcji).' },
            { id: 2, type: 'room_underutilization', description: 'Sala 102 jest wykorzystywana tylko w 30% dostępnego czasu.' },
            { id: 3, type: 'subject_distribution', description: 'Klasa 3A ma zbyt wiele trudnych przedmiotów w poniedziałki.' },
            { id: 4, type: 'teacher_conflict', description: 'Nauczyciel Anna Nowak ma nakładające się lekcje w piątki (lekcja 3 i 4).' }
          ],
          score: {
            overall: 68,
            studentComfort: 72,
            teacherComfort: 58,
            roomUtilization: 65,
            subjectDistribution: 75
          }
        });
        setOptimizationInProgress(false);
        setActiveStep(1);
      }, 2000);
    } else if (activeStep === 1) {
      // Przejście do generowania propozycji
      setActiveStep(2);
      setOptimizationInProgress(true);
      
      // Symulacja generowania propozycji
      setTimeout(() => {
        setOptimizationResults({
          ...optimizationResults,
          proposals: [
            { 
              id: 1, 
              type: 'move_lesson', 
              description: 'Przenieś lekcję matematyki klasy 3A z poniedziałku (lekcja 5) na wtorek (lekcja 3)',
              impact: { studentComfort: +8, teacherComfort: +2, roomUtilization: 0, subjectDistribution: +5 }
            },
            { 
              id: 2, 
              type: 'swap_lessons', 
              description: 'Zamień lekcje: biologia klasy 2B (środa, lekcja 2) z geografią klasy 2B (piątek, lekcja 4)',
              impact: { studentComfort: +5, teacherComfort: +10, roomUtilization: 0, subjectDistribution: +3 }
            },
            { 
              id: 3, 
              type: 'change_room', 
              description: 'Zmień salę dla lekcji fizyki klasy 1C z sali 205 na salę 102',
              impact: { studentComfort: 0, teacherComfort: 0, roomUtilization: +15, subjectDistribution: 0 }
            },
            { 
              id: 4, 
              type: 'reschedule_teacher', 
              description: 'Zmień przydział nauczyciela dla lekcji angielskiego klasy 4A z Anny Nowak na Tomasza Wiśniewskiego',
              impact: { studentComfort: -2, teacherComfort: +12, roomUtilization: 0, subjectDistribution: 0 }
            }
          ],
          predictedScore: {
            overall: 82,
            studentComfort: 83,
            teacherComfort: 78,
            roomUtilization: 80,
            subjectDistribution: 83
          }
        });
        setOptimizationInProgress(false);
        setActiveStep(3);
      }, 3000);
    } else if (activeStep === 3) {
      // Symulacja zastosowania zmian
      setOptimizationInProgress(true);
      setTimeout(() => {
        setOptimizationInProgress(false);
        // Tutaj w rzeczywistej aplikacji byłoby zapisanie zmian do planu
        setActiveStep(4); // Krok poza stepper - podsumowanie
      }, 2000);
    }
  };

  // Funkcja do cofania do poprzedniego kroku
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Funkcja do resetowania kreatora
  const handleReset = () => {
    setActiveStep(0);
    setOptimizationResults(null);
  };

  // Renderowanie zawartości kroku
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {optimizationInProgress ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography>Analizowanie planu lekcji...</Typography>
              </Box>
            ) : (
              <Box>
                <Typography paragraph>
                  Asystent AI przeanalizuje obecny plan lekcji i zidentyfikuje potencjalne obszary do optymalizacji, takie jak:
                </Typography>
                <ul>
                  <li>Nierównomierne obciążenie nauczycieli</li>
                  <li>Nieoptymalne wykorzystanie sal lekcyjnych</li>
                  <li>Niekorzystny rozkład przedmiotów dla uczniów</li>
                  <li>Konflikty w planie lekcji</li>
                </ul>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Rozpocznij analizę
                </Button>
              </Box>
            )}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography paragraph>
              Na podstawie analizy planu, asystent AI zidentyfikował następujące problemy:
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              {optimizationResults?.issues.map((issue) => (
                <Alert key={issue.id} severity="warning" sx={{ mb: 1 }}>
                  {issue.description}
                </Alert>
              ))}
            </Box>
            
            <Typography paragraph>
              Obecna ocena planu:
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 1, 
                    textAlign: 'center',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {optimizationResults?.score.overall}/100
                  </Typography>
                  <Typography variant="body2">
                    Ocena ogólna
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 1, 
                    textAlign: 'center',
                    backgroundColor: theme.palette.info.light
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {optimizationResults?.score.studentComfort}
                  </Typography>
                  <Typography variant="caption">
                    Komfort uczniów
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 1, 
                    textAlign: 'center',
                    backgroundColor: theme.palette.success.light
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {optimizationResults?.score.teacherComfort}
                  </Typography>
                  <Typography variant="caption">
                    Komfort nauczycieli
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 1, 
                    textAlign: 'center',
                    backgroundColor: theme.palette.warning.light
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {optimizationResults?.score.roomUtilization}
                  </Typography>
                  <Typography variant="caption">
                    Wykorzystanie sal
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 1, 
                    textAlign: 'center',
                    backgroundColor: theme.palette.secondary.light
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {optimizationResults?.score.subjectDistribution}
                  </Typography>
                  <Typography variant="caption">
                    Rozkład przedmiotów
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            <Typography paragraph>
              Wybierz priorytety optymalizacji:
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={3}>
                <Button
                  variant={optimizationConfig.prioritizeStudentComfort ? "contained" : "outlined"}
                  color="info"
                  fullWidth
                  onClick={() => setOptimizationConfig({
                    ...optimizationConfig,
                    prioritizeStudentComfort: !optimizationConfig.prioritizeStudentComfort
                  })}
                >
                  Komfort uczniów
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant={optimizationConfig.prioritizeTeacherComfort ? "contained" : "outlined"}
                  color="success"
                  fullWidth
                  onClick={() => setOptimizationConfig({
                    ...optimizationConfig,
                    prioritizeTeacherComfort: !optimizationConfig.prioritizeTeacherComfort
                  })}
                >
                  Komfort nauczycieli
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant={optimizationConfig.prioritizeRoomUtilization ? "contained" : "outlined"}
                  color="warning"
                  fullWidth
                  onClick={() => setOptimizationConfig({
                    ...optimizationConfig,
                    prioritizeRoomUtilization: !optimizationConfig.prioritizeRoomUtilization
                  })}
                >
                  Wykorzystanie sal
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant={optimizationConfig.prioritizeSubjectDistribution ? "contained" : "outlined"}
                  color="secondary"
                  fullWidth
                  onClick={() => setOptimizationConfig({
                    ...optimizationConfig,
                    prioritizeSubjectDistribution: !optimizationConfig.prioritizeSubjectDistribution
                  })}
                >
                  Rozkład przedmiotów
                </Button>
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Maksymalna liczba zmian:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant={optimizationConfig.maxChangesAllowed === 'low' ? "contained" : "outlined"}
                  onClick={() => setOptimizationConfig({
                    ...optimizationConfig,
                    maxChangesAllowed: 'low'
                  })}
                >
                  Niewiele zmian
                </Button>
                <Button
                  variant={optimizationConfig.maxChangesAllowed === 'medium' ? "contained" : "outlined"}
                  onClick={() => setOptimizationConfig({
                    ...optimizationConfig,
                    maxChangesAllowed: 'medium'
                  })}
                >
                  Umiarkowane zmiany
                </Button>
                <Button
                  variant={optimizationConfig.maxChangesAllowed === 'high' ? "contained" : "outlined"}
                  onClick={() => setOptimizationConfig({
                    ...optimizationConfig,
                    maxChangesAllowed: 'high'
                  })}
                >
                  Dużo zmian
                </Button>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Wstecz
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Generuj propozycje
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            {optimizationInProgress ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography>Generowanie propozycji optymalizacji...</Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                  Asystent AI analizuje możliwe zmiany w planie lekcji zgodnie z wybranymi priorytetami.
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography paragraph>
                  Generowanie propozycji optymalizacji...
                </Typography>
              </Box>
            )}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography paragraph>
              Asystent AI wygenerował następujące propozycje zmian w planie lekcji:
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Obecna ocena planu:
                  </Typography>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 1, 
                      textAlign: 'center',
                      backgroundColor: theme.palette.grey[200]
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {optimizationResults?.score.overall}/100
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Przewidywana ocena po zmianach:
                  </Typography>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 1, 
                      textAlign: 'center',
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {optimizationResults?.predictedScore.overall}/100
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Proponowane zmiany:
            </Typography>
            
            <Grid container spacing={2}>
              {optimizationResults?.proposals.map((proposal) => (
                <Grid item xs={12} key={proposal.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        {proposal.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        {proposal.impact.studentComfort !== 0 && (
                          <Chip 
                            size="small" 
                            label={`Komfort uczniów ${proposal.impact.studentComfort > 0 ? '+' : ''}${proposal.impact.studentComfort}`} 
                            color={proposal.impact.studentComfort > 0 ? "success" : "error"}
                          />
                        )}
                        {proposal.impact.teacherComfort !== 0 && (
                          <Chip 
                            size="small" 
                            label={`Komfort nauczycieli ${proposal.impact.teacherComfort > 0 ? '+' : ''}${proposal.impact.teacherComfort}`} 
                            color={proposal.impact.teacherComfort > 0 ? "success" : "error"}
                          />
                        )}
                        {proposal.impact.roomUtilization !== 0 && (
                          <Chip 
                            size="small" 
                            label={`Wykorzystanie sal ${proposal.impact.roomUtilization > 0 ? '+' : ''}${proposal.impact.roomUtilization}`} 
                            color={proposal.impact.roomUtilization > 0 ? "success" : "error"}
                          />
                        )}
                        {proposal.impact.subjectDistribution !== 0 && (
                          <Chip 
                            size="small" 
                            label={`Rozkład przedmiotów ${proposal.impact.subjectDistribution > 0 ? '+' : ''}${proposal.impact.subjectDistribution}`} 
                            color={proposal.impact.subjectDistribution > 0 ? "success" : "error"}
                          />
                        )}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Tooltip title="Zatwierdź zmianę">
                        <IconButton color="success">
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Odrzuć zmianę">
                        <IconButton color="error">
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Pokaż szczegóły">
                        <IconButton>
                          <CompareIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Wstecz
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mr: 1 }}
                startIcon={<SaveIcon />}
              >
                Zastosuj wybrane zmiany
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  if (loading && !optimizationInProgress) {
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
            Kreator optymalizacji planu
            {planData && ` - ${planData.name}`}
          </Typography>
        </Box>
        {activeStep === 4 && (
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
          >
            Nowa optymalizacja
          </Button>
        )}
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {activeStep === 4 ? (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom color="primary">
            Optymalizacja zakończona pomyślnie!
          </Typography>
          <Typography paragraph>
            Zmiany zostały zastosowane do planu lekcji. Nowa ocena planu wynosi {optimizationResults?.predictedScore.overall}/100.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CompareIcon />}
            >
              Porównaj z poprzednią wersją
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
            >
              Nowa optymalizacja
            </Button>
          </Box>
        </Box>
      ) : (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {step.description}
                </Typography>
                {renderStepContent(index)}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
    </Paper>
  );
};

export default PlanOptimizationWizard;
