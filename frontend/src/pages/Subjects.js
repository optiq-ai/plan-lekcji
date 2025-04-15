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
import SubjectIcon from '@mui/icons-material/Subject';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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

const mockSubjects = [
  { id: 1, name: 'Matematyka', shortName: 'MAT', hoursPerWeek: { 1: 4, 2: 4, 3: 3, 4: 3 }, requiresSpecialRoom: false, color: '#4caf50' },
  { id: 2, name: 'Fizyka', shortName: 'FIZ', hoursPerWeek: { 1: 2, 2: 3, 3: 3, 4: 2 }, requiresSpecialRoom: true, color: '#2196f3' },
  { id: 3, name: 'Chemia', shortName: 'CHEM', hoursPerWeek: { 1: 2, 2: 2, 3: 2, 4: 0 }, requiresSpecialRoom: true, color: '#ff9800' },
  { id: 4, name: 'Biologia', shortName: 'BIO', hoursPerWeek: { 1: 2, 2: 2, 3: 1, 4: 0 }, requiresSpecialRoom: false, color: '#8bc34a' },
  { id: 5, name: 'Język polski', shortName: 'POL', hoursPerWeek: { 1: 4, 2: 4, 3: 4, 4: 4 }, requiresSpecialRoom: false, color: '#f44336' },
  { id: 6, name: 'Język angielski', shortName: 'ANG', hoursPerWeek: { 1: 3, 2: 3, 3: 3, 4: 3 }, requiresSpecialRoom: false, color: '#9c27b0' },
  { id: 7, name: 'Historia', shortName: 'HIST', hoursPerWeek: { 1: 2, 2: 2, 3: 2, 4: 2 }, requiresSpecialRoom: false, color: '#795548' },
  { id: 8, name: 'Geografia', shortName: 'GEO', hoursPerWeek: { 1: 1, 2: 2, 3: 1, 4: 0 }, requiresSpecialRoom: false, color: '#607d8b' },
  { id: 9, name: 'Informatyka', shortName: 'INF', hoursPerWeek: { 1: 1, 2: 1, 3: 1, 4: 1 }, requiresSpecialRoom: true, color: '#00bcd4' },
  { id: 10, name: 'Wychowanie fizyczne', shortName: 'WF', hoursPerWeek: { 1: 3, 2: 3, 3: 3, 4: 3 }, requiresSpecialRoom: true, color: '#ff5722' }
];

function Subjects() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    shortName: '',
    hoursPerWeek: { 1: 0, 2: 0, 3: 0, 4: 0 },
    requiresSpecialRoom: false,
    color: '#2196f3'
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({
      ...newSubject,
      [name]: value
    });
  };

  const handleHoursChange = (level, value) => {
    setNewSubject({
      ...newSubject,
      hoursPerWeek: {
        ...newSubject.hoursPerWeek,
        [level]: parseInt(value, 10) || 0
      }
    });
  };

  const handleCreateSubject = () => {
    // Tutaj będzie logika tworzenia nowego przedmiotu
    console.log('Tworzenie nowego przedmiotu:', newSubject);
    handleCloseDialog();
  };

  const getHoursDisplay = (hoursObj) => {
    return Object.entries(hoursObj)
      .map(([level, hours]) => `${level}: ${hours}h`)
      .join(', ');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Przedmioty</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Dodaj przedmiot
        </Button>
      </Box>

      <SearchBox>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField
          variant="standard"
          placeholder="Szukaj przedmiotów..."
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
              title="Lista przedmiotów"
              subheader="Zarządzaj przedmiotami i ich wymaganiami"
              avatar={<SubjectIcon color="primary" />}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, p: 0 }}>
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nazwa</TableCell>
                      <TableCell>Skrót</TableCell>
                      <TableCell>Godziny tygodniowo (wg poziomu)</TableCell>
                      <TableCell align="center">Wymaga specjalnej sali</TableCell>
                      <TableCell>Kolor</TableCell>
                      <TableCell align="right">Akcje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockSubjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <MenuBookIcon sx={{ mr: 1, color: subject.color }} />
                            <Typography variant="body1" fontWeight={500}>
                              {subject.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{subject.shortName}</TableCell>
                        <TableCell>{getHoursDisplay(subject.hoursPerWeek)}</TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={subject.requiresSpecialRoom ? 'Tak' : 'Nie'} 
                            color={subject.requiresSpecialRoom ? 'primary' : 'default'} 
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box 
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              borderRadius: '50%', 
                              bgcolor: subject.color,
                              border: '1px solid rgba(0, 0, 0, 0.12)'
                            }} 
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

      {/* Dialog dodawania nowego przedmiotu */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj nowy przedmiot</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  name="name"
                  label="Nazwa przedmiotu"
                  fullWidth
                  value={newSubject.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="shortName"
                  label="Skrót"
                  fullWidth
                  value={newSubject.shortName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Godziny tygodniowo (wg poziomu)
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3, 4].map((level) => (
                    <Grid item xs={3} key={level}>
                      <TextField
                        label={`Poziom ${level}`}
                        type="number"
                        fullWidth
                        value={newSubject.hoursPerWeek[level]}
                        onChange={(e) => handleHoursChange(level, e.target.value)}
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Wymaga specjalnej sali</InputLabel>
                  <Select
                    name="requiresSpecialRoom"
                    value={newSubject.requiresSpecialRoom}
                    label="Wymaga specjalnej sali"
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'requiresSpecialRoom',
                        value: e.target.value === 'true'
                      }
                    })}
                  >
                    <MenuItem value="false">Nie</MenuItem>
                    <MenuItem value="true">Tak</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="color"
                  label="Kolor (HEX)"
                  fullWidth
                  value={newSubject.color}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <Box 
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: '50%', 
                          bgcolor: newSubject.color,
                          border: '1px solid rgba(0, 0, 0, 0.12)',
                          mr: 1
                        }} 
                      />
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreateSubject} 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            disabled={!newSubject.name || !newSubject.shortName}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Subjects;
