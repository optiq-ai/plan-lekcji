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
  Autocomplete,
  CircularProgress,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent zarządzania grupami seminaryjnymi
 * Umożliwia ręczne i automatyczne przydzielanie uczniów do grup seminaryjnych
 */
const SeminarGroupManager = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [activeTab, setActiveTab] = useState(0);
  const [students, setStudents] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [autoAssignDialogOpen, setAutoAssignDialogOpen] = useState(false);
  const [autoAssignSettings, setAutoAssignSettings] = useState({
    balanceGroups: true,
    respectPreferences: true,
    avoidConflicts: true,
    maxGroupSize: 15
  });
  const [autoAssignProgress, setAutoAssignProgress] = useState(0);
  const [autoAssignRunning, setAutoAssignRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja ładowania danych
    const mockStudents = Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: `Uczeń ${i + 1}`,
      class: `${Math.floor(i / 20) + 1}${String.fromCharCode(65 + (i % 20) / 5)}`,
      preferences: [
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 5) + 6
      ],
      averageGrade: (Math.random() * 2 + 3).toFixed(2),
      assignedGroups: []
    }));
    
    const mockSeminars = [
      { id: 1, name: 'Matematyka rozszerzona', teacher: 'Jan Kowalski', maxGroups: 3 },
      { id: 2, name: 'Fizyka rozszerzona', teacher: 'Anna Nowak', maxGroups: 2 },
      { id: 3, name: 'Chemia rozszerzona', teacher: 'Piotr Wiśniewski', maxGroups: 2 },
      { id: 4, name: 'Biologia rozszerzona', teacher: 'Maria Dąbrowska', maxGroups: 2 },
      { id: 5, name: 'Geografia rozszerzona', teacher: 'Tomasz Lewandowski', maxGroups: 1 },
      { id: 6, name: 'Historia rozszerzona', teacher: 'Katarzyna Kowalczyk', maxGroups: 2 },
      { id: 7, name: 'Język polski rozszerzony', teacher: 'Magdalena Nowakowska', maxGroups: 3 },
      { id: 8, name: 'Język angielski rozszerzony', teacher: 'Robert Wójcik', maxGroups: 4 },
      { id: 9, name: 'Informatyka rozszerzona', teacher: 'Michał Kowalczyk', maxGroups: 2 },
      { id: 10, name: 'WOS rozszerzony', teacher: 'Agnieszka Kamińska', maxGroups: 1 }
    ];
    
    const mockGroups = [];
    
    // Generowanie grup dla każdego seminarium
    mockSeminars.forEach(seminar => {
      for (let i = 1; i <= seminar.maxGroups; i++) {
        mockGroups.push({
          id: mockGroups.length + 1,
          seminarId: seminar.id,
          name: `Grupa ${i}`,
          dayOfWeek: Math.floor(Math.random() * 5) + 1, // 1-5 (pon-pt)
          startTime: `${Math.floor(Math.random() * 4) + 8}:${Math.random() > 0.5 ? '00' : '30'}`, // 8:00-11:30
          students: []
        });
      }
    });
    
    // Przypisanie studentów do grup (symulacja)
    mockStudents.forEach(student => {
      // Przypisanie do 2-3 grup seminaryjnych
      const numGroups = Math.floor(Math.random() * 2) + 2; // 2-3 grupy
      
      for (let i = 0; i < numGroups; i++) {
        // Wybierz losową grupę z preferencji studenta lub inną losową
        const preferredSeminarId = student.preferences[i] || Math.floor(Math.random() * mockSeminars.length) + 1;
        const eligibleGroups = mockGroups.filter(g => g.seminarId === preferredSeminarId);
        
        if (eligibleGroups.length > 0) {
          const randomGroup = eligibleGroups[Math.floor(Math.random() * eligibleGroups.length)];
          
          // Dodaj studenta do grupy
          randomGroup.students.push(student.id);
          
          // Dodaj grupę do przypisań studenta
          student.assignedGroups.push({
            groupId: randomGroup.id,
            seminarId: randomGroup.seminarId
          });
        }
      }
    });
    
    setStudents(mockStudents);
    setSeminars(mockSeminars);
    setGroups(mockGroups);
  }, []);
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa wyboru seminarium
  const handleSelectSeminar = (seminar) => {
    setSelectedSeminar(seminar);
    setSelectedGroup(null);
    setSelectedStudent(null);
  };
  
  // Obsługa wyboru grupy
  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setSelectedStudent(null);
  };
  
  // Obsługa wyboru studenta
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };
  
  // Obsługa otwarcia dialogu edycji grupy
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu edycji grupy
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  
  // Obsługa otwarcia dialogu automatycznego przydzielania
  const handleOpenAutoAssignDialog = () => {
    setAutoAssignDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu automatycznego przydzielania
  const handleCloseAutoAssignDialog = () => {
    setAutoAssignDialogOpen(false);
    setAutoAssignProgress(0);
    setAutoAssignRunning(false);
  };
  
  // Obsługa zmiany ustawień automatycznego przydzielania
  const handleAutoAssignSettingChange = (setting, value) => {
    setAutoAssignSettings({
      ...autoAssignSettings,
      [setting]: value
    });
  };
  
  // Obsługa rozpoczęcia automatycznego przydzielania
  const handleStartAutoAssign = () => {
    setAutoAssignRunning(true);
    setAutoAssignProgress(0);
    
    // Symulacja procesu przydzielania
    const interval = setInterval(() => {
      setAutoAssignProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Symulacja nowego przydzielenia
          const newGroups = [...groups];
          
          // Resetowanie przypisań
          newGroups.forEach(group => {
            group.students = [];
          });
          
          const newStudents = students.map(student => ({
            ...student,
            assignedGroups: []
          }));
          
          // Przydzielanie studentów do grup na podstawie preferencji
          newStudents.forEach(student => {
            // Przypisanie do 2-3 grup seminaryjnych
            const numGroups = Math.floor(Math.random() * 2) + 2; // 2-3 grupy
            
            for (let i = 0; i < numGroups; i++) {
              // Wybierz grupę z preferencji studenta z większym prawdopodobieństwem
              const preferredSeminarId = autoAssignSettings.respectPreferences && student.preferences[i]
                ? student.preferences[i]
                : Math.floor(Math.random() * seminars.length) + 1;
              
              const eligibleGroups = newGroups.filter(g => g.seminarId === preferredSeminarId);
              
              if (eligibleGroups.length > 0) {
                // Jeśli włączone balansowanie grup, wybierz grupę z najmniejszą liczbą studentów
                let targetGroup;
                
                if (autoAssignSettings.balanceGroups) {
                  targetGroup = eligibleGroups.reduce((min, group) => 
                    group.students.length < min.students.length ? group : min, eligibleGroups[0]);
                } else {
                  targetGroup = eligibleGroups[Math.floor(Math.random() * eligibleGroups.length)];
                }
                
                // Sprawdź, czy grupa nie przekroczyła maksymalnego rozmiaru
                if (targetGroup.students.length < autoAssignSettings.maxGroupSize) {
                  // Dodaj studenta do grupy
                  targetGroup.students.push(student.id);
                  
                  // Dodaj grupę do przypisań studenta
                  student.assignedGroups.push({
                    groupId: targetGroup.id,
                    seminarId: targetGroup.seminarId
                  });
                }
              }
            }
          });
          
          setGroups(newGroups);
          setStudents(newStudents);
          
          setTimeout(() => {
            setAutoAssignRunning(false);
            // Nie zamykamy dialogu automatycznie, aby użytkownik mógł zobaczyć wynik
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };
  
  // Obsługa dodania studenta do grupy
  const handleAddStudentToGroup = (student) => {
    if (!selectedGroup) return;
    
    // Sprawdź, czy student jest już w grupie
    if (selectedGroup.students.includes(student.id)) {
      alert('Ten student jest już przypisany do tej grupy.');
      return;
    }
    
    // Sprawdź, czy student jest już przypisany do innej grupy tego samego seminarium
    const isAlreadyAssignedToSeminar = student.assignedGroups.some(
      assignment => groups.find(g => g.id === assignment.groupId)?.seminarId === selectedGroup.seminarId
    );
    
    if (isAlreadyAssignedToSeminar) {
      alert('Ten student jest już przypisany do innej grupy tego seminarium.');
      return;
    }
    
    // Dodaj studenta do grupy
    const newGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          students: [...group.students, student.id]
        };
      }
      return group;
    });
    
    // Dodaj grupę do przypisań studenta
    const newStudents = students.map(s => {
      if (s.id === student.id) {
        return {
          ...s,
          assignedGroups: [...s.assignedGroups, {
            groupId: selectedGroup.id,
            seminarId: selectedGroup.seminarId
          }]
        };
      }
      return s;
    });
    
    setGroups(newGroups);
    setStudents(newStudents);
    setSelectedGroup({
      ...selectedGroup,
      students: [...selectedGroup.students, student.id]
    });
  };
  
  // Obsługa usunięcia studenta z grupy
  const handleRemoveStudentFromGroup = (studentId) => {
    if (!selectedGroup) return;
    
    // Usuń studenta z grupy
    const newGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          students: group.students.filter(id => id !== studentId)
        };
      }
      return group;
    });
    
    // Usuń grupę z przypisań studenta
    const newStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          assignedGroups: student.assignedGroups.filter(
            assignment => assignment.groupId !== selectedGroup.id
          )
        };
      }
      return student;
    });
    
    setGroups(newGroups);
    setStudents(newStudents);
    setSelectedGroup({
      ...selectedGroup,
      students: selectedGroup.students.filter(id => id !== studentId)
    });
  };
  
  // Obsługa wyszukiwania
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Filtrowanie studentów na podstawie wyszukiwania
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Pobieranie grup dla wybranego seminarium
  const getSeminarGroups = (seminarId) => {
    return groups.filter(group => group.seminarId === seminarId);
  };
  
  // Pobieranie studentów dla wybranej grupy
  const getGroupStudents = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return [];
    
    return students.filter(student => group.students.includes(student.id));
  };
  
  // Pobieranie nazwy seminarium
  const getSeminarName = (seminarId) => {
    const seminar = seminars.find(s => s.id === seminarId);
    return seminar ? seminar.name : '';
  };
  
  // Pobieranie nazwy dnia tygodnia
  const getDayOfWeekName = (day) => {
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
    return days[day - 1] || '';
  };
  
  // Sprawdzanie, czy student ma konflikt z grupą
  const hasTimeConflict = (student, groupId) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return false;
    
    // Sprawdź, czy student jest przypisany do innej grupy w tym samym dniu i czasie
    return student.assignedGroups.some(assignment => {
      const assignedGroup = groups.find(g => g.id === assignment.groupId);
      return assignedGroup && 
             assignedGroup.id !== group.id && 
             assignedGroup.dayOfWeek === group.dayOfWeek && 
             assignedGroup.startTime === group.startTime;
    });
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Zarządzanie grupami seminaryjnymi</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AutorenewIcon />}
          onClick={handleOpenAutoAssignDialog}
          className="robot-button"
        >
          Automatyczne przydzielanie
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="seminar groups tabs">
          <Tab label="Grupy seminaryjne" />
          <Tab label="Uczniowie" />
          <Tab label="Statystyki" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Seminaria
                </Typography>
                
                <TextField
                  fullWidth
                  label="Szukaj seminarium"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  onChange={handleSearchChange}
                />
                
                <List sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {seminars
                    .filter(seminar => 
                      seminar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      seminar.teacher.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((seminar) => (
                      <ListItem 
                        key={seminar.id} 
                        button 
                        onClick={() => handleSelectSeminar(seminar)}
                        selected={selectedSeminar && selectedSeminar.id === seminar.id}
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
                          <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={seminar.name}
                          secondary={`Nauczyciel: ${seminar.teacher}`}
                        />
                      </ListItem>
                    ))
                  }
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Grupy
                </Typography>
                
                {selectedSeminar ? (
                  <>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Grupy dla seminarium: {selectedSeminar.name}
                    </Typography>
                    
                    <List sx={{ maxHeight: 500, overflow: 'auto' }}>
                      {getSeminarGroups(selectedSeminar.id).map((group) => (
                        <ListItem 
                          key={group.id} 
                          button 
                          onClick={() => handleSelectGroup(group)}
                          selected={selectedGroup && selectedGroup.id === group.id}
                          sx={{ 
                            mb: 1, 
                            borderLeft: `4px solid ${theme.palette.secondary.main}`,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            '&.Mui-selected': {
                              bgcolor: `${theme.palette.secondary.main}22`
                            }
                          }}
                        >
                          <ListItemIcon>
                            <GroupIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={group.name}
                            secondary={`${getDayOfWeekName(group.dayOfWeek)}, ${group.startTime} (${group.students.length} uczniów)`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<AddIcon />}
                        size="small"
                      >
                        Dodaj grupę
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      Wybierz seminarium, aby zobaczyć grupy
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Uczniowie w grupie
                </Typography>
                
                {selectedGroup ? (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Grupa: {selectedGroup.name} | Seminarium: {getSeminarName(selectedGroup.seminarId)}
                      </Typography>
                      
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        size="small"
                        onClick={handleOpenEditDialog}
                      >
                        Edytuj grupę
                      </Button>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={getDayOfWeekName(selectedGroup.dayOfWeek)} 
                        color="primary" 
                        variant="outlined" 
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={selectedGroup.startTime} 
                        color="primary" 
                        variant="outlined" 
                      />
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <TextField
                      fullWidth
                      label="Szukaj ucznia"
                      variant="outlined"
                      margin="normal"
                      size="small"
                      onChange={handleSearchChange}
                    />
                    
                    {getGroupStudents(selectedGroup.id).length > 0 ? (
                      <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Uczeń</TableCell>
                              <TableCell>Klasa</TableCell>
                              <TableCell>Średnia</TableCell>
                              <TableCell align="right">Akcje</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {getGroupStudents(selectedGroup.id)
                              .filter(student => 
                                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                student.class.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((student) => (
                                <TableRow key={student.id}>
                                  <TableCell>{student.name}</TableCell>
                                  <TableCell>{student.class}</TableCell>
                                  <TableCell>{student.averageGrade}</TableCell>
                                  <TableCell align="right">
                                    <IconButton 
                                      size="small" 
                                      color="error"
                                      onClick={() => handleRemoveStudentFromGroup(student.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="textSecondary">
                          Brak uczniów w tej grupie
                        </Typography>
                      </Box>
                    )}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Dodaj ucznia do grupy
                    </Typography>
                    
                    <Autocomplete
                      options={students.filter(student => 
                        !selectedGroup.students.includes(student.id) &&
                        !student.assignedGroups.some(
                          assignment => groups.find(g => g.id === assignment.groupId)?.seminarId === selectedGroup.seminarId
                        )
                      )}
                      getOptionLabel={(option) => `${option.name} (${option.class})`}
                      renderInput={(params) => <TextField {...params} label="Wybierz ucznia" variant="outlined" size="small" />}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          handleAddStudentToGroup(newValue);
                        }
                      }}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ flexGrow: 1 }}>
                              {option.name} ({option.class})
                            </Box>
                            {hasTimeConflict(option, selectedGroup.id) && (
                              <Tooltip title="Konflikt czasowy z inną grupą">
                                <WarningIcon color="warning" fontSize="small" />
                              </Tooltip>
                            )}
                          </Box>
                        </li>
                      )}
                    />
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      Wybierz grupę, aby zobaczyć uczniów
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
                  {filteredStudents.map((student) => (
                    <ListItem 
                      key={student.id} 
                      button 
                      onClick={() => handleSelectStudent(student)}
                      selected={selectedStudent && selectedStudent.id === student.id}
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
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={student.name}
                        secondary={`Klasa: ${student.class} | Średnia: ${student.averageGrade}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Szczegóły ucznia
                </Typography>
                
                {selectedStudent ? (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1">
                        {selectedStudent.name}
                      </Typography>
                      
                      <Box>
                        <Chip 
                          label={`Klasa: ${selectedStudent.class}`} 
                          color="primary" 
                          variant="outlined" 
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={`Średnia: ${selectedStudent.averageGrade}`} 
                          color="primary" 
                          variant="outlined" 
                        />
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Preferencje seminariów
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {selectedStudent.preferences.map((seminarId, index) => {
                        const seminar = seminars.find(s => s.id === seminarId);
                        return seminar ? (
                          <Chip 
                            key={index} 
                            label={`${index + 1}. ${seminar.name}`} 
                            variant="outlined" 
                            color="secondary"
                          />
                        ) : null;
                      })}
                    </Box>
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Przypisane grupy seminaryjne
                    </Typography>
                    
                    {selectedStudent.assignedGroups.length > 0 ? (
                      <TableContainer component={Paper}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Seminarium</TableCell>
                              <TableCell>Grupa</TableCell>
                              <TableCell>Termin</TableCell>
                              <TableCell align="right">Akcje</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedStudent.assignedGroups.map((assignment) => {
                              const group = groups.find(g => g.id === assignment.groupId);
                              const seminar = seminars.find(s => s.id === assignment.seminarId);
                              
                              return group && seminar ? (
                                <TableRow key={assignment.groupId}>
                                  <TableCell>{seminar.name}</TableCell>
                                  <TableCell>{group.name}</TableCell>
                                  <TableCell>{`${getDayOfWeekName(group.dayOfWeek)}, ${group.startTime}`}</TableCell>
                                  <TableCell align="right">
                                    <IconButton 
                                      size="small" 
                                      color="error"
                                      onClick={() => handleRemoveStudentFromGroup(selectedStudent.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ) : null;
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="body1" color="textSecondary">
                          Brak przypisanych grup seminaryjnych
                        </Typography>
                      </Box>
                    )}
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Dodaj do grupy seminaryjnej
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="seminar-select-label">Seminarium</InputLabel>
                          <Select
                            labelId="seminar-select-label"
                            label="Seminarium"
                            value=""
                          >
                            {seminars
                              .filter(seminar => 
                                !selectedStudent.assignedGroups.some(
                                  assignment => assignment.seminarId === seminar.id
                                )
                              )
                              .map((seminar) => (
                                <MenuItem key={seminar.id} value={seminar.id}>
                                  {seminar.name}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="group-select-label">Grupa</InputLabel>
                          <Select
                            labelId="group-select-label"
                            label="Grupa"
                            value=""
                            disabled
                          >
                            <MenuItem value="">Najpierw wybierz seminarium</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      Wybierz ucznia, aby zobaczyć szczegóły
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="hologram-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statystyki grup seminaryjnych
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">{seminars.length}</Typography>
                      <Typography variant="body2" color="textSecondary">Seminariów</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">{groups.length}</Typography>
                      <Typography variant="body2" color="textSecondary">Grup</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">{students.length}</Typography>
                      <Typography variant="body2" color="textSecondary">Uczniów</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                      <Typography variant="h4">
                        {(groups.reduce((sum, group) => sum + group.students.length, 0) / groups.length).toFixed(1)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">Śr. uczniów/grupę</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle1" gutterBottom>
                  Zapełnienie grup
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Seminarium</TableCell>
                        <TableCell>Grupa</TableCell>
                        <TableCell>Liczba uczniów</TableCell>
                        <TableCell>Zapełnienie</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groups.map((group) => {
                        const seminar = seminars.find(s => s.id === group.seminarId);
                        const fillPercentage = (group.students.length / 15) * 100; // Zakładamy max 15 uczniów
                        
                        return (
                          <TableRow key={group.id}>
                            <TableCell>{seminar ? seminar.name : ''}</TableCell>
                            <TableCell>{group.name}</TableCell>
                            <TableCell>{group.students.length}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={Math.min(fillPercentage, 100)} 
                                    color={
                                      fillPercentage > 90 ? 'error' : 
                                      fillPercentage > 70 ? 'warning' : 
                                      'primary'
                                    }
                                    sx={{ height: 8, borderRadius: 4 }}
                                  />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                  <Typography variant="body2" color="textSecondary">
                                    {Math.round(fillPercentage)}%
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
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
                  Preferencje uczniów
                </Typography>
                
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Seminarium</TableCell>
                        <TableCell>Liczba preferencji</TableCell>
                        <TableCell>Procent uczniów</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk preferencji
                        const preferences = {};
                        
                        students.forEach(student => {
                          student.preferences.forEach(seminarId => {
                            preferences[seminarId] = (preferences[seminarId] || 0) + 1;
                          });
                        });
                        
                        return Object.entries(preferences)
                          .sort((a, b) => b[1] - a[1])
                          .map(([seminarId, count]) => {
                            const seminar = seminars.find(s => s.id === parseInt(seminarId));
                            const percentage = (count / students.length) * 100;
                            
                            return seminar ? (
                              <TableRow key={seminarId}>
                                <TableCell>{seminar.name}</TableCell>
                                <TableCell>{count}</TableCell>
                                <TableCell>{percentage.toFixed(1)}%</TableCell>
                              </TableRow>
                            ) : null;
                          });
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="h6" gutterBottom>
                  Konflikty czasowe
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dzień</TableCell>
                        <TableCell>Godzina</TableCell>
                        <TableCell>Liczba grup</TableCell>
                        <TableCell>Potencjalne konflikty</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(() => {
                        // Obliczanie statystyk konfliktów czasowych
                        const timeSlots = {};
                        
                        groups.forEach(group => {
                          const key = `${group.dayOfWeek}-${group.startTime}`;
                          if (!timeSlots[key]) {
                            timeSlots[key] = {
                              day: group.dayOfWeek,
                              time: group.startTime,
                              groups: []
                            };
                          }
                          timeSlots[key].groups.push(group.id);
                        });
                        
                        return Object.values(timeSlots)
                          .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
                          .map((slot, index) => {
                            // Obliczanie potencjalnych konfliktów
                            let conflicts = 0;
                            
                            students.forEach(student => {
                              const groupsInSlot = student.assignedGroups
                                .map(assignment => assignment.groupId)
                                .filter(groupId => slot.groups.includes(groupId));
                              
                              if (groupsInSlot.length > 1) {
                                conflicts++;
                              }
                            });
                            
                            return (
                              <TableRow key={index}>
                                <TableCell>{getDayOfWeekName(slot.day)}</TableCell>
                                <TableCell>{slot.time}</TableCell>
                                <TableCell>{slot.groups.length}</TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {conflicts > 0 ? (
                                      <WarningIcon color="warning" fontSize="small" sx={{ mr: 1 }} />
                                    ) : (
                                      <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                                    )}
                                    {conflicts}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          });
                      })()}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Dialog edycji grupy */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EditIcon sx={{ mr: 1 }} />
            Edycja grupy
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedGroup && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nazwa grupy"
                  value={selectedGroup.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="day-select-label">Dzień tygodnia</InputLabel>
                  <Select
                    labelId="day-select-label"
                    value={selectedGroup.dayOfWeek}
                    label="Dzień tygodnia"
                  >
                    <MenuItem value={1}>Poniedziałek</MenuItem>
                    <MenuItem value={2}>Wtorek</MenuItem>
                    <MenuItem value={3}>Środa</MenuItem>
                    <MenuItem value={4}>Czwartek</MenuItem>
                    <MenuItem value={5}>Piątek</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Godzina rozpoczęcia"
                  value={selectedGroup.startTime}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="seminar-edit-label">Seminarium</InputLabel>
                  <Select
                    labelId="seminar-edit-label"
                    value={selectedGroup.seminarId}
                    label="Seminarium"
                    disabled
                  >
                    {seminars.map((seminar) => (
                      <MenuItem key={seminar.id} value={seminar.id}>
                        {seminar.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
      
      {/* Dialog automatycznego przydzielania */}
      <Dialog
        open={autoAssignDialogOpen}
        onClose={handleCloseAutoAssignDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutorenewIcon sx={{ mr: 1 }} />
            Automatyczne przydzielanie uczniów do grup
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Alert severity="info" sx={{ mb: 3 }}>
            Automatyczne przydzielanie uczniów do grup seminaryjnych na podstawie preferencji i dostępności.
            Możesz dostosować ustawienia poniżej.
          </Alert>
          
          {autoAssignRunning ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress size={60} thickness={4} variant="determinate" value={autoAssignProgress} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Przydzielanie uczniów do grup...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Postęp: {autoAssignProgress}%
              </Typography>
            </Box>
          ) : (
            <>
              {autoAssignProgress === 100 ? (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Automatyczne przydzielanie zakończone pomyślnie!
                  </Alert>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Podsumowanie przydzielenia:
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
                        <Typography variant="h4">
                          {students.reduce((count, student) => count + student.assignedGroups.length, 0)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">Przydzielonych uczniów</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(77, 171, 245, 0.1)' }}>
                        <Typography variant="h4">
                          {students.filter(student => 
                            student.preferences.some(prefId => 
                              student.assignedGroups.some(assignment => 
                                assignment.seminarId === prefId
                              )
                            )
                          ).length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">Spełnionych preferencji</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(244, 67, 54, 0.1)' }}>
                        <Typography variant="h4">
                          {(() => {
                            let conflicts = 0;
                            students.forEach(student => {
                              // Sprawdź konflikty czasowe
                              const timeSlots = {};
                              
                              student.assignedGroups.forEach(assignment => {
                                const group = groups.find(g => g.id === assignment.groupId);
                                if (group) {
                                  const key = `${group.dayOfWeek}-${group.startTime}`;
                                  timeSlots[key] = (timeSlots[key] || 0) + 1;
                                  
                                  if (timeSlots[key] > 1) {
                                    conflicts++;
                                  }
                                }
                              });
                            });
                            
                            return conflicts;
                          })()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">Konfliktów czasowych</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Zapełnienie grup po przydzieleniu:
                  </Typography>
                  
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Seminarium</TableCell>
                          <TableCell>Grupa</TableCell>
                          <TableCell>Liczba uczniów</TableCell>
                          <TableCell>Zapełnienie</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {groups.map((group) => {
                          const seminar = seminars.find(s => s.id === group.seminarId);
                          const fillPercentage = (group.students.length / autoAssignSettings.maxGroupSize) * 100;
                          
                          return (
                            <TableRow key={group.id}>
                              <TableCell>{seminar ? seminar.name : ''}</TableCell>
                              <TableCell>{group.name}</TableCell>
                              <TableCell>{group.students.length}</TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box sx={{ width: '100%', mr: 1 }}>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={Math.min(fillPercentage, 100)} 
                                      color={
                                        fillPercentage > 90 ? 'error' : 
                                        fillPercentage > 70 ? 'warning' : 
                                        'primary'
                                      }
                                      sx={{ height: 8, borderRadius: 4 }}
                                    />
                                  </Box>
                                  <Box sx={{ minWidth: 35 }}>
                                    <Typography variant="body2" color="textSecondary">
                                      {Math.round(fillPercentage)}%
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Ustawienia przydzielania
                    </Typography>
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={autoAssignSettings.balanceGroups} 
                          onChange={(e) => handleAutoAssignSettingChange('balanceGroups', e.target.checked)}
                        />
                      }
                      label="Równoważenie liczebności grup"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={autoAssignSettings.respectPreferences} 
                          onChange={(e) => handleAutoAssignSettingChange('respectPreferences', e.target.checked)}
                        />
                      }
                      label="Uwzględnianie preferencji uczniów"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={autoAssignSettings.avoidConflicts} 
                          onChange={(e) => handleAutoAssignSettingChange('avoidConflicts', e.target.checked)}
                        />
                      }
                      label="Unikanie konfliktów czasowych"
                    />
                    
                    <TextField
                      fullWidth
                      label="Maksymalna liczba uczniów w grupie"
                      type="number"
                      value={autoAssignSettings.maxGroupSize}
                      onChange={(e) => handleAutoAssignSettingChange('maxGroupSize', parseInt(e.target.value))}
                      margin="normal"
                      InputProps={{ inputProps: { min: 5, max: 30 } }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Informacje
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Automatyczne przydzielanie zastąpi wszystkie istniejące przypisania uczniów do grup" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Każdy uczeń zostanie przypisany do 2-3 grup seminaryjnych" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Preferencje uczniów będą uwzględniane w miarę możliwości" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Po automatycznym przydzieleniu możesz ręcznie dostosować przypisania" />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAutoAssignDialog}>
            {autoAssignProgress === 100 ? 'Zamknij' : 'Anuluj'}
          </Button>
          {!autoAssignRunning && autoAssignProgress < 100 && (
            <Button 
              onClick={handleStartAutoAssign} 
              variant="contained" 
              color="primary"
              startIcon={<AutorenewIcon />}
            >
              Rozpocznij przydzielanie
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SeminarGroupManager;
