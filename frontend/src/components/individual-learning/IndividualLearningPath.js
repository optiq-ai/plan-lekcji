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
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent obsługi indywidualnego toku nauczania (IB)
 * Umożliwia zarządzanie uczniami na indywidualnym toku nauczania
 */
const IndividualLearningPath = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [activeTab, setActiveTab] = useState(0);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newPathDialogOpen, setNewPathDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPathData, setNewPathData] = useState({
    studentId: '',
    subjects: [],
    reason: '',
    startDate: '',
    endDate: '',
    requiresSpecialSupport: false
  });
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja ładowania danych
    const mockStudents = [
      {
        id: 1,
        name: 'Anna Kowalska',
        class: '2A',
        individualPath: {
          active: true,
          reason: 'Uczeń uzdolniony matematycznie, przygotowania do olimpiady',
          startDate: '2025-02-01',
          endDate: '2025-06-30',
          subjects: [
            { id: 1, name: 'Matematyka', teacherId: 3, hoursPerWeek: 4, individualHours: 2 },
            { id: 2, name: 'Fizyka', teacherId: 5, hoursPerWeek: 3, individualHours: 1 }
          ],
          requiresSpecialSupport: false,
          documents: [
            { id: 1, name: 'Wniosek rodzica', date: '2025-01-15', status: 'zatwierdzony' },
            { id: 2, name: 'Opinia psychologa', date: '2025-01-20', status: 'zatwierdzony' }
          ],
          notes: 'Uczeń realizuje rozszerzony program matematyki i fizyki. Zwolniony z obecności na regularnych lekcjach matematyki w poniedziałki i środy.'
        }
      },
      {
        id: 2,
        name: 'Piotr Nowak',
        class: '3B',
        individualPath: {
          active: true,
          reason: 'Program IB - indywidualny tok nauczania języka angielskiego',
          startDate: '2024-09-01',
          endDate: '2025-06-30',
          subjects: [
            { id: 3, name: 'Język angielski', teacherId: 2, hoursPerWeek: 5, individualHours: 3 }
          ],
          requiresSpecialSupport: false,
          documents: [
            { id: 3, name: 'Wniosek rodzica', date: '2024-06-10', status: 'zatwierdzony' },
            { id: 4, name: 'Zaświadczenie o przyjęciu do programu IB', date: '2024-06-15', status: 'zatwierdzony' }
          ],
          notes: 'Uczeń realizuje program IB z języka angielskiego. Zajęcia indywidualne odbywają się we wtorki i czwartki po lekcjach.'
        }
      },
      {
        id: 3,
        name: 'Maria Wiśniewska',
        class: '1C',
        individualPath: {
          active: true,
          reason: 'Długotrwała choroba, nauczanie w domu',
          startDate: '2025-03-15',
          endDate: '2025-05-30',
          subjects: [
            { id: 1, name: 'Matematyka', teacherId: 3, hoursPerWeek: 4, individualHours: 2 },
            { id: 2, name: 'Fizyka', teacherId: 5, hoursPerWeek: 3, individualHours: 1 },
            { id: 3, name: 'Język angielski', teacherId: 2, hoursPerWeek: 5, individualHours: 2 },
            { id: 4, name: 'Język polski', teacherId: 1, hoursPerWeek: 4, individualHours: 2 },
            { id: 5, name: 'Historia', teacherId: 4, hoursPerWeek: 2, individualHours: 1 }
          ],
          requiresSpecialSupport: true,
          documents: [
            { id: 5, name: 'Wniosek rodzica', date: '2025-03-01', status: 'zatwierdzony' },
            { id: 6, name: 'Zaświadczenie lekarskie', date: '2025-03-05', status: 'zatwierdzony' },
            { id: 7, name: 'Opinia poradni psychologiczno-pedagogicznej', date: '2025-03-10', status: 'zatwierdzony' }
          ],
          notes: 'Uczennica realizuje nauczanie w domu ze względu na długotrwałą chorobę. Nauczyciele prowadzą zajęcia online oraz odwiedzają uczennicę w domu 2 razy w tygodniu.'
        }
      },
      {
        id: 4,
        name: 'Tomasz Lewandowski',
        class: '2B',
        individualPath: null
      },
      {
        id: 5,
        name: 'Karolina Dąbrowska',
        class: '3A',
        individualPath: null
      }
    ];
    
    const mockSubjects = [
      { id: 1, name: 'Matematyka' },
      { id: 2, name: 'Fizyka' },
      { id: 3, name: 'Język angielski' },
      { id: 4, name: 'Język polski' },
      { id: 5, name: 'Historia' },
      { id: 6, name: 'Biologia' },
      { id: 7, name: 'Chemia' },
      { id: 8, name: 'Geografia' },
      { id: 9, name: 'Informatyka' },
      { id: 10, name: 'WOS' }
    ];
    
    const mockTeachers = [
      { id: 1, name: 'Jan Kowalski', subjects: [4] },
      { id: 2, name: 'Anna Nowak', subjects: [3] },
      { id: 3, name: 'Piotr Wiśniewski', subjects: [1] },
      { id: 4, name: 'Maria Dąbrowska', subjects: [5, 8, 10] },
      { id: 5, name: 'Tomasz Lewandowski', subjects: [2, 7] },
      { id: 6, name: 'Katarzyna Kowalczyk', subjects: [6, 7] },
      { id: 7, name: 'Magdalena Nowakowska', subjects: [9] }
    ];
    
    setStudents(mockStudents);
    setSubjects(mockSubjects);
    setTeachers(mockTeachers);
  }, []);
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa wyboru ucznia
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };
  
  // Obsługa otwarcia dialogu edycji
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu edycji
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  
  // Obsługa otwarcia dialogu nowej ścieżki
  const handleOpenNewPathDialog = () => {
    setNewPathDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu nowej ścieżki
  const handleCloseNewPathDialog = () => {
    setNewPathDialogOpen(false);
    setNewPathData({
      studentId: '',
      subjects: [],
      reason: '',
      startDate: '',
      endDate: '',
      requiresSpecialSupport: false
    });
  };
  
  // Obsługa zmiany danych nowej ścieżki
  const handleNewPathDataChange = (field, value) => {
    setNewPathData({
      ...newPathData,
      [field]: value
    });
  };
  
  // Obsługa dodania przedmiotu do nowej ścieżki
  const handleAddSubjectToNewPath = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;
    
    // Sprawdź, czy przedmiot jest już dodany
    if (newPathData.subjects.some(s => s.id === subjectId)) {
      alert('Ten przedmiot jest już dodany do ścieżki.');
      return;
    }
    
    // Znajdź domyślnego nauczyciela dla przedmiotu
    const defaultTeacher = teachers.find(t => t.subjects.includes(subjectId));
    
    setNewPathData({
      ...newPathData,
      subjects: [
        ...newPathData.subjects,
        {
          id: subject.id,
          name: subject.name,
          teacherId: defaultTeacher ? defaultTeacher.id : null,
          hoursPerWeek: 0,
          individualHours: 0
        }
      ]
    });
  };
  
  // Obsługa usunięcia przedmiotu z nowej ścieżki
  const handleRemoveSubjectFromNewPath = (subjectId) => {
    setNewPathData({
      ...newPathData,
      subjects: newPathData.subjects.filter(s => s.id !== subjectId)
    });
  };
  
  // Obsługa aktualizacji przedmiotu w nowej ścieżce
  const handleUpdateSubjectInNewPath = (subjectId, field, value) => {
    setNewPathData({
      ...newPathData,
      subjects: newPathData.subjects.map(subject => {
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
  
  // Obsługa utworzenia nowej ścieżki
  const handleCreateNewPath = () => {
    // Walidacja danych
    if (!newPathData.studentId) {
      alert('Wybierz ucznia.');
      return;
    }
    
    if (newPathData.subjects.length === 0) {
      alert('Dodaj co najmniej jeden przedmiot.');
      return;
    }
    
    if (!newPathData.reason) {
      alert('Podaj powód indywidualnego toku nauczania.');
      return;
    }
    
    if (!newPathData.startDate || !newPathData.endDate) {
      alert('Podaj daty rozpoczęcia i zakończenia.');
      return;
    }
    
    // Tworzenie nowej ścieżki
    const student = students.find(s => s.id === parseInt(newPathData.studentId));
    if (!student) return;
    
    const newPath = {
      active: true,
      reason: newPathData.reason,
      startDate: newPathData.startDate,
      endDate: newPathData.endDate,
      subjects: newPathData.subjects,
      requiresSpecialSupport: newPathData.requiresSpecialSupport,
      documents: [],
      notes: ''
    };
    
    // Aktualizacja ucznia
    const updatedStudents = students.map(s => {
      if (s.id === student.id) {
        return {
          ...s,
          individualPath: newPath
        };
      }
      return s;
    });
    
    setStudents(updatedStudents);
    setSelectedStudent({
      ...student,
      individualPath: newPath
    });
    
    handleCloseNewPathDialog();
  };
  
  // Obsługa zakończenia indywidualnego toku nauczania
  const handleEndIndividualPath = () => {
    if (!selectedStudent || !selectedStudent.individualPath) return;
    
    if (window.confirm('Czy na pewno chcesz zakończyć indywidualny tok nauczania dla tego ucznia?')) {
      // Aktualizacja ucznia
      const updatedStudents = students.map(s => {
        if (s.id === selectedStudent.id) {
          return {
            ...s,
            individualPath: {
              ...s.individualPath,
              active: false,
              endDate: new Date().toISOString().split('T')[0] // Dzisiejsza data
            }
          };
        }
        return s;
      });
      
      setStudents(updatedStudents);
      setSelectedStudent({
        ...selectedStudent,
        individualPath: {
          ...selectedStudent.individualPath,
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
  
  // Filtrowanie uczniów na podstawie wyszukiwania
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.individualPath && student.individualPath.reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Pobieranie nazwy nauczyciela
  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Nie przypisano';
  };
  
  // Formatowanie daty
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL');
  };
  
  // Obliczanie statusu ścieżki
  const getPathStatus = (path) => {
    if (!path) return 'brak';
    if (!path.active) return 'zakończona';
    
    const now = new Date();
    const startDate = new Date(path.startDate);
    const endDate = new Date(path.endDate);
    
    if (now < startDate) return 'zaplanowana';
    if (now > endDate) return 'zakończona';
    return 'aktywna';
  };
  
  // Pobieranie koloru statusu
  const getStatusColor = (status) => {
    switch (status) {
      case 'aktywna':
        return theme.palette.success.main;
      case 'zaplanowana':
        return theme.palette.info.main;
      case 'zakończona':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Indywidualny tok nauczania (IB)</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenNewPathDialog}
          className="robot-button"
        >
          Nowy indywidualny tok
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="individual learning tabs">
          <Tab label="Uczniowie" />
          <Tab label="Statystyki" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Lista uczniów
                </Typography>
                
                <TextField
                  fullWidth
                  label="Szukaj ucznia"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  onChange={handleSearchChange}
                />
                
                <List sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {filteredStudents.map((student) => {
                    const pathStatus = getPathStatus(student.individualPath);
                    
                    return (
                      <ListItem 
                        key={student.id} 
                        button 
                        onClick={() => handleSelectStudent(student)}
                        selected={selectedStudent && selectedStudent.id === student.id}
                        sx={{ 
                          mb: 1, 
                          borderLeft: `4px solid ${student.individualPath ? theme.palette.primary.main : 'transparent'}`,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          '&.Mui-selected': {
                            bgcolor: `${theme.palette.primary.main}22`
                          }
                        }}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                                {student.name}
                              </Typography>
                              {student.individualPath && (
                                <Chip 
                                  label={pathStatus} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: getStatusColor(pathStatus),
                                    color: '#fff'
                                  }}
                                />
                              )}
                            </Box>
                          }
                          secondary={`Klasa: ${student.class}${student.individualPath ? ` | ${student.individualPath.subjects.length} przedmiotów` : ''}`}
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
                  Szczegóły indywidualnego toku nauczania
                </Typography>
                
                {selectedStudent ? (
                  selectedStudent.individualPath ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1">
                          {selectedStudent.name} ({selectedStudent.class})
                        </Typography>
                        
                        <Box>
                          <Chip 
                            label={getPathStatus(selectedStudent.individualPath)} 
                            sx={{ 
                              bgcolor: getStatusColor(getPathStatus(selectedStudent.individualPath)),
                              color: '#fff',
                              mr: 1
                            }}
                          />
                          {selectedStudent.individualPath.requiresSpecialSupport && (
                            <Tooltip title="Wymaga specjalnego wsparcia">
                              <Chip 
                                icon={<WarningIcon />}
                                label="Specjalne wsparcie" 
                                color="warning"
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                      
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Powód
                          </Typography>
                          <Typography variant="body1" paragraph>
                            {selectedStudent.individualPath.reason}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Okres
                          </Typography>
                          <Typography variant="body1">
                            {formatDate(selectedStudent.individualPath.startDate)} - {formatDate(selectedStudent.individualPath.endDate)}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Przedmioty objęte indywidualnym tokiem
                      </Typography>
                      
                      <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Przedmiot</TableCell>
                              <TableCell>Nauczyciel</TableCell>
                              <TableCell align="right">Godziny tygodniowo</TableCell>
                              <TableCell align="right">Godziny indywidualne</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedStudent.individualPath.subjects.map((subject) => (
                              <TableRow key={subject.id}>
                                <TableCell>{subject.name}</TableCell>
                                <TableCell>{getTeacherName(subject.teacherId)}</TableCell>
                                <TableCell align="right">{subject.hoursPerWeek}</TableCell>
                                <TableCell align="right">{subject.individualHours}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Dokumenty
                      </Typography>
                      
                      {selectedStudent.individualPath.documents.length > 0 ? (
                        <TableContainer component={Paper} sx={{ mb: 3 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Nazwa dokumentu</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {selectedStudent.individualPath.documents.map((document) => (
                                <TableRow key={document.id}>
                                  <TableCell>{document.name}</TableCell>
                                  <TableCell>{formatDate(document.date)}</TableCell>
                                  <TableCell>
                                    <Chip 
                                      label={document.status} 
                                      size="small" 
                                      color={document.status === 'zatwierdzony' ? 'success' : 'warning'}
                                      variant="outlined"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                          Brak dokumentów
                        </Typography>
                      )}
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Notatki
                      </Typography>
                      
                      <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                        <Typography variant="body2">
                          {selectedStudent.individualPath.notes || 'Brak notatek'}
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
                        
                        {selectedStudent.individualPath.active && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleEndIndividualPath}
                          >
                            Zakończ indywidualny tok
                          </Button>
                        )}
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" paragraph>
                        {selectedStudent.name} nie ma przypisanego indywidualnego toku nauczania.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                          setNewPathData({
                            ...newPathData,
                            studentId: selectedStudent.id.toString()
                          });
                          handleOpenNewPathDialog();
                        }}
                      >
                        Utwórz indywidualny tok
                      </Button>
                    </Box>
                  )
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      Wybierz ucznia, aby zobaczyć szczegóły indywidualnego toku nauczania
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
                  Statystyki indywidualnego toku nauczania
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {students.filter(s => s.individualPath).length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Uczniów na IB</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {students.filter(s => s.individualPath && getPathStatus(s.individualPath) === 'aktywna').length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Aktywnych</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {students.filter(s => s.individualPath && s.individualPath.requiresSpecialSupport).length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Specjalne wsparcie</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {(() => {
                          let totalSubjects = 0;
                          let count = 0;
                          
                          students.forEach(student => {
                            if (student.individualPath) {
                              totalSubjects += student.individualPath.subjects.length;
                              count++;
                            }
                          });
                          
                          return count > 0 ? (totalSubjects / count).toFixed(1) : '0';
                        })()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Śr. przedmiotów</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle1" gutterBottom>
                  Indywidualny tok według klas
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Klasa</TableCell>
                        <TableCell align="right">Liczba uczniów</TableCell>
                        <TableCell align="right">Procent klasy</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk klas
                        const classes = {};
                        const classCounts = {};
                        
                        students.forEach(student => {
                          if (!classCounts[student.class]) {
                            classCounts[student.class] = 0;
                          }
                          classCounts[student.class]++;
                          
                          if (student.individualPath) {
                            if (!classes[student.class]) {
                              classes[student.class] = 0;
                            }
                            classes[student.class]++;
                          }
                        });
                        
                        return Object.entries(classes)
                          .sort((a, b) => a[0].localeCompare(b[0]))
                          .map(([className, count]) => (
                            <TableRow key={className}>
                              <TableCell>{className}</TableCell>
                              <TableCell align="right">{count}</TableCell>
                              <TableCell align="right">
                                {((count / classCounts[className]) * 100).toFixed(1)}%
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
                  Przedmioty na indywidualnym toku
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Przedmiot</TableCell>
                        <TableCell align="right">Liczba uczniów</TableCell>
                        <TableCell align="right">Godziny indywidualne</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk przedmiotów
                        const subjectStats = {};
                        
                        students.forEach(student => {
                          if (student.individualPath) {
                            student.individualPath.subjects.forEach(subject => {
                              if (!subjectStats[subject.id]) {
                                subjectStats[subject.id] = {
                                  name: subject.name,
                                  count: 0,
                                  hours: 0
                                };
                              }
                              
                              subjectStats[subject.id].count++;
                              subjectStats[subject.id].hours += subject.individualHours;
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
                  Nauczyciele prowadzący indywidualny tok
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nauczyciel</TableCell>
                        <TableCell align="right">Liczba uczniów</TableCell>
                        <TableCell align="right">Godziny indywidualne</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk nauczycieli
                        const teacherStats = {};
                        
                        students.forEach(student => {
                          if (student.individualPath) {
                            student.individualPath.subjects.forEach(subject => {
                              if (subject.teacherId) {
                                if (!teacherStats[subject.teacherId]) {
                                  const teacher = teachers.find(t => t.id === subject.teacherId);
                                  teacherStats[subject.teacherId] = {
                                    name: teacher ? teacher.name : 'Nieznany',
                                    count: 0,
                                    hours: 0
                                  };
                                }
                                
                                teacherStats[subject.teacherId].count++;
                                teacherStats[subject.teacherId].hours += subject.individualHours;
                              }
                            });
                          }
                        });
                        
                        return Object.values(teacherStats)
                          .sort((a, b) => b.hours - a.hours)
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Dialog edycji indywidualnego toku */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EditIcon sx={{ mr: 1 }} />
            Edycja indywidualnego toku nauczania
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedStudent && selectedStudent.individualPath && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {selectedStudent.name} ({selectedStudent.class})
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Powód indywidualnego toku nauczania"
                  value={selectedStudent.individualPath.reason}
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
                  value={selectedStudent.individualPath.startDate}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data zakończenia"
                  type="date"
                  value={selectedStudent.individualPath.endDate}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={selectedStudent.individualPath.requiresSpecialSupport} 
                    />
                  }
                  label="Wymaga specjalnego wsparcia"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Przedmioty objęte indywidualnym tokiem
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Przedmiot</TableCell>
                        <TableCell>Nauczyciel</TableCell>
                        <TableCell align="right">Godziny tygodniowo</TableCell>
                        <TableCell align="right">Godziny indywidualne</TableCell>
                        <TableCell align="right">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedStudent.individualPath.subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value={subject.teacherId || ''}
                              >
                                {teachers
                                  .filter(teacher => teacher.subjects.includes(subject.id))
                                  .map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                      {teacher.name}
                                    </MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          </TableCell>
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
                            <TextField
                              type="number"
                              value={subject.individualHours}
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControl sx={{ minWidth: 200, mr: 2 }}>
                    <InputLabel id="add-subject-label">Dodaj przedmiot</InputLabel>
                    <Select
                      labelId="add-subject-label"
                      label="Dodaj przedmiot"
                      value=""
                    >
                      {subjects
                        .filter(subject => !selectedStudent.individualPath.subjects.some(s => s.id === subject.id))
                        .map((subject) => (
                          <MenuItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </MenuItem>
                        ))
                      }
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
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Notatki
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={selectedStudent.individualPath.notes}
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
      
      {/* Dialog nowego indywidualnego toku */}
      <Dialog
        open={newPathDialogOpen}
        onClose={handleCloseNewPathDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AddIcon sx={{ mr: 1 }} />
            Nowy indywidualny tok nauczania
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Alert severity="info" sx={{ mb: 3 }}>
            Utwórz nowy indywidualny tok nauczania dla ucznia. Wybierz ucznia, przedmioty i określ parametry indywidualnego toku.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="student-select-label">Uczeń</InputLabel>
                <Select
                  labelId="student-select-label"
                  value={newPathData.studentId}
                  label="Uczeń"
                  onChange={(e) => handleNewPathDataChange('studentId', e.target.value)}
                >
                  {students
                    .filter(student => !student.individualPath || !student.individualPath.active)
                    .map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.name} ({student.class})
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Powód indywidualnego toku nauczania"
                value={newPathData.reason}
                onChange={(e) => handleNewPathDataChange('reason', e.target.value)}
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
                value={newPathData.startDate}
                onChange={(e) => handleNewPathDataChange('startDate', e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data zakończenia"
                type="date"
                value={newPathData.endDate}
                onChange={(e) => handleNewPathDataChange('endDate', e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={newPathData.requiresSpecialSupport} 
                    onChange={(e) => handleNewPathDataChange('requiresSpecialSupport', e.target.checked)}
                  />
                }
                label="Wymaga specjalnego wsparcia"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Przedmioty objęte indywidualnym tokiem
              </Typography>
              
              {newPathData.subjects.length > 0 ? (
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Przedmiot</TableCell>
                        <TableCell>Nauczyciel</TableCell>
                        <TableCell align="right">Godziny tygodniowo</TableCell>
                        <TableCell align="right">Godziny indywidualne</TableCell>
                        <TableCell align="right">Akcje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newPathData.subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value={subject.teacherId || ''}
                                onChange={(e) => handleUpdateSubjectInNewPath(subject.id, 'teacherId', e.target.value)}
                              >
                                {teachers
                                  .filter(teacher => teacher.subjects.includes(subject.id))
                                  .map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                      {teacher.name}
                                    </MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={subject.hoursPerWeek}
                              onChange={(e) => handleUpdateSubjectInNewPath(subject.id, 'hoursPerWeek', parseInt(e.target.value))}
                              size="small"
                              InputProps={{ inputProps: { min: 0, max: 10 } }}
                              sx={{ width: 70 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={subject.individualHours}
                              onChange={(e) => handleUpdateSubjectInNewPath(subject.id, 'individualHours', parseInt(e.target.value))}
                              size="small"
                              InputProps={{ inputProps: { min: 0, max: 10 } }}
                              sx={{ width: 70 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveSubjectFromNewPath(subject.id)}
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
                        handleAddSubjectToNewPath(parseInt(e.target.value));
                      }
                    }}
                  >
                    {subjects
                      .filter(subject => !newPathData.subjects.some(s => s.id === subject.id))
                      .map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => {
                    const select = document.getElementById('add-subject-label');
                    if (select && select.value) {
                      handleAddSubjectToNewPath(parseInt(select.value));
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
          <Button onClick={handleCloseNewPathDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreateNewPath} 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
          >
            Utwórz indywidualny tok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IndividualLearningPath;
