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
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BarChartIcon from '@mui/icons-material/BarChart';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import LessonPlanService from '../services/LessonPlanService';
import LessonService from '../services/LessonService';
import LessonPlanGrid from '../components/visualization/LessonPlanGrid';
import PlanIssueDetector from '../components/ai-assistant/PlanIssueDetector';
import PlanOptimizationWizard from '../components/ai-assistant/PlanOptimizationWizard';

const PlanEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lessonPlan, setLessonPlan] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [optimizationOpen, setOptimizationOpen] = useState(false);

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
        setError('Nie udało się załadować planu lekcji. Spróbuj ponownie później.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await LessonPlanService.updateLessonPlan(id, lessonPlan);
      
      // Save all lessons
      for (const lesson of lessons) {
        await LessonService.updateLesson(lesson.id, lesson);
      }
      
      setSuccess('Plan lekcji został pomyślnie zapisany.');
      setTimeout(() => setSuccess(''), 3000);
      setSaving(false);
    } catch (err) {
      console.error('Error saving plan:', err);
      setError('Nie udało się zapisać planu lekcji. Spróbuj ponownie później.');
      setSaving(false);
    }
  };

  const handleAnalytics = () => {
    navigate(`/lesson-plans/${id}/analytics`);
  };

  const handleOptimize = () => {
    setOptimizationOpen(true);
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
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h1">
            {lessonPlan.name}
          </Typography>
          
          <Box>
            <Tooltip title="Cofnij">
              <IconButton>
                <UndoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ponów">
              <IconButton>
                <RedoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Optymalizuj plan">
              <IconButton onClick={handleOptimize}>
                <AutoFixHighIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Analiza planu">
              <IconButton onClick={handleAnalytics}>
                <BarChartIcon />
              </IconButton>
            </Tooltip>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Zapisywanie...' : 'Zapisz'}
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Plan lekcji" />
          <Tab label="Problemy" />
          <Tab label="Szczegóły" />
        </Tabs>
      </Paper>
      
      {tabValue === 0 && (
        <Paper sx={{ p: 2 }}>
          <LessonPlanGrid 
            lessons={lessons} 
            onLessonUpdate={(updatedLesson) => {
              const updatedLessons = lessons.map(lesson => 
                lesson.id === updatedLesson.id ? updatedLesson : lesson
              );
              setLessons(updatedLessons);
            }}
          />
        </Paper>
      )}
      
      {tabValue === 1 && (
        <Paper sx={{ p: 2 }}>
          <PlanIssueDetector 
            lessonPlan={lessonPlan}
            lessons={lessons}
          />
        </Paper>
      )}
      
      {tabValue === 2 && (
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Nazwa planu:</Typography>
              <Typography variant="body1">{lessonPlan.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Szkoła:</Typography>
              <Typography variant="body1">{lessonPlan.school?.name || 'Nie określono'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Data rozpoczęcia:</Typography>
              <Typography variant="body1">
                {new Date(lessonPlan.startDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Data zakończenia:</Typography>
              <Typography variant="body1">
                {new Date(lessonPlan.endDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Opis:</Typography>
              <Typography variant="body1">{lessonPlan.description || 'Brak opisu'}</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      
      <PlanOptimizationWizard 
        open={optimizationOpen}
        onClose={() => setOptimizationOpen(false)}
        lessonPlan={lessonPlan}
        lessons={lessons}
        onOptimize={(optimizedLessons) => {
          setLessons(optimizedLessons);
          setSuccess('Plan został zoptymalizowany. Pamiętaj o zapisaniu zmian.');
          setTimeout(() => setSuccess(''), 3000);
        }}
      />
    </Box>
  );
};

export default PlanEditor;
