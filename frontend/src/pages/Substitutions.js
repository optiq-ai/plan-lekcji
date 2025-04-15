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
  MenuItem,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';

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

const mockSubstitutions = [
  { 
    id: 1, 
    date: '2025-04-15', 
    originalTeacher: 'Jan Kowalski', 
    substituteTeacher: 'Michał Szymański', 
    class: '1A', 
    subject: 'Matematyka', 
    lessonNumber: 3,
    room: '101',
    status: 'pending',
    reason: 'Choroba'
  },
  { 
    id: 2, 
    date: '2025-04-15', 
    originalTeacher: 'Anna Nowak', 
    substituteTeacher: 'Katarzyna Zielińska', 
    class: '2B', 
    subject: 'Język polski', 
    lessonNumber: 4,
    room: '102',
    status: 'approved',
    reason: 'Szkolenie'
  },
  { 
    id: 3, 
    date: '2025-04-16', 
    originalTeacher: 'Piotr Wiśniewski', 
    substituteTeacher: 'Tomasz Lewandowski', 
    class: '3A', 
    subject: 'Biologia', 
    lessonNumber: 2,
    room: '202',
    status: 'approved',
    reason: 'Urlop'
  },
  { 
    id: 4, 
    date: '2025-04-17', 
    originalTeacher: 'Maria Dąbrowska', 
    substituteTeacher: '', 
    class: '4A', 
    subject: 'Język angielski', 
    lessonNumber: 5,
    room: '301',
    status: 'unassigned',
    reason: 'Konferencja'
  },
  { 
    id: 5, 
    date: '2025-04-18', 
    originalTeacher: 'Tomasz Lewandowski', 
    substituteTeacher: 'Jan Kowalski', 
    class: '2A', 
    subject: 'Wychowanie fizyczne', 
    lessonNumber: 1,
    room: 'S1',
    status: 'pending',
    reason: 'Zawody sportowe'
  }
];

const teachers = [
  { value: 'jan.kowalski', label: 'Jan Kowalski' },
  { value: 'anna.nowak', label: 'Anna Nowak' },
  { value: 'piotr.wisniewski', label: 'Piotr Wiśniewski' },
  { value: 'maria.dabrowska', label: 'Maria Dąbrowska' },
  { value: 'tomasz.lewandowski', label: 'Tomasz Lewandowski' },
  { value: 'katarzyna.zielinska', label: 'Katarzyna Zielińska' },
  { value: 'michal.szymanski', label: 'Michał Szymański' }
];

const classes = [
  { value: '1a', label: '1A' },
  { value: '1b', label: '1B' },
  { value: '2a', label: '2A' },
  { value: '2b', label: '2B' },
  { value: '3a', label: '3A' },
  { value: '3b', label: '3B' },
  { value: '4a', label: '4A' }
];

const subjects = [
  { value: 'math', label: 'Matematyka' },
  { value: 'physics', label: 'Fizyka' },
  { value: 'chemistry', label: 'Chemia' },
  { value: 'biology', label: 'Biologia' },
  { value: 'polish', label: 'Język polski' },
  { value: 'english', label: 'Język angielski' },
  { value: 'history', label: 'Historia' },
  { value: 'geography', label: 'Geografia' },
  { value: 'cs', label: 'Informatyka' },
  { value: 'pe', label: 'Wychowanie fizyczne' }
];

const rooms = [
  { value: '101', label: '101' },
  { value: '102', label: '102' },
  { value: '201', label: '201' },
  { value: '202', label: '202' },
  { value: '301', label: '301' },
  { value: 's1', label: 'S1' },
  { value: 'm1', label: 'M1' }
];

const reasons = [
  { value: 'illness', label: 'Choroba' },
  { value: 'training', label: 'Szkolenie' },
  { value: 'leave', label: 'Urlop' },
  { value: 'conference', label: 'Konferencja' },
  { value: 'sports', label: 'Zawody sportowe' },
  { value: 'other', label: 'Inne' }
];

