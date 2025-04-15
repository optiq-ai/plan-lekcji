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
  Tabs, 
  Tab, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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

const planTypes = [
  { value: 'balanced', label: 'Zbalansowany' },
  { value: 'economic', label: 'Ekonomiczny' },
  { value: 'student', label: 'Uczniowski' },
  { value: 'teacher', label: 'Nauczycielski' },
  { value: 'targeted', label: 'Celowany' }
];

const schoolTypes = [
  { value: 'primary', label: 'Szkoła podstawowa' },
  { value: 'secondary', label: 'Liceum' },
  { value: 'technical', label: 'Technikum' },
  { value: 'vocational', label: 'Szkoła branżowa' },
  { value: 'kindergarten', label: 'Przedszkole' }
];

const mockPlans = [
  { id: 1, name: 'Plan lekcji 2025/2026 - Liceum', type: 'balanced', schoolType: 'secondary', active: true, lastModified: '2025-04-10' },
  { id: 2, name: 'Plan lekcji 2025/2026 - Technikum', type: 'economic', schoolType: 'technical', active: true, lastModified: '2025-04-08' },
  { id: 3, name: 'Plan lekcji 2024/2025 - Liceum', type: 'student', schoolType: 'secondary', active: false, lastModified: '2024-08-15' },
  { id: 4, name: 'Plan lekcji 2024/2025 - Technikum', type: 'teacher', schoolType: 'technical', active: false, lastModified: '2024-08-12' },
  { id: 5, name: 'Plan lekcji 2025/2026 - Szkoła podstawowa', type: 'balanced', schoolType: 'primary', active: true, lastModified: '2025-04-05' },
  { id: 6, name: 'Plan lekcji 2025/2026 - Szkoła branżowa', type: 'targeted', schoolType: 'vocational', active: true, lastModified: '2025-04-02' }
];

function LessonPlans() {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    type: 'balanced',
    schoolType: 'secondary'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({
      ...newPlan,
      [name]: value
    });
  };

  const handleCreatePlan = () => {
    // Tutaj będzie logika tworzenia nowego planu
    console.log('Tworzenie nowego planu:', newPlan);
    handleCloseDialog();
  };

  const filteredPlans = tabValue === 0 
    ? mockPlans.filter(plan => plan.active) 
    : mockPlans;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Plany lekcji</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nowy plan
        </Button>
      </Box>

      <SearchBox>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField
          variant="standard"
          placeholder="Szukaj planów..."
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
        />
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </SearchBox>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Aktywne plany" />
        <Tab label="Wszystkie plany" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredPlans.map((plan) => (
          <Grid item xs={12} md={6} lg={4} key={plan.id}>
            <StyledCard>
              <CardHeader
                title={plan.name}
                subheader={`Typ: ${planTypes.find(t => t.value === plan.type)?.label || plan.type}`}
                avatar={<CalendarMonthIcon color="primary" />}
                action={
                  <Box>
                    <IconButton size="small" title="Edytuj">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Duplikuj">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Usuń">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
              <Divider />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Typ szkoły: {schoolTypes.find(t => t.value === plan.schoolType)?.label || plan.schoolType}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Status: {plan.active ? 'Aktywny' : 'Nieaktywny'}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Ostatnia modyfikacja: {plan.lastModified}
                </Typography>
              </CardContent>
              <Divider />
              <Box p={2} display="flex" justifyContent="space-between">
                <Button variant="outlined" size="small">
                  Podgląd
                </Button>
                <Button variant="contained" color="primary" size="small">
                  Edytuj
                </Button>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Dialog tworzenia nowego planu */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Utwórz nowy plan lekcji</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <TextField
              name="name"
              label="Nazwa planu"
              fullWidth
              margin="normal"
              value={newPlan.name}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Typ planu</InputLabel>
              <Select
                name="type"
                value={newPlan.type}
                label="Typ planu"
                onChange={handleInputChange}
              >
                {planTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Typ szkoły</InputLabel>
              <Select
                name="schoolType"
                value={newPlan.schoolType}
                label="Typ szkoły"
                onChange={handleInputChange}
              >
                {schoolTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button 
            onClick={handleCreatePlan} 
            variant="contained" 
            color="primary"
            disabled={!newPlan.name}
          >
            Utwórz
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LessonPlans;
