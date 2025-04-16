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
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent obsługi klas integracyjnych z drugim nauczycielem
 * Umożliwia zarządzanie klasami integracyjnymi i przydzielanie drugiego nauczyciela
 */
const IntegrationClassSupport = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [activeTab, setActiveTab] = useState(0);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newSupportDialogOpen, setNewSupportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newSupportData, setNewSupportData] = useState({
    classId: '',
    mainTeacherId: '',
    supportTeacherId: '',
    subjects: [],
    reason: '',
    startDate: '',
    endDate: '',
    specialNeeds: []
  });
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja ładowania danych
    const mockClasses = [
      {
        id: 1,
        name: '1A',
        studentsCount: 24,
        integrationSupport: {
          active: true,
          mainTeacherId: 1,
          supportTeacherId: 6,
          subjects: [
            { id: 1, name: 'Matematyka', hoursPerWeek: 4 },
            { id: 2, name: 'Fizyka', hoursPerWeek: 3 },
            { id: 4, name: 'Język polski', hoursPerWeek: 4 }
          ],
          specialNeeds: [
            { id: 1, name: 'Dysleksja', studentsCount: 3 },
            { id: 2, name: 'ADHD', studentsCount: 2 },
            { id: 3, name: 'Niepełnosprawność ruchowa', studentsCount: 1 }
          ],
          reason: 'Klasa integracyjna z uczniami o specjalnych potrzebach edukacyjnych',
          startDate: '2024-09-01',
          endDate: '2025-06-30',
          notes: 'Drugi nauczyciel wspiera głównie podczas zajęć matematyki i języka polskiego. Szczególna uwaga na uczniów z dysleksją podczas prac pisemnych.'
        }
      },
      {
        id: 2,
        name: '2B',
        studentsCount: 26,
        integrationSupport: {
          active: true,
          mainTeacherId: 3,
          supportTeacherId: 7,
          subjects: [
            { id: 1, name: 'Matematyka', hoursPerWeek: 4 },
            { id: 3, name: 'Język angielski', hoursPerWeek: 5 }
          ],
          specialNeeds: [
            { id: 4, name: 'Spektrum autyzmu', studentsCount: 1 },
            { id: 5, name: 'Niedosłuch', studentsCount: 1 }
          ],
          reason: 'Wsparcie dla uczniów ze spektrum autyzmu i niedosłuchem',
          startDate: '2024-09-01',
          endDate: '2025-06-30',
          notes: 'Drugi nauczyciel zapewnia indywidualne wsparcie dla ucznia ze spektrum autyzmu. Uczeń z niedosłuchem korzysta z systemu FM podczas lekcji.'
        }
      },
      {
        id: 3,
        name: '3C',
        studentsCount: 25,
        integrationSupport: {
          active: true,
          mainTeacherId: 4,
          supportTeacherId: 8,
          subjects: [
            { id: 1, name: 'Matematyka', hoursPerWeek: 4 },
            { id: 2, name: 'Fizyka', hoursPerWeek: 3 },
            { id: 3, name: 'Język angielski', hoursPerWeek: 5 },
            { id: 4, name: 'Język polski', hoursPerWeek: 4 },
            { id: 5, name: 'Historia', hoursPerWeek: 2 }
          ],
          specialNeeds: [
            { id: 6, name: 'Niepełnosprawność intelektualna w stopniu lekkim', studentsCount: 2 },
            { id: 7, name: 'Zaburzenia zachowania', studentsCount: 3 }
          ],
          reason: 'Klasa integracyjna z pełnym wsparciem drugiego nauczyciela',
          startDate: '2024-09-01',
          endDate: '2025-06-30',
          notes: 'Drugi nauczyciel obecny na wszystkich głównych przedmiotach. Prowadzi dodatkowe zajęcia wyrównawcze po lekcjach.'
        }
      },
      {
        id: 4,
        name: '1D',
        studentsCount: 28,
        integrationSupport: null
      },
      {
        id: 5,
        name: '2C',
        studentsCount: 27,
        integrationSupport: null
      }
    ];
    
    const mockTeachers = [
      { id: 1, name: 'Jan Kowalski', subjects: [4], specialization: null },
      { id: 2, name: 'Anna Nowak', subjects: [3], specialization: null },
      { id: 3, name: 'Piotr Wiśniewski', subjects: [1], specialization: null },
      { id: 4, name: 'Maria Dąbrowska', subjects: [5], specialization: null },
      { id: 5, name: 'Tomasz Lewandowski', subjects: [2], specialization: null },
      { id: 6, name: 'Katarzyna Kowalczyk', subjects: [], specialization: 'Oligofrenopedagogika' },
      { id: 7, name: 'Magdalena Nowakowska', subjects: [], specialization: 'Surdopedagogika' },
      { id: 8, name: 'Adam Nowicki', subjects: [], specialization: 'Pedagogika specjalna' }
    ];
    
    setClasses(mockClasses);
    setTeachers(mockTeachers);
  }, []);
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa wyboru klasy
  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
  };
  
  // Obsługa otwarcia dialogu edycji
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu edycji
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  
  // Obsługa otwarcia dialogu nowego wsparcia
  const handleOpenNewSupportDialog = () => {
    setNewSupportDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu nowego wsparcia
  const handleCloseNewSupportDialog = () => {
    setNewSupportDialogOpen(false);
    setNewSupportData({
      classId: '',
      mainTeacherId: '',
      supportTeacherId: '',
      subjects: [],
      reason: '',
      startDate: '',
      endDate: '',
      specialNeeds: []
    });
  };
  
  // Obsługa zmiany danych nowego wsparcia
  const handleNewSupportDataChange = (field, value) => {
    setNewSupportData({
      ...newSupportData,
      [field]: value
    });
  };
  
  // Obsługa dodania przedmiotu do nowego wsparcia
  const handleAddSubjectToNewSupport = (subjectId, subjectName) => {
    // Sprawdź, czy przedmiot jest już dodany
    if (newSupportData.subjects.some(s => s.id === subjectId)) {
      alert('Ten przedmiot jest już dodany.');
      return;
    }
    
    setNewSupportData({
      ...newSupportData,
      subjects: [
        ...newSupportData.subjects,
        {
          id: subjectId,
          name: subjectName,
          hoursPerWeek: 0
        }
      ]
    });
  };
  
  // Obsługa usunięcia przedmiotu z nowego wsparcia
  const handleRemoveSubjectFromNewSupport = (subjectId) => {
    setNewSupportData({
      ...newSupportData,
      subjects: newSupportData.subjects.filter(s => s.id !== subjectId)
    });
  };
  
  // Obsługa aktualizacji przedmiotu w nowym wsparciu
  const handleUpdateSubjectInNewSupport = (subjectId, field, value) => {
    setNewSupportData({
      ...newSupportData,
      subjects: newSupportData.subjects.map(subject => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            [field]: value
          };
        }
        return subject;
      })
    });
  };
  
  // Obsługa dodania specjalnej potrzeby do nowego wsparcia
  const handleAddSpecialNeedToNewSupport = (needName, studentsCount) => {
    if (!needName) {
      alert('Podaj nazwę specjalnej potrzeby.');
      return;
    }
    
    if (!studentsCount || studentsCount <= 0) {
      alert('Podaj prawidłową liczbę uczniów.');
      return;
    }
    
    setNewSupportData({
      ...newSupportData,
      specialNeeds: [
        ...newSupportData.specialNeeds,
        {
          id: Date.now(), // Unikalny identyfikator
          name: needName,
          studentsCount: parseInt(studentsCount)
        }
      ]
    });
  };
  
  // Obsługa usunięcia specjalnej potrzeby z nowego wsparcia
  const handleRemoveSpecialNeedFromNewSupport = (needId) => {
    setNewSupportData({
      ...newSupportData,
      specialNeeds: newSupportData.specialNeeds.filter(need => need.id !== needId)
    });
  };
  
  // Obsługa utworzenia nowego wsparcia
  const handleCreateNewSupport = () => {
    // Walidacja danych
    if (!newSupportData.classId) {
      alert('Wybierz klasę.');
      return;
    }
    
    if (!newSupportData.mainTeacherId) {
      alert('Wybierz głównego nauczyciela.');
      return;
    }
    
    if (!newSupportData.supportTeacherId) {
      alert('Wybierz nauczyciela wspierającego.');
      return;
    }
    
    if (newSupportData.subjects.length === 0) {
      alert('Dodaj co najmniej jeden przedmiot.');
      return;
    }
    
    if (newSupportData.specialNeeds.length === 0) {
      alert('Dodaj co najmniej jedną specjalną potrzebę.');
      return;
    }
    
    if (!newSupportData.reason) {
      alert('Podaj powód wsparcia integracyjnego.');
      return;
    }
    
    if (!newSupportData.startDate || !newSupportData.endDate) {
      alert('Podaj daty rozpoczęcia i zakończenia.');
      return;
    }
    
    // Tworzenie nowego wsparcia
    const classItem = classes.find(c => c.id === parseInt(newSupportData.classId));
    if (!classItem) return;
    
    const newSupport = {
      active: true,
      mainTeacherId: parseInt(newSupportData.mainTeacherId),
      supportTeacherId: parseInt(newSupportData.supportTeacherId),
      subjects: newSupportData.subjects,
      specialNeeds: newSupportData.specialNeeds,
      reason: newSupportData.reason,
      startDate: newSupportData.startDate,
      endDate: newSupportData.endDate,
      notes: ''
    };
    
    // Aktualizacja klasy
    const updatedClasses = classes.map(c => {
      if (c.id === classItem.id) {
        return {
          ...c,
          integrationSupport: newSupport
        };
      }
      return c;
    });
    
    setClasses(updatedClasses);
    setSelectedClass({
      ...classItem,
      integrationSupport: newSupport
    });
    
    handleCloseNewSupportDialog();
  };
  
  // Obsługa zakończenia wsparcia integracyjnego
  const handleEndIntegrationSupport = () => {
    if (!selectedClass || !selectedClass.integrationSupport) return;
    
    if (window.confirm('Czy na pewno chcesz zakończyć wsparcie integracyjne dla tej klasy?')) {
      // Aktualizacja klasy
      const updatedClasses = classes.map(c => {
        if (c.id === selectedClass.id) {
          return {
            ...c,
            integrationSupport: {
              ...c.integrationSupport,
              active: false,
              endDate: new Date().toISOString().split('T')[0] // Dzisiejsza data
            }
          };
        }
        return c;
      });
      
      setClasses(updatedClasses);
      setSelectedClass({
        ...selectedClass,
        integrationSupport: {
          ...selectedClass.integrationSupport,
          active: false,
          endDate: new Date().toISOString().split('T')[0]
        }
      });
    }
  };
  
  // Obsługa wyszukiwania
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Filtrowanie klas na podstawie wyszukiwania
  const filteredClasses = classes.filter(classItem => 
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (classItem.integrationSupport && classItem.integrationSupport.reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Pobieranie nazwy nauczyciela
  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Nie przypisano';
  };
  
  // Pobieranie specjalizacji nauczyciela
  const getTeacherSpecialization = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher && teacher.specialization ? teacher.specialization : 'Brak specjalizacji';
  };
  
  // Formatowanie daty
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL');
  };
  
  // Obliczanie statusu wsparcia
  const getSupportStatus = (support) => {
    if (!support) return 'brak';
    if (!support.active) return 'zakończone';
    
    const now = new Date();
    const startDate = new Date(support.startDate);
    const endDate = new Date(support.endDate);
    
    if (now < startDate) return 'zaplanowane';
    if (now > endDate) return 'zakończone';
    return 'aktywne';
  };
  
  // Pobieranie koloru statusu
  const getStatusColor = (status) => {
    switch (status) {
      case 'aktywne':
        return theme.palette.success.main;
      case 'zaplanowane':
        return theme.palette.info.main;
      case 'zakończone':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Wsparcie dla klas integracyjnych</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenNewSupportDialog}
          className="robot-button"
        >
          Nowe wsparcie integracyjne
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="integration support tabs">
          <Tab label="Klasy" />
          <Tab label="Statystyki" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Lista klas
                </Typography>
                
                <TextField
                  fullWidth
                  label="Szukaj klasy"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  onChange={handleSearchChange}
                />
                
                <List sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {filteredClasses.map((classItem) => {
                    const supportStatus = getSupportStatus(classItem.integrationSupport);
                    
                    return (
                      <ListItem 
                        key={classItem.id} 
                        button 
                        onClick={() => handleSelectClass(classItem)}
                        selected={selectedClass && selectedClass.id === classItem.id}
                        sx={{ 
                          mb: 1, 
                          borderLeft: `4px solid ${classItem.integrationSupport ? theme.palette.primary.main : 'transparent'}`,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          '&.Mui-selected': {
                            bgcolor: `${theme.palette.primary.main}22`
                          }
                        }}
                      >
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                                Klasa {classItem.name}
                              </Typography>
                              {classItem.integrationSupport && (
                                <Chip 
                                  label={supportStatus} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: getStatusColor(supportStatus),
                                    color: '#fff'
                                  }}
                                />
                              )}
                            </Box>
                          }
                          secondary={`Liczba uczniów: ${classItem.studentsCount}${classItem.integrationSupport ? ` | ${classItem.integrationSupport.specialNeeds.reduce((sum, need) => sum + need.studentsCount, 0)} uczniów ze specjalnymi potrzebami` : ''}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Szczegóły wsparcia integracyjnego
                </Typography>
                
                {selectedClass ? (
                  selectedClass.integrationSupport ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1">
                          Klasa {selectedClass.name} ({selectedClass.studentsCount} uczniów)
                        </Typography>
                        
                        <Box>
                          <Chip 
                            label={getSupportStatus(selectedClass.integrationSupport)} 
                            sx={{ 
                              bgcolor: getStatusColor(getSupportStatus(selectedClass.integrationSupport)),
                              color: '#fff',
                              mr: 1
                            }}
                          />
                        </Box>
                      </Box>
                      
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Powód wsparcia
                          </Typography>
                          <Typography variant="body1" paragraph>
                            {selectedClass.integrationSupport.reason}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Okres
                          </Typography>
                          <Typography variant="body1">
                            {formatDate(selectedClass.integrationSupport.startDate)} - {formatDate(selectedClass.integrationSupport.endDate)}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Główny nauczyciel
                            </Typography>
                            <Typography variant="body1">
                              {getTeacherName(selectedClass.integrationSupport.mainTeacherId)}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Nauczyciel wspierający
                            </Typography>
                            <Typography variant="body1">
                              {getTeacherName(selectedClass.integrationSupport.supportTeacherId)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Specjalizacja: {getTeacherSpecialization(selectedClass.integrationSupport.supportTeacherId)}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Przedmioty objęte wsparciem
                      </Typography>
                      
                      <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Przedmiot</TableCell>
                              <TableCell align="right">Godziny tygodniowo</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedClass.integrationSupport.subjects.map((subject) => (
                              <TableRow key={subject.id}>
                                <TableCell>{subject.name}</TableCell>
                                <TableCell align="right">{subject.hoursPerWeek}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Specjalne potrzeby edukacyjne
                      </Typography>
                      
                      <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Rodzaj potrzeby</TableCell>
                              <TableCell align="right">Liczba uczniów</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedClass.integrationSupport.specialNeeds.map((need) => (
                              <TableRow key={need.id}>
                                <TableCell>{need.name}</TableCell>
                                <TableCell align="right">{need.studentsCount}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold' }}>Razem</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                {selectedClass.integrationSupport.specialNeeds.reduce((sum, need) => sum + need.studentsCount, 0)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Notatki
                      </Typography>
                      
                      <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                        <Typography variant="body2">
                          {selectedClass.integrationSupport.notes || 'Brak notatek'}
                        </Typography>
                      </Paper>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={handleOpenEditDialog}
                          sx={{ mr: 1 }}
                        >
                          Edytuj
                        </Button>
                        
                        {selectedClass.integrationSupport.active && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleEndIntegrationSupport}
                          >
                            Zakończ wsparcie
                          </Button>
                        )}
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" paragraph>
                        Klasa {selectedClass.name} nie ma przypisanego wsparcia integracyjnego.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                          setNewSupportData({
                            ...newSupportData,
                            classId: selectedClass.id.toString()
                          });
                          handleOpenNewSupportDialog();
                        }}
                      >
                        Utwórz wsparcie integracyjne
                      </Button>
                    </Box>
                  )
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      Wybierz klasę, aby zobaczyć szczegóły wsparcia integracyjnego
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statystyki wsparcia integracyjnego
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {classes.filter(c => c.integrationSupport).length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Klas integracyjnych</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {classes.filter(c => c.integrationSupport && getSupportStatus(c.integrationSupport) === 'aktywne').length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Aktywnych</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {(() => {
                          let totalStudents = 0;
                          
                          classes.forEach(classItem => {
                            if (classItem.integrationSupport) {
                              classItem.integrationSupport.specialNeeds.forEach(need => {
                                totalStudents += need.studentsCount;
                              });
                            }
                          });
                          
                          return totalStudents;
                        })()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Uczniów ze specjalnymi potrzebami</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {teachers.filter(t => t.specialization).length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Nauczycieli wspierających</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle1" gutterBottom>
                  Specjalne potrzeby edukacyjne
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Rodzaj potrzeby</TableCell>
                        <TableCell align="right">Liczba uczniów</TableCell>
                        <TableCell align="right">Procent wszystkich</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk potrzeb
                        const needs = {};
                        let totalStudents = 0;
                        
                        classes.forEach(classItem => {
                          if (classItem.integrationSupport) {
                            classItem.integrationSupport.specialNeeds.forEach(need => {
                              if (!needs[need.name]) {
                                needs[need.name] = 0;
                              }
                              needs[need.name] += need.studentsCount;
                              totalStudents += need.studentsCount;
                            });
                          }
                        });
                        
                        return Object.entries(needs)
                          .sort((a, b) => b[1] - a[1])
                          .map(([needName, count]) => (
                            <TableRow key={needName}>
                              <TableCell>{needName}</TableCell>
                              <TableCell align="right">{count}</TableCell>
                              <TableCell align="right">
                                {totalStudents > 0 ? ((count / totalStudents) * 100).toFixed(1) : 0}%
                              </TableCell>
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
                  Przedmioty objęte wsparciem
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Przedmiot</TableCell>
                        <TableCell align="right">Liczba klas</TableCell>
                        <TableCell align="right">Godziny tygodniowo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk przedmiotów
                        const subjectStats = {};
                        
                        classes.forEach(classItem => {
                          if (classItem.integrationSupport) {
                            classItem.integrationSupport.subjects.forEach(subject => {
                              if (!subjectStats[subject.id]) {
                                subjectStats[subject.id] = {
                                  name: subject.name,
                                  count: 0,
                                  hours: 0
                                };
                              }
                              
                              subjectStats[subject.id].count++;
                              subjectStats[subject.id].hours += subject.hoursPerWeek;
                            });
                          }
                        });
                        
                        return Object.values(subjectStats)
                          .sort((a, b) => b.count - a.count)
                          .map((stat, index) => (
                            <TableRow key={index}>
                              <TableCell>{stat.name}</TableCell>
                              <TableCell align="right">{stat.count}</TableCell>
                              <TableCell align="right">{stat.hours}</TableCell>
                            </TableRow>
                          ));
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="h6" gutterBottom>
                  Nauczyciele wspierający
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nauczyciel</TableCell>
                        <TableCell>Specjalizacja</TableCell>
                        <TableCell align="right">Liczba klas</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk nauczycieli wspierających
                        const teacherStats = {};
                        
                        classes.forEach(classItem => {
                          if (classItem.integrationSupport) {
                            const teacherId = classItem.integrationSupport.supportTeacherId;
                            if (!teacherStats[teacherId]) {
                              const teacher = teachers.find(t => t.id === teacherId);
                              teacherStats[teacherId] = {
                                name: teacher ? teacher.name : 'Nieznany',
                                specialization: teacher ? teacher.specialization : 'Brak',
                                count: 0
                              };
                            }
                            
                            teacherStats[teacherId].count++;
                          }
                        });
                        
                        return Object.values(teacherStats)
                          .sort((a, b) => b.count - a.count)
                          .map((stat, index) => (
                            <TableRow key={index}>
                              <TableCell>{stat.name}</TableCell>
                              <TableCell>{stat.specialization || 'Brak'}</TableCell>
                              <TableCell align="right">{stat.count}</TableCell>
                            </TableRow>
                          ));
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Dialog edycji wsparcia integracyjnego */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EditIcon sx={{ mr: 1 }} />
            Edycja wsparcia integracyjnego
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedClass && selectedClass.integrationSupport && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Klasa {selectedClass.name} ({selectedClass.studentsCount} uczniów)
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Powód wsparcia integracyjnego"
                  value={selectedClass.integrationSupport.reason}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data rozpoczęcia"
                  type="date"
                  value={selectedClass.integrationSupport.startDate}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data zakończenia"
                  type="date"
                  value={selectedClass.integrationSupport.endDate}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="main-teacher-label">Główny nauczyciel</InputLabel>
                  <Select
                    labelId="main-teacher-label"
                    value={selectedClass.integrationSupport.mainTeacherId}
                    label="Główny nauczyciel"
                  >
                    {teachers
                      .filter(teacher => !teacher.specialization)
                      .map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="support-teacher-label">Nauczyciel wspierający</InputLabel>
                  <Select
                    labelId="support-teacher-label"
                    value={selectedClass.integrationSupport.supportTeacherId}
                    label="Nauczyciel wspierający"
                  >
                    {teachers
                      .filter(teacher => teacher.specialization)
                      .map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.name} ({teacher.specialization})
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Przedmioty objęte wsparciem
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Przedmiot</TableCell>
                        <TableCell align="right">Godziny tygodniowo</TableCell>
                        <TableCell align="right">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClass.integrationSupport.subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={subject.hoursPerWeek}
                              size="small"
                              InputProps={{ inputProps: { min: 0, max: 10 } }}
                              sx={{ width: 70 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <FormControl sx={{ minWidth: 200, mr: 2 }}>
                    <InputLabel id="add-subject-label">Dodaj przedmiot</InputLabel>
                    <Select
                      labelId="add-subject-label"
                      label="Dodaj przedmiot"
                      value=""
                    >
                      <MenuItem value="1">Matematyka</MenuItem>
                      <MenuItem value="2">Fizyka</MenuItem>
                      <MenuItem value="3">Język angielski</MenuItem>
                      <MenuItem value="4">Język polski</MenuItem>
                      <MenuItem value="5">Historia</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    size="small"
                  >
                    Dodaj
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Specjalne potrzeby edukacyjne
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Rodzaj potrzeby</TableCell>
                        <TableCell align="right">Liczba uczniów</TableCell>
                        <TableCell align="right">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClass.integrationSupport.specialNeeds.map((need) => (
                        <TableRow key={need.id}>
                          <TableCell>{need.name}</TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={need.studentsCount}
                              size="small"
                              InputProps={{ inputProps: { min: 1, max: selectedClass.studentsCount } }}
                              sx={{ width: 70 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <TextField
                    label="Nazwa potrzeby"
                    size="small"
                    sx={{ mr: 2, minWidth: 200 }}
                  />
                  <TextField
                    label="Liczba uczniów"
                    type="number"
                    size="small"
                    InputProps={{ inputProps: { min: 1 } }}
                    sx={{ width: 120, mr: 2 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    size="small"
                  >
                    Dodaj
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Notatki
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={selectedClass.integrationSupport.notes}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Anuluj</Button>
          <Button 
            onClick={handleCloseEditDialog} 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
          >
            Zapisz zmiany
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog nowego wsparcia integracyjnego */}
      <Dialog
        open={newSupportDialogOpen}
        onClose={handleCloseNewSupportDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AddIcon sx={{ mr: 1 }} />
            Nowe wsparcie integracyjne
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Alert severity="info" sx={{ mb: 3 }}>
            Utwórz nowe wsparcie integracyjne dla klasy. Wybierz klasę, nauczycieli, przedmioty i określ specjalne potrzeby edukacyjne.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="class-select-label">Klasa</InputLabel>
                <Select
                  labelId="class-select-label"
                  value={newSupportData.classId}
                  label="Klasa"
                  onChange={(e) => handleNewSupportDataChange('classId', e.target.value)}
                >
                  {classes
                    .filter(classItem => !classItem.integrationSupport || !classItem.integrationSupport.active)
                    .map((classItem) => (
                      <MenuItem key={classItem.id} value={classItem.id}>
                        Klasa {classItem.name} ({classItem.studentsCount} uczniów)
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Powód wsparcia integracyjnego"
                value={newSupportData.reason}
                onChange={(e) => handleNewSupportDataChange('reason', e.target.value)}
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data rozpoczęcia"
                type="date"
                value={newSupportData.startDate}
                onChange={(e) => handleNewSupportDataChange('startDate', e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data zakończenia"
                type="date"
                value={newSupportData.endDate}
                onChange={(e) => handleNewSupportDataChange('endDate', e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="main-teacher-label">Główny nauczyciel</InputLabel>
                <Select
                  labelId="main-teacher-label"
                  value={newSupportData.mainTeacherId}
                  label="Główny nauczyciel"
                  onChange={(e) => handleNewSupportDataChange('mainTeacherId', e.target.value)}
                >
                  {teachers
                    .filter(teacher => !teacher.specialization)
                    .map((teacher) => (
                      <MenuItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="support-teacher-label">Nauczyciel wspierający</InputLabel>
                <Select
                  labelId="support-teacher-label"
                  value={newSupportData.supportTeacherId}
                  label="Nauczyciel wspierający"
                  onChange={(e) => handleNewSupportDataChange('supportTeacherId', e.target.value)}
                >
                  {teachers
                    .filter(teacher => teacher.specialization)
                    .map((teacher) => (
                      <MenuItem key={teacher.id} value={teacher.id}>
                        {teacher.name} ({teacher.specialization})
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Przedmioty objęte wsparciem
              </Typography>
              
              {newSupportData.subjects.length > 0 ? (
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Przedmiot</TableCell>
                        <TableCell align="right">Godziny tygodniowo</TableCell>
                        <TableCell align="right">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newSupportData.subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={subject.hoursPerWeek}
                              onChange={(e) => handleUpdateSubjectInNewSupport(subject.id, 'hoursPerWeek', parseInt(e.target.value))}
                              size="small"
                              InputProps={{ inputProps: { min: 0, max: 10 } }}
                              sx={{ width: 70 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveSubjectFromNewSupport(subject.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Nie wybrano żadnych przedmiotów. Dodaj co najmniej jeden przedmiot.
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 200, mr: 2 }}>
                  <InputLabel id="add-subject-label">Dodaj przedmiot</InputLabel>
                  <Select
                    labelId="add-subject-label"
                    label="Dodaj przedmiot"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        const [id, name] = e.target.value.split('|');
                        handleAddSubjectToNewSupport(parseInt(id), name);
                      }
                    }}
                  >
                    <MenuItem value="1|Matematyka">Matematyka</MenuItem>
                    <MenuItem value="2|Fizyka">Fizyka</MenuItem>
                    <MenuItem value="3|Język angielski">Język angielski</MenuItem>
                    <MenuItem value="4|Język polski">Język polski</MenuItem>
                    <MenuItem value="5|Historia">Historia</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => {
                    const select = document.getElementById('add-subject-label');
                    if (select && select.value) {
                      const [id, name] = select.value.split('|');
                      handleAddSubjectToNewSupport(parseInt(id), name);
                    }
                  }}
                >
                  Dodaj
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Specjalne potrzeby edukacyjne
              </Typography>
              
              {newSupportData.specialNeeds.length > 0 ? (
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Rodzaj potrzeby</TableCell>
                        <TableCell align="right">Liczba uczniów</TableCell>
                        <TableCell align="right">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newSupportData.specialNeeds.map((need) => (
                        <TableRow key={need.id}>
                          <TableCell>{need.name}</TableCell>
                          <TableCell align="right">{need.studentsCount}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveSpecialNeedFromNewSupport(need.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Nie dodano żadnych specjalnych potrzeb. Dodaj co najmniej jedną potrzebę.
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Nazwa potrzeby"
                  size="small"
                  sx={{ mr: 2, minWidth: 200 }}
                  id="need-name-input"
                />
                <TextField
                  label="Liczba uczniów"
                  type="number"
                  size="small"
                  InputProps={{ inputProps: { min: 1 } }}
                  sx={{ width: 120, mr: 2 }}
                  id="need-count-input"
                />
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => {
                    const nameInput = document.getElementById('need-name-input');
                    const countInput = document.getElementById('need-count-input');
                    if (nameInput && countInput) {
                      handleAddSpecialNeedToNewSupport(nameInput.value, countInput.value);
                      nameInput.value = '';
                      countInput.value = '';
                    }
                  }}
                >
                  Dodaj
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewSupportDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreateNewSupport} 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
          >
            Utwórz wsparcie integracyjne
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IntegrationClassSupport;
