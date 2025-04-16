import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Tooltip,
  IconButton,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import InfoIcon from '@mui/icons-material/Info';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';

/**
 * Komponent wizualizacji rozkładu przedmiotów w klasie
 * Pokazuje statystyki i analizę rozkładu przedmiotów w tygodniu
 */
const ClassSubjectDistribution = () => {
  const theme = useTheme();
  const [selectedClass, setSelectedClass] = useState('1A');
  const [selectedTab, setSelectedTab] = useState(0);
  const [distributionData, setDistributionData] = useState([]);
  const [weeklyDistribution, setWeeklyDistribution] = useState([]);
  const [dailyLoad, setDailyLoad] = useState([]);
  const [subjectBalance, setSubjectBalance] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  // Symulacja danych rozkładu przedmiotów
  useEffect(() => {
    // W rzeczywistej aplikacji dane byłyby pobierane z API
    const mockDistributionData = {
      '1A': {
        className: '1A',
        profile: 'matematyczno-fizyczny',
        classTeacher: 'mgr Anna Kowalska',
        students: 28,
        homeroom: '103',
        weeklyDistribution: [
          { subject: 'Matematyka', hours: 6, percentage: 20 },
          { subject: 'Język polski', hours: 5, percentage: 16.7 },
          { subject: 'Język angielski', hours: 4, percentage: 13.3 },
          { subject: 'Fizyka', hours: 3, percentage: 10 },
          { subject: 'Informatyka', hours: 2, percentage: 6.7 },
          { subject: 'Biologia', hours: 2, percentage: 6.7 },
          { subject: 'Chemia', hours: 2, percentage: 6.7 },
          { subject: 'Historia', hours: 2, percentage: 6.7 },
          { subject: 'WF', hours: 3, percentage: 10 },
          { subject: 'Religia', hours: 1, percentage: 3.3 }
        ],
        dailyLoad: [
          { day: 'Poniedziałek', difficulty: 3.8, subjects: 6 },
          { day: 'Wtorek', difficulty: 4.2, subjects: 7 },
          { day: 'Środa', difficulty: 3.5, subjects: 6 },
          { day: 'Czwartek', difficulty: 4.5, subjects: 7 },
          { day: 'Piątek', difficulty: 3.0, subjects: 5 }
        ],
        subjectBalance: {
          ścisłe: 37,
          humanistyczne: 23,
          językowe: 20,
          przyrodnicze: 13,
          inne: 7
        },
        aiSuggestions: [
          {
            id: 1,
            type: 'improvement',
            description: 'Rozważ zamianę geografii z fizyką, aby lepiej zbalansować trudność dnia.',
            day: 'Środa',
            impact: 'średni'
          },
          {
            id: 2,
            type: 'warning',
            description: 'Zbyt dużo przedmiotów ścisłych pod rząd we wtorek.',
            day: 'Wtorek',
            impact: 'wysoki'
          },
          {
            id: 3,
            type: 'optimization',
            description: 'Przenieś WF na czwartek, aby rozładować napięcie po trudnych przedmiotach.',
            day: 'Czwartek',
            impact: 'niski'
          }
        ]
      },
      '1B': {
        className: '1B',
        profile: 'humanistyczny',
        classTeacher: 'mgr Jan Nowak',
        students: 26,
        homeroom: '105',
        weeklyDistribution: [
          { subject: 'Język polski', hours: 6, percentage: 20 },
          { subject: 'Historia', hours: 5, percentage: 16.7 },
          { subject: 'Język angielski', hours: 5, percentage: 16.7 },
          { subject: 'Matematyka', hours: 4, percentage: 13.3 },
          { subject: 'WOS', hours: 2, percentage: 6.7 },
          { subject: 'Geografia', hours: 2, percentage: 6.7 },
          { subject: 'Biologia', hours: 1, percentage: 3.3 },
          { subject: 'Informatyka', hours: 1, percentage: 3.3 },
          { subject: 'WF', hours: 3, percentage: 10 },
          { subject: 'Religia', hours: 1, percentage: 3.3 }
        ],
        dailyLoad: [
          { day: 'Poniedziałek', difficulty: 3.2, subjects: 6 },
          { day: 'Wtorek', difficulty: 3.8, subjects: 7 },
          { day: 'Środa', difficulty: 4.0, subjects: 6 },
          { day: 'Czwartek', difficulty: 3.5, subjects: 6 },
          { day: 'Piątek', difficulty: 3.2, subjects: 5 }
        ],
        subjectBalance: {
          ścisłe: 17,
          humanistyczne: 43,
          językowe: 23,
          przyrodnicze: 10,
          inne: 7
        },
        aiSuggestions: [
          {
            id: 1,
            type: 'improvement',
            description: 'Rozważ przesunięcie historii z środy na piątek dla lepszego balansu.',
            day: 'Środa/Piątek',
            impact: 'średni'
          },
          {
            id: 2,
            type: 'optimization',
            description: 'Dodaj więcej aktywności praktycznych w środę po intensywnych zajęciach teoretycznych.',
            day: 'Środa',
            impact: 'niski'
          }
        ]
      }
    };

    // Ustawienie danych dla wybranej klasy
    const classData = mockDistributionData[selectedClass];
    if (classData) {
      setDistributionData(classData);
      setWeeklyDistribution(classData.weeklyDistribution);
      setDailyLoad(classData.dailyLoad);
      setSubjectBalance(Object.entries(classData.subjectBalance).map(([key, value]) => ({
        name: key,
        value: value
      })));
      setAiSuggestions(classData.aiSuggestions);
    }
  }, [selectedClass]);

  // Kolory dla wykresu kołowego
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main
  ];

  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Plan zajęć klas</Typography>
        <Box>
          <Tooltip title="Wydrukuj plan">
            <IconButton>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eksportuj do PDF">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ mr: 2 }}>
          Wybierz klasę:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'].map((cls) => (
            <Chip
              key={cls}
              label={cls}
              onClick={() => setSelectedClass(cls)}
              color={selectedClass === cls ? 'primary' : 'default'}
              variant={selectedClass === cls ? 'filled' : 'outlined'}
              sx={{ borderRadius: '16px' }}
            />
          ))}
          <Chip label="..." variant="outlined" sx={{ borderRadius: '16px' }} />
        </Box>
      </Box>

      {distributionData && (
        <Box sx={{ mb: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6">
                  Klasa {distributionData.className} - Profil {distributionData.profile}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    Wychowawca: {distributionData.classTeacher}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    Uczniów: {distributionData.students} • Sala wychowawcza: {distributionData.homeroom}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="analiza planu lekcji"
        >
          <Tab icon={<BarChartIcon />} label="Analiza planu lekcji" />
          <Tab icon={<PieChartIcon />} label="Rozkład przedmiotów" />
          <Tab icon={<AutoFixHighIcon />} label="Sugestie AI" />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Obciążenie:
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dailyLoad}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" stroke={theme.palette.primary.main} />
                      <YAxis yAxisId="right" orientation="right" stroke={theme.palette.secondary.main} />
                      <RechartsTooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="difficulty" name="Trudność (1-5)" fill={theme.palette.primary.main} />
                      <Bar yAxisId="right" dataKey="subjects" name="Liczba przedmiotów" fill={theme.palette.secondary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Chip 
                    label={`Optymalne 70%`} 
                    color="success" 
                    variant="outlined" 
                    sx={{ mr: 1 }} 
                  />
                  <Chip 
                    label={`Bardzo dobry rozkład 90%`} 
                    color="success" 
                    sx={{ mr: 1 }} 
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Rozkład kategorii przedmiotów:
                </Typography>
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectBalance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {subjectBalance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                    Rozkład zgodny z profilem klasy i podstawą programową
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {selectedTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Tygodniowy rozkład przedmiotów:
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyDistribution}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="subject" width={100} />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="hours" name="Liczba godzin" fill={theme.palette.primary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AutoFixHighIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="h6">
                    Sugestie AI:
                  </Typography>
                </Box>
                
                {aiSuggestions.length > 0 ? (
                  <Box>
                    {aiSuggestions.map((suggestion) => (
                      <Paper
                        key={suggestion.id}
                        elevation={1}
                        sx={{ 
                          p: 2, 
                          mb: 2, 
                          borderLeft: `4px solid ${
                            suggestion.type === 'warning' ? theme.palette.error.main :
                            suggestion.type === 'improvement' ? theme.palette.warning.main :
                            theme.palette.success.main
                          }`
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2">
                            Problem: {suggestion.type === 'warning' ? 'Nieoptymalne ułożenie planu' : 
                                     suggestion.type === 'improvement' ? 'Możliwa poprawa' : 
                                     'Optymalizacja'}
                          </Typography>
                          <Chip 
                            label={`Wpływ: ${suggestion.impact}`} 
                            size="small"
                            color={
                              suggestion.impact === 'wysoki' ? 'error' :
                              suggestion.impact === 'średni' ? 'warning' :
                              'success'
                            }
                          />
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {suggestion.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Dzień: {suggestion.day}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            color="primary"
                            sx={{ mr: 1 }}
                          >
                            Ignoruj
                          </Button>
                          <Button 
                            variant="contained" 
                            size="small" 
                            color="primary"
                          >
                            Napraw
                          </Button>
                        </Box>
                      </Paper>
                    ))}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        startIcon={<AutoFixHighIcon />}
                      >
                        Napraw wszystkie problemy
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <InfoIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
                    <Typography variant="body1" color="textSecondary">
                      Nie znaleziono sugestii dla tej klasy.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Plan zajęć jest optymalny.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ClassSubjectDistribution;
