import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Tabs,
  Tab,
  Card,
  CardContent
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import DataExportTool from '../components/integration/DataExportTool';
import CalendarIntegration from '../components/integration/CalendarIntegration';
import { Download, CalendarMonth } from '@mui/icons-material';

const Integrations = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0, 100, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 200, 255, 0.05) 0%, transparent 50%)',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        color: theme.palette.primary.main,
        mb: 4,
        fontWeight: 'bold',
        textShadow: '0px 0px 8px rgba(0, 150, 255, 0.3)'
      }}>
        Integracje systemowe
      </Typography>
      
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Eksport danych" icon={<Download />} iconPosition="start" />
          <Tab label="Integracja z kalendarzami" icon={<CalendarMonth />} iconPosition="start" />
        </Tabs>
      </Paper>
      
      {tabValue === 0 && (
        <DataExportTool />
      )}
      
      {tabValue === 1 && (
        <CalendarIntegration />
      )}
    </Box>
  );
};

export default Integrations;
