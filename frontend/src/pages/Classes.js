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
import ClassIcon from '@mui/icons-material/Class';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

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

const mockClasses = [
  { id: 1, name: '1A', level: 1, specialization: 'Matematyczno-fizyczna', studentsCount: 28, mainTeacher: 'Jan Kowalski', schoolYear: '2025/2026' },
  { id: 2, name: '1B', level: 1, specialization: 'Biologiczno-chemiczna', studentsCount: 26, mainTeacher: 'Anna Nowak', schoolYear: '2025/2026' },
  { id: 3, name: '2A', level: 2, specialization: 'Matematyczno-fizyczna', studentsCount: 25, mainTeacher: 'Piotr Wiśniewski', schoolYear: '2025/2026' },
  { id: 4, name: '2B', level: 2, specialization: 'Biologiczno-chemiczna', studentsCount: 27, mainTeacher: 'Maria Dąbrowska', schoolYear: '2025/2026' },
  { id: 5, name: '3A', level: 3, specialization: 'Matematyczno-fizyczna', studentsCount: 24, mainTeacher: 'Tomasz Lewandowski', schoolYear: '2025/2026' },
  { id: 6, name: '3B', level: 3, specialization: 'Biologiczno-chemiczna', studentsCount: 26, mainTeacher: 'Katarzyna Zielińska', schoolYear: '2025/2026' },
  { id: 7, name: '4A', level: 4, specialization: 'Matematyczno-fizyczna', studentsCount: 23, mainTeacher: 'Michał Szymański', schoolYear: '2025/2026' }
];

const specializations = [
  { value: 'math-physics', label: 'Matematyczno-fizyczna' },
  { value: 'bio-chem', label: 'Biologiczno-chemiczna' },
  { value: 'humanities', label: 'Humanistyczna' },
  { value: 'languages', label: 'Językowa' },
  { value: 'general', label: 'Ogólna' }
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

function Classes() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    level: 1,
    specialization: '',
    studentsCount: 25,
    mainTeacher: '',
    schoolYear: '2025/2026'
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({
      ...newClass,
      [name]: value
    });
  };

  const handleCreateClass = () => {
    // Tutaj będzie logika tworzenia nowej klasy
    console.log('Tworzenie nowej klasy:', newClass);
    handleCloseDialog();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Klasy</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Dodaj klasę
        </Button>
      </Box>

      <SearchBox>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField
          variant="standard"
          placeholder="Szukaj klas..."
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
              title="Lista klas"
              subheader="Zarządzaj klasami i ich specjalizacjami"
              avatar={<ClassIcon color="primary" />}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nazwa</TableCell>
                      <TableCell>Poziom</TableCell>
                      <TableCell>Specjalizacja</TableCell>
                      <TableCell align="center">Liczba uczniów</TableCell>
                      <TableCell>Wychowawca</TableCell>
                      <TableCell>Rok szkolny</TableCell>
                      <TableCell align="right">Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockClasses.map((classItem) => (
                      <TableRow key={classItem.id}>
                        <TableCell>
                          <Typography variant="body1" fontWeight={500}>
                            {classItem.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{classItem.level}</TableCell>
                        <TableCell>
                          <Chip 
                            label={classItem.specialization} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="center">{classItem.studentsCount}</TableCell>
                        <TableCell>{classItem.mainTeacher}</TableCell>
                        <TableCell>{classItem.schoolYear}</TableCell>
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

      {/* Dialog dodawania nowej klasy */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj nową klasę</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Nazwa klasy"
                  fullWidth
                  value={newClass.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="level"
                  label="Poziom"
                  type="number"
                  fullWidth
                  value={newClass.level}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 1, max: 8 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Specjalizacja</InputLabel>
                  <Select
                    name="specialization"
                    value={newClass.specialization}
                    label="Specjalizacja"
                    onChange={handleInputChange}
                  >
                    {specializations.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="studentsCount"
                  label="Liczba uczniów"
                  type="number"
                  fullWidth
                  value={newClass.studentsCount}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 1, max: 40 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Wychowawca</InputLabel>
                  <Select
                    name="mainTeacher"
                    value={newClass.mainTeacher}
                    label="Wychowawca"
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
              <Grid item xs={12}>
                <TextField
                  name="schoolYear"
                  label="Rok szkolny"
                  fullWidth
                  value={newClass.schoolYear}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreateClass} 
            variant="contained" 
            color="primary"
            startIcon={<GroupAddIcon />}
            disabled={!newClass.name || !newClass.specialization || !newClass.mainTeacher}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Classes;
