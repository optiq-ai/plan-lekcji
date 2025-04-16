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
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import pl from 'date-fns/locale/pl';

/**
 * Komponent systemu dwuzmianowego
 * Umożliwia konfigurację i zarządzanie systemem dwuzmianowym w szkole
 */
const ShiftBasedSystem = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  // Dane zmian
  const [shifts, setShifts] = useState([
    {
      id: 1,
      name: 'Zmiana poranna',
      startTime: new Date(2025, 0, 1, 8, 0), // 8:00
      endTime: new Date(2025, 0, 1, 13, 30), // 13:30
      color: '#4caf50',
      active: true,
      timeSlots: [
        { id: 1, startTime: '8:00', endTime: '8:45' },
        { id: 2, startTime: '8:55', endTime: '9:40' },
        { id: 3, startTime: '9:50', endTime: '10:35' },
        { id: 4, startTime: '10:45', endTime: '11:30' },
        { id: 5, startTime: '11:50', endTime: '12:35' },
        { id: 6, startTime: '12:45', endTime: '13:30' }
      ]
    },
    {
      id: 2,
      name: 'Zmiana popołudniowa',
      startTime: new Date(2025, 0, 1, 13, 45), // 13:45
      endTime: new Date(2025, 0, 1, 19, 15), // 19:15
      color: '#2196f3',
      active: true,
      timeSlots: [
        { id: 1, startTime: '13:45', endTime: '14:30' },
        { id: 2, startTime: '14:40', endTime: '15:25' },
        { id: 3, startTime: '15:35', endTime: '16:20' },
        { id: 4, startTime: '16:30', endTime: '17:15' },
        { id: 5, startTime: '17:25', endTime: '18:10' },
        { id: 6, startTime: '18:20', endTime: '19:05' }
      ]
    }
  ]);
  
  // Dane klas przypisanych do zmian
  const [classes, setClasses] = useState([
    { id: 1, name: 'Klasa 1A', shiftId: 1 },
    { id: 2, name: 'Klasa 1B', shiftId: 1 },
    { id: 3, name: 'Klasa 2A', shiftId: 2 },
    { id: 4, name: 'Klasa 2B', shiftId: 2 },
    { id: 5, name: 'Klasa 3A', shiftId: 1 },
    { id: 6, name: 'Klasa 3B', shiftId: 2 }
  ]);
  
  // Dane nauczycieli pracujących na zmianach
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Jan Kowalski', shifts: [1, 2] },
    { id: 2, name: 'Anna Nowak', shifts: [1] },
    { id: 3, name: 'Piotr Wiśniewski', shifts: [2] },
    { id: 4, name: 'Maria Dąbrowska', shifts: [1, 2] },
    { id: 5, name: 'Tomasz Lewandowski', shifts: [1] }
  ]);
  
  // Ustawienia systemu dwuzmianowego
  const [settings, setSettings] = useState({
    enableShiftSystem: true,
    allowTeachersBothShifts: true,
    minimumBreakBetweenShifts: 15, // minut
    optimizeRoomUsage: true,
    balanceClassesAcrossShifts: true,
    rotateShiftsWeekly: false,
    rotateShiftsMonthly: false
  });
  
  // Stan edycji zmiany
  const [editingShift, setEditingShift] = useState(null);
  const [newTimeSlot, setNewTimeSlot] = useState({
    startTime: '',
    endTime: ''
  });
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa edycji zmiany
  const handleEditShift = (shift) => {
    setEditingShift({...shift});
  };
  
  // Obsługa zapisywania zmian
  const handleSaveShift = () => {
    if (editingShift) {
      setShifts(prevShifts => 
        prevShifts.map(s => 
          s.id === editingShift.id ? editingShift : s
        )
      );
      setEditingShift(null);
    }
  };
  
  // Obsługa anulowania edycji
  const handleCancelEdit = () => {
    setEditingShift(null);
  };
  
  // Obsługa zmiany nazwy zmiany
  const handleNameChange = (event) => {
    setEditingShift({
      ...editingShift,
      name: event.target.value
    });
  };
  
  // Obsługa zmiany godziny rozpoczęcia zmiany
  const handleStartTimeChange = (time) => {
    setEditingShift({
      ...editingShift,
      startTime: time
    });
  };
  
  // Obsługa zmiany godziny zakończenia zmiany
  const handleEndTimeChange = (time) => {
    setEditingShift({
      ...editingShift,
      endTime: time
    });
  };
  
  // Obsługa zmiany koloru zmiany
  const handleColorChange = (event) => {
    setEditingShift({
      ...editingShift,
      color: event.target.value
    });
  };
  
  // Obsługa dodawania nowego przedziału czasowego
  const handleAddTimeSlot = () => {
    if (editingShift && newTimeSlot.startTime && newTimeSlot.endTime) {
      const newSlot = {
        id: Math.max(0, ...editingShift.timeSlots.map(s => s.id)) + 1,
        startTime: newTimeSlot.startTime,
        endTime: newTimeSlot.endTime
      };
      
      setEditingShift({
        ...editingShift,
        timeSlots: [...editingShift.timeSlots, newSlot]
      });
      
      setNewTimeSlot({
        startTime: '',
        endTime: ''
      });
    }
  };
  
  // Obsługa usuwania przedziału czasowego
  const handleRemoveTimeSlot = (slotId) => {
    setEditingShift({
      ...editingShift,
      timeSlots: editingShift.timeSlots.filter(s => s.id !== slotId)
    });
  };
  
  // Obsługa zmiany przypisania klasy do zmiany
  const handleClassShiftChange = (classId, shiftId) => {
    setClasses(prevClasses => 
      prevClasses.map(c => 
        c.id === classId ? {...c, shiftId: shiftId} : c
      )
    );
  };
  
  // Obsługa zmiany przypisania nauczyciela do zmiany
  const handleTeacherShiftChange = (teacherId, shiftId, checked) => {
    setTeachers(prevTeachers => 
      prevTeachers.map(t => {
        if (t.id === teacherId) {
          const newShifts = checked 
            ? [...t.shifts, shiftId] 
            : t.shifts.filter(s => s !== shiftId);
          return {...t, shifts: newShifts};
        }
        return t;
      })
    );
  };
  
  // Obsługa zmiany ustawień
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };
  
  // Obsługa dodawania nowej zmiany
  const handleAddShift = () => {
    const newShift = {
      id: Math.max(0, ...shifts.map(s => s.id)) + 1,
      name: 'Nowa zmiana',
      startTime: new Date(2025, 0, 1, 14, 0), // 14:00
      endTime: new Date(2025, 0, 1, 19, 0), // 19:00
      color: '#ff9800',
      active: true,
      timeSlots: []
    };
    
    setShifts([...shifts, newShift]);
    setEditingShift(newShift);
  };
  
  // Obsługa usuwania zmiany
  const handleDeleteShift = (shiftId) => {
    // Sprawdzenie, czy są klasy przypisane do tej zmiany
    const classesInShift = classes.filter(c => c.shiftId === shiftId);
    
    if (classesInShift.length > 0) {
      alert('Nie można usunąć zmiany, do której przypisane są klasy. Najpierw zmień przypisanie klas.');
      return;
    }
    
    setShifts(shifts.filter(s => s.id !== shiftId));
    
    // Aktualizacja nauczycieli
    setTeachers(prevTeachers => 
      prevTeachers.map(t => ({
        ...t,
        shifts: t.shifts.filter(s => s !== shiftId)
      }))
    );
  };
  
  // Formatowanie godziny
  const formatTime = (date) => {
    if (!date) return '';
    return date instanceof Date 
      ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      : date;
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">System dwuzmianowy</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddShift}
          className="robot-button"
        >
          Dodaj zmianę
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="shift system tabs">
          <Tab label="Zmiany" />
          <Tab label="Klasy" />
          <Tab label="Nauczyciele" />
          <Tab label="Ustawienia" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <Box>
          <Grid container spacing={3}>
            {shifts.map((shift) => (
              <Grid item xs={12} md={6} key={shift.id}>
                <Card 
                  className="hologram-card"
                  sx={{ 
                    borderLeft: `4px solid ${shift.color}`,
                    height: '100%'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">{shift.name}</Typography>
                      {shift.active && (
                        <Chip 
                          label="Aktywna" 
                          sx={{ bgcolor: shift.color, color: '#fff' }}
                          size="small"
                        />
                      )}
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <ScheduleIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Przedziały czasowe:
                    </Typography>
                    
                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nr</TableCell>
                            <TableCell>Początek</TableCell>
                            <TableCell>Koniec</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {shift.timeSlots.map((slot, index) => (
                            <TableRow key={slot.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{slot.startTime}</TableCell>
                              <TableCell>{slot.endTime}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditShift(shift)}
                        size="small"
                      >
                        Edytuj
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteShift(shift.id)}
                        size="small"
                      >
                        Usuń
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {editingShift && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Edycja zmiany
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nazwa zmiany"
                      value={editingShift.name}
                      onChange={handleNameChange}
                      sx={{ mb: 2 }}
                    />
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TimePicker
                          label="Godzina rozpoczęcia"
                          value={editingShift.startTime}
                          onChange={handleStartTimeChange}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <TimePicker
                          label="Godzina zakończenia"
                          value={editingShift.endTime}
                          onChange={handleEndTimeChange}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </Box>
                    </LocalizationProvider>
                    
                    <Box sx={{ mb: 2 }}>
                      <InputLabel id="color-label">Kolor zmiany</InputLabel>
                      <Select
                        labelId="color-label"
                        value={editingShift.color}
                        onChange={handleColorChange}
                        fullWidth
                      >
                        <MenuItem value="#4caf50">Zielony</MenuItem>
                        <MenuItem value="#2196f3">Niebieski</MenuItem>
                        <MenuItem value="#ff9800">Pomarańczowy</MenuItem>
                        <MenuItem value="#f44336">Czerwony</MenuItem>
                        <MenuItem value="#9c27b0">Fioletowy</MenuItem>
                      </Select>
                    </Box>
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editingShift.active}
                          onChange={() => setEditingShift({...editingShift, active: !editingShift.active})}
                        />
                      }
                      label="Aktywna zmiana"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Przedziały czasowe
                    </Typography>
                    
                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nr</TableCell>
                            <TableCell>Początek</TableCell>
                            <TableCell>Koniec</TableCell>
                            <TableCell>Akcje</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {editingShift.timeSlots.map((slot, index) => (
                            <TableRow key={slot.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{slot.startTime}</TableCell>
                              <TableCell>{slot.endTime}</TableCell>
                              <TableCell>
                                <IconButton size="small" onClick={() => handleRemoveTimeSlot(slot.id)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                      <TextField
                        label="Początek"
                        value={newTimeSlot.startTime}
                        onChange={(e) => setNewTimeSlot({...newTimeSlot, startTime: e.target.value})}
                        placeholder="np. 8:00"
                        sx={{ mr: 2, flexGrow: 1 }}
                      />
                      <TextField
                        label="Koniec"
                        value={newTimeSlot.endTime}
                        onChange={(e) => setNewTimeSlot({...newTimeSlot, endTime: e.target.value})}
                        placeholder="np. 8:45"
                        sx={{ mr: 2, flexGrow: 1 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddTimeSlot}
                        disabled={!newTimeSlot.startTime || !newTimeSlot.endTime}
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
                    onClick={handleSaveShift}
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
                Przypisanie klas do zmian
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Klasa</TableCell>
                      <TableCell>Przypisana zmiana</TableCell>
                      <TableCell>Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {classes.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell>{cls.name}</TableCell>
                        <TableCell>
                          <Chip 
                            label={shifts.find(s => s.id === cls.shiftId)?.name || 'Brak'}
                            sx={{ 
                              bgcolor: shifts.find(s => s.id === cls.shiftId)?.color,
                              color: '#fff'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <Select
                              value={cls.shiftId}
                              onChange={(e) => handleClassShiftChange(cls.id, e.target.value)}
                              size="small"
                            >
                              {shifts.map((shift) => (
                                <MenuItem key={shift.id} value={shift.id}>
                                  {shift.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}
      
      {activeTab === 2 && (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Przypisanie nauczycieli do zmian
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nauczyciel</TableCell>
                      {shifts.map((shift) => (
                        <TableCell key={shift.id} align="center">
                          {shift.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.name}</TableCell>
                        {shifts.map((shift) => (
                          <TableCell key={shift.id} align="center">
                            <Switch
                              checked={teacher.shifts.includes(shift.id)}
                              onChange={(e) => handleTeacherShiftChange(teacher.id, shift.id, e.target.checked)}
                              color="primary"
                              disabled={!settings.allowTeachersBothShifts && teacher.shifts.length > 0 && !teacher.shifts.includes(shift.id)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}
      
      {activeTab === 3 && (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Ustawienia systemu dwuzmianowego
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Włącz system dwuzmianowy" 
                    secondary="Aktywuje funkcjonalność systemu dwuzmianowego w całej aplikacji"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.enableShiftSystem}
                        onChange={() => handleSettingChange('enableShiftSystem', !settings.enableShiftSystem)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Zezwalaj nauczycielom na pracę na obu zmianach" 
                    secondary="Nauczyciele mogą być przypisani do więcej niż jednej zmiany"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.allowTeachersBothShifts}
                        onChange={() => handleSettingChange('allowTeachersBothShifts', !settings.allowTeachersBothShifts)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Minimalna przerwa między zmianami (minuty)" 
                    secondary="Minimalny czas przerwy między końcem jednej zmiany a początkiem drugiej"
                  />
                  <TextField
                    type="number"
                    value={settings.minimumBreakBetweenShifts}
                    onChange={(e) => handleSettingChange('minimumBreakBetweenShifts', parseInt(e.target.value, 10))}
                    InputProps={{ inputProps: { min: 0, max: 120 } }}
                    sx={{ width: 80 }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Optymalizuj wykorzystanie sal" 
                    secondary="System będzie starał się maksymalnie wykorzystać dostępne sale lekcyjne"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.optimizeRoomUsage}
                        onChange={() => handleSettingChange('optimizeRoomUsage', !settings.optimizeRoomUsage)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Równoważ klasy między zmianami" 
                    secondary="System będzie starał się równomiernie rozłożyć klasy między zmianami"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.balanceClassesAcrossShifts}
                        onChange={() => handleSettingChange('balanceClassesAcrossShifts', !settings.balanceClassesAcrossShifts)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Rotacja zmian co tydzień" 
                    secondary="Klasy będą automatycznie zmieniać zmianę co tydzień"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.rotateShiftsWeekly}
                        onChange={() => {
                          if (!settings.rotateShiftsWeekly && settings.rotateShiftsMonthly) {
                            handleSettingChange('rotateShiftsMonthly', false);
                          }
                          handleSettingChange('rotateShiftsWeekly', !settings.rotateShiftsWeekly);
                        }}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Rotacja zmian co miesiąc" 
                    secondary="Klasy będą automatycznie zmieniać zmianę co miesiąc"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.rotateShiftsMonthly}
                        onChange={() => {
                          if (!settings.rotateShiftsMonthly && settings.rotateShiftsWeekly) {
                            handleSettingChange('rotateShiftsWeekly', false);
                          }
                          handleSettingChange('rotateShiftsMonthly', !settings.rotateShiftsMonthly);
                        }}
                        color="primary"
                        disabled={settings.rotateShiftsWeekly}
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  className="robot-button"
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

export default ShiftBasedSystem;
