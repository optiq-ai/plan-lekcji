import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  TextField,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import InfoIcon from '@mui/icons-material/Info';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

/**
 * Komponent wykrywania problemów w planie lekcji
 * Automatycznie analizuje plan i wykrywa potencjalne konflikty i problemy
 */
const PlanIssueDetector = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [scanDate, setScanDate] = useState(null);
  const [issueStats, setIssueStats] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  // Symulacja ładowania danych przy inicjalizacji
  useEffect(() => {
    scanForIssues();
  }, []);

  // Symulacja skanowania planu w poszukiwaniu problemów
  const scanForIssues = () => {
    setLoading(true);
    setSelectedIssue(null);
    
    // Symulacja opóźnienia procesu skanowania
    setTimeout(() => {
      // Symulacja wykrytych problemów
      const mockIssues = [
        {
          id: 1,
          type: 'conflict',
          severity: 'critical',
          title: 'Nakładające się zajęcia nauczyciela',
          description: 'Nauczyciel Jan Nowak ma przypisane dwie lekcje w tym samym czasie (wtorek, 9:50-10:35)',
          affectedEntities: [
            { type: 'teacher', name: 'Jan Nowak', id: 'T001' },
            { type: 'class', name: '1A', id: 'C001' },
            { type: 'class', name: '2B', id: 'C005' }
          ],
          suggestedFix: 'Przenieś lekcję języka polskiego z klasy 1A na inny termin lub przydziel innego nauczyciela',
          details: {
            day: 'Wtorek',
            time: '9:50-10:35',
            subjects: ['Język polski (1A)', 'Język polski (2B)']
          }
        },
        {
          id: 2,
          type: 'room',
          severity: 'critical',
          title: 'Konflikt przydziału sali',
          description: 'Sala 104 ma zaplanowane dwie różne lekcje w tym samym czasie (środa, 11:50-12:35)',
          affectedEntities: [
            { type: 'room', name: 'Sala 104', id: 'R004' },
            { type: 'class', name: '3A', id: 'C007' },
            { type: 'class', name: '2C', id: 'C006' }
          ],
          suggestedFix: 'Przenieś lekcję fizyki klasy 3A do innej dostępnej sali (np. 107)',
          details: {
            day: 'Środa',
            time: '11:50-12:35',
            subjects: ['Fizyka (3A)', 'Chemia (2C)']
          }
        },
        {
          id: 3,
          type: 'load',
          severity: 'high',
          title: 'Nierównomierne obciążenie uczniów',
          description: 'Klasa 2A ma zbyt dużo trudnych przedmiotów pod rząd w czwartek (matematyka, fizyka, chemia)',
          affectedEntities: [
            { type: 'class', name: '2A', id: 'C004' }
          ],
          suggestedFix: 'Przenieś lekcję chemii na inny dzień lub zamień z lżejszym przedmiotem',
          details: {
            day: 'Czwartek',
            time: '8:00-11:30',
            subjects: ['Matematyka', 'Fizyka', 'Chemia']
          }
        },
        {
          id: 4,
          type: 'teacher',
          severity: 'medium',
          title: 'Nieoptymalne okienka nauczyciela',
          description: 'Nauczyciel Alicja Dąbrowska ma pojedyncze okienko w planie (poniedziałek, 10:45-11:30)',
          affectedEntities: [
            { type: 'teacher', name: 'Alicja Dąbrowska', id: 'T004' }
          ],
          suggestedFix: 'Przesuń lekcję geografii z klasy 3B na godzinę 10:45-11:30',
          details: {
            day: 'Poniedziałek',
            schedule: '8:00-9:40, [okienko], 11:50-13:30'
          }
        },
        {
          id: 5,
          type: 'room',
          severity: 'medium',
          title: 'Nieoptymalne wykorzystanie sal specjalistycznych',
          description: 'Sala komputerowa 101 jest niewykorzystana podczas lekcji informatyki (piątek, 11:50-12:35)',
          affectedEntities: [
            { type: 'room', name: 'Sala 101 (komputerowa)', id: 'R001' },
            { type: 'class', name: '1C', id: 'C003' }
          ],
          suggestedFix: 'Przenieś lekcję informatyki klasy 1C do sali komputerowej 101',
          details: {
            day: 'Piątek',
            time: '11:50-12:35',
            currentRoom: 'Sala 105 (ogólna)'
          }
        },
        {
          id: 6,
          type: 'load',
          severity: 'low',
          title: 'Nierównomierny rozkład przedmiotów',
          description: 'Klasa 1B ma wszystkie lekcje matematyki w pierwsze dni tygodnia',
          affectedEntities: [
            { type: 'class', name: '1B', id: 'C002' }
          ],
          suggestedFix: 'Rozłóż lekcje matematyki równomierniej w ciągu tygodnia',
          details: {
            subject: 'Matematyka',
            currentDays: ['Poniedziałek', 'Wtorek', 'Środa'],
            suggestedDays: ['Poniedziałek', 'Środa', 'Piątek']
          }
        }
      ];
      
      // Obliczenie statystyk problemów
      const stats = {
        critical: mockIssues.filter(issue => issue.severity === 'critical').length,
        high: mockIssues.filter(issue => issue.severity === 'high').length,
        medium: mockIssues.filter(issue => issue.severity === 'medium').length,
        low: mockIssues.filter(issue => issue.severity === 'low').length
      };
      
      setIssues(mockIssues);
      setIssueStats(stats);
      setScanDate(new Date());
      setLoading(false);
    }, 2000);
  };

  // Obsługa wyboru problemu
  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
  };

  // Obsługa naprawy problemu
  const handleFixIssue = (issueId) => {
    setLoading(true);
    
    // Symulacja opóźnienia procesu naprawy
    setTimeout(() => {
      // Usunięcie naprawionego problemu z listy
      setIssues(prevIssues => prevIssues.filter(issue => issue.id !== issueId));
      
      // Aktualizacja statystyk
      const removedIssue = issues.find(issue => issue.id === issueId);
      if (removedIssue) {
        setIssueStats(prevStats => ({
          ...prevStats,
          [removedIssue.severity]: prevStats[removedIssue.severity] - 1
        }));
      }
      
      setSelectedIssue(null);
      setLoading(false);
    }, 1500);
  };

  // Obsługa naprawy wszystkich problemów
  const handleFixAllIssues = () => {
    setLoading(true);
    
    // Symulacja opóźnienia procesu naprawy wszystkich problemów
    setTimeout(() => {
      setIssues([]);
      setIssueStats({
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      });
      setSelectedIssue(null);
      setLoading(false);
    }, 3000);
  };

  // Ikony dla typów problemów
  const getIssueIcon = (type) => {
    switch (type) {
      case 'conflict':
        return <ErrorIcon color="error" />;
      case 'room':
        return <MeetingRoomIcon color="warning" />;
      case 'load':
        return <GroupIcon color="info" />;
      case 'teacher':
        return <ScheduleIcon color="action" />;
      default:
        return <BugReportIcon />;
    }
  };

  // Kolor dla poziomu ważności problemu
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return theme.palette.error.main;
      case 'high':
        return theme.palette.warning.main;
      case 'medium':
        return theme.palette.info.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.text.primary;
    }
  };

  // Etykieta dla poziomu ważności problemu
  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'critical':
        return 'Krytyczny';
      case 'high':
        return 'Wysoki';
      case 'medium':
        return 'Średni';
      case 'low':
        return 'Niski';
      default:
        return 'Nieznany';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BugReportIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Wykrywanie problemów w planie</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={scanForIssues}
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Skanuj ponownie
          </Button>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6">
            Analizowanie planu lekcji...
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Wykrywanie konfliktów i problemów w planie
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Wykryte problemy
                  </Typography>
                  <Chip 
                    label={`Łącznie: ${issues.length}`} 
                    color="primary"
                  />
                </Box>
                
                {scanDate && (
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
                    Ostatnie skanowanie: {scanDate.toLocaleString()}
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip 
                    icon={<ErrorIcon />} 
                    label={`Krytyczne: ${issueStats.critical}`} 
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    icon={<WarningIcon />} 
                    label={`Wysokie: ${issueStats.high}`} 
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    icon={<InfoIcon />} 
                    label={`Średnie: ${issueStats.medium}`} 
                    color="info"
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    icon={<CheckCircleIcon />} 
                    label={`Niskie: ${issueStats.low}`} 
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                {issues.length > 0 ? (
                  <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {issues.map((issue) => (
                      <ListItem
                        key={issue.id}
                        button
                        selected={selectedIssue && selectedIssue.id === issue.id}
                        onClick={() => handleIssueSelect(issue)}
                        sx={{ 
                          mb: 1, 
                          borderLeft: `4px solid ${getSeverityColor(issue.severity)}`,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          '&.Mui-selected': {
                            bgcolor: `${getSeverityColor(issue.severity)}22`
                          }
                        }}
                      >
                        <ListItemIcon>
                          {getIssueIcon(issue.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={issue.title}
                          secondary={
                            <Typography variant="body2" noWrap>
                              {issue.description.substring(0, 60)}...
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CheckCircleIcon sx={{ fontSize: 48, color: theme.palette.success.main, mb: 2 }} />
                    <Typography variant="h6">
                      Brak problemów
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Twój plan lekcji nie zawiera żadnych wykrytych konfliktów
                    </Typography>
                  </Box>
                )}
                
                {issues.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleFixAllIssues}
                      disabled={loading}
                    >
                      Napraw wszystkie problemy
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            {selectedIssue ? (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getIssueIcon(selectedIssue.type)}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {selectedIssue.title}
                    </Typography>
                    <Chip 
                      label={getSeverityLabel(selectedIssue.severity)} 
                      size="small"
                      sx={{ 
                        ml: 2, 
                        bgcolor: getSeverityColor(selectedIssue.severity),
                        color: '#fff'
                      }}
                    />
                  </Box>
                  
                  <Alert 
                    severity={
                      selectedIssue.severity === 'critical' || selectedIssue.severity === 'high' 
                        ? 'error' 
                        : selectedIssue.severity === 'medium' 
                          ? 'warning' 
                          : 'info'
                    }
                    sx={{ mb: 3 }}
                  >
                    {selectedIssue.description}
                  </Alert>
                  
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Dotyczy:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {selectedIssue.affectedEntities.map((entity, index) => (
                      <Chip
                        key={index}
                        label={entity.name}
                        icon={
                          entity.type === 'teacher' ? <ScheduleIcon /> :
                          entity.type === 'class' ? <ClassIcon /> :
                          entity.type === 'room' ? <MeetingRoomIcon /> :
                          <InfoIcon />
                        }
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Szczegóły:
                  </Typography>
                  
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    {Object.entries(selectedIssue.details).map(([key, value]) => (
                      <Box key={key} sx={{ display: 'flex', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: 120 }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </Typography>
                        <Typography variant="body2">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                  
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Sugerowane rozwiązanie:
                  </Typography>
                  
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      mb: 3, 
                      bgcolor: `${theme.palette.primary.main}11`,
                      borderColor: theme.palette.primary.main
                    }}
                  >
                    <Typography variant="body2">
                      {selectedIssue.suggestedFix}
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setSelectedIssue(null)}
                      sx={{ mr: 2 }}
                    >
                      Anuluj
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleFixIssue(selectedIssue.id)}
                      disabled={loading}
                    >
                      Napraw problem
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <BugReportIcon sx={{ fontSize: 60, color: theme.palette.text.secondary, mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="textSecondary">
                    Wybierz problem z listy, aby zobaczyć szczegóły
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 400, mx: 'auto', mt: 1 }}>
                    Kliknij na dowolny problem z listy po lewej stronie, aby zobaczyć jego szczegóły i sugerowane rozwiązania
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PlanIssueDetector;
