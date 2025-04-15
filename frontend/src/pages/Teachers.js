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
  Avatar,
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
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

const subjects = [
  { value: 'math', label: 'Matematyka' },
  { value: 'physics', label: 'Fizyka' },
  { value: 'chemistry', label: 'Chemia' },
  { value: 'biology', label: 'Biologia' },
  { value: 'polish', label: 'Język polski' },
  { value: 'english', label: 'Język angielski' },
  { value: 'history', label: 'Historia' },
  { value: 'geography', label: 'Geografia' },
  { value: 'pe', label: 'Wychowanie fizyczne' },
  { value: 'cs', label: 'Informatyka' }
];

const mockTeachers = [
  { id: 1, firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@szkola.pl', subjects: ['math', 'physics'], hoursPerWeek: 18, status: 'active' },
  { id: 2, firstName: 'Anna', lastName: 'Nowak', email: 'anna.nowak@szkola.pl', subjects: ['polish', 'history'], hoursPerWeek: 20, status: 'active' },
  { id: 3, firstName: 'Piotr', lastName: 'Wiśniewski', email: 'piotr.wisniewski@szkola.pl', subjects: ['biology', 'chemistry'], hoursPerWeek: 16, status: 'active' },
  { id: 4, firstName: 'Maria', lastName: 'Dąbrowska', email: 'maria.dabrowska@szkola.pl', subjects: ['english'], hoursPerWeek: 22, status: 'active' },
  { id: 5, firstName: 'Tomasz', lastName: 'Lewandowski', email: 'tomasz.lewandowski@szkola.pl', subjects: ['pe'], hoursPerWeek: 24, status: 'active' },
  { id: 6, firstName: 'Katarzyna', lastName: 'Zielińska', email: 'katarzyna.zielinska@szkola.pl', subjects: ['geography', 'biology'], hoursPerWeek: 18, status: 'inactive' },
  { id: 7, firstName: 'Michał', lastName: 'Szymański', email: 'michal.szymanski@szkola.pl', subjects: ['cs', 'math'], hoursPerWeek: 20, status: 'active' }
];

function Teachers() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subjects: [],
    hoursPerWeek: 18,
    status: 'active'
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value
    });
  };

  const handleSubjectsChange = (e) => {
    setNewTeacher({
      ...newTeacher,
      subjects: e.target.value
    });
  };

  const handleCreateTeacher = () => {
    // Tutaj będzie logika tworzenia nowego nauczyciela
    console.log('Tworzenie nowego nauczyciela:', newTeacher);
    handleCloseDialog();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Nauczyciele</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Dodaj nauczyciela
        </Button>
      </Box>

      <SearchBox>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField
          variant="standard"
          placeholder="Szukaj nauczycieli..."
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
              title="Lista nauczycieli"
              subheader="Zarządzaj nauczycielami i ich przedmiotami"
              avatar={<PeopleIcon color="primary" />}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nauczyciel</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Przedmioty</TableCell>
                      <TableCell align="center">Godziny/tydzień</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="right">Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                              {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                            </Avatar>
                            <Typography variant="body1">
                              {teacher.firstName} {teacher.lastName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {teacher.subjects.map((subject) => (
                              <Chip 
                                key={subject} 
                                label={subjects.find(s => s.value === subject)?.label || subject} 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell align="center">{teacher.hoursPerWeek}</TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={teacher.status === 'active' ? 'Aktywny' : 'Nieaktywny'} 
                            color={teacher.status === 'active' ? 'success' : 'default'} 
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

      {/* Dialog dodawania nowego nauczyciela */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj nowego nauczyciela</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  label="Imię"
                  fullWidth
                  value={newTeacher.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  label="Nazwisko"
                  fullWidth
                  value={newTeacher.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  value={newTeacher.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Przedmioty</InputLabel>
                  <Select
                    multiple
                    name="subjects"
                    value={newTeacher.subjects}
                    label="Przedmioty"
                    onChange={handleSubjectsChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={subjects.find(s => s.value === value)?.label || value} 
                            size="small" 
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="hoursPerWeek"
                  label="Godziny tygodniowo"
                  type="number"
                  fullWidth
                  value={newTeacher.hoursPerWeek}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 1, max: 40 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newTeacher.status}
                    label="Status"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="active">Aktywny</MenuItem>
                    <MenuItem value="inactive">Nieaktywny</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreateTeacher} 
            variant="contained" 
            color="primary"
            startIcon={<PersonAddIcon />}
            disabled={!newTeacher.firstName || !newTeacher.lastName || !newTeacher.email}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Teachers;
