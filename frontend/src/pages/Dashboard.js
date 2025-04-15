import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

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

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: '50%',
  backgroundColor: theme.palette[color].light,
  color: theme.palette[color].main,
}));

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statystyki */}
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Aktywne plany
              </Typography>
              <Typography variant="h4">12</Typography>
            </Box>
            <IconWrapper color="primary">
              <CalendarMonthIcon fontSize="large" />
            </IconWrapper>
          </StatCard>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Nauczyciele
              </Typography>
              <Typography variant="h4">48</Typography>
            </Box>
            <IconWrapper color="secondary">
              <PeopleIcon fontSize="large" />
            </IconWrapper>
          </StatCard>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Sale
              </Typography>
              <Typography variant="h4">24</Typography>
            </Box>
            <IconWrapper color="info">
              <MeetingRoomIcon fontSize="large" />
            </IconWrapper>
          </StatCard>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Zastępstwa (dziś)
              </Typography>
              <Typography variant="h4">3</Typography>
            </Box>
            <IconWrapper color="warning">
              <NotificationsActiveIcon fontSize="large" />
            </IconWrapper>
          </StatCard>
        </Grid>
        
        {/* Analityka */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardHeader 
              title="Analiza obciążenia nauczycieli" 
              subheader="Tygodniowy przegląd"
              avatar={<AnalyticsIcon color="primary" />}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, minHeight: 300 }}>
              <Typography variant="body2" color="textSecondary">
                Tutaj będzie wykres obciążenia nauczycieli
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardHeader 
              title="Wykorzystanie sal" 
              subheader="Bieżący tydzień"
              avatar={<DashboardIcon color="primary" />}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, minHeight: 300 }}>
              <Typography variant="body2" color="textSecondary">
                Tutaj będzie wykres wykorzystania sal
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        
        {/* Sugestie AI */}
        <Grid item xs={12}>
          <StyledCard>
            <CardHeader 
              title="Sugestie optymalizacji AI" 
              subheader="Ostatnio wygenerowane"
              avatar={<TrendingUpIcon color="success" />}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText', borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <TrendingUpIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Optymalizacja obciążenia</Typography>
                    </Box>
                    <Typography variant="body2">
                      Przesunięcie 2 lekcji matematyki z poniedziałku na środę zmniejszy obciążenie nauczycieli o 15%.
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText', borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <TrendingUpIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Wykorzystanie sal</Typography>
                    </Box>
                    <Typography variant="body2">
                      Przeniesienie lekcji informatyki do sali 201 zwiększy efektywność wykorzystania pracowni komputerowych.
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'warning.light', color: 'warning.contrastText', borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <TrendingDownIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Potencjalne konflikty</Typography>
                    </Box>
                    <Typography variant="body2">
                      Wykryto nakładające się zajęcia WF dla klas 2A i 3B w czwartek. Zalecana zmiana terminu.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
