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
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RefreshIcon from '@mui/icons-material/Refresh';

// Stylizowany kontener
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

// Stylizowany Paper dla zakładek
const StyledTabsContainer = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

// Stylizowany Paper dla zawartości
const StyledContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(3),
}));

// Kolory dla wykresów
const COLORS = ['#3f51b5', '#f44336', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4'];

// Dane dla heatmapy obciążenia nauczycieli
const teacherLoadData = [
  { day: 'Poniedziałek', '8:00-9:40': 'low', '9:50-11:30': 'low', '11:50-13:30': 'medium', '13:40-15:20': 'low', '15:30-17:10': 'high' },
  { day: 'Wtorek', '8:00-9:40': 'low', '9:50-11:30': 'low', '11:50-13:30': 'high', '13:40-15:20': 'low', '15:30-17:10': 'low' },
  { day: 'Środa', '8:00-9:40': 'high', '9:50-11:30': 'medium', '11:50-13:30': 'low', '13:40-15:20': 'low', '15:30-17:10': 'medium' },
  { day: 'Czwartek', '8:00-9:40': 'medium', '9:50-11:30': 'medium', '11:50-13:30': 'low', '13:40-15:20': 'low', '15:30-17:10': 'low' },
  { day: 'Piątek', '8:00-9:40': 'low', '9:50-11:30': 'high', '11:50-13:30': 'medium', '13:40-15:20': 'low', '15:30-17:10': 'low' },
];

// Dane dla wykresu obciążenia uczniów
const studentLoadData = [
  { name: '1A', load: 'optimal' },
  { name: '1B', load: 'high' },
  { name: '2A', load: 'optimal' },
  { name: '2B', load: 'medium' },
  { name: '3A', load: 'high' },
  { name: '3B', load: 'optimal' },
];

// Dane dla wykresu rozkładu przedmiotów w tygodniu
const subjectDistributionData = [
  { day: 'PON', '1A': 3, '2B': 4, '3C': 2 },
  { day: 'WT', '1A': 4, '2B': 2, '3C': 3 },
  { day: 'ŚR', '1A': 3, '2B': 3, '3C': 4 },
  { day: 'CZW', '1A': 5, '2B': 3, '3C': 2 },
  { day: 'PT', '1A': 2, '2B': 5, '3C': 3 },
];

// Dane dla wykresu prognozowanych konfliktów
const conflictForecastData = [
  { week: 1, conflicts: 5 },
  { week: 2, conflicts: 3 },
  { week: 3, conflicts: 7 },
  { week: 4, conflicts: 4 },
  { week: 5, conflicts: 6 },
  { week: 6, conflicts: 8 },
  { week: 7, conflicts: 5 },
  { week: 8, conflicts: 3 },
  { week: 9, conflicts: 4 },
  { week: 10, conflicts: 7 },
  { week: 11, conflicts: 5 },
  { week: 12, conflicts: 6 },
];

// Dane dla wykresu wykorzystania sal
const roomUtilizationData = [
  { name: 'W pełni wykorzystane', value: 42, color: '#f44336' },
  { name: 'Częściowo wykorzystane', value: 23, color: '#ffcdd2' },
  { name: 'Niewykorzystane', value: 27, color: '#ffffff' },
  { name: 'Zarezerwowane', value: 5, color: '#bbdefb' },
  { name: 'Nieczynn/Remont', value: 3, color: '#9e9e9e' },
];

// Komponent heatmapy obciążenia nauczycieli
const TeacherLoadHeatmap = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('Bieżący semestr');
  const [selectedDepartment, setSelectedDepartment] = useState('Wszyscy nauczyciele');
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa zmiany okresu
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };
  
  // Obsługa zmiany działu
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  
  // Renderowanie komórki heatmapy
  const renderHeatmapCell = (value) => {
    let bgcolor = '#4caf50'; // zielony dla niskiego obciążenia
    let textColor = 'white';
    
    if (value === 'medium') {
      bgcolor = '#ff9800'; // pomarańczowy dla średniego obciążenia
    } else if (value === 'high') {
      bgcolor = '#f44336'; // czerwony dla wysokiego obciążenia
    }
    
    return (
      <Box sx={{ 
        bgcolor, 
        color: textColor, 
        p: 2, 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '4px',
      }}>
        {value === 'low' && 'Niskie obciążenie'}
        {value === 'medium' && 'Podwyższone'}
        {value === 'high' && 'Krytyczne'}
      </Box>
    );
  };
  
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Statystyki obciążenia
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Analiza obciążenia nauczycieli i uczniów w roku szkolnym 2025/2026
      </Typography>
      
      <StyledTabsContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="zakładki statystyk obciążenia"
        >
          <Tab label="Obciążenie nauczycieli i uczniów" />
          <Tab label="Wykorzystanie sal" />
          <Tab label="Efektywność dydaktyczna" />
          <Tab label="Raporty i wydruki" />
        </Tabs>
      </StyledTabsContainer>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Okres:</InputLabel>
            <Select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              label="Okres:"
            >
              <MenuItem value="Bieżący semestr">Bieżący semestr</MenuItem>
              <MenuItem value="Cały rok szkolny">Cały rok szkolny</MenuItem>
              <MenuItem value="Ostatni miesiąc">Ostatni miesiąc</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Dział:</InputLabel>
            <Select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              label="Dział:"
            >
              <MenuItem value="Wszyscy nauczyciele">Wszyscy nauczyciele</MenuItem>
              <MenuItem value="Matematyka i fizyka">Matematyka i fizyka</MenuItem>
              <MenuItem value="Języki obce">Języki obce</MenuItem>
              <MenuItem value="Przedmioty humanistyczne">Przedmioty humanistyczne</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SmartToyIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="body2" color="primary">
          AI: Pokazuję obszary wymagające równoważenia obciążeń
        </Typography>
      </Box>
      
      <StyledContentPaper>
        <Typography variant="h6" gutterBottom>
          Obciążenie nauczycieli (heatmapa)
        </Typography>
        
        <Grid container spacing={1} sx={{ mb: 3 }}>
          <Grid item xs={2}>
            <Box sx={{ 
              bgcolor: '#f5f5f5', 
              p: 2, 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              borderRadius: '4px',
            }}>
              
            </Box>
          </Grid>
          {['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'].map((day) => (
            <Grid item xs={2} key={day}>
              <Box sx={{ 
                bgcolor: '#3f51b5', 
                color: 'white', 
                p: 2, 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                borderRadius: '4px',
              }}>
                {day}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {['8:00-9:40', '9:50-11:30', '11:50-13:30', '13:40-15:20', '15:30-17:10'].map((timeSlot) => (
          <Grid container spacing={1} sx={{ mb: 1 }} key={timeSlot}>
            <Grid item xs={2}>
              <Box sx={{ 
                bgcolor: '#f5f5f5', 
                p: 2, 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                borderRadius: '4px',
              }}>
                {timeSlot}
              </Box>
            </Grid>
            {teacherLoadData.map((day) => (
              <Grid item xs={2} key={day.day}>
                {renderHeatmapCell(day[timeSlot])}
              </Grid>
            ))}
          </Grid>
        ))}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 20, height: 20, bgcolor: '#4caf50', mr: 1, borderRadius: '4px' }}></Box>
            <Typography variant="body2" sx={{ mr: 2 }}>Niskie obciążenie</Typography>
            
            <Box sx={{ width: 20, height: 20, bgcolor: '#ff9800', mr: 1, borderRadius: '4px' }}></Box>
            <Typography variant="body2" sx={{ mr: 2 }}>Optymalne</Typography>
            
            <Box sx={{ width: 20, height: 20, bgcolor: '#f44336', mr: 1, borderRadius: '4px' }}></Box>
            <Typography variant="body2">Krytyczne</Typography>
          </Box>
          
          <Button variant="contained" color="primary">
            Zoptymalizuj automatycznie
          </Button>
        </Box>
      </StyledContentPaper>
      
      <Card sx={{ mb: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: '4px' }}>
        <Typography variant="h6" gutterBottom>
          Obszary krytycznego obciążenia
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="error" gutterBottom>
            Środa 8:00-9:40
          </Typography>
          <Typography variant="body2" paragraph>
            7 nauczycieli ma zajęcia, 2 klasy bez nauczyciela.
            Sugestia: przesuń j.angielski kl.2C na wtorek.
          </Typography>
          
          <Typography variant="subtitle1" color="error" gutterBottom>
            Piątek 9:50-11:30
          </Typography>
          <Typography variant="body2" paragraph>
            Zbyt dużo przedmiotów ścisłych dla klas 1A, 1B, 3C.
            Sugestia: zamiana z WF w poniedziałek.
          </Typography>
          
          <Typography variant="subtitle1" color="error" gutterBottom>
            Poniedziałek 15:30-17:10
          </Typography>
          <Typography variant="body2">
            Nauczyciele matematyki przeciążeni - 3 klasy równolegle.
            Sugestia: rozłóż równomiernie na tydzień.
          </Typography>
        </Box>
      </Card>
      
      <StyledContentPaper>
        <Typography variant="h6" gutterBottom>
          Obciążenie uczniów (trudność przedmiotów w ciągu dnia)
        </Typography>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={subjectDistributionData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="1A" fill="#3f51b5" name="Klasa 1A" />
            <Bar dataKey="2B" fill="#f44336" name="Klasa 2B" />
            <Bar dataKey="3C" fill="#4caf50" name="Klasa 3C" />
          </BarChart>
        </ResponsiveContainer>
        
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 2 }}>Niskie</Typography>
          <Box sx={{ 
            width: 100, 
            height: 10, 
            background: 'linear-gradient(to right, #4caf50, #ffeb3b, #f44336)',
            borderRadius: '5px',
            mr: 2
          }}></Box>
          <Typography variant="body2" sx={{ mr: 2 }}>Wysokie</Typography>
          <Typography variant="body2" color="textSecondary">Obciążenie poznawcze</Typography>
        </Box>
      </StyledContentPaper>
    </StyledContainer>
  );
};

export default TeacherLoadHeatmap;
