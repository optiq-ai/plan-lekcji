import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Tooltip,
  Badge,
  Chip,
  useTheme,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import WarningIcon from '@mui/icons-material/Warning';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

// Importy komponentów wizualizacji
import TeacherLoadHeatmap from '../components/visualization/TeacherLoadHeatmap';
import RoomUtilizationChart from '../components/visualization/RoomUtilizationChart';
import ClassSubjectDistribution from '../components/visualization/ClassSubjectDistribution';
import StudentLoadAnalytics from '../components/visualization/StudentLoadAnalytics';
import PlanQualityIndicator from '../components/visualization/PlanQualityIndicator';

// Stylizowany nagłówek strony
const StyledPageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

// Stylizowana karta z nagłówkiem
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
}));

// Stylizowany nagłówek karty
const StyledCardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

// Stylizowana zawartość karty
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  overflow: 'auto',
}));

// Stylizowany pasek zakładek
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
}));

// Stylizowana zakładka
const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'none',
  minWidth: 100,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

/**
 * Strona analizy planu lekcji
 * Umożliwia zaawansowaną analizę i optymalizację planu lekcji
 */
const PlanAnalytics = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Liceum Ogólnokształcące im. Jana Kochanowskiego',
    location: 'Warszawa',
    semester: 'Semestr letni 2025'
  });
  const [planScore, setPlanScore] = useState(67);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: 'Nierównomierne obciążenie',
      description: 'Klasy 1B i 3A mają zbyt trudne dni we wtorek i środę - ponad 80% trudnych przedmiotów.',
      severity: 'warning',
      fixed: false
    },
    {
      id: 2,
      title: 'Nieoptymalne wykorzystanie sal',
      description: 'Sale językowe są niewykorzystane w piątki, podczas gdy brakuje ich we wtorki i środy.',
      severity: 'info',
      fixed: false
    },
    {
      id: 3,
      title: 'Okienka w planach nauczycieli',
      description: '5 nauczycieli ma pojedyncze okienka, które można zoptymalizować, by zapewnić ciągłość.',
      severity: 'warning',
      fixed: false
    }
  ]);

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Symulacja naprawy problemu
  const handleFixProblem = (id) => {
    setProblems(problems.map(problem => 
      problem.id === id ? { ...problem, fixed: true } : problem
    ));
    
    // Aktualizacja wyniku planu
    setPlanScore(planScore + 5);
  };

  // Symulacja naprawy wszystkich problemów
  const handleFixAllProblems = () => {
    setIsOptimizing(true);
    
    // Symulacja procesu optymalizacji
    const interval = setInterval(() => {
      setOptimizationProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setOptimizationComplete(true);
          
          // Oznacz wszystkie problemy jako naprawione
          setProblems(problems.map(problem => ({ ...problem, fixed: true })));
          
          // Aktualizacja wyniku planu
          setPlanScore(93);
          
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  // Symulacja eksportu raportu
  const handleExportReport = () => {
    console.log('Eksport raportu analizy planu');
  };

  return (
    <Box>
      {/* Nagłówek strony */}
      <StyledPageHeader>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Zaawansowana analiza AI
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Inteligentne sugestie i optymalizacja planu lekcji
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportReport}
            sx={{ mr: 1 }}
          >
            Eksportuj raport PDF
          </Button>
        </Box>
      </StyledPageHeader>

      {/* Zakładki analizy */}
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <StyledTab label="Analiza istniejącego planu" />
        <StyledTab label="Generator planu optymalnego" />
        <StyledTab label="Raport efektywności" />
        <StyledTab label="Asystent konwersacyjny" />
      </StyledTabs>

      {tabValue === 0 && (
        <Box>
          {/* Ocena planu */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 4, 
              backgroundColor: '#f5f9ff',
              border: '1px solid #e0e9fc',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Ocena obecnego planu lekcji
              </Typography>
              <Typography variant="body1">
                AI przeanalizowało Twój plan lekcji i wykryło <strong>14</strong> możliwych usprawnień. Obecna ocena:
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: `4px solid ${planScore >= 80 ? '#4caf50' : planScore >= 60 ? '#ff9800' : '#f44336'}`,
                backgroundColor: '#fff',
                position: 'relative'
              }}
            >
              <Typography variant="h4" fontWeight="bold" color={planScore >= 80 ? 'success.main' : planScore >= 60 ? 'warning.main' : 'error.main'}>
                {planScore}
              </Typography>
              <Typography variant="caption" sx={{ position: 'absolute', bottom: '20px' }}>
                /100 punktów
              </Typography>
            </Box>
          </Paper>

          {/* Wskaźniki jakości planu */}
          <Typography variant="h6" gutterBottom>
            Wskaźniki jakości planu
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <StyledCardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Obciążenie uczniów
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    <StudentLoadAnalytics />
                  </Box>
                </StyledCardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <StyledCardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Wykorzystanie sal lekcyjnych
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    <RoomUtilizationChart />
                  </Box>
                </StyledCardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <StyledCardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Rozkład przedmiotów w tygodniu
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    <ClassSubjectDistribution />
                  </Box>
                </StyledCardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <StyledCardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Prognoza potencjalnych konfliktów
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    <PlanQualityIndicator />
                  </Box>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Sugestie AI */}
          <Typography variant="h6" gutterBottom>
            Sugestie AI
          </Typography>
          <Box sx={{ mb: 3 }}>
            {problems.map((problem) => (
              <Paper 
                key={problem.id}
                elevation={0} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  backgroundColor: problem.fixed ? '#e8f5e9' : problem.severity === 'warning' ? '#fff8e1' : '#e3f2fd',
                  border: `1px solid ${problem.fixed ? '#c8e6c9' : problem.severity === 'warning' ? '#ffe0b2' : '#bbdefb'}`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: problem.fixed ? 0.7 : 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexGrow: 1 }}>
                  <Box sx={{ mr: 2, mt: 0.5 }}>
                    {problem.fixed ? (
                      <CheckCircleIcon color="success" />
                    ) : problem.severity === 'warning' ? (
                      <WarningIcon color="warning" />
                    ) : (
                      <InfoIcon color="info" />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Problem: {problem.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {problem.description}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  {problem.fixed ? (
                    <Chip 
                      label="Naprawiono" 
                      color="success" 
                      size="small" 
                      icon={<CheckCircleIcon />} 
                    />
                  ) : (
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="small"
                      onClick={() => handleFixProblem(problem.id)}
                    >
                      Napraw
                    </Button>
                  )}
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Przycisk naprawy wszystkich problemów */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AutoFixHighIcon />}
              onClick={handleFixAllProblems}
              disabled={isOptimizing || optimizationComplete || problems.every(p => p.fixed)}
              sx={{ px: 4, py: 1.5, borderRadius: 8 }}
            >
              Napraw wszystkie problemy
            </Button>
          </Box>

          {/* Pasek postępu optymalizacji */}
          {isOptimizing && (
            <Box sx={{ width: '100%', mb: 3 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Optymalizacja planu w toku...
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={optimizationProgress} 
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Analiza problemów
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {optimizationProgress}% ukończono
                </Typography>
              </Box>
            </Box>
          )}

          {/* Informacja o zakończonej optymalizacji */}
          {optimizationComplete && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 3, 
                backgroundColor: '#e8f5e9',
                border: '1px solid #c8e6c9',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CheckCircleIcon color="success" sx={{ mr: 2 }} />
              <Typography variant="body1">
                Plan został pomyślnie zoptymalizowany! Ocena planu wzrosła z <strong>67</strong> do <strong>93</strong> punktów.
              </Typography>
            </Paper>
          )}

          {/* Inne możliwości analizy */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Inne możliwości analizy
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SmartToyIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
              Przenieś wszystkie lekcje matematyki na poranne godziny
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SmartToyIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
              Zoptymalizuj plan pod kątem zajęć pozalekcyjnych
            </Typography>
          </Box>

          {/* Pasek postępu optymalizacji całego planu */}
          <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                Ogólny poziom optymalizacji planu
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {planScore}% zoptymalizowano
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={planScore} 
              sx={{ 
                height: 10, 
                borderRadius: 5,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: planScore >= 80 ? '#4caf50' : planScore >= 60 ? '#ff9800' : '#f44336',
                }
              }}
            />
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Typography variant="h6" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
          Generator planu optymalnego - zawartość w trakcie implementacji
        </Typography>
      )}

      {tabValue === 2 && (
        <Typography variant="h6" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
          Raport efektywności - zawartość w trakcie implementacji
        </Typography>
      )}

      {tabValue === 3 && (
        <Typography variant="h6" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
          Asystent konwersacyjny - zawartość w trakcie implementacji
        </Typography>
      )}
    </Box>
  );
};

export default PlanAnalytics;