function Substitutions() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newSubstitution, setNewSubstitution] = useState({
    date: new Date().toISOString().split('T')[0],
    originalTeacher: '',
    substituteTeacher: '',
    class: '',
    subject: '',
    lessonNumber: 1,
    room: '',
    status: 'unassigned',
    reason: ''
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubstitution({
      ...newSubstitution,
      [name]: value
    });
  };

  const handleCreateSubstitution = () => {
    // Tutaj będzie logika tworzenia nowego zastępstwa
    console.log('Tworzenie nowego zastępstwa:', newSubstitution);
    handleCloseDialog();
  };

  const getStatusChip = (status) => {
    switch(status) {
      case 'approved':
        return <Chip label="Zatwierdzone" color="success" size="small" />;
      case 'pending':
        return <Chip label="Oczekujące" color="warning" size="small" />;
      case 'unassigned':
        return <Chip label="Nieprzydzielone" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Zastępstwa</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Dodaj zastępstwo
        </Button>
      </Box>

      <SearchBox>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField
          variant="standard"
          placeholder="Szukaj zastępstw..."
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
              title="Lista zastępstw"
              subheader="Zarządzaj zastępstwami nauczycieli"
              avatar={<SwapHorizIcon color="primary" />}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Lekcja</TableCell>
                      <TableCell>Klasa</TableCell>
                      <TableCell>Przedmiot</TableCell>
                      <TableCell>Nauczyciel</TableCell>
                      <TableCell>Zastępstwo</TableCell>
                      <TableCell>Sala</TableCell>
                      <TableCell>Powód</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="right">Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockSubstitutions.map((substitution) => (
                      <TableRow key={substitution.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <EventAvailableIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body2">
                              {substitution.date}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{substitution.lessonNumber}</TableCell>
                        <TableCell>{substitution.class}</TableCell>
                        <TableCell>{substitution.subject}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                              {substitution.originalTeacher.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            {substitution.originalTeacher}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {substitution.substituteTeacher ? (
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem', bgcolor: 'secondary.main' }}>
                                {substitution.substituteTeacher.split(' ').map(n => n[0]).join('')}
                              </Avatar>
                              {substitution.substituteTeacher}
                            </Box>
                          ) : (
                            <Chip 
                              icon={<PersonIcon />} 
                              label="Przydziel nauczyciela" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          )}
                        </TableCell>
                        <TableCell>{substitution.room}</TableCell>
                        <TableCell>{substitution.reason}</TableCell>
                        <TableCell align="center">
                          {getStatusChip(substitution.status)}
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

      {/* Dialog dodawania nowego zastępstwa */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Dodaj nowe zastępstwo</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="date"
                  label="Data"
                  type="date"
                  fullWidth
                  value={newSubstitution.date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Klasa</InputLabel>
                  <Select
                    name="class"
                    value={newSubstitution.class}
                    label="Klasa"
                    onChange={handleInputChange}
                  >
                    {classes.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="lessonNumber"
                  label="Numer lekcji"
                  type="number"
                  fullWidth
                  value={newSubstitution.lessonNumber}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Przedmiot</InputLabel>
                  <Select
                    name="subject"
                    value={newSubstitution.subject}
                    label="Przedmiot"
                    onChange={handleInputChange}
                  >
                    {subjects.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Nauczyciel</InputLabel>
                  <Select
                    name="originalTeacher"
                    value={newSubstitution.originalTeacher}
                    label="Nauczyciel"
                    onChange={handleInputChange}
                  >
                    {teachers.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Zastępstwo</InputLabel>
                  <Select
                    name="substituteTeacher"
                    value={newSubstitution.substituteTeacher}
                    label="Zastępstwo"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Nieprzydzielone</em>
                    </MenuItem>
                    {teachers.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Sala</InputLabel>
                  <Select
                    name="room"
                    value={newSubstitution.room}
                    label="Sala"
                    onChange={handleInputChange}
                  >
                    {rooms.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Powód</InputLabel>
                  <Select
                    name="reason"
                    value={newSubstitution.reason}
                    label="Powód"
                    onChange={handleInputChange}
                  >
                    {reasons.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newSubstitution.status}
                    label="Status"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="unassigned">Nieprzydzielone</MenuItem>
                    <MenuItem value="pending">Oczekujące</MenuItem>
                    <MenuItem value="approved">Zatwierdzone</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreateSubstitution} 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            disabled={!newSubstitution.date || !newSubstitution.originalTeacher || !newSubstitution.class || !newSubstitution.subject}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Substitutions;
