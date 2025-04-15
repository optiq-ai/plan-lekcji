import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  useTheme,
  CircularProgress,
  Button,
  Stack,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';
import LessonService from '../../services/LessonService';
import SubstitutionService from '../../services/SubstitutionService';

const SubstitutionDashboard = ({ planId, date }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [substitutions, setSubstitutions] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date || new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Pobierz zastępstwa na wybrany dzień
        const substitutionsResponse = await SubstitutionService.getSubstitutionsByDate(currentDate);
        setSubstitutions(substitutionsResponse);
        
        // Pobierz lekcje dla planu (jeśli podano planId)
        if (planId) {
          const lessonsResponse = await LessonService.getLessonsByPlan(planId);
          setLessons(lessonsResponse);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych zastępstw:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [planId, currentDate]);

  // Funkcja do generowania propozycji zastępstw
  const generateSubstitutionProposals = async (lessonId) => {
    try {
      setLoading(true);
      const proposalsResponse = await SubstitutionService.generateSubstitutionProposals(lessonId);
      // Tutaj można by zaktualizować stan z propozycjami
      setLoading(false);
      return proposalsResponse;
    } catch (err) {
      console.error('Błąd podczas generowania propozycji zastępstw:', err);
      setError('Wystąpił błąd podczas generowania propozycji zastępstw. Spróbuj ponownie później.');
      setLoading(false);
      return null;
    }
  };

  // Funkcja do formatowania daty
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
  };

  // Funkcja do określania statusu zastępstwa
  const getSubstitutionStatus = (substitution) => {
    if (substitution.confirmed) return { label: 'Potwierdzone', color: theme.palette.success.main };
    if (substitution.pending) return { label: 'Oczekujące', color: theme.palette.warning.main };
    return { label: 'Nowe', color: theme.palette.info.main };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6">
          Zastępstwa na dzień {formatDate(currentDate)}
        </Typography>
        <Box>
          <IconButton size="small" onClick={() => setLoading(true)}>
            <RefreshIcon />
          </IconButton>
          <IconButton size="small">
            <DownloadIcon />
          </IconButton>
          <IconButton size="small">
            <PrintIcon />
          </IconButton>
          <IconButton size="small">
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {substitutions.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.grey[50], borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Brak zastępstw na wybrany dzień
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Nie znaleziono żadnych zastępstw na dzień {formatDate(currentDate)}.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => generateSubstitutionProposals()}
          >
            Generuj propozycje zastępstw
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {substitutions.map((substitution) => {
            const status = getSubstitutionStatus(substitution);
            
            return (
              <Grid item xs={12} key={substitution.id}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2,
                    borderLeft: `4px solid ${status.color}`,
                    '&:hover': {
                      boxShadow: 3
                    }
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Lekcja {substitution.lesson?.timeSlot?.number || '?'}
                      </Typography>
                      <Typography variant="h6">
                        {substitution.lesson?.timeSlot?.startTime || '??:??'} - {substitution.lesson?.timeSlot?.endTime || '??:??'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Nieobecny nauczyciel
                      </Typography>
                      <Typography variant="body1">
                        {substitution.absentTeacher?.lastName || 'Nieznany'} {substitution.absentTeacher?.firstName || ''}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {substitution.lesson?.subject?.name || 'Przedmiot nieznany'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Zastępujący nauczyciel
                      </Typography>
                      <Typography variant="body1">
                        {substitution.substituteTeacher?.lastName || 'Nieznany'} {substitution.substituteTeacher?.firstName || ''}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {substitution.substituteTeacher?.subjects?.map(s => s.name).join(', ') || 'Brak informacji o przedmiotach'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Klasa i sala
                      </Typography>
                      <Typography variant="body1">
                        {substitution.lesson?.class?.name || 'Nieznana klasa'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Sala {substitution.lesson?.room?.name || '?'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center' }}>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          sx={{ 
                            borderColor: status.color,
                            color: status.color
                          }}
                        >
                          {status.label}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Paper>
  );
};

export default SubstitutionDashboard;
