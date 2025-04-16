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
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * Komponent wizualizacji obciążenia nauczycieli w formie heatmapy
 * Pokazuje rozkład zajęć i obciążenie nauczycieli w różnych dniach i godzinach
 */
const TeacherLoadHeatmap = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState('Bieżący semestr');
  const [department, setDepartment] = useState('Wszyscy nauczyciele');
  const [heatmapData, setHeatmapData] = useState([]);
  const [criticalAreas, setCriticalAreas] = useState([]);

  // Kolory dla różnych poziomów obciążenia
  const loadColors = {
    'Niskie obciążenie': theme.palette.success.light,
    'Optymalne': theme.palette.success.main,
    'Podwyższone': theme.palette.warning.light,
    'Krytyczne': theme.palette.error.main
  };

  // Symulacja danych heatmapy
  useEffect(() => {
    // W rzeczywistej aplikacji dane byłyby pobierane z API
    const mockHeatmapData = [
      { 
        id: 1, 
        timeSlot: '8:00-9:40', 
        monday: 'Niskie obciążenie', 
        tuesday: 'Niskie obciążenie', 
        wednesday: 'Krytyczne', 
        thursday: 'Podwyższone', 
        friday: 'Niskie obciążenie' 
      },
      { 
        id: 2, 
        timeSlot: '9:50-11:30', 
        monday: 'Niskie obciążenie', 
        tuesday: 'Optymalne', 
        wednesday: 'Optymalne', 
        thursday: 'Optymalne', 
        friday: 'Krytyczne' 
      },
      { 
        id: 3, 
        timeSlot: '11:50-13:30', 
        monday: 'Podwyższone', 
        tuesday: 'Podwyższone', 
        wednesday: 'Niskie obciążenie', 
        thursday: 'Podwyższone', 
        friday: 'Optymalne' 
      },
      { 
        id: 4, 
        timeSlot: '13:40-15:20', 
        monday: 'Optymalne', 
        tuesday: 'Niskie obciążenie', 
        wednesday: 'Optymalne', 
        thursday: 'Niskie obciążenie', 
        friday: 'Niskie obciążenie' 
      },
      { 
        id: 5, 
        timeSlot: '15:30-17:10', 
        monday: 'Krytyczne', 
        tuesday: 'Optymalne', 
        wednesday: 'Optymalne', 
        thursday: 'Podwyższone', 
        friday: 'Niskie obciążenie' 
      }
    ];

    // Symulacja obszarów krytycznego obciążenia
    const mockCriticalAreas = [
      {
        day: 'Środa',
        time: '8:00-9:40',
        description: '7 nauczycieli ma zajęcia, 2 klasy bez nauczyciela',
        suggestion: 'Przesuń j.angielski 1B, 2C na wtorek'
      },
      {
        day: 'Piątek',
        time: '9:50-11:30',
        description: 'Zbyt dużo przedmiotów ścisłych dla klas 1A, 1B, 3C',
        suggestion: 'Zamiana z WF w poniedziałek'
      },
      {
        day: 'Poniedziałek',
        time: '15:30-17:10',
        description: 'Nauczyciele matematyki przeciążeni - 3 klasy równocześnie',
        suggestion: 'Rozłóż równomiernie na tydzień'
      }
    ];

    setHeatmapData(mockHeatmapData);
    setCriticalAreas(mockCriticalAreas);
  }, [period, department]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Statystyki obciążenia</Typography>
        <Box>
          <Tooltip title="Wydrukuj raport">
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

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Analiza obciążenia nauczycieli i uczniów w roku szkolnym 2025/2026
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Obciążenie nauczycieli (heatmapa)
              </Typography>
              
              <Box sx={{ overflowX: 'auto' }}>
                <Box sx={{ minWidth: 600 }}>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Box sx={{ width: 100 }}></Box>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                      <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Poniedziałek</Typography>
                      <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Wtorek</Typography>
                      <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Środa</Typography>
                      <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Czwartek</Typography>
                      <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Piątek</Typography>
                    </Box>
                  </Box>
                  
                  {heatmapData.map((row) => (
                    <Box key={row.id} sx={{ display: 'flex', mb: 1 }}>
                      <Box sx={{ width: 100, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">{row.timeSlot}</Typography>
                      </Box>
                      <Box sx={{ flex: 1, display: 'flex' }}>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: loadColors[row.monday], 
                          height: 50, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mx: 0.5,
                          borderRadius: 1
                        }}>
                        </Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: loadColors[row.tuesday], 
                          height: 50, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mx: 0.5,
                          borderRadius: 1
                        }}>
                        </Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: loadColors[row.wednesday], 
                          height: 50, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mx: 0.5,
                          borderRadius: 1
                        }}>
                        </Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: loadColors[row.thursday], 
                          height: 50, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mx: 0.5,
                          borderRadius: 1
                        }}>
                        </Box>
                        <Box sx={{ 
                          flex: 1, 
                          bgcolor: loadColors[row.friday], 
                          height: 50, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mx: 0.5,
                          borderRadius: 1
                        }}>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    {Object.entries(loadColors).map(([label, color]) => (
                      <Box key={label} sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                        <Box sx={{ width: 16, height: 16, bgcolor: color, mr: 0.5, borderRadius: 0.5 }}></Box>
                        <Typography variant="caption">{label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Obszary krytycznego obciążenia
              </Typography>
              
              {criticalAreas.map((area, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: theme.palette.background.default, borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="error" sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {area.day} {area.time}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {area.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    Sugestia: {area.suggestion}
                  </Typography>
                </Box>
              ))}
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2 }}
              >
                Zoptymalizuj automatycznie
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Obciążenie uczniów (trudność przedmiotów w ciągu dnia)
              </Typography>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: 'Poniedziałek', '1A': 3.2, '2B': 4.5, '3C': 2.8 },
                    { name: 'Wtorek', '1A': 4.1, '2B': 3.2, '3C': 3.5 },
                    { name: 'Środa', '1A': 3.8, '2B': 4.8, '3C': 4.2 },
                    { name: 'Czwartek', '1A': 4.5, '2B': 3.1, '3C': 3.9 },
                    { name: 'Piątek', '1A': 2.9, '2B': 3.8, '3C': 4.7 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="1A" fill={theme.palette.primary.main} name="Klasa 1A" />
                  <Bar dataKey="2B" fill={theme.palette.error.main} name="Klasa 2B" />
                  <Bar dataKey="3C" fill={theme.palette.success.main} name="Klasa 3C" />
                </BarChart>
              </ResponsiveContainer>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                  <Box sx={{ width: 40, height: 4, bgcolor: theme.palette.success.light, mr: 1 }}></Box>
                  <Typography variant="caption">Niskie</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 3 }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 4, 
                    background: `linear-gradient(to right, ${theme.palette.success.light}, ${theme.palette.warning.light})`, 
                    mr: 1 
                  }}></Box>
                  <Typography variant="caption">Optymalne</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 3 }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 4, 
                    background: `linear-gradient(to right, ${theme.palette.warning.light}, ${theme.palette.error.light})`, 
                    mr: 1 
                  }}></Box>
                  <Typography variant="caption">Podwyższone</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                  <Box sx={{ width: 40, height: 4, bgcolor: theme.palette.error.light, mr: 1 }}></Box>
                  <Typography variant="caption">Wysokie</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherLoadHeatmap;
