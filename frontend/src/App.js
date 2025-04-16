import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Dashboard from './pages/Dashboard';
import LessonPlans from './pages/LessonPlans';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Rooms from './pages/Rooms';
import Subjects from './pages/Subjects';
import Settings from './pages/Settings';
import AppLayout from './components/layout/AppLayout';
import PlanEditor from './pages/PlanEditor';
import PlanAnalytics from './pages/PlanAnalytics';
import Substitutions from './pages/Substitutions';
import Integrations from './pages/Integrations';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { PerformanceProvider } from './context/PerformanceContext';

function App() {
  return (
    <PerformanceProvider>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="lesson-plans" element={<LessonPlans />} />
            <Route path="lesson-plans/:id" element={<PlanEditor />} />
            <Route path="lesson-plans/:id/analytics" element={<PlanAnalytics />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="classes" element={<Classes />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="substitutions" element={<Substitutions />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Box>
    </PerformanceProvider>
  );
}

export default App;
