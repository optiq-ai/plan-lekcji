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
  Tabs,
  Tab,
  Slider,
  FormControlLabel,
  Switch,
  Paper,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import TuneIcon from '@mui/icons-material/Tune';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import BalanceIcon from '@mui/icons-material/Balance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WeekendIcon from '@mui/icons-material/Weekend';
import GroupIcon from '@mui/icons-material/Group';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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

const SliderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  '& .MuiToggleButtonGroup-grouped': {
    flex: 1,
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
      marginLeft: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
    },
  },
}));

function PlanConfiguration() {
  const [tabValue, setTabValue] = useState(0);
  const [schoolType, setSchoolType] = useState('liceum');
  const [planStyle, setPlanStyle] = useState('balanced');
  const [comfortLevel, setComfortLevel] = useState(50);
  const [costLevel, setCostLevel] = useState(30);
  const [loadLevel, setLoadLevel] = useState(40);
  const [advancedSettings, setAdvancedSettings] = useState({
    allowSplitClasses: false,
    allowTeacherGaps: true,
    prioritizeTeacherPreferences: true,
    allowRoomChanges: true,
    optimizeForStudents: true,
    minimizeMovement: false,
    balanceSubjects: true
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSchoolTypeChange = (event, newValue) => {
    if (newValue !== null) {
      setSchoolType(newValue);
    }
  };

  const handlePlanStyleChange = (event, newValue) => {
    if (newValue !== null) {
      setPlanStyle(newValue);
    }
  };

  const handleSettingChange = (event) => {
    setAdvancedSettings({
      ...advancedSettings,
      [event.target.name]: event.target.checked
    });
  };

  const handleSaveConfiguration = () => {
    const configuration = {
      schoolType,
      planStyle,
      comfortLevel,
      costLevel,
      loadLevel,
      advancedSettings
    };
    console.log('Zapisywanie konfiguracji:', configuration);
    // Tutaj będzie logika zapisywania konfiguracji
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Konfiguracja planu</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={handleSaveConfiguration}
        >
          Zapisz konfigurację
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<TuneIcon />} label="Podstawowe" />
          <Tab icon={<SettingsIcon />} label="Zaawansowane" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardHeader
                title="Typ szkoły"
                subheader="Wybierz typ placówki edukacyjnej"
                avatar={<SchoolIcon color="primary" />}
              />
              <Divider />
              <CardContent>
                <StyledToggleButtonGroup
                  value={schoolType}
                  exclusive
                  onChange={handleSchoolTypeChange}
                  aria-label="typ szkoły"
                  color="primary"
                >
                  <ToggleButton value="przedszkole">
                    Przedszkole
                  </ToggleButton>
                  <ToggleButton value="podstawowa">
                    Szkoła podstawowa
                  </ToggleButton>
                  <ToggleButton value="liceum">
                    Liceum
                  </ToggleButton>
                  <ToggleButton value="technikum">
                    Technikum
                  </ToggleButton>
                  <ToggleButton value="branzowa">
                    Szkoła branżowa
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardHeader
                title="Styl planu"
                subheader="Wybierz priorytet optymalizacji planu"
                avatar={<BalanceIcon color="primary" />}
              />
              <Divider />
              <CardContent>
                <StyledToggleButtonGroup
                  value={planStyle}
                  exclusive
                  onChange={handlePlanStyleChange}
                  aria-label="styl planu"
                  color="primary"
                >
                  <ToggleButton value="balanced">
                    Zbalansowany
                  </ToggleButton>
                  <ToggleButton value="economic">
                    Ekonomiczny
                  </ToggleButton>
                  <ToggleButton value="student">
                    Uczniowski
                  </ToggleButton>
                  <ToggleButton value="teacher">
                    Nauczycielski
                  </ToggleButton>
                  <ToggleButton value="targeted">
                    Celowany
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12}>
            <StyledCard>
              <CardHeader
                title="Parametry planu"
                subheader="Dostosuj parametry generowania planu lekcji"
                avatar={<SpeedIcon color="primary" />}
              />
              <Divider />
              <CardContent>
                <SliderBox>
                  <Box display="flex" alignItems="center" mb={1}>
                    <PersonIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="subtitle1" fontWeight={500}>
                      Komfort
                    </Typography>
                    <Box ml="auto">
                      <Chip 
                        label={`${comfortLevel}%`} 
                        color="primary" 
                        size="small" 
                        variant={comfortLevel > 70 ? "filled" : "outlined"} 
                      />
                    </Box>
                  </Box>
                  <Slider
                    value={comfortLevel}
                    onChange={(e, newValue) => setComfortLevel(newValue)}
                    aria-labelledby="comfort-slider"
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: 'Min' },
                      { value: 50, label: 'Średni' },
                      { value: 100, label: 'Max' }
                    ]}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Wyższy komfort oznacza mniej okienek dla uczniów i nauczycieli, bardziej równomierne rozłożenie przedmiotów.
                  </Typography>
                </SliderBox>

                <SliderBox>
                  <Box display="flex" alignItems="center" mb={1}>
                    <AttachMoneyIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="subtitle1" fontWeight={500}>
                      Koszty
                    </Typography>
                    <Box ml="auto">
                      <Chip 
                        label={`${costLevel}%`} 
                        color="primary" 
                        size="small" 
                        variant={costLevel > 70 ? "filled" : "outlined"} 
                      />
                    </Box>
                  </Box>
                  <Slider
                    value={costLevel}
                    onChange={(e, newValue) => setCostLevel(newValue)}
                    aria-labelledby="cost-slider"
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: 'Min' },
                      { value: 50, label: 'Średni' },
                      { value: 100, label: 'Max' }
                    ]}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Niższy poziom kosztów oznacza mniej godzin ponadwymiarowych i lepsze wykorzystanie sal.
                  </Typography>
                </SliderBox>

                <SliderBox>
                  <Box display="flex" alignItems="center" mb={1}>
                    <AccessTimeIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="subtitle1" fontWeight={500}>
                      Obciążenie
                    </Typography>
                    <Box ml="auto">
                      <Chip 
                        label={`${loadLevel}%`} 
                        color="primary" 
                        size="small" 
                        variant={loadLevel > 70 ? "filled" : "outlined"} 
                      />
                    </Box>
                  </Box>
                  <Slider
                    value={loadLevel}
                    onChange={(e, newValue) => setLoadLevel(newValue)}
                    aria-labelledby="load-slider"
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: 'Min' },
                      { value: 50, label: 'Średni' },
                      { value: 100, label: 'Max' }
                    ]}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Niższe obciążenie oznacza bardziej równomierne rozłożenie trudnych przedmiotów i mniej intensywne dni.
                  </Typography>
                </SliderBox>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardHeader
                title="Ustawienia klas"
                subheader="Konfiguracja zaawansowanych opcji dla klas"
                avatar={<GroupIcon color="primary" />}
              />
              <Divider />
              <CardContent>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={advancedSettings.allowSplitClasses} 
                      onChange={handleSettingChange} 
                      name="allowSplitClasses" 
                      color="primary"
                    />
                  }
                  label="Zezwalaj na dzielenie klas"
                />
                <Typography variant="body2" color="text.secondary" paragraph>
                  Umożliwia dzielenie klas na grupy dla wybranych przedmiotów.
                </Typography>

                <FormControlLabel
                  control={
                    <Switch 
                      checked={advancedSettings.balanceSubjects} 
                      onChange={handleSettingChange} 
                      name="balanceSubjects" 
                      color="primary"
                    />
                  }
                  label="Równoważ przedmioty w tygodniu"
                />
                <Typography variant="body2" color="text.secondary" paragraph>
                  Równomiernie rozkłada przedmioty w ciągu tygodnia.
                </Typography>

                <FormControlLabel
                  control={
                    <Switch 
                      checked={advancedSettings.optimizeForStudents} 
                      onChange={handleSettingChange} 
                      name="optimizeForStudents" 
                      color="primary"
                    />
                  }
                  label="Optymalizuj dla uczniów"
                />
                <Typography variant="body2" color="text.secondary">
                  Priorytetyzuje komfort uczniów nad komfortem nauczycieli.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardHeader
                title="Ustawienia nauczycieli"
                subheader="Konfiguracja zaawansowanych opcji dla nauczycieli"
                avatar={<PersonIcon color="primary" />}
              />
              <Divider />
              <CardContent>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={advancedSettings.allowTeacherGaps} 
                      onChange={handleSettingChange} 
                      name="allowTeacherGaps" 
                      color="primary"
                    />
                  }
                  label="Zezwalaj na okienka dla nauczycieli"
                />
                <Typography variant="body2" color="text.secondary" paragraph>
                  Umożliwia tworzenie przerw w planie nauczycieli.
                </Typography>

                <FormControlLabel
                  control={
                    <Switch 
                      checked={advancedSettings.prioritizeTeacherPreferences} 
                      onChange={handleSettingChange} 
                      name="prioritizeTeacherPreferences" 
                      color="primary"
                    />
                  }
                  label="Uwzględniaj preferencje nauczycieli"
                />
                <Typography variant="body2" color="text.secondary" paragraph>
                  Bierze pod uwagę preferowane godziny pracy nauczycieli.
                </Typography>

                <FormControlLabel
                  control={
                    <Switch 
                      checked={advancedSettings.minimizeMovement} 
                      onChange={handleSettingChange} 
                      name="minimizeMovement" 
                      color="primary"
                    />
                  }
                  label="Minimalizuj przemieszczanie się"
                />
                <Typography variant="body2" color="text.secondary">
                  Ogranicza konieczność przemieszczania się nauczycieli między salami.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12}>
            <StyledCard>
              <CardHeader
                title="Ustawienia sal"
                subheader="Konfiguracja zaawansowanych opcji dla sal lekcyjnych"
                avatar={<WeekendIcon color="primary" />}
              />
              <Divider />
              <CardContent>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={advancedSettings.allowRoomChanges} 
                      onChange={handleSettingChange} 
                      name="allowRoomChanges" 
                      color="primary"
                    />
                  }
                  label="Zezwalaj na zmiany sal"
                />
                <Typography variant="body2" color="text.secondary">
                  Umożliwia przydzielanie różnych sal dla tej samej klasy w ciągu dnia.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12}>
            <StyledCard>
              <CardHeader
                title="Asystent AI"
                subheader="Konfiguracja zaawansowanych opcji dla asystenta AI"
                avatar={<AutoAwesomeIcon color="primary" />}
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Poziom optymalizacji AI</InputLabel>
                      <Select
                        value="advanced"
                        label="Poziom optymalizacji AI"
                      >
                        <MenuItem value="basic">Podstawowy</MenuItem>
                        <MenuItem value="standard">Standardowy</MenuItem>
                        <MenuItem value="advanced">Zaawansowany</MenuItem>
                        <MenuItem value="experimental">Eksperymentalny</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Strategia optymalizacji</InputLabel>
                      <Select
                        value="balanced"
                        label="Strategia optymalizacji"
                      >
                        <MenuItem value="balanced">Zbalansowana</MenuItem>
                        <MenuItem value="aggressive">Agresywna</MenuItem>
                        <MenuItem value="conservative">Konserwatywna</MenuItem>
                        <MenuItem value="custom">Niestandardowa</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default PlanConfiguration;
