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
  Chip,
  Stack,
  Tooltip
} from '@mui/material';
import {
  Check as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';

const PlanQualityIndicator = ({ planId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!planId) return;
      
      try {
        setLoading(true);
        
        // Pobierz dane planu lekcji
        const planResponse = await LessonPlanService.getLessonPlanById(planId);
        setPlanData(planResponse);
        
        // Pobierz ocenę jakości planu
        const qualityResponse = await LessonPlanService.evaluatePlan(planId);
        setQualityData(qualityResponse);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych jakości planu:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [planId]);

  // Funkcja do określania koloru wskaźnika na podstawie oceny
  const getScoreColor = (score) => {
    if (score >= 80) return theme.palette.success.main;
    if (score >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Funkcja do określania ikony statusu na podstawie oceny
  const getStatusIcon = (score) => {
    if (score >= 80) return <CheckIcon />;
    if (score >= 60) return <WarningIcon />;
    return <ErrorIcon />;
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

  if (!qualityData) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Brak danych do wyświetlenia oceny jakości planu.</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6">
          Ocena jakości planu
          {planData && `: ${planData.name}`}
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          size="small"
          startIcon={<InfoIcon />}
        >
          Szczegóły
        </Button>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              backgroundColor: getScoreColor(qualityData.overallScore),
              color: '#fff'
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              {qualityData.overallScore}/100
            </Typography>
            <Typography variant="subtitle1">
              Ocena ogólna
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Komfort uczniów:</Typography>
              <Chip 
                icon={getStatusIcon(qualityData.studentComfortScore)} 
                label={`${qualityData.studentComfortScore}/100`}
                color={qualityData.studentComfortScore >= 80 ? 'success' : qualityData.studentComfortScore >= 60 ? 'warning' : 'error'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Komfort nauczycieli:</Typography>
              <Chip 
                icon={getStatusIcon(qualityData.teacherComfortScore)} 
                label={`${qualityData.teacherComfortScore}/100`}
                color={qualityData.teacherComfortScore >= 80 ? 'success' : qualityData.teacherComfortScore >= 60 ? 'warning' : 'error'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Wykorzystanie sal:</Typography>
              <Chip 
                icon={getStatusIcon(qualityData.roomUtilizationScore)} 
                label={`${qualityData.roomUtilizationScore}/100`}
                color={qualityData.roomUtilizationScore >= 80 ? 'success' : qualityData.roomUtilizationScore >= 60 ? 'warning' : 'error'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Rozkład przedmiotów:</Typography>
              <Chip 
                icon={getStatusIcon(qualityData.subjectDistributionScore)} 
                label={`${qualityData.subjectDistributionScore}/100`}
                color={qualityData.subjectDistributionScore >= 80 ? 'success' : qualityData.subjectDistributionScore >= 60 ? 'warning' : 'error'}
              />
            </Box>
          </Stack>
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" gutterBottom>
            Problemy i sugestie
          </Typography>
          <Stack spacing={1}>
            {qualityData.issues && qualityData.issues.map((issue, index) => (
              <Box 
                key={index}
                sx={{ 
                  p: 1, 
                  borderLeft: `4px solid ${issue.severity === 'high' ? theme.palette.error.main : issue.severity === 'medium' ? theme.palette.warning.main : theme.palette.info.main}`,
                  backgroundColor: theme.palette.grey[50]
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {issue.title}
                </Typography>
                <Typography variant="body2">
                  {issue.description}
                </Typography>
              </Box>
            ))}
            
            {(!qualityData.issues || qualityData.issues.length === 0) && (
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="body2" color="success.main">
                  Nie znaleziono problemów w planie lekcji.
                </Typography>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlanQualityIndicator;
