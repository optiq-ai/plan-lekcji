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
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BalanceIcon from '@mui/icons-material/Balance';
import SpeedIcon from '@mui/icons-material/Speed';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

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

// Stylizowany Slider
const StyledSlider = styled(Slider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// Stylizowany przycisk stylu planu
const StyleButton = styled(Button)(({ theme, selected }) => ({
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
  backgroundColor: selected ? 'rgba(63, 81, 181, 0.08)' : 'white',
  '&:hover': {
    backgroundColor: selected ? 'rgba(63, 81, 181, 0.12)' : 'rgba(0, 0, 0, 0.04)',
  },
}));

// Komponent konfiguracji planu
const PlanConfigurationPanel = () => {
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('zbalansowany');
  const [comfortLevel, setComfortLevel] = useState(60);
  const [startTime, setStartTime] = useState(8.25);
  const [maxLessons, setMaxLessons] = useState(7);
  const [psychologicalLoad, setPhysicalLoad] = useState(50);
  const [lunchBreak, setLunchBreak] = useState(25);
  
  // Style planów
  const planStyles = [
    { id: 'zbalansowany', label: 'Zbalansowany', icon: <BalanceIcon sx={{ fontSize: 32 }} color="primary" /> },
    { id: 'ekonomiczny', label: 'Ekonomiczny', icon: <TuneIcon sx={{ fontSize: 32 }} color="primary" /> },
    { id: 'uczniowski', label: 'Uczniowski', icon: <SchoolIcon sx={{ fontSize: 32 }} color="primary" /> },
    { id: 'nauczycielski', label: 'Nauczycielski', icon: <GroupIcon sx={{ fontSize: 32 }} color="primary" /> },
    { id: 'celowany', label: 'Celowany', icon: <SpeedIcon sx={{ fontSize: 32 }} color="primary" /> },
  ];
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa zmiany stylu planu
  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };
  
  // Obsługa zmiany poziomu komfortu
  const handleComfortChange = (event, newValue) => {
    setComfortLevel(newValue);
  };
  
  // Obsługa zmiany godziny rozpoczęcia
  const handleStartTimeChange = (event, newValue) => {
    setStartTime(newValue);
  };
  
  // Obsługa zmiany maksymalnej liczby lekcji
  const handleMaxLessonsChange = (event, newValue) => {
    setMaxLessons(newValue);
  };
  
  // Obsługa zmiany obciążenia psychicznego
  const handlePhysicalLoadChange = (event, newValue) => {
    setPhysicalLoad(newValue);
  };
  
  // Obsługa zmiany długości przerwy obiadowej
  const handleLunchBreakChange = (event, newValue) => {
    setLunchBreak(newValue);
  };
  
  // Formatowanie godziny rozpoczęcia
  const formatStartTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${hours}:${minutes === 0 ? '00' : minutes}`;
  };
  
  // Renderowanie zakładki konfiguracji parametrów
  const renderConfigurationTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Konfiguracja parametrów planu
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Dostosuj ustawienia aby AI stworzyło optymalny plan dla Twojej szkoły
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledContentPaper>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BalanceIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Równowaga i komfort
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Priorytet komfortu
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Uczniowie
              </Typography>
              <StyledSlider
                value={comfortLevel}
                onChange={handleComfortChange}
                aria-labelledby="comfort-slider"
                valueLabelDisplay="auto"
              />
              <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'right' }}>
                Nauczyciele
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Optymalizacja kosztowa
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Wysoki koszt
              </Typography>
              <StyledSlider
                defaultValue={30}
                aria-labelledby="cost-slider"
                valueLabelDisplay="auto"
              />
              <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'right' }}>
                Niski koszt
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Rozkład obciążenia w tygodniu
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Równomierny
              </Typography>
              <StyledSlider
                defaultValue={70}
                aria-labelledby="distribution-slider"
                valueLabelDisplay="auto"
              />
              <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'right' }}>
                Skondensowany
              </Typography>
            </Box>
          </StyledContentPaper>
          
          <StyledContentPaper>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TuneIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Preferencje dydaktyczne
              </Typography>
            </Box>
            
            <FormControl component="fieldset">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel 
                  control={<Checkbox defaultChecked />} 
                  label="Unikaj trudnych przedmiotów pod rząd" 
                />
                <FormControlLabel 
                  control={<Checkbox defaultChecked />} 
                  label="Planuj WF po przedmiotach statycznych" 
                />
                <FormControlLabel 
                  control={<Checkbox />} 
                  label="Uwzględnij preferencje nauczycieli" 
                />
                <FormControlLabel 
                  control={<Checkbox defaultChecked />} 
                  label="Maksymalizuj wykorzystanie sal specjalistycznych" 
                />
              </Box>
            </FormControl>
          </StyledContentPaper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledContentPaper>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Harmonogram czasowy
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Godzina rozpoczęcia zajęć
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ minWidth: 30 }}>
                7:00
              </Typography>
              <StyledSlider
                value={startTime}
                onChange={handleStartTimeChange}
                aria-labelledby="start-time-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={formatStartTime}
                step={0.25}
                marks={[
                  { value: 7, label: '7:00' },
                  { value: 8, label: '8:00' },
                  { value: 9, label: '9:00' },
                ]}
                min={7}
                max={9}
              />
              <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'right' }}>
                9:00
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Maksymalna liczba lekcji dziennie
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ minWidth: 30 }}>
                5
              </Typography>
              <StyledSlider
                value={maxLessons}
                onChange={handleMaxLessonsChange}
                aria-labelledby="max-lessons-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  { value: 5, label: '5 lekcji' },
                  { value: 7, label: '7 lekcji' },
                  { value: 9, label: '9 lekcji' },
                ]}
                min={5}
                max={9}
              />
              <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'right' }}>
                9
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Długość przerwy obiadowej
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ minWidth: 30 }}>
                Brak
              </Typography>
              <StyledSlider
                value={lunchBreak}
                onChange={handleLunchBreakChange}
                aria-labelledby="lunch-break-slider"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} min`}
                step={5}
                marks={[
                  { value: 0, label: 'Brak' },
                  { value: 25, label: '25 min' },
                  { value: 30, label: '30 min' },
                ]}
                min={0}
                max={30}
              />
              <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'right' }}>
                30 min
              </Typography>
            </Box>
          </StyledContentPaper>
          
          <StyledContentPaper>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SmartToyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Rekomendacja AI
              </Typography>
            </Box>
            
            <Box sx={{ p: 2, bgcolor: 'rgba(63, 81, 181, 0.05)', borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Na podstawie Twoich ustawień i charakterystyki szkoły AI sugeruje:
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
                  Styl Uczniowski
                </Typography>
                <Typography variant="body2">
                  - optymalny dla Twojej szkoły
                </Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                Ten styl priorytetyzuje komfort uczniów, równomierne rozłożenie trudnych przedmiotów i optymalne wykorzystanie sal specjalistycznych.
              </Typography>
              
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<HelpIcon />}
                size="small"
              >
                Zapytaj AI o poradę
              </Button>
            </Box>
          </StyledContentPaper>
        </Grid>
      </Grid>
    </Box>
  );
  
  // Renderowanie zakładki wyboru stylu
  const renderStyleTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Styl planu:
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
        {planStyles.map((style) => (
          <Box key={style.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StyleButton
              selected={selectedStyle === style.id}
              onClick={() => handleStyleChange(style.id)}
            >
              {style.icon}
            </StyleButton>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {style.label}
            </Typography>
          </Box>
        ))}
      </Box>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Parametry planu:
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BalanceIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">
              Koszt vs Komfort
            </Typography>
          </Box>
          <StyledSlider
            defaultValue={60}
            aria-labelledby="cost-comfort-slider"
            valueLabelDisplay="auto"
            marks={[
              { value: 0, label: 'Z' },
              { value: 100, label: 'K' },
            ]}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">
              Godzina rozpoczęcia lekcji
            </Typography>
          </Box>
          <StyledSlider
            defaultValue={8}
            aria-labelledby="start-time-slider"
            valueLabelDisplay="auto"
            step={0.25}
            marks={[
              { value: 7, label: '7:00' },
              { value: 8, label: '8:00' },
              { value: 9, label: '9:00' },
            ]}
            min={7}
            max={9}
            valueLabelFormat={formatStartTime}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EventIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">
              Maks. liczba lekcji dziennie
            </Typography>
          </Box>
          <StyledSlider
            defaultValue={7}
            aria-labelledby="max-lessons-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={[
              { value: 5, label: '5' },
              { value: 7, label: '7' },
              { value: 9, label: '9' },
            ]}
            min={5}
            max={9}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SpeedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">
              Obciążenie psychiczne
            </Typography>
          </Box>
          <StyledSlider
            defaultValue={50}
            aria-labelledby="psychological-load-slider"
            valueLabelDisplay="auto"
            marks={[
              { value: 0, label: 'N' },
              { value: 100, label: 'W' },
            ]}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <RestaurantIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">
              Przerwa obiadowa
            </Typography>
          </Box>
          <StyledSlider
            defaultValue={25}
            aria-labelledby="lunch-break-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} min`}
            step={5}
            marks={[
              { value: 0, label: 'Brak' },
              { value: 25, label: '25 min' },
              { value: 30, label: '30 min' },
            ]}
            min={0}
            max={30}
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Podgląd planu - klasa 2A (LO)
        </Typography>
        
        <Box sx={{ 
          width: '100%', 
          overflowX: 'auto',
          mt: 2,
          '& table': {
            borderCollapse: 'collapse',
            width: '100%',
          },
          '& th, & td': {
            border: '1px solid #e0e0e0',
            padding: '8px',
            textAlign: 'center',
          },
          '& th': {
            backgroundColor: '#3f51b5',
            color: 'white',
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
                <td style={{ backgroundColor: '#f5f5f5' }}>8:00 - 8:45</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Matematyka</td>
                <td style={{ backgroundColor: '#f8bbd0' }}>Polski</td>
                <td style={{ backgroundColor: '#c8e6c9' }}>Angielski</td>
                <td style={{ backgroundColor: '#f8bbd0' }}>Polski</td>
                <td style={{ backgroundColor: '#ffecb3' }}>Historia</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5' }}>8:55 - 9:40</td>
                <td style={{ backgroundColor: '#f8bbd0' }}>Polski</td>
                <td style={{ backgroundColor: '#f8bbd0' }}>Polski</td>
                <td style={{ backgroundColor: '#c8e6c9' }}>Geografia</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Informatyka</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Biologia</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5' }}>9:50 - 10:35</td>
                <td style={{ backgroundColor: '#c8e6c9' }}>Angielski</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Matematyka</td>
                <td style={{ backgroundColor: '#ffecb3' }}>Historia</td>
                <td style={{ backgroundColor: '#c8e6c9' }}>Biologia</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Matematyka</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5' }}>10:45 - 11:30</td>
                <td style={{ backgroundColor: '#ffe0b2' }}>Fizyka</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Informatyka</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Chemia</td>
                <td style={{ backgroundColor: '#ffe0b2' }}>Fizyka</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Matematyka</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5' }}>11:50 - 12:35</td>
                <td style={{ backgroundColor: '#ffecb3' }}>Historia</td>
                <td style={{ backgroundColor: '#d1c4e9' }}>WF</td>
                <td style={{ backgroundColor: '#e3f2fd' }}>Matematyka</td>
                <td style={{ backgroundColor: '#d1c4e9' }}>WF</td>
                <td style={{ backgroundColor: '#e8eaf6' }}>Religia</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f5f5f5' }}>12:45 - 13:30</td>
                <td style={{ backgroundColor: '#d1c4e9' }}>WF</td>
                <td style={{ backgroundColor: '#e8eaf6' }}>Chemia</td>
                <td style={{ backgroundColor: '#e8eaf6' }}>Religia</td>
                <td style={{ backgroundColor: '#e8eaf6' }}>Fizyka</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="error">
            Resetuj
          </Button>
          <Button variant="outlined" color="primary">
            Zapisz konfigurację
          </Button>
          <Button variant="contained" color="primary">
            Generuj plan
          </Button>
          <Button variant="text" color="primary" startIcon={<SmartToyIcon />}>
            Zapytaj AI o poradę
          </Button>
        </Box>
      </Box>
    </Box>
  );
  
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Konfiguracja planu lekcji
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Zmień parametry aby dostosować sposób generowania planu
      </Typography>
      
      <StyledTabsContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="zakładki konfiguracji planu"
        >
          <Tab label="Typ szkoły" />
          <Tab label="Styl planu" />
          <Tab label="Parametry" />
          <Tab label="Preferencje" />
          <Tab label="Zaawansowane" />
        </Tabs>
      </StyledTabsContainer>
      
      <StyledContentPaper>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Typ szkoły:</InputLabel>
            <Select
              value="liceum"
              label="Typ szkoły:"
            >
              <MenuItem value="liceum">Liceum ogólnokształcące</MenuItem>
              <MenuItem value="technikum">Technikum</MenuItem>
              <MenuItem value="podstawowa">Szkoła podstawowa</MenuItem>
              <MenuItem value="zawodowa">Szkoła zawodowa</MenuItem>
            </Select>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body2" color="primary">
              Rekomendacja AI: Styl zbalansowany najlepszy dla liceum
            </Typography>
          </Box>
        </Box>
        
        {activeTab === 0 && renderConfigurationTab()}
        {activeTab === 1 && renderStyleTab()}
      </StyledContentPaper>
    </StyledContainer>
  );
};

export default PlanConfigurationPanel;
