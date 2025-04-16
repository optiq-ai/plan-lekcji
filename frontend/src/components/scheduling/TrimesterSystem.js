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
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import EventIcon from '@mui/icons-material/Event';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';

/**
 * Komponent systemu trymestralnego
 * Umożliwia konfigurację i zarządzanie trymestralnym systemem nauczania
 */
const TrimesterSystem = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [trimesters, setTrimesters] = useState([
    {
      id: 1,
      name: 'Trymestr I',
      startDate: new Date(2025, 8, 1), // 1 września 2025
      endDate: new Date(2025, 10, 30), // 30 listopada 2025
      active: true,
      subjects: [
        { id: 1, name: 'Matematyka', hoursPerWeek: 4 },
        { id: 2, name: 'Język polski', hoursPerWeek: 5 },
        { id: 3, name: 'Historia', hoursPerWeek: 2 }
      ]
    },
    {
      id: 2,
      name: 'Trymestr II',
      startDate: new Date(2025, 11, 1), // 1 grudnia 2025
      endDate: new Date(2026, 1, 28), // 28 lutego 2026
      active: false,
      subjects: [
        { id: 1, name: 'Matematyka', hoursPerWeek: 4 },
        { id: 2, name: 'Język polski', hoursPerWeek: 4 },
        { id: 4, name: 'Geografia', hoursPerWeek: 3 }
      ]
    },
    {
      id: 3,
      name: 'Trymestr III',
      startDate: new Date(2026, 2, 1), // 1 marca 2026
      endDate: new Date(2026, 5, 20), // 20 czerwca 2026
      active: false,
      subjects: [
        { id: 1, name: 'Matematyka', hoursPerWeek: 5 },
        { id: 2, name: 'Język polski', hoursPerWeek: 4 },
        { id: 5, name: 'Fizyka', hoursPerWeek: 3 }
      ]
    }
  ]);
  
  const [editingTrimester, setEditingTrimester] = useState(null);
  const [newSubject, setNewSubject] = useState({
    name: '',
    hoursPerWeek: 2
  });
  
  const [classes, setClasses] = useState([
    { id: 1, name: 'Klasa 1A', useTrimesterSystem: true },
    { id: 2, name: 'Klasa 1B', useTrimesterSystem: true },
    { id: 3, name: 'Klasa 2A', useTrimesterSystem: false },
    { id: 4, name: 'Klasa 2B', useTrimesterSystem: true },
    { id: 5, name: 'Klasa 3A', useTrimesterSystem: false }
  ]);
  
  const [settings, setSettings] = useState({
    automaticPlanGeneration: true,
    keepTeachersContinuity: true,
    balanceSubjectsAcrossTrimesters: true,
    notifyBeforeTrimesterEnd: 14 // dni
  });

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa edycji trymestru
  const handleEditTrimester = (trimester) => {
    setEditingTrimester({...trimester});
  };
  
  // Obsługa zapisywania zmian trymestru
  const handleSaveTrimester = () => {
    if (editingTrimester) {
      setTrimesters(prevTrimesters => 
        prevTrimesters.map(t => 
          t.id === editingTrimester.id ? editingTrimester : t
        )
      );
      setEditingTrimester(null);
    }
  };
  
  // Obsługa anulowania edycji trymestru
  const handleCancelEdit = () => {
    setEditingTrimester(null);
  };
  
  // Obsługa zmiany daty rozpoczęcia trymestru
  const handleStartDateChange = (date) => {
    setEditingTrimester({
      ...editingTrimester,
      startDate: date
    });
  };
  
  // Obsługa zmiany daty zakończenia trymestru
  const handleEndDateChange = (date) => {
    setEditingTrimester({
      ...editingTrimester,
      endDate: date
    });
  };
  
  // Obsługa zmiany nazwy trymestru
  const handleNameChange = (event) => {
    setEditingTrimester({
      ...editingTrimester,
      name: event.target.value
    });
  };
  
  // Obsługa dodawania przedmiotu do trymestru
  const handleAddSubject = () => {
    if (editingTrimester && newSubject.name) {
      const newSubjectWithId = {
        ...newSubject,
        id: Math.max(0, ...editingTrimester.subjects.map(s => s.id)) + 1
      };
      
      setEditingTrimester({
        ...editingTrimester,
        subjects: [...editingTrimester.subjects, newSubjectWithId]
      });
      
      setNewSubject({
        name: '',
        hoursPerWeek: 2
      });
    }
  };
  
  // Obsługa usuwania przedmiotu z trymestru
  const handleRemoveSubject = (subjectId) => {
    setEditingTrimester({
      ...editingTrimester,
      subjects: editingTrimester.subjects.filter(s => s.id !== subjectId)
    });
  };
  
  // Obsługa zmiany liczby godzin przedmiotu
  const handleHoursChange = (subjectId, hours) => {
    setEditingTrimester({
      ...editingTrimester,
      subjects: editingTrimester.subjects.map(s => 
        s.id === subjectId ? {...s, hoursPerWeek: hours} : s
      )
    });
  };
  
  // Obsługa zmiany nazwy nowego przedmiotu
  const handleNewSubjectNameChange = (event) => {
    setNewSubject({
      ...newSubject,
      name: event.target.value
    });
  };
  
  // Obsługa zmiany liczby godzin nowego przedmiotu
  const handleNewSubjectHoursChange = (event) => {
    setNewSubject({
      ...newSubject,
      hoursPerWeek: parseInt(event.target.value, 10)
    });
  };
  
  // Obsługa zmiany ustawienia klasy (czy używa systemu trymestralnego)
  const handleClassSettingChange = (classId) => {
    setClasses(prevClasses => 
      prevClasses.map(c => 
        c.id === classId ? {...c, useTrimesterSystem: !c.useTrimesterSystem} : c
      )
    );
  };
  
  // Obsługa zmiany ustawień systemu trymestralnego
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarViewWeekIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">System trymestralny</Typography>
        </Box>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="trimester system tabs">
          <Tab label="Trymestry" />
          <Tab label="Klasy" />
          <Tab label="Ustawienia" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <Box>
          <Grid container spacing={3}>
            {trimesters.map((trimester) => (
              <Grid item xs={12} md={4} key={trimester.id}>
                <Card 
                  className="hologram-card"
                  sx={{ 
                    borderLeft: trimester.active ? `4px solid ${theme.palette.success.main}` : 'none',
                    height: '100%'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">{trimester.name}</Typography>
                      {trimester.active && (
                        <Chip 
                          label="Aktywny" 
                          color="success" 
                          size="small"
                        />
                      )}
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <EventIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {trimester.startDate.toLocaleDateString()} - {trimester.endDate.toLocaleDateString()}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Przedmioty:
                    </Typography>
                    
                    <List dense>
                      {trimester.subjects.map((subject) => (
                        <ListItem key={subject.id}>
                          <ListItemText 
                            primary={subject.name} 
                            secondary={`${subject.hoursPerWeek} godz./tydzień`} 
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditTrimester(trimester)}
                        size="small"
                      >
                        Edytuj
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {editingTrimester && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Edycja trymestru
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nazwa trymestru"
                      value={editingTrimester.name}
                      onChange={handleNameChange}
                      sx={{ mb: 2 }}
                    />
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <DatePicker
                          label="Data rozpoczęcia"
                          value={editingTrimester.startDate}
                          onChange={handleStartDateChange}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <DatePicker
                          label="Data zakończenia"
                          value={editingTrimester.endDate}
                          onChange={handleEndDateChange}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </Box>
                    </LocalizationProvider>
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editingTrimester.active}
                          onChange={() => setEditingTrimester({...editingTrimester, active: !editingTrimester.active})}
                        />
                      }
                      label="Aktywny trymestr"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Przedmioty w trymestrze
                    </Typography>
                    
                    <List sx={{ mb: 2 }}>
                      {editingTrimester.subjects.map((subject) => (
                        <ListItem
                          key={subject.id}
                          secondaryAction={
                            <IconButton edge="end" onClick={() => handleRemoveSubject(subject.id)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText primary={subject.name} />
                          <TextField
                            type="number"
                            label="Godz./tydzień"
                            value={subject.hoursPerWeek}
                            onChange={(e) => handleHoursChange(subject.id, parseInt(e.target.value, 10))}
                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                            sx={{ width: 120 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                      <TextField
                        label="Nazwa przedmiotu"
                        value={newSubject.name}
                        onChange={handleNewSubjectNameChange}
                        sx={{ mr: 2, flexGrow: 1 }}
                      />
                      <TextField
                        type="number"
                        label="Godz./tydzień"
                        value={newSubject.hoursPerWeek}
                        onChange={handleNewSubjectHoursChange}
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        sx={{ width: 120, mr: 2 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSubject}
                        disabled={!newSubject.name}
                      >
                        <AddIcon />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                    sx={{ mr: 2 }}
                  >
                    Anuluj
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveTrimester}
                  >
                    Zapisz zmiany
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
      
      {activeTab === 1 && (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Klasy używające systemu trymestralnego
              </Typography>
              
              <List>
                {classes.map((cls) => (
                  <ListItem key={cls.id}>
                    <ListItemText primary={cls.name} />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={cls.useTrimesterSystem}
                          onChange={() => handleClassSettingChange(cls.id)}
                          color="primary"
                        />
                      }
                      label={cls.useTrimesterSystem ? "Włączony" : "Wyłączony"}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
      
      {activeTab === 2 && (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Ustawienia systemu trymestralnego
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Automatyczne generowanie planu przy zmianie trymestru" 
                    secondary="System automatycznie wygeneruje nowy plan lekcji na początku każdego trymestru"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.automaticPlanGeneration}
                        onChange={() => handleSettingChange('automaticPlanGeneration', !settings.automaticPlanGeneration)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Zachowaj ciągłość nauczycieli" 
                    secondary="Ten sam nauczyciel będzie prowadził przedmiot we wszystkich trymestrach, jeśli to możliwe"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.keepTeachersContinuity}
                        onChange={() => handleSettingChange('keepTeachersContinuity', !settings.keepTeachersContinuity)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Równoważenie przedmiotów między trymestrami" 
                    secondary="System będzie starał się równomiernie rozłożyć obciążenie uczniów w każdym trymestrze"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.balanceSubjectsAcrossTrimesters}
                        onChange={() => handleSettingChange('balanceSubjectsAcrossTrimesters', !settings.balanceSubjectsAcrossTrimesters)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Powiadomienie przed końcem trymestru (dni)" 
                    secondary="Liczba dni przed końcem trymestru, kiedy system wyśle powiadomienie"
                  />
                  <TextField
                    type="number"
                    value={settings.notifyBeforeTrimesterEnd}
                    onChange={(e) => handleSettingChange('notifyBeforeTrimesterEnd', parseInt(e.target.value, 10))}
                    InputProps={{ inputProps: { min: 1, max: 30 } }}
                    sx={{ width: 80 }}
                  />
                </ListItem>
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  Zapisz ustawienia
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default TrimesterSystem;
