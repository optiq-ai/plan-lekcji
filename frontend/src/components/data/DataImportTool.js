import React, { useState } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
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
  DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent importu danych z zewnętrznych systemów
 * Umożliwia import danych z różnych arkuszy organizacyjnych (VULCAN, Krakfin, Wolters Kluwer)
 */
const DataImportTool = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [activeStep, setActiveStep] = useState(0);
  const [importSource, setImportSource] = useState('vulcan');
  const [importType, setImportType] = useState('full');
  const [selectedFile, setSelectedFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('');
  const [importResults, setImportResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [conflictDialogOpen, setConflictDialogOpen] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [conflictResolution, setConflictResolution] = useState({});
  
  // Obsługa zmiany źródła importu
  const handleImportSourceChange = (event) => {
    setImportSource(event.target.value);
  };
  
  // Obsługa zmiany typu importu
  const handleImportTypeChange = (event) => {
    setImportType(event.target.value);
  };
  
  // Obsługa wyboru pliku
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Symulacja podglądu danych
      setTimeout(() => {
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
      }, 1000);
    }
  };
  
  // Obsługa przejścia do następnego kroku
  const handleNext = () => {
    if (activeStep === 2) {
      startImport();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  // Obsługa powrotu do poprzedniego kroku
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Obsługa resetowania importu
  const handleReset = () => {
    setActiveStep(0);
    setSelectedFile(null);
    setImportProgress(0);
    setImportStatus('');
    setImportResults(null);
    setPreviewData(null);
    setConflicts([]);
    setConflictResolution({});
  };
  
  // Symulacja rozpoczęcia importu
  const startImport = () => {
    setLoading(true);
    setImportProgress(0);
    setImportStatus('Przygotowanie do importu...');
    
    // Symulacja procesu importu
    const interval = setInterval(() => {
      setImportProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        
        // Aktualizacja statusu w zależności od postępu
        if (newProgress === 30) {
          setImportStatus('Analizowanie danych...');
        } else if (newProgress === 50) {
          setImportStatus('Wykryto konflikty danych. Wymagane rozwiązanie...');
          
          // Symulacja wykrycia konfliktów
          const mockConflicts = [
            {
              id: 1,
              type: 'teacher',
              name: 'Jan Kowalski',
              description: 'Nauczyciel o tym samym imieniu i nazwisku już istnieje w systemie',
              options: ['Zastąp istniejącego', 'Zachowaj oba (zmień identyfikator)', 'Pomiń']
            },
            {
              id: 2,
              type: 'class',
              name: '1A',
              description: 'Klasa o tej samej nazwie już istnieje w systemie',
              options: ['Zastąp istniejącą', 'Pomiń']
            }
          ];
          
          setConflicts(mockConflicts);
          
          // Inicjalizacja domyślnych rozwiązań konfliktów
          const defaultResolutions = {};
          mockConflicts.forEach(conflict => {
            defaultResolutions[conflict.id] = conflict.options[0];
          });
          
          setConflictResolution(defaultResolutions);
          
          // Otwórz dialog rozwiązywania konfliktów
          setConflictDialogOpen(true);
          
          // Zatrzymaj interwał do czasu rozwiązania konfliktów
          clearInterval(interval);
          return 50;
        } else if (newProgress === 70) {
          setImportStatus('Importowanie danych...');
        } else if (newProgress === 90) {
          setImportStatus('Finalizowanie importu...');
        } else if (newProgress >= 100) {
          setImportStatus('Import zakończony!');
          clearInterval(interval);
          
          // Symulacja wyników importu
          const mockResults = {
            importedData: {
              teachers: 15,
              classes: 12,
              subjects: 18,
              rooms: 25,
              schedules: 120
            },
            warnings: 3,
            errors: 0,
            skipped: 2
          };
          
          setImportResults(mockResults);
          setLoading(false);
          setActiveStep(3); // Przejście do kroku z wynikami
          return 100;
        }
        
        return newProgress;
      });
    }, 800);
  };
  
  // Kontynuacja importu po rozwiązaniu konfliktów
  const continueImportAfterConflicts = () => {
    setConflictDialogOpen(false);
    
    // Symulacja kontynuacji procesu importu
    setImportProgress(60);
    setImportStatus('Importowanie danych po rozwiązaniu konfliktów...');
    
    // Symulacja dalszego procesu importu
    const interval = setInterval(() => {
      setImportProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        
        if (newProgress === 70) {
          setImportStatus('Importowanie danych...');
        } else if (newProgress === 90) {
          setImportStatus('Finalizowanie importu...');
        } else if (newProgress >= 100) {
          setImportStatus('Import zakończony!');
          clearInterval(interval);
          
          // Symulacja wyników importu
          const mockResults = {
            importedData: {
              teachers: 15,
              classes: 12,
              subjects: 18,
              rooms: 25,
              schedules: 120
            },
            warnings: 3,
            errors: 0,
            skipped: 2
          };
          
          setImportResults(mockResults);
          setLoading(false);
          setActiveStep(3); // Przejście do kroku z wynikami
          return 100;
        }
        
        return newProgress;
      });
    }, 800);
  };
  
  // Obsługa zmiany rozwiązania konfliktu
  const handleConflictResolutionChange = (conflictId, resolution) => {
    setConflictResolution({
      ...conflictResolution,
      [conflictId]: resolution
    });
  };
  
  // Obsługa otwarcia podglądu danych
  const handleOpenPreview = () => {
    setPreviewDialogOpen(true);
  };
  
  // Obsługa zamknięcia podglądu danych
  const handleClosePreview = () => {
    setPreviewDialogOpen(false);
  };
  
  // Renderowanie ikony dla typu danych
  const getDataTypeIcon = (type) => {
    switch (type) {
      case 'teacher':
        return <PersonIcon />;
      case 'class':
        return <ClassIcon />;
      case 'subject':
        return <SubjectIcon />;
      case 'room':
        return <MeetingRoomIcon />;
      default:
        return <InfoIcon />;
    }
  };
  
  // Renderowanie nazwy źródła importu
  const getImportSourceName = (source) => {
    switch (source) {
      case 'vulcan':
        return 'VULCAN';
      case 'krakfin':
        return 'Krakfin';
      case 'wolters':
        return 'Wolters Kluwer';
      default:
        return source;
    }
  };
  
  // Renderowanie opisu typu importu
  const getImportTypeDescription = (type) => {
    switch (type) {
      case 'full':
        return 'Import wszystkich danych (nauczyciele, klasy, przedmioty, sale, plany)';
      case 'teachers':
        return 'Import tylko danych nauczycieli';
      case 'classes':
        return 'Import tylko danych klas';
      case 'subjects':
        return 'Import tylko danych przedmiotów';
      case 'rooms':
        return 'Import tylko danych sal';
      case 'schedules':
        return 'Import tylko planów lekcji';
      default:
        return '';
    }
  };
  
  // Kroki importu
  const steps = [
    {
      label: 'Wybierz źródło importu',
      description: 'Określ, z jakiego systemu chcesz zaimportować dane.',
      content: (
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="import-source-label">Źródło importu</InputLabel>
            <Select
              labelId="import-source-label"
              value={importSource}
              label="Źródło importu"
              onChange={handleImportSourceChange}
            >
              <MenuItem value="vulcan">VULCAN</MenuItem>
              <MenuItem value="krakfin">Krakfin</MenuItem>
              <MenuItem value="wolters">Wolters Kluwer</MenuItem>
              <MenuItem value="csv">Plik CSV (uniwersalny)</MenuItem>
              <MenuItem value="excel">Plik Excel (uniwersalny)</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel id="import-type-label">Typ importu</InputLabel>
            <Select
              labelId="import-type-label"
              value={importType}
              label="Typ importu"
              onChange={handleImportTypeChange}
            >
              <MenuItem value="full">Pełny import</MenuItem>
              <MenuItem value="teachers">Tylko nauczyciele</MenuItem>
              <MenuItem value="classes">Tylko klasy</MenuItem>
              <MenuItem value="subjects">Tylko przedmioty</MenuItem>
              <MenuItem value="rooms">Tylko sale</MenuItem>
              <MenuItem value="schedules">Tylko plany lekcji</MenuItem>
            </Select>
          </FormControl>
          
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {getImportTypeDescription(importType)}
          </Typography>
        </Box>
      )
    },
    {
      label: 'Wybierz plik do importu',
      description: 'Wybierz plik z danymi do zaimportowania.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Wybierz plik eksportu z systemu {getImportSourceName(importSource)}. 
              {importSource === 'vulcan' && ' Akceptowane formaty: XML, CSV'}
              {importSource === 'krakfin' && ' Akceptowane formaty: XML, XLSX'}
              {importSource === 'wolters' && ' Akceptowane formaty: XML, JSON'}
              {importSource === 'csv' && ' Akceptowane formaty: CSV'}
              {importSource === 'excel' && ' Akceptowane formaty: XLS, XLSX'}
            </Typography>
          </Alert>
          
          <Box 
            sx={{ 
              border: '2px dashed rgba(77, 171, 245, 0.5)', 
              borderRadius: 2, 
              p: 3, 
              textAlign: 'center',
              bgcolor: 'rgba(77, 171, 245, 0.05)',
              mb: 3
            }}
          >
            <input
              accept=".xml,.csv,.xlsx,.xls,.json"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<FileUploadIcon />}
                sx={{ mb: 2 }}
                className="robot-button"
              >
                Wybierz plik
              </Button>
            </label>
            
            {selectedFile ? (
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {selectedFile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Przeciągnij i upuść plik lub kliknij przycisk powyżej
              </Typography>
            )}
          </Box>
          
          {selectedFile && previewData && (
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleOpenPreview}
                startIcon={<InfoIcon />}
              >
                Podgląd danych
              </Button>
            </Box>
          )}
          
          <Dialog
            open={previewDialogOpen}
            onClose={handleClosePreview}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Podgląd danych do importu</DialogTitle>
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
          
          <Dialog
            open={conflictDialogOpen}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              <WarningIcon sx={{ color: theme.palette.warning.main, verticalAlign: 'middle', mr: 1 }} />
              Wykryto konflikty danych
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" paragraph>
                Podczas importu wykryto konflikty danych. Wybierz sposób rozwiązania każdego konfliktu, aby kontynuować.
              </Typography>
              
              <List>
                {conflicts.map((conflict) => (
                  <ListItem key={conflict.id} sx={{ mb: 2, bgcolor: 'rgba(255, 152, 0, 0.1)', borderRadius: 1, p: 2 }}>
                    <ListItemIcon>
                      {getDataTypeIcon(conflict.type)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={conflict.name}
                      secondary={conflict.description}
                    />
                    <FormControl sx={{ minWidth: 200 }}>
                      <Select
                        value={conflictResolution[conflict.id] || ''}
                        onChange={(e) => handleConflictResolutionChange(conflict.id, e.target.value)}
                        size="small"
                      >
                        {conflict.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={continueImportAfterConflicts}
                variant="contained"
                color="primary"
              >
                Kontynuuj import
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )
    },
    {
      label: 'Konfiguracja i podsumowanie',
      description: 'Sprawdź ustawienia i rozpocznij import.',
      content: (
        <Box sx={{ mt: 2 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Podsumowanie importu
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Źródło importu:</strong> {getImportSourceName(importSource)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Typ importu:</strong> {importType === 'full' ? 'Pełny import' : `Tylko ${importType}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Plik:</strong> {selectedFile ? selectedFile.name : 'Nie wybrano'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Opcje importu
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Zastąp istniejące dane w przypadku konfliktu"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Zachowaj relacje między danymi"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Automatycznie generuj plan po imporcie"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Twórz kopię zapasową przed importem"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <UploadFileIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Import danych</Typography>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className="hologram-card">
            <CardContent>
              {activeStep === 3 ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: 30 }} />
                    <Typography variant="h6">
                      Import zakończony pomyślnie
                    </Typography>
                  </Box>
                  
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Dane zostały pomyślnie zaimportowane z systemu {getImportSourceName(importSource)}.
                  </Alert>
                  
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                        <PersonIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                        <Typography variant="h6">{importResults.importedData.teachers}</Typography>
                        <Typography variant="body2" color="textSecondary">Nauczycieli</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                        <ClassIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                        <Typography variant="h6">{importResults.importedData.classes}</Typography>
                        <Typography variant="body2" color="textSecondary">Klas</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                        <SubjectIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                        <Typography variant="h6">{importResults.importedData.subjects}</Typography>
                        <Typography variant="body2" color="textSecondary">Przedmiotów</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                        <MeetingRoomIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                        <Typography variant="h6">{importResults.importedData.rooms}</Typography>
                        <Typography variant="body2" color="textSecondary">Sal</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                        <ScheduleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                        <Typography variant="h6">{importResults.importedData.schedules}</Typography>
                        <Typography variant="body2" color="textSecondary">Lekcji</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: importResults.errors > 0 ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)' }}>
                        {importResults.errors > 0 ? (
                          <ErrorIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />
                        ) : (
                          <CheckCircleIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
                        )}
                        <Typography variant="h6">{importResults.errors}</Typography>
                        <Typography variant="body2" color="textSecondary">Błędów</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  {importResults.warnings > 0 && (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                      Podczas importu wystąpiło {importResults.warnings} ostrzeżeń. Sprawdź logi importu, aby uzyskać więcej informacji.
                    </Alert>
                  )}
                  
                  {importResults.skipped > 0 && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                      Pominięto {importResults.skipped} elementów podczas importu zgodnie z wybranymi opcjami rozwiązywania konfliktów.
                    </Alert>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<RestartAltIcon />}
                      onClick={handleReset}
                      sx={{ mr: 2 }}
                    >
                      Nowy import
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CloudDownloadIcon />}
                    >
                      Pobierz raport importu
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
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
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                                disabled={
                                  (activeStep === 1 && !selectedFile) ||
                                  loading
                                }
                                className="robot-button"
                              >
                                {activeStep === steps.length - 1 ? 'Rozpocznij import' : 'Dalej'}
                              </Button>
                              <Button
                                disabled={activeStep === 0 || loading}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Wstecz
                              </Button>
                            </div>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  
                  {loading && (
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <CircularProgress variant="determinate" value={importProgress} size={80} thickness={4} sx={{ mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        {importStatus}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Postęp: {importProgress}%
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="hologram-card" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Obsługiwane formaty
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Chip label="VULCAN" color="primary" size="small" />
                  </ListItemIcon>
                  <ListItemText primary="XML, CSV" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Chip label="Krakfin" color="primary" size="small" />
                  </ListItemIcon>
                  <ListItemText primary="XML, XLSX" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Chip label="Wolters Kluwer" color="primary" size="small" />
                  </ListItemIcon>
                  <ListItemText primary="XML, JSON" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Chip label="Uniwersalne" color="primary" size="small" />
                  </ListItemIcon>
                  <ListItemText primary="CSV, XLS, XLSX, JSON" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
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
                  <ListItemText primary="Przed importem wykonaj kopię zapasową danych" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="info" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sprawdź strukturę pliku przed importem" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="info" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Rozwiąż konflikty danych, gdy zostaną wykryte" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="info" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Po imporcie zweryfikuj poprawność danych" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataImportTool;
