import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Button, 
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ComputerIcon from '@mui/icons-material/Computer';
import ScienceIcon from '@mui/icons-material/Science';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.1)',
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(3),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const equipmentTypes = [
  { value: 'computer', label: 'Komputery', icon: <ComputerIcon /> },
  { value: 'science', label: 'Sprzęt laboratoryjny', icon: <ScienceIcon /> },
  { value: 'sports', label: 'Sprzęt sportowy', icon: <FitnessCenterIcon /> },
  { value: 'music', label: 'Instrumenty muzyczne', icon: <MusicNoteIcon /> }
];

const mockRooms = [
  { id: 1, name: '101', floor: 1, capacity: 30, type: 'classroom', equipment: ['computer'], status: 'available' },
  { id: 2, name: '102', floor: 1, capacity: 28, type: 'classroom', equipment: [], status: 'available' },
  { id: 3, name: '201', floor: 2, capacity: 25, type: 'computer-lab', equipment: ['computer'], status: 'available' },
  { id: 4, name: '202', floor: 2, capacity: 24, type: 'science-lab', equipment: ['science'], status: 'maintenance' },
  { id: 5, name: '301', floor: 3, capacity: 30, type: 'classroom', equipment: [], status: 'available' },
  { id: 6, name: 'S1', floor: 0, capacity: 60, type: 'gym', equipment: ['sports'], status: 'available' },
  { id: 7, name: 'M1', floor: 0, capacity: 20, type: 'music-room', equipment: ['music'], status: 'available' }
];

const roomTypes = [
  { value: 'classroom', label: 'Sala lekcyjna' },
  { value: 'computer-lab', label: 'Pracownia komputerowa' },
  { value: 'science-lab', label: 'Laboratorium' },
  { value: 'gym', label: 'Sala gimnastyczna' },
  { value: 'music-room', label: 'Sala muzyczna' }
];

function Rooms() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    floor: 1,
    capacity: 30,
    type: 'classroom',
    equipment: [],
    status: 'available'
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({
      ...newRoom,
      [name]: value
    });
  };

  const handleEquipmentChange = (e) => {
    setNewRoom({
      ...newRoom,
      equipment: e.target.value
    });
  };

  const handleCreateRoom = () => {
    // Tutaj będzie logika tworzenia nowej sali
    console.log('Tworzenie nowej sali:', newRoom);
    handleCloseDialog();
  };

  const getEquipmentIcon = (equipmentType) => {
    const equipment = equipmentTypes.find(e => e.value === equipmentType);
    return equipment ? equipment.icon : null;
  };

  const getRoomTypeLabel = (type) => {
    const roomType = roomTypes.find(t => t.value === type);
    return roomType ? roomType.label : type;
  };

  const getEquipmentLabel = (equipmentType) => {
    const equipment = equipmentTypes.find(e => e.value === equipmentType);
    return equipment ? equipment.label : equipmentType;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Sale</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Dodaj salę
        </Button>
      </Box>

      <SearchBox>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField
          variant="standard"
          placeholder="Szukaj sal..."
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
        />
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </SearchBox>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <CardHeader
              title="Lista sal"
              subheader="Zarządzaj salami i ich wyposażeniem"
              avatar={<MeetingRoomIcon color="primary" />}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Numer sali</TableCell>
                      <TableCell>Piętro</TableCell>
                      <TableCell>Typ</TableCell>
                      <TableCell align="center">Pojemność</TableCell>
                      <TableCell>Wyposażenie</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="right">Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <Typography variant="body1" fontWeight={500}>
                            {room.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{room.floor}</TableCell>
                        <TableCell>
                          <Chip 
                            label={getRoomTypeLabel(room.type)} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="center">{room.capacity}</TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            {room.equipment.map((eq) => (
                              <Chip 
                                key={eq} 
                                label={getEquipmentLabel(eq)} 
                                size="small"
                                icon={getEquipmentIcon(eq)}
                              />
                            ))}
                            {room.equipment.length === 0 && (
                              <Typography variant="body2" color="text.secondary">
                                Brak
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={room.status === 'available' ? 'Dostępna' : 'W konserwacji'} 
                            color={room.status === 'available' ? 'success' : 'warning'} 
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" title="Edytuj">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" title="Usuń">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Dialog dodawania nowej sali */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj nową salę</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Numer sali"
                  fullWidth
                  value={newRoom.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="floor"
                  label="Piętro"
                  type="number"
                  fullWidth
                  value={newRoom.floor}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Typ sali</InputLabel>
                  <Select
                    name="type"
                    value={newRoom.type}
                    label="Typ sali"
                    onChange={handleInputChange}
                  >
                    {roomTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="capacity"
                  label="Pojemność"
                  type="number"
                  fullWidth
                  value={newRoom.capacity}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Wyposażenie</InputLabel>
                  <Select
                    multiple
                    name="equipment"
                    value={newRoom.equipment}
                    label="Wyposażenie"
                    onChange={handleEquipmentChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={getEquipmentLabel(value)} 
                            size="small" 
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {equipmentTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newRoom.status}
                    label="Status"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="available">Dostępna</MenuItem>
                    <MenuItem value="maintenance">W konserwacji</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreateRoom} 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            disabled={!newRoom.name}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Rooms;
