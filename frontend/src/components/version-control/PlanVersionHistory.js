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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import RestoreIcon from '@mui/icons-material/Restore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent historii zmian planu lekcji
 * Umożliwia przeglądanie historii zmian i powrót do poprzednich wersji planu
 */
const PlanVersionHistory = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [compareVersions, setCompareVersions] = useState({
    version1: null,
    version2: null
  });
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [expandedVersions, setExpandedVersions] = useState({});
  
  // Przykładowe dane historii zmian
  const [versionHistory, setVersionHistory] = useState([
    {
      id: 1,
      version: 'v1.5',
      date: '2025-04-15 14:32',
      author: 'Jan Kowalski',
      description: 'Aktualizacja planu po zmianie nauczyciela matematyki',
      changes: [
        { type: 'teacher', action: 'replace', details: 'Zmiana nauczyciela matematyki z "Anna Nowak" na "Piotr Wiśniewski" w klasie 2A' },
        { type: 'schedule', action: 'modify', details: 'Przesunięcie lekcji matematyki z wtorku (8:00-8:45) na środę (9:50-10:35) dla klasy 2A' }
      ],
      tags: ['nauczyciel', 'matematyka', 'klasa 2A']
    },
    {
      id: 2,
      version: 'v1.4',
      date: '2025-04-10 09:15',
      author: 'Anna Nowak',
      description: 'Optymalizacja planu lekcji dla klas 1A i 1B',
      changes: [
        { type: 'schedule', action: 'modify', details: 'Zamiana godzin lekcji języka polskiego i historii w klasie 1A' },
        { type: 'schedule', action: 'modify', details: 'Przesunięcie lekcji WF z piątku na poniedziałek dla klasy 1B' },
        { type: 'room', action: 'replace', details: 'Zmiana sali lekcyjnej dla zajęć informatyki klasy 1A z sali 102 na salę 105' }
      ],
      tags: ['optymalizacja', 'klasa 1A', 'klasa 1B']
    },
    {
      id: 3,
      version: 'v1.3',
      date: '2025-04-05 11:45',
      author: 'Piotr Wiśniewski',
      description: 'Dodanie nowego przedmiotu fakultatywnego dla klas trzecich',
      changes: [
        { type: 'subject', action: 'add', details: 'Dodanie przedmiotu "Programowanie" dla klas 3A i 3B' },
        { type: 'schedule', action: 'add', details: 'Dodanie lekcji programowania w czwartki (14:30-16:00) dla klas 3A i 3B' },
        { type: 'teacher', action: 'assign', details: 'Przypisanie nauczyciela Tomasza Lewandowskiego do przedmiotu "Programowanie"' }
      ],
      tags: ['nowy przedmiot', 'programowanie', 'klasy trzecie']
    },
    {
      id: 4,
      version: 'v1.2',
      date: '2025-03-28 16:45',
      author: 'Maria Dąbrowska',
      description: 'Reorganizacja planu po wprowadzeniu systemu dwuzmianowego',
      changes: [
        { type: 'schedule', action: 'modify', details: 'Przesunięcie wszystkich lekcji klas 1A, 1B, 1C na zmianę poranną (8:00-13:30)' },
        { type: 'schedule', action: 'modify', details: 'Przesunięcie wszystkich lekcji klas 2A, 2B, 2C na zmianę popołudniową (13:45-19:15)' },
        { type: 'room', action: 'optimize', details: 'Optymalizacja wykorzystania sal lekcyjnych dla obu zmian' }
      ],
      tags: ['system dwuzmianowy', 'reorganizacja', 'wszystkie klasy']
    },
    {
      id: 5,
      version: 'v1.1',
      date: '2025-03-20 10:30',
      author: 'Jan Kowalski',
      description: 'Korekta planu po uwagach nauczycieli',
      changes: [
        { type: 'schedule', action: 'modify', details: 'Usunięcie "okienek" w planie nauczycieli języka polskiego i matematyki' },
        { type: 'schedule', action: 'modify', details: 'Przesunięcie lekcji WF na późniejsze godziny dla klas 2A i 2B' }
      ],
      tags: ['korekta', 'okienka', 'WF']
    },
    {
      id: 6,
      version: 'v1.0',
      date: '2025-03-15 09:00',
      author: 'System',
      description: 'Wygenerowanie początkowego planu lekcji',
      changes: [
        { type: 'schedule', action: 'generate', details: 'Automatyczne wygenerowanie planu lekcji dla wszystkich klas' },
        { type: 'teacher', action: 'assign', details: 'Przypisanie nauczycieli do przedmiotów zgodnie z kwalifikacjami' },
        { type: 'room', action: 'assign', details: 'Przydzielenie sal lekcyjnych do zajęć' }
      ],
      tags: ['generowanie', 'początkowy plan']
    }
  ]);
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa wyboru wersji
  const handleSelectVersion = (version) => {
    setSelectedVersion(version);
  };
  
  // Obsługa otwarcia dialogu porównania wersji
  const handleOpenCompareDialog = () => {
    setCompareVersions({
      version1: versionHistory[0],
      version2: versionHistory[1]
    });
    setCompareDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu porównania wersji
  const handleCloseCompareDialog = () => {
    setCompareDialogOpen(false);
  };
  
  // Obsługa zmiany wersji do porównania
  const handleCompareVersionChange = (field, versionId) => {
    const version = versionHistory.find(v => v.id === versionId);
    setCompareVersions({
      ...compareVersions,
      [field]: version
    });
  };
  
  // Obsługa otwarcia dialogu przywracania wersji
  const handleOpenRestoreDialog = (version) => {
    setSelectedVersion(version);
    setRestoreDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu przywracania wersji
  const handleCloseRestoreDialog = () => {
    setRestoreDialogOpen(false);
  };
  
  // Obsługa przywracania wersji
  const handleRestoreVersion = () => {
    // Tutaj byłaby logika przywracania wersji
    alert(`Przywrócono wersję ${selectedVersion.version} z dnia ${selectedVersion.date}`);
    
    // Dodanie nowej wersji do historii (przywrócenie tworzy nową wersję)
    const newVersion = {
      id: versionHistory.length + 1,
      version: `v1.${parseFloat(versionHistory[0].version.substring(2)) + 0.1}`,
      date: new Date().toLocaleString('pl-PL', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', ''),
      author: 'Jan Kowalski', // Tutaj byłby aktualny użytkownik
      description: `Przywrócenie wersji ${selectedVersion.version} z dnia ${selectedVersion.date}`,
      changes: [
        { type: 'restore', action: 'restore', details: `Przywrócenie planu do wersji ${selectedVersion.version}` }
      ],
      tags: ['przywrócenie', `wersja ${selectedVersion.version}`]
    };
    
    setVersionHistory([newVersion, ...versionHistory]);
    setRestoreDialogOpen(false);
  };
  
  // Obsługa rozwijania/zwijania szczegółów wersji
  const handleToggleExpand = (versionId) => {
    setExpandedVersions({
      ...expandedVersions,
      [versionId]: !expandedVersions[versionId]
    });
  };
  
  // Renderowanie ikony dla typu zmiany
  const getChangeTypeIcon = (type) => {
    switch (type) {
      case 'teacher':
        return <PersonIcon />;
      case 'class':
        return <ClassIcon />;
      case 'subject':
        return <SubjectIcon />;
      case 'room':
        return <MeetingRoomIcon />;
      case 'schedule':
        return <ScheduleIcon />;
      case 'restore':
        return <RestoreIcon />;
      default:
        return <InfoIcon />;
    }
  };
  
  // Renderowanie koloru dla typu akcji
  const getActionColor = (action) => {
    switch (action) {
      case 'add':
        return theme.palette.success.main;
      case 'remove':
      case 'delete':
        return theme.palette.error.main;
      case 'modify':
      case 'replace':
        return theme.palette.warning.main;
      case 'restore':
        return theme.palette.info.main;
      default:
        return theme.palette.text.primary;
    }
  };
  
  // Renderowanie etykiety dla typu akcji
  const getActionLabel = (action) => {
    switch (action) {
      case 'add':
        return 'Dodanie';
      case 'remove':
      case 'delete':
        return 'Usunięcie';
      case 'modify':
        return 'Modyfikacja';
      case 'replace':
        return 'Zamiana';
      case 'assign':
        return 'Przypisanie';
      case 'optimize':
        return 'Optymalizacja';
      case 'generate':
        return 'Generowanie';
      case 'restore':
        return 'Przywrócenie';
      default:
        return action;
    }
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Historia zmian planu</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CompareArrowsIcon />}
          onClick={handleOpenCompareDialog}
          className="robot-button"
        >
          Porównaj wersje
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="version history tabs">
          <Tab label="Historia zmian" />
          <Tab label="Statystyki zmian" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Historia wersji planu lekcji
                </Typography>
                
                <List>
                  {versionHistory.map((version) => (
                    <React.Fragment key={version.id}>
                      <ListItem 
                        button 
                        onClick={() => handleSelectVersion(version)}
                        selected={selectedVersion && selectedVersion.id === version.id}
                        sx={{ 
                          mb: 1, 
                          borderLeft: `4px solid ${theme.palette.primary.main}`,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          '&.Mui-selected': {
                            bgcolor: `${theme.palette.primary.main}22`
                          }
                        }}
                      >
                        <ListItemIcon>
                          <CalendarTodayIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                                {version.version}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {version.date}
                              </Typography>
                            </Box>
                          }
                          secondary={version.description}
                        />
                        <IconButton onClick={(e) => {
                          e.stopPropagation();
                          handleToggleExpand(version.id);
                        }}>
                          {expandedVersions[version.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </ListItem>
                      
                      <Collapse in={expandedVersions[version.id]} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: 9, pr: 2, pb: 2, mb: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                          <Typography variant="subtitle2" sx={{ pt: 1, pb: 1 }}>
                            Autor: {version.author}
                          </Typography>
                          
                          <Typography variant="subtitle2" sx={{ pb: 1 }}>
                            Zmiany:
                          </Typography>
                          
                          <List dense>
                            {version.changes.map((change, index) => (
                              <ListItem key={index}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  {getChangeTypeIcon(change.type)}
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <Chip 
                                        label={getActionLabel(change.action)} 
                                        size="small" 
                                        sx={{ 
                                          bgcolor: getActionColor(change.action),
                                          color: '#fff',
                                          mr: 1
                                        }}
                                      />
                                      <Typography variant="body2">
                                        {change.details}
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                            {version.tags.map((tag, index) => (
                              <Chip 
                                key={index} 
                                label={tag} 
                                size="small" 
                                variant="outlined"
                              />
                            ))}
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              startIcon={<RestoreIcon />}
                              onClick={() => handleOpenRestoreDialog(version)}
                              sx={{ mr: 1 }}
                            >
                              Przywróć
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            {selectedVersion ? (
              <Card className="hologram-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Szczegóły wersji {selectedVersion.version}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Data utworzenia
                    </Typography>
                    <Typography variant="body1">
                      {selectedVersion.date}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Autor
                    </Typography>
                    <Typography variant="body1">
                      {selectedVersion.author}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Opis
                    </Typography>
                    <Typography variant="body1">
                      {selectedVersion.description}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Zmiany
                  </Typography>
                  
                  <List dense>
                    {selectedVersion.changes.map((change, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          {getChangeTypeIcon(change.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Chip 
                                label={getActionLabel(change.action)} 
                                size="small" 
                                sx={{ 
                                  bgcolor: getActionColor(change.action),
                                  color: '#fff',
                                  mr: 1
                                }}
                              />
                            </Box>
                          }
                          secondary={change.details}
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedVersion.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<RestoreIcon />}
                      onClick={() => handleOpenRestoreDialog(selectedVersion)}
                      className="robot-button"
                    >
                      Przywróć tę wersję
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Card className="hologram-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Informacje o historii zmian
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Wybierz wersję z listy, aby zobaczyć szczegóły.
                  </Alert>
                  
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="System automatycznie zapisuje historię zmian planu lekcji" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Możesz porównać dowolne dwie wersje planu" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Przywrócenie wcześniejszej wersji tworzy nową wersję w historii" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Historia zmian jest przechowywana przez 12 miesięcy" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      )}
      
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statystyki zmian
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">{versionHistory.length}</Typography>
                      <Typography variant="body2" color="textSecondary">Wersji</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {versionHistory.reduce((total, version) => total + version.changes.length, 0)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Zmian</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {new Set(versionHistory.map(version => version.author)).size}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Autorów</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {versionHistory.filter(version => 
                          version.changes.some(change => change.action === 'restore')
                        ).length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Przywróceń</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle1" gutterBottom>
                  Zmiany według typu
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Typ zmiany</TableCell>
                        <TableCell align="right">Liczba</TableCell>
                        <TableCell align="right">Procent</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk typów zmian
                        const changeTypes = {};
                        let totalChanges = 0;
                        
                        versionHistory.forEach(version => {
                          version.changes.forEach(change => {
                            changeTypes[change.type] = (changeTypes[change.type] || 0) + 1;
                            totalChanges++;
                          });
                        });
                        
                        return Object.entries(changeTypes).map(([type, count]) => (
                          <TableRow key={type}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {getChangeTypeIcon(type)}
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">{count}</TableCell>
                            <TableCell align="right">{((count / totalChanges) * 100).toFixed(1)}%</TableCell>
                          </TableRow>
                        ));
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="subtitle1" gutterBottom>
                  Zmiany według akcji
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Akcja</TableCell>
                        <TableCell align="right">Liczba</TableCell>
                        <TableCell align="right">Procent</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk akcji zmian
                        const actionTypes = {};
                        let totalActions = 0;
                        
                        versionHistory.forEach(version => {
                          version.changes.forEach(change => {
                            actionTypes[change.action] = (actionTypes[change.action] || 0) + 1;
                            totalActions++;
                          });
                        });
                        
                        return Object.entries(actionTypes).map(([action, count]) => (
                          <TableRow key={action}>
                            <TableCell>
                              <Chip 
                                label={getActionLabel(action)} 
                                size="small" 
                                sx={{ 
                                  bgcolor: getActionColor(action),
                                  color: '#fff'
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">{count}</TableCell>
                            <TableCell align="right">{((count / totalActions) * 100).toFixed(1)}%</TableCell>
                          </TableRow>
                        ));
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Aktywność autorów
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Autor</TableCell>
                        <TableCell align="right">Wersje</TableCell>
                        <TableCell align="right">Zmiany</TableCell>
                        <TableCell align="right">Ostatnia aktywność</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk autorów
                        const authors = {};
                        
                        versionHistory.forEach(version => {
                          if (!authors[version.author]) {
                            authors[version.author] = {
                              versions: 0,
                              changes: 0,
                              lastActivity: version.date
                            };
                          }
                          
                          authors[version.author].versions++;
                          authors[version.author].changes += version.changes.length;
                          
                          // Aktualizacja ostatniej aktywności (zakładając, że daty są w formacie YYYY-MM-DD HH:MM)
                          if (new Date(version.date) > new Date(authors[version.author].lastActivity)) {
                            authors[version.author].lastActivity = version.date;
                          }
                        });
                        
                        return Object.entries(authors).map(([author, stats]) => (
                          <TableRow key={author}>
                            <TableCell>{author}</TableCell>
                            <TableCell align="right">{stats.versions}</TableCell>
                            <TableCell align="right">{stats.changes}</TableCell>
                            <TableCell align="right">{stats.lastActivity}</TableCell>
                          </TableRow>
                        ));
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="h6" gutterBottom>
                  Popularne tagi
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {(() => {
                    // Obliczanie statystyk tagów
                    const tags = {};
                    
                    versionHistory.forEach(version => {
                      version.tags.forEach(tag => {
                        tags[tag] = (tags[tag] || 0) + 1;
                      });
                    });
                    
                    return Object.entries(tags)
                      .sort((a, b) => b[1] - a[1])
                      .map(([tag, count]) => (
                        <Chip 
                          key={tag} 
                          label={`${tag} (${count})`} 
                          variant="outlined"
                          sx={{ 
                            fontSize: `${Math.min(1.2, 0.8 + (count / 10))}rem`,
                            fontWeight: count > 2 ? 'bold' : 'normal'
                          }}
                        />
                      ));
                  })()}
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  Częstotliwość zmian
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Okres</TableCell>
                        <TableCell align="right">Liczba zmian</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ostatni tydzień</TableCell>
                        <TableCell align="right">2</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ostatni miesiąc</TableCell>
                        <TableCell align="right">5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ostatnie 3 miesiące</TableCell>
                        <TableCell align="right">6</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Dialog porównania wersji */}
      <Dialog
        open={compareDialogOpen}
        onClose={handleCloseCompareDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CompareArrowsIcon sx={{ mr: 1 }} />
            Porównanie wersji planu
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="version1-label">Wersja 1</InputLabel>
                <Select
                  labelId="version1-label"
                  value={compareVersions.version1 ? compareVersions.version1.id : ''}
                  label="Wersja 1"
                  onChange={(e) => handleCompareVersionChange('version1', e.target.value)}
                >
                  {versionHistory.map((version) => (
                    <MenuItem key={`v1-${version.id}`} value={version.id}>
                      {version.version} ({version.date})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="version2-label">Wersja 2</InputLabel>
                <Select
                  labelId="version2-label"
                  value={compareVersions.version2 ? compareVersions.version2.id : ''}
                  label="Wersja 2"
                  onChange={(e) => handleCompareVersionChange('version2', e.target.value)}
                >
                  {versionHistory.map((version) => (
                    <MenuItem key={`v2-${version.id}`} value={version.id}>
                      {version.version} ({version.date})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          {compareVersions.version1 && compareVersions.version2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {compareVersions.version1.version} ({compareVersions.version1.date})
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Autor: {compareVersions.version1.author}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {compareVersions.version1.description}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Zmiany:
                    </Typography>
                    
                    <List dense>
                      {compareVersions.version1.changes.map((change, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            {getChangeTypeIcon(change.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip 
                                  label={getActionLabel(change.action)} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: getActionColor(change.action),
                                    color: '#fff',
                                    mr: 1
                                  }}
                                />
                              </Box>
                            }
                            secondary={change.details}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {compareVersions.version2.version} ({compareVersions.version2.date})
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Autor: {compareVersions.version2.author}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {compareVersions.version2.description}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Zmiany:
                    </Typography>
                    
                    <List dense>
                      {compareVersions.version2.changes.map((change, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            {getChangeTypeIcon(change.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip 
                                  label={getActionLabel(change.action)} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: getActionColor(change.action),
                                    color: '#fff',
                                    mr: 1
                                  }}
                                />
                              </Box>
                            }
                            secondary={change.details}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Różnice między wersjami
                    </Typography>
                    
                    <Alert severity="info" sx={{ mb: 3 }}>
                      Poniżej przedstawiono różnice między wybranymi wersjami planu lekcji.
                    </Alert>
                    
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Element</TableCell>
                            <TableCell>{compareVersions.version1.version}</TableCell>
                            <TableCell>{compareVersions.version2.version}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Liczba zmian</TableCell>
                            <TableCell>{compareVersions.version1.changes.length}</TableCell>
                            <TableCell>{compareVersions.version2.changes.length}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Autor</TableCell>
                            <TableCell>{compareVersions.version1.author}</TableCell>
                            <TableCell>{compareVersions.version2.author}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>{compareVersions.version1.date}</TableCell>
                            <TableCell>{compareVersions.version2.date}</TableCell>
                          </TableRow>
                          {/* Tutaj byłyby bardziej szczegółowe różnice w planie lekcji */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompareDialog}>Zamknij</Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog przywracania wersji */}
      <Dialog
        open={restoreDialogOpen}
        onClose={handleCloseRestoreDialog}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RestoreIcon sx={{ mr: 1 }} />
            Przywracanie wersji planu
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedVersion && (
            <Box>
              <Typography variant="body1" paragraph>
                Czy na pewno chcesz przywrócić plan lekcji do wersji {selectedVersion.version} z dnia {selectedVersion.date}?
              </Typography>
              
              <Alert severity="warning" sx={{ mb: 2 }}>
                Przywrócenie spowoduje utworzenie nowej wersji planu, która będzie kopią wybranej wersji.
                Aktualna wersja planu zostanie zachowana w historii.
              </Alert>
              
              <Typography variant="body2" color="textSecondary">
                Opis wybranej wersji: {selectedVersion.description}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRestoreDialog}>Anuluj</Button>
          <Button 
            onClick={handleRestoreVersion} 
            variant="contained" 
            color="primary"
            startIcon={<RestoreIcon />}
          >
            Przywróć
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlanVersionHistory;
