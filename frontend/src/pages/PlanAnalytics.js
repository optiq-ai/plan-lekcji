import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import LessonPlanService from '../services/LessonPlanService';
import LessonService from '../services/LessonService';
import TeacherLoadHeatmap from '../components/visualization/TeacherLoadHeatmap';
import RoomUtilizationChart from '../components/visualization/RoomUtilizationChart';
import ClassSubjectDistribution from '../components/visualization/ClassSubjectDistribution';
import StudentLoadAnalytics from '../components/visualization/StudentLoadAnalytics';
import PlanQualityIndicator from '../components/visualization/PlanQualityIndicator';

const PlanAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lessonPlan, setLessonPlan] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const planData = await LessonPlanService.getLessonPlanById(id);
        setLessonPlan(planData);
        
        const lessonsData = await LessonService.getLessonsByPlanId(id);
        setLessons(lessonsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching plan data:', err);
        setError('Nie udało się załadować danych planu lekcji. Spróbuj ponownie później.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    navigate(`/lesson-plans/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!lessonPlan) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Plan lekcji nie został znaleziony lub wystąpił błąd podczas ładowania.
        </Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/lesson-plans')}
        >
          Powrót do listy planów
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h1">
            Analiza planu: {lessonPlan.name}
          </Typography>
          
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Powrót do edycji
          </Button>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Jakość planu" />
          <Tab label="Obciążenie nauczycieli" />
          <Tab label="Wykorzystanie sal" />
          <Tab label="Rozkład przedmiotów" />
          <Tab label="Obciążenie uczniów" />
        </Tabs>
      </Paper>
      
      {tabValue === 0 && (
        <Paper sx={{ p: 2 }}>
          <PlanQualityIndicator 
            lessonPlan={lessonPlan}
            lessons={lessons}
          />
        </Paper>
      )}
      
      {tabValue === 1 && (
        <Paper sx={{ p: 2 }}>
          <TeacherLoadHeatmap 
            lessons={lessons}
          />
        </Paper>
      )}
      
      {tabValue === 2 && (
        <Paper sx={{ p: 2 }}>
          <RoomUtilizationChart 
            lessons={lessons}
          />
        </Paper>
      )}
      
      {tabValue === 3 && (
        <Paper sx={{ p: 2 }}>
          <ClassSubjectDistribution 
            lessons={lessons}
          />
        </Paper>
      )}
      
      {tabValue === 4 && (
        <Paper sx={{ p: 2 }}>
          <StudentLoadAnalytics 
            lessons={lessons}
          />
        </Paper>
      )}
    </Box>
  );
};

export default PlanAnalytics;
