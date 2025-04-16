import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card,
  CardContent,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';
import RoomService from '../../services/RoomService';
import RoomAvailabilityService from '../../services/RoomAvailabilityService';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Komponent systemu rezerwacji i udostępniania sal
 * Umożliwia rezerwację sal na zajęcia dodatkowe i zarządzanie dostępnością
 */
const RoomReservationSystem = () => {
  const theme = useTheme();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(new Date().setHours(new Date().getHours() + 1)));
  const [purpose, setPurpose] = useState('');
  const [teacher, setTeacher] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Przykładowe dane sal
  const sampleRooms = [
    { id: 101, name: 'Sala 101', type: 'Informatyczna', capacity: 30, equipment: ['Komputery', 'Rzutnik', 'Tablica interaktywna'] },
    { id: 102, name: 'Sala 102', type: 'Językowa', capacity: 25, equipment: ['Rzutnik', 'Sprzęt audio'] },
    { id: 103, name: 'Sala 103', type: 'Ogólna', capacity: 30, equipment: ['Rzutnik', 'Tablica'] },
    { id: 104, name: 'Sala 104', type: 'Fizyczna', capacity: 28, equipment: ['Sprzęt laboratoryjny', 'Rzutnik'] },
    { id: 105, name: 'Sala 105', type: 'Ogólna', capacity: 30, equipment: ['Rzutnik', 'Tablica'] },
    { id: 106, name: 'Sala 106', type: 'Chemiczna', capacity: 24, equipment: ['Sprzęt laboratoryjny', 'Dygestorium', 'Rzutnik'] },
    { id: 107, name: 'Sala 107', type: 'Ogólna', capacity: 30, equipment: ['Rzutnik', 'Tablica'] },
    { id: 108, name: 'Sala 108', type: 'Biologiczna', capacity: 26, equipment: ['Mikroskopy', 'Rzutnik', 'Modele anatomiczne'] },
  ];

  // Przykładowe dane rezerwacji
  const sampleReservations = [
    { 
      id: 1, 
      roomId: 103, 
      date: '2025-04-12', 
      startTime: '14:35', 
      endTime: '15:20', 
      purpose: 'Konsultacje matematyka', 
      teacher: 'mgr Anna Kowalska',
      status: 'confirmed'
    },
    { 
      id: 2, 
      roomId: 103, 
      date: '2025-04-12', 
      startTime: '15:30', 
      endTime: '16:15', 
      purpose: 'Kółko matematyczne', 
      teacher: 'mgr Anna Kowalska',
      status: 'confirmed'
    },
    { 
      id: 3, 
      roomId: 103, 
      date: '2025-04-12', 
      startTime: '16:25', 
      endTime: '17:10', 
      purpose: 'Zajęcia wyrównawcze', 
      teacher: 'mgr Jan Nowak',
      status: 'confirmed'
    },
    { 
      id: 4, 
      roomId: 103, 
      date: '2025-04-13', 
      startTime: '8:00', 
      endTime: '8:45', 
      purpose: 'Lekcja matematyki 1A', 
      teacher: 'mgr Anna Kowalska',
      status: 'confirmed'
    },
    { 
      id: 5, 
      roomId: 103, 
      date: '2025-04-13', 
      startTime: '8:55', 
      endTime: '9:40', 
      purpose: 'Lekcja matematyki 2B', 
      teacher: 'mgr Anna Kowalska',
      status: 'confirmed'
    },
    { 
      id: 6, 
      roomId: 103, 
      date: '2025-04-13', 
      startTime: '13:40', 
      endTime: '14:25', 
      purpose: 'Lekcja matematyki 3C', 
      teacher: 'mgr Anna Kowalska',
      status: 'confirmed'
    },
  ];

  useEffect(() => {
    // Symulacja pobierania danych o salach
    const fetchRooms = async () => {
      try {
        setLoading(true);
        // W rzeczywistej implementacji, tutaj byłoby wywołanie API
        // const response = await RoomService.getAllRooms();
        // setRooms(response.data);
        
        // Używamy przykładowych danych
        setTimeout(() => {
          setRooms(sampleRooms);
          setSelectedRoom(sampleRooms[2]); // Domyślnie wybieramy salę 103
          setReservations(sampleReservations);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Nie udało się pobrać danych o salach');
        setLoading(false);
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleOpenReservationDialog = () => {
    setOpenReservationDialog(true);
  };

  const handleCloseReservationDialog = () => {
    setOpenReservationDialog(false);
    // Reset form values
    setReservationDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date(new Date().setHours(new Date().getHours() + 1)));
    setPurpose('');
    setTeacher('');
  };

  const handleReservationSubmit = () => {
    // Symulacja dodawania rezerwacji
    const newReservation = {
      id: reservations.length + 1,
      roomId: selectedRoom.id,
      date: reservationDate.toISOString().split('T')[0],
      startTime: `${startTime.getHours()}:${startTime.getMinutes().toString().padStart(2, '0')}`,
      endTime: `${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')}`,
      purpose: purpose,
      teacher: teacher,
      status: 'confirmed'
    };
    
    // W rzeczywistej implementacji, tutaj byłoby wywołanie API
    // await RoomAvailabilityService.createReservation(newReservation);
    
    // Dodajemy nową rezerwację do lokalnego stanu
    setReservations([...reservations, newReservation]);
    
    // Pokazujemy komunikat o sukcesie
    setSuccessMessage(`Sala ${selectedRoom.name} została zarezerwowana na ${reservationDate.toLocaleDateString()} od ${newReservation.startTime} do ${newReservation.endTime}`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
    
    handleCloseReservationDialog();
  };

  // Filtrowanie rezerwacji dla wybranej sali
  const getRoomReservations = () => {
    if (!selectedRoom) return [];
    return reservations.filter(res => res.roomId === selectedRoom.id);
  };

  // Grupowanie rezerwacji według daty
  const groupReservationsByDate = () => {
    const roomReservations = getRoomReservations();
    const grouped = {};
    
    roomReservations.forEach(res => {
      if (!grouped[res.date]) {
        grouped[res.date] = [];
      }
      grouped[res.date].push(res);
    });
    
    return grouped;
  };

  // Renderowanie listy sal
  const renderRoomList = () => {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Dostępne sale
        </Typography>
        <Grid container spacing={2}>
          {rooms.map(room => (
            <Grid item xs={12} sm={6} md={3} key={room.id}>
              <Paper 
                elevation={selectedRoom && selectedRoom.id === room.id ? 6 : 1}
                sx={{ 
                  p: 2, 
                  cursor: 'pointer',
                  border: selectedRoom && selectedRoom.id === room.id ? `2px solid ${theme.palette.primary.main}` : 'none',
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
                onClick={() => handleRoomSelect(room)}
              >
                <Typography variant="subtitle1">{room.name}</Typography>
                <Typography variant="body2" color="textSecondary">{room.type}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <PersonIcon sx={{ fontSize: '0.9rem', mr: 0.5, color: theme.palette.text.secondary }} />
                  <Typography variant="body2" color="textSecondary">{room.capacity} osób</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // Renderowanie szczegółów wybranej sali
  const renderRoomDetails = () => {
    if (!selectedRoom) return null;
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h6">{selectedRoom.name} - Szczegóły</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>Typ: {selectedRoom.type}</Typography>
              <Typography variant="body2">Pojemność: {selectedRoom.capacity} osób</Typography>
            </Box>
            <Box>
              <Chip 
                label="Aktualnie: Wolna" 
                color="success" 
                sx={{ fontWeight: 'bold' }} 
              />
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Najbliższe zajęcia: 10:45 - Fizyka
              </Typography>
              <Typography variant="caption" display="block">
                Dostępna do szybkiej rezerwacji
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="subtitle2" sx={{ mt: 2 }}>Wyposażenie:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {selectedRoom.equipment.map((item, index) => (
              <Chip key={index} label={item} size="small" />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined" 
              sx={{ mr: 1 }}
              onClick={() => {}}
            >
              Pokaż kalendarz
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleOpenReservationDialog}
            >
              Zarezerwuj teraz
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Renderowanie rezerwacji
  const renderReservations = () => {
    const groupedReservations = groupReservationsByDate();
    const dates = Object.keys(groupedReservations).sort();
    
    if (dates.length === 0) {
      return (
        <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
          <Typography variant="subtitle1">Brak rezerwacji dla wybranej sali</Typography>
        </Box>
      );
    }

    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Rezerwacje sali {selectedRoom?.name}
        </Typography>
        
        {dates.map(date => (
          <Box key={date} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              {new Date(date).toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
            
            {groupedReservations[date].map((reservation, index) => (
              <Card key={index} sx={{ mb: 1, boxShadow: 2 }}>
                <CardContent sx={{ py: 1 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ mr: 0.5, fontSize: '1rem', color: theme.palette.primary.main }} />
                        <Typography variant="body2">
                          {reservation.startTime}-{reservation.endTime}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {reservation.purpose}
                      </Typography>
                      <Typography variant="caption" display="block">
                        {reservation.teacher}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={reservation.status === 'confirmed' ? 'Potwierdzona' : 'Oczekująca'} 
                        color={reservation.status === 'confirmed' ? "success" : "warning"} 
                        size="small" 
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  // Renderowanie dialogu rezerwacji
  const renderReservationDialog = () => {
    return (
      <Dialog 
        open={openReservationDialog} 
        onClose={handleCloseReservationDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Rezerwacja sali {selectedRoom?.name}
            <IconButton onClick={handleCloseReservationDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <Box sx={{ mt: 1 }}>
              <DatePicker
                label="Data rezerwacji"
                value={reservationDate}
                onChange={(newValue) => setReservationDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                sx={{ mb: 2 }}
              />
            </Box>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TimePicker
                  label="Godzina rozpoczęcia"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="Godzina zakończenia"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          
          <TextField
            label="Cel rezerwacji"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="Nauczyciel"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReservationDialog}>Anuluj</Button>
          <Button 
            onClick={handleReservationSubmit} 
            variant="contained"
            disabled={!purpose || !teacher}
          >
            Zarezerwuj
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        System rezerwacji sal
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 3 }}>
        Zarządzanie dostępnością i rezerwacjami sal lekcyjnych
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {loading ? (
        <Typography>Ładowanie danych o salach...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          {renderRoomList()}
          {renderRoomDetails()}
          {renderReservations()}
          {renderReservationDialog()}
        </Box>
      )}
    </Box>
  );
};

export default RoomReservationSystem;
