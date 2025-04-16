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
  Cell,
  LineChart,
  Line
} from 'recharts';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RefreshIcon from '@mui/icons-material/Refresh';
import PrintIcon from '@mui/icons-material/Print';
import GetAppIcon from '@mui/icons-material/GetApp';

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

// Dane dla wykresu rozkładu przedmiotów
const subjectDistributionData = [
  { name: 'Matematyka', value: 25, color: '#3f51b5' },
  { name: 'Polski', value: 20, color: '#f44336' },
  { name: 'Angielski', value: 20, color: '#4caf50' },
  { name: 'Fizyka', value: 15, color: '#ff9800' },
  { name: 'Historia', value: 10, color: '#9c27b0' },
  { name: 'Geografia', value: 10, color: '#00bcd4' },
];

// Dane dla wykresu rozkładu przedmiotów w tygodniu
const weeklyDistributionData = [
  { day: 'PON', matematyka: 4, polski: 3, angielski: 2, fizyka: 1, historia: 2, geografia: 1 },
  { day: 'WT', matematyka: 3, polski: 4, angielski: 2, fizyka: 2, historia: 1, geografia: 1 },
  { day: 'ŚR', matematyka: 3, polski: 3, angielski: 3, fizyka: 2, historia: 1, geografia: 1 },
  { day: 'CZW', matematyka: 4, polski: 3, angielski: 2, fizyka: 2, historia: 1, geografia: 1 },
  { day: 'PT', matematyka: 3, polski: 3, angielski: 3, fizyka: 1, historia: 2, geografia: 1 },
];

// Dane dla wykresu trudności przedmiotów
const subjectDifficultyData = [
  { name: 'Matematyka', difficulty: 8 },
  { name: 'Fizyka', difficulty: 7 },
  { name: 'Chemia', difficulty: 7 },
  { name: 'Polski', difficulty: 5 },
  { name: 'Historia', difficulty: 4 },
  { name: 'Angielski', difficulty: 4 },
  { name: 'Geografia', difficulty: 3 },
  { name: 'Biologia', difficulty: 5 },
  { name: 'WF', difficulty: 2 },
  { name: 'Informatyka', difficulty: 6 },
];

// Dane dla wykresu obciążenia klas
const classLoadData = [
  { name: '1A', load: 28, optimal: true },
  { name: '1B', load: 32, optimal: false },
  { name: '1C', load: 30, optimal: true },
  { name: '2A', load: 29, optimal: true },
  { name: '2B', load: 33, optimal: false },
  { name: '2C', load: 31, optimal: true },
  { name: '3A', load: 27, optimal: true },
  { name: '3B', load: 34, optimal: false },
  { name: '3C', load: 30, optimal: true },
];

