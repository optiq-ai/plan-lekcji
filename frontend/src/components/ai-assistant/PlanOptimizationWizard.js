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
  Alert,
  Chip
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
                  Asystent AI wygenerował propozycje zmian w planie lekcji.
                </Typography>
              </Box>
            )}
          </Box>
        );
      case 3:
        return (
          <Box>
            {optimizationInProgress ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography>Zastosowywanie wybranych zmian...</Typography>
              </Box>
            ) : (
              <Box>
                <Typography paragraph>
                  Przejrzyj proponowane zmiany i wybierz te, które chcesz zastosować:
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                          Obecna ocena
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h3" color="primary" sx={{ mr: 1 }}>
                            {optimizationResults?.score.overall}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            / 100
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Komfort uczniów:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.score.studentComfort}/100
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Komfort nauczycieli:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.score.teacherComfort}/100
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Wykorzystanie sal:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.score.roomUtilization}/100
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Rozkład przedmiotów:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.score.subjectDistribution}/100
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2, height: '100%', bgcolor: 'success.light' }}>
                        <Typography variant="h6" gutterBottom>
                          Przewidywana ocena
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h3" color="success.dark" sx={{ mr: 1 }}>
                            {optimizationResults?.predictedScore.overall}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            / 100
                          </Typography>
                          <Typography variant="h6" color="success.dark" sx={{ ml: 2 }}>
                            +{optimizationResults?.predictedScore.overall - optimizationResults?.score.overall}
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Komfort uczniów:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.predictedScore.studentComfort}/100
                              <Typography component="span" color="success.dark" sx={{ ml: 1 }}>
                                (+{optimizationResults?.predictedScore.studentComfort - optimizationResults?.score.studentComfort})
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Komfort nauczycieli:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.predictedScore.teacherComfort}/100
                              <Typography component="span" color="success.dark" sx={{ ml: 1 }}>
                                (+{optimizationResults?.predictedScore.teacherComfort - optimizationResults?.score.teacherComfort})
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Wykorzystanie sal:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.predictedScore.roomUtilization}/100
                              <Typography component="span" color="success.dark" sx={{ ml: 1 }}>
                                (+{optimizationResults?.predictedScore.roomUtilization - optimizationResults?.score.roomUtilization})
                              </Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Rozkład przedmiotów:
                            </Typography>
                            <Typography variant="body1">
                              {optimizationResults?.predictedScore.subjectDistribution}/100
                              <Typography component="span" color="success.dark" sx={{ ml: 1 }}>
                                (+{optimizationResults?.predictedScore.subjectDistribution - optimizationResults?.score.subjectDistribution})
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  Proponowane zmiany:
                </Typography>
                
                {optimizationResults?.proposals.map((proposal) => (
                  <Card key={proposal.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="body1">
                          {proposal.description}
                        </Typography>
                        <Box>
                          <Chip 
                            label={`Uczniowie: ${proposal.impact.studentComfort > 0 ? '+' : ''}${proposal.impact.studentComfort}`} 
                            color={proposal.impact.studentComfort > 0 ? "success" : proposal.impact.studentComfort < 0 ? "error" : "default"}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                          <Chip 
                            label={`Nauczyciele: ${proposal.impact.teacherComfort > 0 ? '+' : ''}${proposal.impact.teacherComfort}`} 
                            color={proposal.impact.teacherComfort > 0 ? "success" : proposal.impact.teacherComfort < 0 ? "error" : "default"}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                          <Chip 
                            label={`Sale: ${proposal.impact.roomUtilization > 0 ? '+' : ''}${proposal.impact.roomUtilization}`} 
                            color={proposal.impact.roomUtilization > 0 ? "success" : proposal.impact.roomUtilization < 0 ? "error" : "default"}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                          <Chip 
                            label={`Przedmioty: ${proposal.impact.subjectDistribution > 0 ? '+' : ''}${proposal.impact.subjectDistribution}`} 
                            color={proposal.impact.subjectDistribution > 0 ? "success" : proposal.impact.subjectDistribution < 0 ? "error" : "default"}
                            size="small"
                            sx={{ mb: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<CheckIcon />} color="success">
                        Zastosuj
                      </Button>
                      <Button size="small" startIcon={<CloseIcon />} color="error">
                        Odrzuć
                      </Button>
                      <Button size="small" startIcon={<CompareIcon />}>
                        Porównaj
                      </Button>
                    </CardActions>
                  </Card>
                ))}
                
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
                    Zastosuj wybrane zmiany
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        );
      case 4:
        return (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="h5" color="success.main" gutterBottom>
              Optymalizacja zakończona pomyślnie!
            </Typography>
            <Typography paragraph>
              Wybrane zmiany zostały zastosowane do planu lekcji. Ocena planu wzrosła z {optimizationResults?.score.overall} do {optimizationResults?.predictedScore.overall} punktów.
            </Typography>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}
            >
              Rozpocznij nową optymalizację
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AIIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h5">
            Kreator optymalizacji planu lekcji
          </Typography>
        </Box>
        
        {activeStep < steps.length && (
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography color="text.secondary" paragraph>
                    {step.description}
                  </Typography>
                  {renderStepContent(index)}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
        
        {activeStep === steps.length && renderStepContent(activeStep)}
      </Paper>
    </Box>
  );
};

export default PlanOptimizationWizard;
