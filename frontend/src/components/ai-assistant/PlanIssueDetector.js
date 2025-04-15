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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  SmartToy as AIIcon,
  Lightbulb as LightbulbIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  AutoFixHigh as AutoFixIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';

const PlanIssueDetector = ({ planId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);
  const [issues, setIssues] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!planId) return;
      
      try {
        setLoading(true);
        
        // Pobierz dane planu lekcji
        const planResponse = await LessonPlanService.getLessonPlanById(planId);
        setPlanData(planResponse);
        
        // Symulacja pobierania problemów planu
        await fetchIssues();
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych planu:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [planId]);

  // Symulacja pobierania problemów planu
  const fetchIssues = async () => {
    // W rzeczywistej aplikacji byłoby to zapytanie do API
    const mockIssues = [
      {
        id: 1,
        type: 'conflict',
        severity: 'high',
        title: 'Konflikt nauczyciela',
        description: 'Nauczyciel Jan Kowalski ma przypisane dwie lekcje w tym samym czasie (środa, lekcja 3).',
        affectedEntities: ['Nauczyciel: Jan Kowalski', 'Klasa: 3A', 'Klasa: 2B'],
        autoFixAvailable: true
      },
      {
        id: 2,
        type: 'overload',
        severity: 'medium',
        title: 'Przeciążenie nauczyciela',
        description: 'Nauczyciel Anna Nowak ma 8 lekcji w jeden dzień (wtorek).',
        affectedEntities: ['Nauczyciel: Anna Nowak'],
        autoFixAvailable: true
      },
      {
        id: 3,
        type: 'distribution',
        severity: 'medium',
        title: 'Nierównomierny rozkład przedmiotów',
        description: 'Klasa 4C ma wszystkie trudne przedmioty (matematyka, fizyka, chemia) w jeden dzień (poniedziałek).',
        affectedEntities: ['Klasa: 4C'],
        autoFixAvailable: true
      },
      {
        id: 4,
        type: 'room',
        severity: 'low',
        title: 'Nieoptymalne wykorzystanie sali',
        description: 'Sala 102 (laboratorium) jest używana do lekcji, które nie wymagają specjalistycznego wyposażenia.',
        affectedEntities: ['Sala: 102'],
        autoFixAvailable: true
      }
    ];
    
    setIssues(mockIssues);
  };

  // Symulacja skanowania planu w poszukiwaniu problemów
  const handleScanPlan = () => {
    setScanning(true);
    
    // Symulacja opóźnienia skanowania
    setTimeout(() => {
      fetchIssues();
      setScanning(false);
    }, 2000);
  };

  // Symulacja automatycznego naprawiania problemu
  const handleAutoFix = (issueId) => {
    setLoading(true);
    
    // Symulacja opóźnienia naprawiania
    setTimeout(() => {
      // Usuń naprawiony problem z listy
      setIssues(issues.filter(issue => issue.id !== issueId));
      setLoading(false);
    }, 1500);
  };

  // Funkcja do określania ikony problemu na podstawie typu
  const getIssueIcon = (type, severity) => {
    switch (type) {
      case 'conflict':
        return <ErrorIcon color="error" />;
      case 'overload':
        return <WarningIcon color="warning" />;
      case 'distribution':
        return <WarningIcon color="warning" />;
      case 'room':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  // Funkcja do określania koloru chipa na podstawie ważności problemu
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading && !scanning) {
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
            Wykrywacz problemów w planie
            {planData && ` - ${planData.name}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleScanPlan}
          disabled={scanning}
          startIcon={scanning ? <CircularProgress size={20} /> : <LightbulbIcon />}
        >
          {scanning ? 'Skanowanie...' : 'Skanuj plan'}
        </Button>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {issues.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.success.light, borderRadius: 1 }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: theme.palette.success.main, mb: 1 }} />
          <Typography variant="h6" gutterBottom color="success.main">
            Nie wykryto problemów
          </Typography>
          <Typography variant="body2" paragraph>
            Twój plan lekcji wygląda dobrze! Nie wykryto żadnych konfliktów ani problemów.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleScanPlan}
            disabled={scanning}
          >
            Skanuj ponownie
          </Button>
        </Box>
      ) : (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>Wykryto {issues.length} {issues.length === 1 ? 'problem' : issues.length < 5 ? 'problemy' : 'problemów'} w planie lekcji</AlertTitle>
            Asystent AI może automatycznie naprawić niektóre problemy lub zaproponować rozwiązania dla bardziej złożonych przypadków.
          </Alert>
          
          <List>
            {issues.map((issue) => (
              <Paper key={issue.id} elevation={1} sx={{ mb: 2, overflow: 'hidden' }}>
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {issue.autoFixAvailable && (
                        <Tooltip title="Automatycznie napraw problem">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<AutoFixIcon />}
                            onClick={() => handleAutoFix(issue.id)}
                          >
                            Napraw
                          </Button>
                        </Tooltip>
                      )}
                      <Tooltip title="Szczegóły problemu">
                        <IconButton edge="end">
                          <ArrowForwardIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                  sx={{ 
                    borderLeft: `4px solid ${theme.palette[getSeverityColor(issue.severity)].main}`,
                    py: 2
                  }}
                >
                  <ListItemIcon>
                    {getIssueIcon(issue.type, issue.severity)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle1">{issue.title}</Typography>
                        <Chip 
                          label={issue.severity === 'high' ? 'Wysoki' : issue.severity === 'medium' ? 'Średni' : 'Niski'} 
                          color={getSeverityColor(issue.severity)} 
                          size="small" 
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" paragraph>
                          {issue.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {issue.affectedEntities.map((entity, index) => (
                            <Chip 
                              key={index} 
                              label={entity} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
          
          {issues.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleScanPlan}
                disabled={scanning}
              >
                Skanuj ponownie
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AutoFixIcon />}
                onClick={() => issues.forEach(issue => handleAutoFix(issue.id))}
              >
                Napraw wszystkie problemy
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default PlanIssueDetector;
