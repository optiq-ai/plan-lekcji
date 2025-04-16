import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Card,
  CardContent,
  Divider,
  Switch,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PerformanceModeSelector from '../components/personalization/PerformanceModeSelector';

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

// Komponent strony ustawień
const Settings = ({ view = 'general' }) => {
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState(view === 'personalization' ? 4 : 0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [profileMode, setProfileMode] = useState('standardowy');
  const [aiLevel, setAiLevel] = useState(50);
  const [semester, setSemester] = useState('Letni 2024/2025');
  const [startTime, setStartTime] = useState('8:00');
  const [lessonDuration, setLessonDuration] = useState(45);
  const [breakDuration, setBreakDuration] = useState(10);
  
  // Opcje dla profili ustawień
  const profileOptions = [
    { value: 'standardowy', label: 'Standardowy', description: 'Zrównoważone ustawienia dla większości szkół' },
    { value: 'wydajny', label: 'Wydajny', description: 'Zoptymalizowany pod kątem szybkości działania' },
    { value: 'rozszerzony', label: 'Rozszerzony', description: 'Pełen zestaw funkcji i analityk' },
    { value: 'wlasny', label: 'Własny', description: 'Niestandardowe ustawienia' }
  ];

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Obsługa zmiany podzakładki
  const handleSubTabChange = (event, newValue) => {
    setActiveSubTab(newValue);
  };

  // Obsługa zmiany profilu ustawień
  const handleProfileChange = (value) => {
    setProfileMode(value);
  };

  // Obsługa zmiany poziomu AI
  const handleAiLevelChange = (event, newValue) => {
    setAiLevel(newValue);
  };

  // Renderowanie zakładki Ogólne
  const renderGeneralTab = () => (
    <Box>
      <StyledTabsContainer>
        <Tabs
          value={activeSubTab}
          onChange={handleSubTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="ustawienia ogólne"
        >
          <Tab label="Ogólne" />
          <Tab label="Użytkownicy" />
          <Tab label="Integracje" />
          <Tab label="Harmonogramy" />
          <Tab label="Bezpieczeństwo" />
        </Tabs>
      </StyledTabsContainer>

      <StyledContentPaper>
        <Typography variant="h6" gutterBottom>
          Profile ustawień
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Wybierz gotowy zestaw ustawień lub dostosuj szczegółowe parametry
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {profileOptions.map((option) => (
            <Grid item xs={12} sm={6} md={3} key={option.value}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: profileMode === option.value ? '2px solid #3f51b5' : '1px solid #e0e0e0',
                  backgroundColor: profileMode === option.value ? 'rgba(63, 81, 181, 0.08)' : 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }
                }}
                onClick={() => handleProfileChange(option.value)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    {option.label}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {option.description}
                  </Typography>
                  {profileMode === option.value && (
                    <CheckCircleIcon color="primary" sx={{ mt: 2 }} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledContentPaper>

      <StyledContentPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Dane szkoły i parametry planu
            </Typography>
            
            <TextField
              fullWidth
              label="Nazwa szkoły"
              defaultValue="Liceum Ogólnokształcące im. Jana Kochanowskiego"
              margin="normal"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Adres"
              defaultValue="ul. Przykładowa 123, 00-001 Warszawa"
              margin="normal"
              variant="outlined"
            />
            
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Semestr</InputLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                label="Semestr"
              >
                <MenuItem value="Letni 2024/2025">Letni 2024/2025</MenuItem>
                <MenuItem value="Zimowy 2024/2025">Zimowy 2024/2025</MenuItem>
                <MenuItem value="Letni 2023/2024">Letni 2023/2024</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Parametry planu lekcji
            </Typography>
            
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Godzina rozpoczęcia pierwszej lekcji</InputLabel>
              <Select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                label="Godzina rozpoczęcia pierwszej lekcji"
              >
                <MenuItem value="7:30">7:30</MenuItem>
                <MenuItem value="8:00">8:00</MenuItem>
                <MenuItem value="8:30">8:30</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Długość lekcji (min)</InputLabel>
              <Select
                value={lessonDuration}
                onChange={(e) => setLessonDuration(e.target.value)}
                label="Długość lekcji (min)"
              >
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={60}>60</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Domyślna długość przerw (min)</InputLabel>
              <Select
                value={breakDuration}
                onChange={(e) => setBreakDuration(e.target.value)}
                label="Domyślna długość przerw (min)"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Ustawienia zaawansowane
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              Parametry uczenia maszynowego
            </Typography>
            
            <Typography variant="body2" gutterBottom>
              Poziom sugestii AI
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 2 }}>
                <StyledSlider
                  value={aiLevel}
                  onChange={handleAiLevelChange}
                  aria-labelledby="ai-level-slider"
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: 'Ignoruj' },
                    { value: 50, label: 'Zrównoważone' },
                    { value: 100, label: 'Eksperckie' }
                  ]}
                />
              </Box>
            </Box>
            
            <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
              Parametry generowania planu
            </Typography>
            
            <FormGroup>
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Priorytetyzuj komfort uczniów" 
              />
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Optymalizuj wykorzystanie sal specjalistycznych" 
              />
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Minimalizuj okienka dla nauczycieli" 
              />
              <FormControlLabel 
                control={<Checkbox />} 
                label="Uwzględniaj preferencje dot. godzin nauczycieli" 
              />
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Automatyczne planowanie zastępstw" 
              />
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Inteligentna rotacja przedmiotów w tygodniu" 
              />
            </FormGroup>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(63, 81, 181, 0.08)', borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon color="primary" sx={{ mr: 1 }} />
                Rekomendacje AI
              </Typography>
              <Typography variant="body2">
                AI wykryła możliwość optymalizacji planu poprzez zmianę parametrów. Sugerowane zmiany: zwiększenie elastyczności o 12% i zwiększenie liczby konfliktów o 5%.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Zastosuj
              </Button>
              <Button variant="outlined" color="primary" sx={{ mt: 2, ml: 2 }}>
                Więcej info
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledContentPaper>
    </Box>
  );

  // Renderowanie zakładki System
  const renderSystemTab = () => (
    <Box>
      <StyledTabsContainer>
        <Tabs
          value={activeSubTab}
          onChange={handleSubTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="ustawienia systemu"
        >
          <Tab label="System" />
          <Tab label="Wygląd" />
          <Tab label="Powiadomienia" />
          <Tab label="Synchronizacja" />
          <Tab label="Kopie zapasowe" />
          <Tab label="O programie" />
        </Tabs>
      </StyledTabsContainer>

      <StyledContentPaper>
        <Typography variant="h6" gutterBottom>
          Ustawienia systemowe
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Konfiguracja podstawowych parametrów systemu
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Język systemu</FormLabel>
              <RadioGroup defaultValue="pl">
                <FormControlLabel value="pl" control={<Radio />} label="Polski" />
                <FormControlLabel value="en" control={<Radio />} label="English" />
                <FormControlLabel value="de" control={<Radio />} label="Deutsch" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Format daty</FormLabel>
              <RadioGroup defaultValue="dd-mm-yyyy">
                <FormControlLabel value="dd-mm-yyyy" control={<Radio />} label="DD-MM-YYYY" />
                <FormControlLabel value="mm-dd-yyyy" control={<Radio />} label="MM-DD-YYYY" />
                <FormControlLabel value="yyyy-mm-dd" control={<Radio />} label="YYYY-MM-DD" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Automatyczne aktualizacje" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Zbieranie danych diagnostycznych" 
              />
              <FormControlLabel 
                control={<Switch />} 
                label="Tryb deweloperski" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Automatyczne zapisywanie" 
              />
            </FormGroup>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Częstotliwość automatycznego zapisywania
              </Typography>
              <StyledSlider
                defaultValue={5}
                aria-labelledby="autosave-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                valueLabelFormat={(value) => `${value} min`}
              />
            </Box>
          </Grid>
        </Grid>
      </StyledContentPaper>
    </Box>
  );

  // Renderowanie zakładki Wydajność
  const renderPerformanceTab = () => (
    <Box>
      <StyledContentPaper>
        <PerformanceModeSelector />
      </StyledContentPaper>
    </Box>
  );

  // Renderowanie zakładki Personalizacja
  const renderPersonalizationTab = () => (
    <Box>
      <StyledTabsContainer>
        <Tabs
          value={activeSubTab}
          onChange={handleSubTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="personalizacja interfejsu"
        >
          <Tab label="Elementy interfejsu" />
          <Tab label="Style i kolory" />
          <Tab label="Powiadomienia" />
          <Tab label="Widoczność danych" />
          <Tab label="Profile ustawień" />
        </Tabs>
      </StyledTabsContainer>

      <StyledContentPaper>
        <Typography variant="h6" gutterBottom>
          Elementy widoku planu lekcji
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Statystyki i analityka" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Wizualizacje kolorowe" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Asystent AI" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Wykresy efektywności" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Interaktywne mapy sal" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Sugestie i optymalizacje" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Animacje interfejsu" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Szczegółowe dane o zajęciach" 
              />
              <FormControlLabel 
                control={<Switch />} 
                label="Powiadomienia na stronie" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Skróty klawiaturowe" 
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Układ elementów
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup defaultValue="standard">
                <FormControlLabel value="standard" control={<Radio />} label="Standardowy" />
                <FormControlLabel value="compact" control={<Radio />} label="Kompaktowy" />
                <FormControlLabel value="expanded" control={<Radio />} label="Poszerzony" />
                <FormControlLabel value="twocolumn" control={<Radio />} label="Dwukolumnowy" />
                <FormControlLabel value="tables" control={<Radio />} label="Tablice" />
                <FormControlLabel value="mobile" control={<Radio />} label="Mobilny" />
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary">
                Zastosuj układ
              </Button>
              <Button variant="outlined" sx={{ ml: 2 }}>
                Przywróć domyślne
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Wydajność aplikacji
            </Typography>

            <Typography variant="body2" gutterBottom>
              Poziom szczegółowości
            </Typography>
            <StyledSlider
              defaultValue={50}
              aria-labelledby="detail-level-slider"
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: 'Niski' },
                { value: 50, label: 'Średni' },
                { value: 100, label: 'Pełny' }
              ]}
            />

            <Typography variant="body2" gutterBottom>
              Szybkość ładowania vs funkcjonalność
            </Typography>
            <StyledSlider
              defaultValue={50}
              aria-labelledby="performance-slider"
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: 'Szybkość' },
                { value: 50, label: 'Zbalansowane' },
                { value: 100, label: 'Funkcjonalność' }
              ]}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Podgląd wybranych ustawień
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, height: '100px', bgcolor: 'rgba(63, 81, 181, 0.05)' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ width: '30px', height: '30px', bgcolor: '#e3f2fd' }}></Box>
                <Box sx={{ width: '30px', height: '30px', bgcolor: '#ffcdd2' }}></Box>
                <Box sx={{ width: '30px', height: '30px', bgcolor: '#c8e6c9' }}></Box>
                <Box sx={{ width: '30px', height: '30px', bgcolor: '#fff9c4' }}></Box>
                <Box sx={{ width: '30px', height: '30px', bgcolor: '#d1c4e9' }}></Box>
                <Box sx={{ width: '30px', height: '30px', bgcolor: '#ffccbc' }}></Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, height: '100px', bgcolor: 'rgba(63, 81, 181, 0.05)' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ width: '100%', height: '15px', bgcolor: '#4caf50' }}></Box>
                <Box sx={{ width: '80%', height: '15px', bgcolor: '#f44336' }}></Box>
                <Box sx={{ width: '60%', height: '15px', bgcolor: '#2196f3' }}></Box>
                <Box sx={{ width: '40%', height: '15px', bgcolor: '#ff9800' }}></Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, height: '100px', bgcolor: 'rgba(63, 81, 181, 0.05)' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ width: '50%' }}>
                  <Box sx={{ width: '100%', height: '30px', bgcolor: '#bbdefb', mb: 1 }}></Box>
                  <Box sx={{ width: '100%', height: '30px', bgcolor: '#dcedc8' }}></Box>
                </Box>
                <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ width: '100%', height: '20px', bgcolor: '#3f51b5', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AI</Box>
                  <Box sx={{ width: '100%', height: '40px', bgcolor: '#c5e1a5' }}></Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary">
            Zapisz ustawienia
          </Button>
          <Button variant="outlined" color="error">
            Anuluj zmiany
          </Button>
          <Button variant="outlined">
            Przywróć domyślne
          </Button>
          <Button variant="outlined" color="secondary" startIcon={<InfoIcon />}>
            Zaproponuj optymalny układ
          </Button>
        </Box>
      </StyledContentPaper>
    </Box>
  );

  // Renderowanie zakładki Integracje
  const renderIntegrationsTab = () => (
    <Box>
      <StyledTabsContainer>
        <Tabs
          value={activeSubTab}
          onChange={handleSubTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="integracje"
        >
          <Tab label="Eksport danych" />
          <Tab label="Kalendarze" />
          <Tab label="API" />
          <Tab label="Powiadomienia" />
          <Tab label="Dzienniki elektroniczne" />
        </Tabs>
      </StyledTabsContainer>

      <StyledContentPaper>
        <Typography variant="h6" gutterBottom>
          Integracje z systemami zewnętrznymi
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Konfiguracja połączeń z zewnętrznymi systemami i usługami
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Dostępne integracje
            </Typography>
            
            <FormGroup>
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Google Calendar" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Microsoft Outlook" 
              />
              <FormControlLabel 
                control={<Switch />} 
                label="Apple Calendar" 
              />
              <FormControlLabel 
                control={<Switch defaultChecked />} 
                label="Librus" 
              />
              <FormControlLabel 
                control={<Switch />} 
                label="Vulcan UONET+" 
              />
              <FormControlLabel 
                control={<Switch />} 
                label="Microsoft Teams" 
              />
              <FormControlLabel 
                control={<Switch />} 
                label="Slack" 
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Ustawienia synchronizacji
            </Typography>
            
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Częstotliwość synchronizacji</FormLabel>
              <RadioGroup defaultValue="hourly">
                <FormControlLabel value="realtime" control={<Radio />} label="W czasie rzeczywistym" />
                <FormControlLabel value="hourly" control={<Radio />} label="Co godzinę" />
                <FormControlLabel value="daily" control={<Radio />} label="Raz dziennie" />
                <FormControlLabel value="manual" control={<Radio />} label="Tylko ręcznie" />
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Synchronizuj zmiany w planie" 
              />
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Synchronizuj zastępstwa" 
              />
              <FormControlLabel 
                control={<Checkbox />} 
                label="Synchronizuj wydarzenia szkolne" 
              />
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Powiadomienia o zmianach" 
              />
            </FormGroup>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary">
                Synchronizuj teraz
              </Button>
              <Button variant="outlined" sx={{ ml: 2 }}>
                Historia synchronizacji
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledContentPaper>
    </Box>
  );

  // Renderowanie odpowiedniej zakładki
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderGeneralTab();
      case 1:
        return renderSystemTab();
      case 2:
        return renderPerformanceTab();
      case 3:
        return renderIntegrationsTab();
      case 4:
        return renderPersonalizationTab();
      default:
        return renderGeneralTab();
    }
  };

  return (
    <StyledContainer maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Konfiguracja
      </Typography>

      <StyledTabsContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="zakładki konfiguracji"
        >
          <Tab label="Ogólne" />
          <Tab label="System" />
          <Tab label="Wydajność" />
          <Tab label="Integracje" />
          <Tab label="Personalizacja" />
        </Tabs>
      </StyledTabsContainer>

      {renderTabContent()}

      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
        Tip: Zmiany w ustawieniach zostaną zastosowane po kliknięciu "Zapisz" i będą widoczne od następnego logowania.
      </Typography>
    </StyledContainer>
  );
};

export default Settings;
