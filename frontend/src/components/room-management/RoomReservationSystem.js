import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShareIcon from '@mui/icons-material/Share';

// Stylizowany kontener
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

// Stylizowany Paper dla zawartości
const StyledContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(3),
}));

// Stylizowany Chip dla statusu
const StatusChip = styled(Chip)(({ theme, status }) => {
  let color = '#4caf50';
  let bgcolor = '#e8f5e9';
  
  if (status === 'zajęta') {
    color = '#f44336';
    bgcolor = '#ffebee';
  } else if (status === 'częściowo') {
    color = '#ff9800';
    bgcolor = '#fff3e0';
  }
  
  return {
    backgroundColor: bgcolor,
    color: color,
    fontWeight: 'bold',
    '& .MuiChip-icon': {
      color: color,
    },
  };
});

// Komponent systemu rezerwacji sal
const RoomReservationSystem = () => {
  const [selectedDate, setSelectedDate] = useState('12.04.2025');
  const [selectedRoom, setSelectedRoom] = useState('103');
  const [openDialog, setOpenDialog] = useState(false);
  const [reservationTime, setReservationTime] = useState('');
  const [reservationPurpose, setReservationPurpose] = useState('');
  
  // Dane sal
  const rooms = [
    { id: '101', name: 'Sala informatyczna 101', capacity: 24, equipment: ['Komputery', 'Projektor', 'Tablica interaktywna'] },
    { id: '102', name: 'Sala językowa 102', capacity: 20, equipment: ['Sprzęt audio', 'Projektor'] },
    { id: '103', name: 'Sala ogólna 103', capacity: 30, equipment: ['Projektor', 'Tablica'] },
    { id: '104', name: 'Pracownia fizyczna 104', capacity: 24, equipment: ['Sprzęt laboratoryjny', 'Projektor'] },
    { id: '105', name: 'Sala ogólna 105', capacity: 30, equipment: ['Projektor', 'Tablica'] },
  ];
  
  // Dane dostępności sal
  const availability = [
    { 
      date: '12.04.2025', 
      rooms: {
        '101': [
          { time: '8:00-8:45', status: 'zajęta', class: '1A', teacher: 'mgr Kowalski', subject: 'Informatyka' },
          { time: '8:55-9:40', status: 'zajęta', class: '2B', teacher: 'mgr Nowak', subject: 'Informatyka' },
          { time: '9:50-10:35', status: 'wolna' },
          { time: '10:45-11:30', status: 'zajęta', class: '3C', teacher: 'mgr Wiśniewski', subject: 'Informatyka' },
          { time: '11:40-12:25', status: 'wolna' },
          { time: '12:35-13:20', status: 'zajęta', class: '1B', teacher: 'mgr Kowalski', subject: 'Informatyka' },
          { time: '13:30-14:15', status: 'wolna' },
          { time: '14:25-15:10', status: 'wolna' },
        ],
        '103': [
          { time: '8:00-8:45', status: 'zajęta', class: '1A', teacher: 'mgr Kowalska', subject: 'Matematyka' },
          { time: '8:55-9:40', status: 'wolna' },
          { time: '9:50-10:35', status: 'wolna' },
          { time: '10:45-11:30', status: 'zajęta', class: '2A', teacher: 'mgr Kowalska', subject: 'Matematyka' },
          { time: '11:40-12:25', status: 'wolna' },
          { time: '12:35-13:20', status: 'zajęta', class: '3A', teacher: 'mgr Kowalska', subject: 'Matematyka' },
          { time: '13:30-14:15', status: 'wolna' },
          { time: '14:25-15:10', status: 'wolna' },
        ],
      }
    },
    { 
      date: '15.04.2025', 
      rooms: {
        '103': [
          { time: '8:00-8:45', status: 'wolna' },
          { time: '8:55-9:40', status: 'zajęta', class: '2B', teacher: 'mgr Nowak', subject: 'Polski' },
          { time: '9:50-10:35', status: 'zajęta', class: '3B', teacher: 'mgr Nowak', subject: 'Polski' },
          { time: '10:45-11:30', status: 'wolna' },
          { time: '11:40-12:25', status: 'wolna' },
          { time: '12:35-13:20', status: 'zajęta', class: '1C', teacher: 'mgr Nowak', subject: 'Polski' },
          { time: '13:30-14:15', status: 'wolna' },
          { time: '14:25-15:10', status: 'wolna' },
        ],
      }
    },
  ];
  
  // Znajdź dane dostępności dla wybranej daty i sali
  const selectedDateData = availability.find(a => a.date === selectedDate);
  const selectedRoomAvailability = selectedDateData && selectedDateData.rooms[selectedRoom] 
    ? selectedDateData.rooms[selectedRoom] 
    : [];
  
  // Znajdź dane wybranej sali
  const selectedRoomData = rooms.find(r => r.id === selectedRoom);
  
  // Obsługa zmiany daty
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  
  // Obsługa zmiany sali
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };
  
  // Obsługa otwierania/zamykania dialogu rezerwacji
  const handleOpenDialog = (time) => {
    setReservationTime(time);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReservationTime('');
    setReservationPurpose('');
  };
  
  // Obsługa zmiany celu rezerwacji
  const handlePurposeChange = (event) => {
    setReservationPurpose(event.target.value);
  };
  
  // Obsługa zatwierdzania rezerwacji
  const handleReservationSubmit = () => {
    // Tutaj byłaby logika zapisywania rezerwacji
    console.log(`Zarezerwowano salę ${selectedRoom} na ${selectedDate} w godzinach ${reservationTime} w celu: ${reservationPurpose}`);
    handleCloseDialog();
  };
  
  // Oblicz dostępność sali w procentach
  const calculateAvailability = () => {
    if (!selectedRoomAvailability || selectedRoomAvailability.length === 0) return 0;
    
    const totalSlots = selectedRoomAvailability.length;
    const availableSlots = selectedRoomAvailability.filter(slot => slot.status === 'wolna').length;
    
    return Math.round((availableSlots / totalSlots) * 100);
  };
  
  // Renderuj tabelę dostępności
  const renderAvailabilityTable = () => (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'rgba(63, 81, 181, 0.05)' }}>
            <TableCell>Godzina</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Klasa</TableCell>
            <TableCell>Nauczyciel</TableCell>
            <TableCell>Przedmiot</TableCell>
            <TableCell>Akcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedRoomAvailability.map((slot, index) => (
            <TableRow key={index} sx={{ 
              bgcolor: slot.status === 'wolna' ? 'rgba(76, 175, 80, 0.05)' : 'inherit',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
            }}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                  {slot.time}
                </Box>
              </TableCell>
              <TableCell>
                <StatusChip 
                  label={slot.status === 'wolna' ? 'Wolna' : 'Zajęta'} 
                  status={slot.status} 
                  size="small"
                  icon={slot.status === 'wolna' ? <CheckCircleIcon /> : <WarningIcon />}
                />
              </TableCell>
              <TableCell>{slot.class || '-'}</TableCell>
              <TableCell>{slot.teacher || '-'}</TableCell>
              <TableCell>{slot.subject || '-'}</TableCell>
              <TableCell>
                {slot.status === 'wolna' ? (
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog(slot.time)}
                  >
                    Rezerwuj
                  </Button>
                ) : (
                  <Button 
                    variant="text" 
                    size="small" 
                    color="primary"
                    startIcon={<InfoIcon />}
                  >
                    Szczegóły
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
  // Renderuj kartę informacyjną o sali
  const renderRoomInfo = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {selectedRoomData?.name || `Sala ${selectedRoom}`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PersonIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                Pojemność: {selectedRoomData?.capacity || 'N/A'} osób
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <InfoIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'primary.main' }} />
              <Typography variant="body2">
                Wyposażenie: {selectedRoomData?.equipment?.join(', ') || 'Brak danych'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <RoomIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                Lokalizacja: Piętro 1, skrzydło wschodnie
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                Dostępność dzisiaj:
              </Typography>
              <Typography variant="h5" color={calculateAvailability() > 50 ? 'success.main' : 'error.main'}>
                {calculateAvailability()}%
              </Typography>
            </Box>
            <Box sx={{ 
              width: '100%', 
              height: '20px', 
              bgcolor: '#f5f5f5', 
              borderRadius: 5,
              overflow: 'hidden',
              mb: 2
            }}>
              <Box sx={{ 
                width: `${calculateAvailability()}%`, 
                height: '100%', 
                bgcolor: calculateAvailability() > 50 ? 'success.main' : 'error.main',
                borderRadius: 5
              }}></Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<CalendarTodayIcon />}
              >
                Pokaż cały miesiąc
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<ShareIcon />}
              >
                Udostępnij
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  // Dialog rezerwacji
  const renderReservationDialog = () => (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>
        Rezerwacja sali {selectedRoom}
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Data"
              value={selectedDate}
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Godziny"
              value={reservationTime}
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sala"
              value={selectedRoomData?.name || `Sala ${selectedRoom}`}
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: <RoomIcon sx={{ mr: 1, color: 'primary.main' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Cel rezerwacji</InputLabel>
              <Select
                value={reservationPurpose}
                onChange={handlePurposeChange}
                label="Cel rezerwacji"
              >
                <MenuItem value="zajęcia">Zajęcia dodatkowe</MenuItem>
                <MenuItem value="spotkanie">Spotkanie z rodzicami</MenuItem>
                <MenuItem value="rada">Rada pedagogiczna</MenuItem>
                <MenuItem value="wydarzenie">Wydarzenie szkolne</MenuItem>
                <MenuItem value="inne">Inne</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {reservationPurpose === 'inne' && (
            <Grid item xs={12}>
              <TextField
                label="Opisz cel rezerwacji"
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="Dodatkowe uwagi"
              multiline
              rows={2}
              fullWidth
              placeholder="Np. potrzebny sprzęt, ustawienie sali, itp."
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Anuluj</Button>
        <Button 
          onClick={handleReservationSubmit} 
          variant="contained" 
          color="primary"
          disabled={!reservationPurpose}
        >
          Zarezerwuj
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          System rezerwacji sal
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog(selectedRoomAvailability[0]?.time || '8:00-8:45')}
        >
          Nowa rezerwacja
        </Button>
      </Box>
      
      <StyledContentPaper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Data</InputLabel>
              <Select
                value={selectedDate}
                onChange={handleDateChange}
                label="Data"
                startAdornment={<EventIcon sx={{ mr: 1, color: 'primary.main' }} />}
              >
                <MenuItem value="12.04.2025">12.04.2025 (Dzisiaj)</MenuItem>
                <MenuItem value="15.04.2025">15.04.2025 (Wtorek)</MenuItem>
                <MenuItem value="20.04.2025">20.04.2025 (Niedziela)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sala</InputLabel>
              <Select
                value={selectedRoom}
                onChange={handleRoomChange}
                label="Sala"
                startAdornment={<RoomIcon sx={{ mr: 1, color: 'primary.main' }} />}
              >
                {rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        {renderRoomInfo()}
        
        <Typography variant="h6" gutterBottom>
          Dostępność sali {selectedRoom} w dniu {selectedDate}
        </Typography>
        
        {renderAvailabilityTable()}
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="primary">
            Eksportuj do kalendarza
          </Button>
          <Button variant="outlined" color="primary">
            Pokaż wszystkie sale
          </Button>
        </Box>
      </StyledContentPaper>
      
      {renderReservationDialog()}
    </StyledContainer>
  );
};

export default RoomReservationSystem;
