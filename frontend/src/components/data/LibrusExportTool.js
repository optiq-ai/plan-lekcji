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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HistoryIcon from '@mui/icons-material/History';
import RestoreIcon from '@mui/icons-material/Restore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent eksportu danych do LIBRUS Synergia
 * Umożliwia bezplikowy eksport danych do systemu LIBRUS Synergia
 */
const LibrusExportTool = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [activeTab, setActiveTab] = useState(0);
  const [exportType, setExportType] = useState('full');
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState('');
  const [exportResults, setExportResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [apiCredentials, setApiCredentials] = useState({
    apiKey: '',
    apiSecret: '',
    schoolId: ''
  });
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // disconnected, connecting, connected, error
  const [connectionError, setConnectionError] = useState('');
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      date: '2025-04-10 14:32',
      type: 'full',
      status: 'success',
      items: 245
    },
    {
      id: 2,
      date: '2025-04-05 09:15',
      type: 'schedules',
      status: 'success',
      items: 120
    },
    {
      id: 3,
      date: '2025-03-28 16:45',
      type: 'teachers',
      status: 'error',
      items: 0,
      error: 'Błąd połączenia z API'
    }
  ]);
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa zmiany typu eksportu
  const handleExportTypeChange = (event) => {
    setExportType(event.target.value);
  };
  
  // Obsługa zmiany danych uwierzytelniających API
  const handleCredentialsChange = (field, value) => {
    setApiCredentials({
      ...apiCredentials,
      [field]: value
    });
  };
  
  // Symulacja testowania połączenia z API
  const handleTestConnection = () => {
    if (!apiCredentials.apiKey || !apiCredentials.apiSecret || !apiCredentials.schoolId) {
      setConnectionStatus('error');
      setConnectionError('Wszystkie pola są wymagane');
      return;
    }
    
    setConnectionStatus('connecting');
    setConnectionError('');
    
    // Symulacja opóźnienia połączenia
    setTimeout(() => {
      if (apiCredentials.apiKey.length < 10) {
        setConnectionStatus('error');
        setConnectionError('Nieprawidłowy klucz API');
      } else {
        setConnectionStatus('connected');
        
        // Symulacja danych podglądu
        const mockPreviewData = {
          teachers: [
            { id: 1, name: 'Jan Kowalski', subject: 'Matematyka' },
            { id: 2, name: 'Anna Nowak', subject: 'Język polski' },
            { id: 3, name: 'Piotr Wiśniewski', subject: 'Historia' }
          ],
          classes: [
            { id: 1, name: '1A', studentsCount: 25 },
            { id: 2, name: '1B', studentsCount: 23 },
            { id: 3, name: '2A', studentsCount: 24 }
          ],
          subjects: [
            { id: 1, name: 'Matematyka', hoursPerWeek: 4 },
            { id: 2, name: 'Język polski', hoursPerWeek: 5 },
            { id: 3, name: 'Historia', hoursPerWeek: 2 }
          ],
          rooms: [
            { id: 1, name: 'Sala 101', type: 'Ogólna' },
            { id: 2, name: 'Sala 102', type: 'Komputerowa' },
            { id: 3, name: 'Sala 103', type: 'Językowa' }
          ]
        };
        
        setPreviewData(mockPreviewData);
      }
    }, 2000);
  };
  
  // Symulacja rozpoczęcia eksportu
  const startExport = () => {
    if (connectionStatus !== 'connected') {
      alert('Połącz się z API LIBRUS Synergia przed rozpoczęciem eksportu');
      return;
    }
    
    setLoading(true);
    setExportProgress(0);
    setExportStatus('Przygotowanie do eksportu...');
    
    // Symulacja procesu eksportu
    const interval = setInterval(() => {
      setExportProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        
        // Aktualizacja statusu w zależności od postępu
        if (newProgress === 30) {
          setExportStatus('Przygotowanie danych do eksportu...');
        } else if (newProgress === 50) {
          setExportStatus('Wysyłanie danych do LIBRUS Synergia...');
        } else if (newProgress === 70) {
          setExportStatus('Weryfikacja danych w systemie LIBRUS...');
        } else if (newProgress === 90) {
          setExportStatus('Finalizowanie eksportu...');
        } else if (newProgress >= 100) {
          setExportStatus('Eksport zakończony!');
          clearInterval(interval);
          
          // Symulacja wyników eksportu
          const mockResults = {
            exportedData: {
              teachers: 15,
              classes: 12,
              subjects: 18,
              rooms: 25,
              schedules: 120
            },
            warnings: 2,
            errors: 0,
            skipped: 1
          };
          
          setExportResults(mockResults);
          setLoading(false);
          
          // Dodanie nowego eksportu do historii
          const newExport = {
            id: exportHistory.length + 1,
            date: new Date().toLocaleString('pl-PL', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(',', ''),
            type: exportType,
            status: 'success',
            items: mockResults.exportedData.teachers + 
                  mockResults.exportedData.classes + 
                  mockResults.exportedData.subjects + 
                  mockResults.exportedData.rooms + 
                  mockResults.exportedData.schedules
          };
          
          setExportHistory([newExport, ...exportHistory]);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 800);
  };
  
  // Obsługa otwarcia podglądu danych
  const handleOpenPreview = () => {
    setPreviewDialogOpen(true);
  };
  
  // Obsługa zamknięcia podglądu danych
  const handleClosePreview = () => {
    setPreviewDialogOpen(false);
  };
  
  // Obsługa resetowania eksportu
  const handleReset = () => {
    setExportProgress(0);
    setExportStatus('');
    setExportResults(null);
  };
  
  // Renderowanie nazwy typu eksportu
  const getExportTypeName = (type) => {
    switch (type) {
      case 'full':
        return 'Pełny eksport';
      case 'teachers':
        return 'Tylko nauczyciele';
      case 'classes':
        return 'Tylko klasy';
      case 'subjects':
        return 'Tylko przedmioty';
      case 'rooms':
        return 'Tylko sale';
      case 'schedules':
        return 'Tylko plany lekcji';
      default:
        return type;
    }
  };
  
  // Renderowanie opisu typu eksportu
  const getExportTypeDescription = (type) => {
    switch (type) {
      case 'full':
        return 'Eksport wszystkich danych (nauczyciele, klasy, przedmioty, sale, plany)';
      case 'teachers':
        return 'Eksport tylko danych nauczycieli';
      case 'classes':
        return 'Eksport tylko danych klas';
      case 'subjects':
        return 'Eksport tylko danych przedmiotów';
      case 'rooms':
        return 'Eksport tylko danych sal';
      case 'schedules':
        return 'Eksport tylko planów lekcji';
      default:
        return '';
    }
  };
  
  // Renderowanie ikony dla statusu eksportu
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
      case 'error':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      case 'warning':
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      default:
        return <InfoIcon sx={{ color: theme.palette.info.main }} />;
    }
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CloudUploadIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Eksport do LIBRUS Synergia</Typography>
        </Box>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="librus export tabs">
          <Tab label="Konfiguracja" />
          <Tab label="Eksport" />
          <Tab label="Historia" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Konfiguracja połączenia z LIBRUS Synergia
                </Typography>
                
                <Alert severity="info" sx={{ mb: 3 }}>
                  Aby skonfigurować bezplikowy eksport do LIBRUS Synergia, potrzebujesz danych dostępowych do API.
                  Możesz je uzyskać w panelu administracyjnym LIBRUS Synergia.
                </Alert>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Klucz API"
                      value={apiCredentials.apiKey}
                      onChange={(e) => handleCredentialsChange('apiKey', e.target.value)}
                      margin="normal"
                      required
                      error={connectionStatus === 'error' && !apiCredentials.apiKey}
                      helperText={connectionStatus === 'error' && !apiCredentials.apiKey ? 'Pole wymagane' : ''}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Sekret API"
                      value={apiCredentials.apiSecret}
                      onChange={(e) => handleCredentialsChange('apiSecret', e.target.value)}
                      margin="normal"
                      required
                      type="password"
                      error={connectionStatus === 'error' && !apiCredentials.apiSecret}
                      helperText={connectionStatus === 'error' && !apiCredentials.apiSecret ? 'Pole wymagane' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="ID szkoły"
                      value={apiCredentials.schoolId}
                      onChange={(e) => handleCredentialsChange('schoolId', e.target.value)}
                      margin="normal"
                      required
                      error={connectionStatus === 'error' && !apiCredentials.schoolId}
                      helperText={connectionStatus === 'error' && !apiCredentials.schoolId ? 'Pole wymagane' : ''}
                    />
                  </Grid>
                </Grid>
                
                {connectionStatus === 'error' && connectionError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {connectionError}
                  </Alert>
                )}
                
                {connectionStatus === 'connected' && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Połączono z API LIBRUS Synergia. Możesz teraz rozpocząć eksport danych.
                  </Alert>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTestConnection}
                    disabled={connectionStatus === 'connecting'}
                    startIcon={connectionStatus === 'connecting' ? <CircularProgress size={20} /> : null}
                    className="robot-button"
                  >
                    {connectionStatus === 'connecting' ? 'Łączenie...' : 'Testuj połączenie'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informacje o API LIBRUS Synergia
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Bezplikowy eksport" 
                      secondary="Dane są przesyłane bezpośrednio przez API, bez potrzeby generowania plików pośrednich"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Dwukierunkowa synchronizacja" 
                      secondary="Możliwość importu i eksportu danych w obu kierunkach"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Automatyczna walidacja" 
                      secondary="System automatycznie sprawdza poprawność danych przed ich zapisaniem"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Limity API" 
                      secondary="1000 zapytań dziennie, maksymalnie 100 zapytań na minutę"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card className="hologram-card">
              <CardContent>
                {exportResults ? (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: 30 }} />
                      <Typography variant="h6">
                        Eksport zakończony pomyślnie
                      </Typography>
                    </Box>
                    
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Dane zostały pomyślnie wyeksportowane do systemu LIBRUS Synergia.
                    </Alert>
                    
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                          <PersonIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                          <Typography variant="h6">{exportResults.exportedData.teachers}</Typography>
                          <Typography variant="body2" color="textSecondary">Nauczycieli</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                          <ClassIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                          <Typography variant="h6">{exportResults.exportedData.classes}</Typography>
                          <Typography variant="body2" color="textSecondary">Klas</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                          <SubjectIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                          <Typography variant="h6">{exportResults.exportedData.subjects}</Typography>
                          <Typography variant="body2" color="textSecondary">Przedmiotów</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                          <MeetingRoomIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                          <Typography variant="h6">{exportResults.exportedData.rooms}</Typography>
                          <Typography variant="body2" color="textSecondary">Sal</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                          <ScheduleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                          <Typography variant="h6">{exportResults.exportedData.schedules}</Typography>
                          <Typography variant="body2" color="textSecondary">Lekcji</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: exportResults.errors > 0 ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)' }}>
                          {exportResults.errors > 0 ? (
                            <ErrorIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />
                          ) : (
                            <CheckCircleIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
                          )}
                          <Typography variant="h6">{exportResults.errors}</Typography>
                          <Typography variant="body2" color="textSecondary">Błędów</Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                    
                    {exportResults.warnings > 0 && (
                      <Alert severity="warning" sx={{ mb: 3 }}>
                        Podczas eksportu wystąpiło {exportResults.warnings} ostrzeżeń. Sprawdź logi eksportu, aby uzyskać więcej informacji.
                      </Alert>
                    )}
                    
                    {exportResults.skipped > 0 && (
                      <Alert severity="info" sx={{ mb: 3 }}>
                        Pominięto {exportResults.skipped} elementów podczas eksportu.
                      </Alert>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={handleReset}
                        sx={{ mr: 2 }}
                      >
                        Nowy eksport
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudDownloadIcon />}
                      >
                        Pobierz raport eksportu
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Eksport danych do LIBRUS Synergia
                    </Typography>
                    
                    {connectionStatus !== 'connected' ? (
                      <Alert severity="warning" sx={{ mb: 3 }}>
                        Musisz najpierw połączyć się z API LIBRUS Synergia w zakładce "Konfiguracja".
                      </Alert>
                    ) : (
                      <Alert severity="info" sx={{ mb: 3 }}>
                        Wybierz typ eksportu i rozpocznij proces.
                      </Alert>
                    )}
                    
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel id="export-type-label">Typ eksportu</InputLabel>
                      <Select
                        labelId="export-type-label"
                        value={exportType}
                        label="Typ eksportu"
                        onChange={handleExportTypeChange}
                        disabled={connectionStatus !== 'connected'}
                      >
                        <MenuItem value="full">Pełny eksport</MenuItem>
                        <MenuItem value="teachers">Tylko nauczyciele</MenuItem>
                        <MenuItem value="classes">Tylko klasy</MenuItem>
                        <MenuItem value="subjects">Tylko przedmioty</MenuItem>
                        <MenuItem value="rooms">Tylko sale</MenuItem>
                        <MenuItem value="schedules">Tylko plany lekcji</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                      {getExportTypeDescription(exportType)}
                    </Typography>
                    
                    {connectionStatus === 'connected' && previewData && (
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Button
                          variant="outlined"
                          onClick={handleOpenPreview}
                          startIcon={<InfoIcon />}
                        >
                          Podgląd danych
                        </Button>
                      </Box>
                    )}
                    
                    {loading ? (
                      <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress variant="determinate" value={exportProgress} size={80} thickness={4} sx={{ mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          {exportStatus}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Postęp: {exportProgress}%
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={startExport}
                          disabled={connectionStatus !== 'connected'}
                          startIcon={<CloudUploadIcon />}
                          className="robot-button"
                        >
                          Rozpocznij eksport
                        </Button>
                      </Box>
                    )}
                    
                    <Dialog
                      open={previewDialogOpen}
                      onClose={handleClosePreview}
                      maxWidth="md"
                      fullWidth
                    >
                      <DialogTitle>Podgląd danych do eksportu</DialogTitle>
                      <DialogContent dividers>
                        {previewData && (
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" gutterBottom>
                                <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Nauczyciele ({previewData.teachers.length})
                              </Typography>
                              <List dense>
                                {previewData.teachers.slice(0, 5).map((teacher) => (
                                  <ListItem key={teacher.id}>
                                    <ListItemText 
                                      primary={teacher.name} 
                                      secondary={teacher.subject} 
                                    />
                                  </ListItem>
                                ))}
                                {previewData.teachers.length > 5 && (
                                  <ListItem>
                                    <ListItemText 
                                      primary={`... i ${previewData.teachers.length - 5} więcej`}
                                      primaryTypographyProps={{ color: 'textSecondary' }}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" gutterBottom>
                                <ClassIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Klasy ({previewData.classes.length})
                              </Typography>
                              <List dense>
                                {previewData.classes.slice(0, 5).map((cls) => (
                                  <ListItem key={cls.id}>
                                    <ListItemText 
                                      primary={cls.name} 
                                      secondary={`Liczba uczniów: ${cls.studentsCount}`} 
                                    />
                                  </ListItem>
                                ))}
                                {previewData.classes.length > 5 && (
                                  <ListItem>
                                    <ListItemText 
                                      primary={`... i ${previewData.classes.length - 5} więcej`}
                                      primaryTypographyProps={{ color: 'textSecondary' }}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" gutterBottom>
                                <SubjectIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Przedmioty ({previewData.subjects.length})
                              </Typography>
                              <List dense>
                                {previewData.subjects.slice(0, 5).map((subject) => (
                                  <ListItem key={subject.id}>
                                    <ListItemText 
                                      primary={subject.name} 
                                      secondary={`${subject.hoursPerWeek} godz./tydzień`} 
                                    />
                                  </ListItem>
                                ))}
                                {previewData.subjects.length > 5 && (
                                  <ListItem>
                                    <ListItemText 
                                      primary={`... i ${previewData.subjects.length - 5} więcej`}
                                      primaryTypographyProps={{ color: 'textSecondary' }}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle1" gutterBottom>
                                <MeetingRoomIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Sale ({previewData.rooms.length})
                              </Typography>
                              <List dense>
                                {previewData.rooms.slice(0, 5).map((room) => (
                                  <ListItem key={room.id}>
                                    <ListItemText 
                                      primary={room.name} 
                                      secondary={`Typ: ${room.type}`} 
                                    />
                                  </ListItem>
                                ))}
                                {previewData.rooms.length > 5 && (
                                  <ListItem>
                                    <ListItemText 
                                      primary={`... i ${previewData.rooms.length - 5} więcej`}
                                      primaryTypographyProps={{ color: 'textSecondary' }}
                                    />
                                  </ListItem>
                                )}
                              </List>
                            </Grid>
                          </Grid>
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClosePreview}>Zamknij</Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Wskazówki
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Przed eksportem upewnij się, że dane są kompletne i poprawne" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Eksport pełny zastąpi wszystkie dane w systemie LIBRUS" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Eksport częściowy aktualizuje tylko wybrane dane" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Po eksporcie zweryfikuj dane w systemie LIBRUS" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {activeTab === 2 && (
        <Card className="hologram-card">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Historia eksportów
            </Typography>
            
            {exportHistory.length > 0 ? (
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>Data</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>Typ eksportu</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>Status</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>Liczba elementów</th>
                      <th style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportHistory.map((export_) => (
                      <tr key={export_.id}>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}>{export_.date}</td>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}>
                          <Chip 
                            label={getExportTypeName(export_.type)} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </td>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getStatusIcon(export_.status)}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {export_.status === 'success' ? 'Sukces' : 'Błąd'}
                            </Typography>
                          </Box>
                        </td>
                        <td style={{ textAlign: 'right', padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}>{export_.items}</td>
                        <td style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(224, 224, 224, 0.5)' }}>
                          <Tooltip title="Pobierz raport">
                            <IconButton size="small">
                              <CloudDownloadIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {export_.status === 'success' && (
                            <Tooltip title="Powtórz eksport">
                              <IconButton size="small">
                                <RestartAltIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1">
                  Brak historii eksportów
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default LibrusExportTool;
