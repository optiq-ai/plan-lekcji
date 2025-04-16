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
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CloseIcon from '@mui/icons-material/Close';

// Importy komponentów wizualizacji
import LessonPlanGrid from '../components/visualization/LessonPlanGrid';
import TeacherLoadHeatmap from '../components/visualization/TeacherLoadHeatmap';
import RoomUtilizationChart from '../components/visualization/RoomUtilizationChart';
import ClassSubjectDistribution from '../components/visualization/ClassSubjectDistribution';
import StudentLoadAnalytics from '../components/visualization/StudentLoadAnalytics';
import PlanQualityIndicator from '../components/visualization/PlanQualityIndicator';

// Importy komponentów asystenta AI
import PlanOptimizationWizard from '../components/ai-assistant/PlanOptimizationWizard';
import PlanIssueDetector from '../components/ai-assistant/PlanIssueDetector';

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
 * Strona edytora planu lekcji
 * Umożliwia przeglądanie i edycję planów lekcji dla klas i nauczycieli
 */
const PlanEditor = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedClass, setSelectedClass] = useState('1A');
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Liceum Ogólnokształcące im. Jana Kochanowskiego',
    location: 'Warszawa',
    semester: 'Semestr letni 2025'
  });
  const [classInfo, setClassInfo] = useState({
    name: '1A',
    profile: 'Profil matematyczno-fizyczny',
    tutor: 'mgr Anna Kowalska',
    students: 28,
    room: '103'
  });
  const [planQuality, setPlanQuality] = useState({
    load: 70,
    distribution: 90
  });
  const [aiSuggestion, setAiSuggestion] = useState({
    message: 'Rozważ zamianę geografii z fizyką, aby lepiej zbalansować trudność dnia.',
    severity: 'info'
  });

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Obsługa zmiany wybranej klasy
  const handleClassChange = (className) => {
    setSelectedClass(className);
    
    // Symulacja pobrania danych dla wybranej klasy
    if (className === '1A') {
      setClassInfo({
        name: '1A',
        profile: 'Profil matematyczno-fizyczny',
        tutor: 'mgr Anna Kowalska',
        students: 28,
        room: '103'
      });
    } else if (className === '1B') {
      setClassInfo({
        name: '1B',
        profile: 'Profil humanistyczny',
        tutor: 'mgr Jan Nowak',
        students: 26,
        room: '105'
      });
    } else if (className === '1C') {
      setClassInfo({
        name: '1C',
        profile: 'Profil biologiczno-chemiczny',
        tutor: 'mgr Maria Wiśniewska',
        students: 30,
        room: '107'
      });
    }
  };

  // Symulacja optymalizacji planu
  const handleOptimizePlan = () => {
    // Tutaj byłaby logika optymalizacji planu
    console.log('Optymalizacja planu dla klasy', selectedClass);
    
    // Symulacja aktualizacji wskaźników jakości planu
    setPlanQuality({
      load: 85,
      distribution: 95
    });
    
    // Symulacja nowej sugestii AI
    setAiSuggestion({
      message: 'Plan został zoptymalizowany. Zmniejszono obciążenie w środę i czwartek.',
      severity: 'success'
    });
  };

  // Symulacja wykrywania konfliktów
  const handleDetectConflicts = () => {
    // Tutaj byłaby logika wykrywania konfliktów
    console.log('Wykrywanie konfliktów dla klasy', selectedClass);
    
    // Symulacja nowej sugestii AI
    setAiSuggestion({
      message: 'Wykryto potencjalny konflikt: dwie lekcje matematyki pod rząd we wtorek.',
      severity: 'warning'
    });
  };

  // Symulacja eksportu planu do PDF
  const handleExportPDF = () => {
    console.log('Eksport planu do PDF dla klasy', selectedClass);
  };

  // Symulacja drukowania planu
  const handlePrintPlan = () => {
    console.log('Drukowanie planu dla klasy', selectedClass);
  };

  // Klasy dostępne w systemie
  const availableClasses = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];

  return (
    <Box>
      {/* Nagłówek strony */}
      <StyledPageHeader>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Plan zajęć klas
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {schoolInfo.name} • {schoolInfo.location} • {schoolInfo.semester}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SmartToyIcon />}
            onClick={handleOptimizePlan}
            sx={{ mr: 1 }}
          >
            Optymalizuj plan
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<WarningIcon />}
            onClick={handleDetectConflicts}
            sx={{ mr: 1 }}
          >
            Wykryj konflikty
          </Button>
          <IconButton color="primary" onClick={handleExportPDF} sx={{ mr: 1 }}>
            <Tooltip title="Eksportuj PDF">
              <FileDownloadIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="primary" onClick={handlePrintPlan}>
            <Tooltip title="Drukuj plan">
              <PrintIcon />
            </Tooltip>
          </IconButton>
        </Box>
      </StyledPageHeader>

      {/* Wybór klasy */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {availableClasses.map((className) => (
          <Button
            key={className}
            variant={selectedClass === className ? "contained" : "outlined"}
            color="primary"
            size="small"
            onClick={() => handleClassChange(className)}
            sx={{ 
              borderRadius: '20px',
              minWidth: '50px',
              fontWeight: 'bold'
            }}
          >
            {className}
          </Button>
        ))}
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{ 
            borderRadius: '20px',
            minWidth: '50px',
            fontWeight: 'bold'
          }}
        >
          ...
        </Button>
      </Box>

      {/* Informacje o klasie */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          backgroundColor: '#f5f9ff',
          border: '1px solid #e0e9fc',
          borderRadius: '8px'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="h6">
                Klasa {classInfo.name} - {classInfo.profile}
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Wychowawca: {classInfo.tutor} • Uczniów: {classInfo.students} • Sala wychowawcza: {classInfo.room}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Box sx={{ mr: 3 }}>
                <Typography variant="body2" color="textSecondary">Obciążenie:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 8,
                      bgcolor: '#e0e0e0',
                      borderRadius: 4,
                      mr: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${planQuality.load}%`,
                        height: 8,
                        bgcolor: planQuality.load > 80 ? '#4caf50' : planQuality.load > 60 ? '#ff9800' : '#f44336',
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight="bold" color={planQuality.load > 80 ? 'success.main' : planQuality.load > 60 ? 'warning.main' : 'error.main'}>
                    {planQuality.load}%
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Rozkład:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 8,
                      bgcolor: '#e0e0e0',
                      borderRadius: 4,
                      mr: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${planQuality.distribution}%`,
                        height: 8,
                        bgcolor: planQuality.distribution > 80 ? '#4caf50' : planQuality.distribution > 60 ? '#ff9800' : '#f44336',
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight="bold" color={planQuality.distribution > 80 ? 'success.main' : planQuality.distribution > 60 ? 'warning.main' : 'error.main'}>
                    {planQuality.distribution}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Sugestia AI */}
      {aiSuggestion && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 3, 
            backgroundColor: aiSuggestion.severity === 'success' ? '#e8f5e9' : aiSuggestion.severity === 'warning' ? '#fff8e1' : '#e3f2fd',
            border: `1px solid ${aiSuggestion.severity === 'success' ? '#c8e6c9' : aiSuggestion.severity === 'warning' ? '#ffe0b2' : '#bbdefb'}`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              icon={<SmartToyIcon />} 
              label="Sugestia AI:" 
              size="small"
              sx={{ 
                mr: 2,
                backgroundColor: aiSuggestion.severity === 'success' ? '#4caf50' : aiSuggestion.severity === 'warning' ? '#ff9800' : '#2196f3',
                color: 'white',
                fontWeight: 'bold'
              }} 
            />
            <Typography variant="body2">
              {aiSuggestion.message}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Button 
              size="small" 
              variant="outlined"
              color={aiSuggestion.severity === 'success' ? 'success' : aiSuggestion.severity === 'warning' ? 'warning' : 'primary'}
              sx={{ mr: 1 }}
            >
              {aiSuggestion.severity === 'warning' ? 'Napraw' : 'Zastosuj'}
            </Button>
            <IconButton size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Zakładki widoku */}
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <StyledTab label="Poniedziałek" />
        <StyledTab label="Wtorek" />
        <StyledTab label="Środa" />
        <StyledTab label="Czwartek" />
        <StyledTab label="Piątek" />
        <StyledTab label="Cały tydzień" />
      </StyledTabs>

      {/* Siatka planu lekcji */}
      <Box sx={{ mb: 4 }}>
        <LessonPlanGrid 
          classId={selectedClass} 
          day={tabValue < 5 ? tabValue : null} 
          showFullWeek={tabValue === 5}
        />
      </Box>

      {/* Analiza i wizualizacje */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Analiza planu lekcji {selectedClass}
      </Typography>

      <Grid container spacing={3}>
        {/* Rozkład przedmiotów */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardHeader>
              <Typography variant="h6">Rozkład przedmiotów w tygodniu</Typography>
              <IconButton size="small" color="inherit">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </StyledCardHeader>
            <StyledCardContent>
              <ClassSubjectDistribution classId={selectedClass} />
            </StyledCardContent>
          </StyledCard>
        </Grid>

        {/* Analiza obciążenia uczniów */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardHeader>
              <Typography variant="h6">Obciążenie uczniów</Typography>
              <IconButton size="small" color="inherit">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </StyledCardHeader>
            <StyledCardContent>
              <StudentLoadAnalytics classId={selectedClass} />
            </StyledCardContent>
          </StyledCard>
        </Grid>

        {/* Wykorzystanie sal */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardHeader>
              <Typography variant="h6">Wykorzystanie sal lekcyjnych</Typography>
              <IconButton size="small" color="inherit">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </StyledCardHeader>
            <StyledCardContent>
              <RoomUtilizationChart classId={selectedClass} />
            </StyledCardContent>
          </StyledCard>
        </Grid>

        {/* Wskaźnik jakości planu */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardHeader>
              <Typography variant="h6">Wskaźnik jakości planu</Typography>
              <IconButton size="small" color="inherit">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </StyledCardHeader>
            <StyledCardContent>
              <PlanQualityIndicator classId={selectedClass} />
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlanEditor;