// Komponent rozkładu przedmiotów w klasach
const ClassSubjectDistribution = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState('1A');
  const [selectedView, setSelectedView] = useState('przedmioty');
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa zmiany klasy
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };
  
  // Obsługa zmiany widoku
  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };
  
  // Renderowanie wykresu kołowego rozkładu przedmiotów
  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={subjectDistributionData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {subjectDistributionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <RechartsTooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
  
  // Renderowanie wykresu słupkowego rozkładu przedmiotów w tygodniu
  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={weeklyDistributionData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <RechartsTooltip />
        <Legend />
        <Bar dataKey="matematyka" stackId="a" fill="#3f51b5" name="Matematyka" />
        <Bar dataKey="polski" stackId="a" fill="#f44336" name="Polski" />
        <Bar dataKey="angielski" stackId="a" fill="#4caf50" name="Angielski" />
        <Bar dataKey="fizyka" stackId="a" fill="#ff9800" name="Fizyka" />
        <Bar dataKey="historia" stackId="a" fill="#9c27b0" name="Historia" />
        <Bar dataKey="geografia" stackId="a" fill="#00bcd4" name="Geografia" />
      </BarChart>
    </ResponsiveContainer>
  );
  
  // Renderowanie wykresu trudności przedmiotów
  const renderDifficultyChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={subjectDifficultyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 10]} />
        <YAxis dataKey="name" type="category" width={100} />
        <RechartsTooltip />
        <Bar 
          dataKey="difficulty" 
          fill="#3f51b5" 
          name="Poziom trudności" 
          label={{ position: 'right', fill: '#333' }}
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
  
  // Renderowanie wykresu obciążenia klas
  const renderClassLoadChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={classLoadData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 40]} />
        <RechartsTooltip />
        <Legend />
        <Bar 
          dataKey="load" 
          fill={(entry) => entry.optimal ? '#4caf50' : '#f44336'}
          name="Obciążenie godzinowe" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
  
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Plan zajęć klas
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Liceum Ogólnokształcące im. Jana Kochanowskiego • Warszawa
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['1A', '1B', '1C', '2A', '2B', '2C', '3A', '...'].map((cls) => (
            <Button
              key={cls}
              variant={selectedClass === cls ? 'contained' : 'outlined'}
              color="primary"
              sx={{ m: 0.5, borderRadius: '20px' }}
              onClick={() => setSelectedClass(cls)}
            >
              {cls}
            </Button>
          ))}
        </Box>
      </Box>
      
      <StyledContentPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Klasa {selectedClass} • Profil matematyczno-fizyczny
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<PrintIcon />}
              sx={{ mr: 1 }}
            >
              Drukuj plan
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<GetAppIcon />}
            >
              Eksportuj PDF
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SchoolIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Wychowawca: mgr Anna Kowalska
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ClassIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Uczniów: 28 • Sala wychowawcza: 103
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ mr: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Obciążenie:
                </Typography>
                <Box sx={{ 
                  width: 100, 
                  height: 10, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 5,
                  overflow: 'hidden',
                  mb: 1
                }}>
                  <Box sx={{ 
                    width: '70%', 
                    height: '100%', 
                    bgcolor: '#4caf50',
                    borderRadius: 5
                  }}></Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Optymalne 70%
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Rozkład:
                </Typography>
                <Box sx={{ 
                  width: 100, 
                  height: 10, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 5,
                  overflow: 'hidden',
                  mb: 1
                }}>
                  <Box sx={{ 
                    width: '90%', 
                    height: '100%', 
                    bgcolor: '#3f51b5',
                    borderRadius: 5
                  }}></Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Bardzo dobry 90%
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ 
          width: '100%', 
          overflowX: 'auto',
          '& table': {
            borderCollapse: 'collapse',
            width: '100%',
            minWidth: 650,
          },
          '& th, & td': {
            border: '1px solid #e0e0e0',
            padding: '8px 16px',
            textAlign: 'center',
          },
          '& th': {
            backgroundColor: '#3f51b5',
            color: 'white',
            fontWeight: 'bold',
          },
        }}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Poniedziałek</th>
                <th>Wtorek</th>
                <th>Środa</th>
                <th>Czwartek</th>
                <th>Piątek</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>1<br/>8:00-8:45</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>
                  <Typography variant="subtitle2">Matematyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Anna Kowalska • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#e8f5e9' }}>
                  <Typography variant="subtitle2">Język polski</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Jan Nowak • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#e3f2fd' }}>
                  <Typography variant="subtitle2">Matematyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Anna Kowalska • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#e8f5e9' }}>
                  <Typography variant="subtitle2">Język polski</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Jan Nowak • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#f3e5f5' }}>
                  <Typography variant="subtitle2">Historia</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Piotr Zieliński • s.103</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>2<br/>8:55-9:40</td>
                <td style={{ backgroundColor: '#e8f5e9' }}>
                  <Typography variant="subtitle2">Język polski</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Jan Nowak • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#fff3e0' }}>
                  <Typography variant="subtitle2">Biologia</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Maria Wójcik • s.212</Typography>
                </td>
                <td>
                  <Box sx={{ 
                    p: 1, 
                    bgcolor: 'rgba(63, 81, 181, 0.08)', 
                    borderRadius: '4px',
                    border: '1px dashed #3f51b5'
                  }}>
                    <Typography variant="subtitle2" color="primary">Sugestia AI:</Typography>
                    <Typography variant="body2" color="primary" sx={{ fontSize: '0.8rem' }}>
                      Rozważ zamianę geografii z fizyką, aby lepiej zbalansować trudność dnia.
                    </Typography>
                  </Box>
                </td>
                <td style={{ backgroundColor: '#e8f5e9' }}>
                  <Typography variant="subtitle2">Język polski</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Jan Nowak • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#f3e5f5' }}>
                  <Typography variant="subtitle2">Historia</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Piotr Zieliński • s.103</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>3<br/>9:50-10:35</td>
                <td style={{ backgroundColor: '#e0f7fa' }}>
                  <Typography variant="subtitle2">Język angielski</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Ewa Wiśniewska • s.205</Typography>
                </td>
                <td style={{ backgroundColor: '#e3f2fd' }}>
                  <Typography variant="subtitle2">Matematyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Anna Kowalska • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#e3f2fd' }}>
                  <Typography variant="subtitle2">Matematyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Alicja Dąbrowska • s.105</Typography>
                </td>
                <td style={{ backgroundColor: '#e3f2fd' }}>
                  <Typography variant="subtitle2">Matematyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Anna Kowalska • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#e3f2fd' }}>
                  <Typography variant="subtitle2">Matematyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Anna Kowalska • s.103</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>4<br/>10:45-11:30</td>
                <td style={{ backgroundColor: '#fff8e1' }}>
                  <Typography variant="subtitle2">Fizyka</Typography>
                  <Typography variant="caption" color="textSecondary">dr Adam Malinowski • s.115</Typography>
                </td>
                <td style={{ backgroundColor: '#e0f2f1' }}>
                  <Typography variant="subtitle2">Informatyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Robert Lewandowski • s.301</Typography>
                </td>
                <td style={{ backgroundColor: '#fff8e1' }}>
                  <Typography variant="subtitle2">Fizyka</Typography>
                  <Typography variant="caption" color="textSecondary">dr Adam Malinowski • s.115</Typography>
                </td>
                <td style={{ backgroundColor: '#e0f2f1' }}>
                  <Typography variant="subtitle2">Informatyka</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Robert Lewandowski • s.301</Typography>
                </td>
                <td style={{ backgroundColor: '#fff8e1' }}>
                  <Typography variant="subtitle2">Fizyka</Typography>
                  <Typography variant="caption" color="textSecondary">dr Adam Malinowski • s.115</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>5<br/>11:50-12:35</td>
                <td style={{ backgroundColor: '#f3e5f5' }}>
                  <Typography variant="subtitle2">Historia</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Piotr Zieliński • s.103</Typography>
                </td>
                <td style={{ backgroundColor: '#fff8e1' }}>
                  <Typography variant="subtitle2">Fizyka</Typography>
                  <Typography variant="caption" color="textSecondary">dr Adam Malinowski • s.115</Typography>
                </td>
                <td style={{ backgroundColor: '#e0f7fa' }}>
                  <Typography variant="subtitle2">Język angielski</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Ewa Wiśniewska • s.205</Typography>
                </td>
                <td style={{ backgroundColor: '#fff3e0' }}>
                  <Typography variant="subtitle2">Biologia</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Maria Wójcik • s.212</Typography>
                </td>
                <td style={{ backgroundColor: '#e0f7fa' }}>
                  <Typography variant="subtitle2">Język angielski</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Ewa Wiśniewska • s.205</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>6<br/>12:45-13:30</td>
                <td style={{ backgroundColor: '#e1f5fe' }}>
                  <Typography variant="subtitle2">WF</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Tomasz Kalinowski • s.G</Typography>
                </td>
                <td style={{ backgroundColor: '#ffebee' }}>
                  <Typography variant="subtitle2">Chemia</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Zofia Jabłońska • s.214</Typography>
                </td>
                <td style={{ backgroundColor: '#e1f5fe' }}>
                  <Typography variant="subtitle2">WF</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Tomasz Kalinowski • s.G</Typography>
                </td>
                <td style={{ backgroundColor: '#ffebee' }}>
                  <Typography variant="subtitle2">Chemia</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Zofia Jabłońska • s.214</Typography>
                </td>
                <td style={{ backgroundColor: '#e1f5fe' }}>
                  <Typography variant="subtitle2">WF</Typography>
                  <Typography variant="caption" color="textSecondary">mgr Tomasz Kalinowski • s.G</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>7<br/>13:40-14:25</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<SmartToyIcon />}
            onClick={() => {}}
          >
            Optymalizuj plan
          </Button>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => {}}
          >
            Wyświetl konflikty
          </Button>
        </Box>
      </StyledContentPaper>
      
      <StyledTabsContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="zakładki analizy planu"
        >
          <Tab label="Analiza planu" />
          <Tab label="Rozkład przedmiotów" />
          <Tab label="Obciążenie uczniów" />
          <Tab label="Konflikty i problemy" />
        </Tabs>
      </StyledTabsContainer>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel>Widok:</InputLabel>
            <Select
              value={selectedView}
              onChange={handleViewChange}
              label="Widok:"
            >
              <MenuItem value="przedmioty">Rozkład przedmiotów</MenuItem>
              <MenuItem value="trudnosc">Poziom trudności</MenuItem>
              <MenuItem value="obciazenie">Obciążenie tygodniowe</MenuItem>
            </Select>
          </FormControl>
          
          {selectedView === 'przedmioty' && renderPieChart()}
          {selectedView === 'trudnosc' && renderDifficultyChart()}
          {selectedView === 'obciazenie' && renderClassLoadChart()}
          
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Statystyki klasy {selectedClass}:
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              • Liczba godzin tygodniowo: 32
            </Typography>
            <Typography variant="body2">
              • Średnia dzienna liczba lekcji: 6.4
            </Typography>
            <Typography variant="body2">
              • Najdłuższy dzień: Poniedziałek (7 lekcji)
            </Typography>
            <Typography variant="body2">
              • Najkrótszy dzień: Piątek (5 lekcji)
            </Typography>
            <Typography variant="body2">
              • Przedmioty ścisłe: 45% planu
            </Typography>
            <Typography variant="body2">
              • Przedmioty humanistyczne: 30% planu
            </Typography>
            <Typography variant="body2">
              • Języki obce: 15% planu
            </Typography>
            <Typography variant="body2">
              • Pozostałe: 10% planu
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Rozkład przedmiotów w tygodniu
          </Typography>
          {renderBarChart()}
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Analiza AI planu klasy {selectedClass}
            </Typography>
            <Card sx={{ bgcolor: 'rgba(63, 81, 181, 0.05)', mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <InfoIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Mocne strony planu:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Równomierne rozłożenie przedmiotów ścisłych w ciągu tygodnia
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Dobrze zbalansowane obciążenie dzienne
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Optymalne wykorzystanie sal specjalistycznych
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                  <InfoIcon color="error" sx={{ mr: 1, mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Sugestie optymalizacji:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Rozważ zamianę geografii ze środy z fizyką, aby lepiej zbalansować trudność dnia
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Przenieś jedną lekcję matematyki z czwartku na piątek
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Rozważ dodanie okienka przed WF w poniedziałek
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<SmartToyIcon />}
              >
                Zastosuj sugestie AI
              </Button>
              <Button 
                variant="outlined" 
                color="primary"
              >
                Generuj raport PDF
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ClassSubjectDistribution;
