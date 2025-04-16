import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Stylizowany kontener
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

// Stylizowany Paper dla kart
const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(2),
}));

// Stylizowany przycisk nawigacyjny
const NavButton = styled(Button)(({ theme, active }) => ({
  borderRadius: '20px',
  margin: theme.spacing(0.5),
  backgroundColor: active ? theme.palette.primary.main : '#f5f5f5',
  color: active ? 'white' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : '#e0e0e0',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    padding: theme.spacing(0.5, 1),
  },
}));

// Stylizowany przycisk dnia tygodnia
const DayButton = styled(Button)(({ theme, active }) => ({
  borderRadius: '50%',
  minWidth: '40px',
  width: '40px',
  height: '40px',
  padding: 0,
  margin: theme.spacing(0.5),
  backgroundColor: active ? theme.palette.primary.main : '#f5f5f5',
  color: active ? 'white' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : '#e0e0e0',
  },
}));

// Stylizowany element lekcji
const LessonItem = styled(Box)(({ theme, color = '#e3f2fd' }) => ({
  backgroundColor: color,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  position: 'relative',
}));

// Dane lekcji
const lessonData = [
  { 
    id: 1, 
    subject: 'Matematyka', 
    time: '8:00-8:45', 
    teacher: 'mgr A. Kowalska', 
    room: 's.103', 
    color: '#e3f2fd' 
  },
  { 
    id: 2, 
    subject: 'Język polski', 
    time: '8:55-9:40', 
    teacher: 'mgr J. Nowak', 
    room: 's.203', 
    color: '#e8f5e9' 
  },
  { 
    id: 3, 
    subject: 'Język angielski', 
    time: '9:50-10:35', 
    teacher: 'mgr E. Wiśniewska', 
    room: 's.105', 
    color: '#e0f7fa' 
  },
  { 
    id: 4, 
    subject: 'Fizyka', 
    time: '10:45-11:30', 
    teacher: 'dr A. Malinowski', 
    room: 's.115', 
    color: '#fff8e1' 
  },
  { 
    id: 5, 
    subject: 'Geografia', 
    time: '11:50-12:35', 
    teacher: 'mgr A. Dąbrowska', 
    room: 's.108', 
    color: '#f3e5f5' 
  },
];

// Dane statystyk
const statsData = {
  weeklyLoad: [
    { day: 'PN', value: 70 },
    { day: 'WT', value: 85 },
    { day: 'ŚR', value: 60 },
    { day: 'CZ', value: 90 },
    { day: 'PT', value: 75 },
    { day: 'SB', value: 0 },
  ],
  subjectDistribution: [
    { subject: 'Matematyka', percentage: 25 },
    { subject: 'Polski', percentage: 20 },
    { subject: 'Angielski', percentage: 20 },
    { subject: 'Fizyka', percentage: 20 },
    { subject: 'Geografia', percentage: 15 },
  ],
};

// Komponent widoku mobilnego
const MobileView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDay, setActiveDay] = useState('PON');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Obsługa zmiany zakładki
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Obsługa zmiany dnia
  const handleDayChange = (day) => {
    setActiveDay(day);
  };
  
  // Renderowanie widoku planu lekcji
  const renderPlanView = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {['PON', 'WT', 'ŚR', 'CZW', 'PT'].map((day) => (
          <DayButton
            key={day}
            active={activeDay === day}
            onClick={() => handleDayChange(day)}
          >
            {day}
          </DayButton>
        ))}
      </Box>
      
      {lessonData.map((lesson) => (
        <LessonItem key={lesson.id} color={lesson.color}>
          <Typography variant="subtitle1" fontWeight="bold">
            {lesson.subject}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lesson.time} • {lesson.teacher} • {lesson.room}
          </Typography>
          <IconButton 
            size="small" 
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <InfoIcon fontSize="small" />
          </IconButton>
        </LessonItem>
      ))}
    </Box>
  );
  
  // Renderowanie widoku analizy tygodnia
  const renderAnalysisView = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ borderRadius: '20px', mr: 1 }}
        >
          Statystyki
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ borderRadius: '20px' }}
        >
          Sugestie
        </Button>
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Obciążenie tygodniowe
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={1}>
          {statsData.weeklyLoad.map((day) => (
            <Grid item xs={2} key={day.day}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">{day.day}</Typography>
                <Box sx={{ 
                  height: 100, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  mb: 1
                }}>
                  <Box sx={{ 
                    width: '80%', 
                    height: `${day.value}%`, 
                    bgcolor: day.value > 80 ? '#f44336' : (day.value > 60 ? '#ff9800' : '#4caf50'),
                    borderRadius: '4px 4px 0 0'
                  }}></Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Rozkład przedmiotów
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        {statsData.subjectDistribution.map((subject) => (
          <Box key={subject.subject} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">{subject.subject}</Typography>
              <Typography variant="body2">{subject.percentage}%</Typography>
            </Box>
            <Box sx={{ 
              width: '100%', 
              height: 10, 
              bgcolor: '#f5f5f5', 
              borderRadius: 5,
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                width: `${subject.percentage}%`, 
                height: '100%', 
                bgcolor: '#3f51b5',
                borderRadius: 5
              }}></Box>
            </Box>
          </Box>
        ))}
      </Box>
      
      <Box sx={{ 
        p: 2, 
        bgcolor: 'rgba(63, 81, 181, 0.08)', 
        borderRadius: '8px',
        border: '1px dashed #3f51b5',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <SmartToyIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" color="primary">
            Sugestia AI:
          </Typography>
        </Box>
        <Typography variant="body2" color="primary">
          Wysoki poziom obciążenia we wtorek i czwartek. Rozważ przesunięcie zajęć w poniedziałek lub środę.
        </Typography>
      </Box>
    </Box>
  );
  
  // Renderowanie widoku planu z analityką
  const renderCombinedView = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ borderRadius: '20px', mr: 1 }}
        >
          Plan
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ borderRadius: '20px', mr: 1 }}
        >
          Statystyki
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ borderRadius: '20px', mr: 1 }}
        >
          Sala
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ borderRadius: '20px', mr: 1 }}
        >
          Asystent
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ borderRadius: '20px' }}
        >
          Więcej
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SB'].map((day) => (
          <DayButton
            key={day}
            active={activeDay === day}
            onClick={() => handleDayChange(day)}
          >
            {day}
          </DayButton>
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          {lessonData.slice(0, 3).map((lesson) => (
            <LessonItem key={lesson.id} color={lesson.color}>
              <Typography variant="subtitle1" fontWeight="bold">
                {lesson.subject}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {lesson.time} • {lesson.teacher} • {lesson.room}
              </Typography>
            </LessonItem>
          ))}
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Rozkład trudności
          </Typography>
          <Box sx={{ 
            height: 100, 
            bgcolor: '#f5f5f5',
            borderRadius: '4px',
            p: 1,
            mb: 2,
            display: 'flex',
            alignItems: 'flex-end'
          }}>
            {[70, 90, 50, 80, 60].map((value, index) => (
              <Box 
                key={index}
                sx={{ 
                  flex: 1,
                  height: `${value}%`,
                  bgcolor: value > 80 ? '#f44336' : (value > 60 ? '#ff9800' : '#4caf50'),
                  mx: 0.5,
                  borderRadius: '4px 4px 0 0'
                }}
              />
            ))}
          </Box>
          
          <Typography variant="subtitle2" gutterBottom>
            Rozkład sal
          </Typography>
          <Box sx={{ 
            height: 100, 
            bgcolor: '#f5f5f5',
            borderRadius: '4px',
            p: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: 1
          }}>
            {['#bbdefb', '#c8e6c9', '#ffcdd2', '#d1c4e9', '#b2ebf2', '#fff9c4', '#ffccbc', '#f5f5f5', '#e1bee7'].map((color, index) => (
              <Box 
                key={index}
                sx={{ 
                  bgcolor: color,
                  borderRadius: '4px'
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ 
        p: 2, 
        bgcolor: 'rgba(63, 81, 181, 0.08)', 
        borderRadius: '8px',
        border: '1px dashed #3f51b5',
        mt: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <SmartToyIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" color="primary">
            Asystent AI
          </Typography>
        </Box>
        <Typography variant="body2" color="primary" paragraph>
          Sugestie optymalizacji:
        </Typography>
        <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
          • Zamień salę 103 na 108 w czwartek (mniej przemieszczania)
        </Typography>
        <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
          • Zmiana czasu WF z 3A i 3B w środę na piątek
        </Typography>
        <Typography variant="body2" color="primary" sx={{ ml: 2 }}>
          • Zwiększ liczbę sal komputerowych we wtorki
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          size="small"
          sx={{ mt: 1, borderRadius: '20px' }}
        >
          Zastosuj sugestie
        </Button>
      </Box>
    </Box>
  );
  
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ 
        bgcolor: '#3f51b5', 
        color: 'white', 
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">
          Inteligentny Plan Lekcji - Wersje mobilne
        </Typography>
      </Box>
      
      <Typography variant="h5" sx={{ p: 2, textAlign: 'center' }}>
        Wersje mobilne i responsywność interfejsu
      </Typography>
      <Typography variant="body1" sx={{ px: 2, textAlign: 'center', mb: 3 }}>
        Aplikacja dostosowana do różnych urządzeń i trybów wyświetlania
      </Typography>
      
      <Grid container spacing={2} sx={{ px: 2 }}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography variant="h6" gutterBottom align="center">
              Plan Lekcji
            </Typography>
            <Box sx={{ 
              bgcolor: 'white', 
              borderRadius: '16px', 
              p: 2,
              border: '1px solid #e0e0e0',
              maxWidth: 300,
              mx: 'auto'
            }}>
              {renderPlanView()}
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                mt: 2,
                pt: 2,
                borderTop: '1px solid #f0f0f0'
              }}>
                <IconButton color="primary">
                  <PersonIcon />
                </IconButton>
                <IconButton color="primary">
                  <CalendarTodayIcon />
                </IconButton>
                <IconButton color="primary">
                  <NotificationsIcon />
                </IconButton>
                <IconButton color="primary">
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography variant="h6" gutterBottom align="center">
              Analiza tygodnia
            </Typography>
            <Box sx={{ 
              bgcolor: 'white', 
              borderRadius: '16px', 
              p: 2,
              border: '1px solid #e0e0e0',
              maxWidth: 300,
              mx: 'auto'
            }}>
              {renderAnalysisView()}
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                mt: 2,
                pt: 2,
                borderTop: '1px solid #f0f0f0'
              }}>
                <IconButton color="primary">
                  <PersonIcon />
                </IconButton>
                <IconButton color="primary">
                  <AssessmentIcon />
                </IconButton>
                <IconButton color="primary">
                  <SmartToyIcon />
                </IconButton>
                <IconButton color="primary">
                  <AccountCircleIcon />
                </IconButton>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography variant="h6" gutterBottom align="center">
              Plan lekcji + Analityka
            </Typography>
            <Box sx={{ 
              bgcolor: 'white', 
              borderRadius: '16px', 
              p: 2,
              border: '1px solid #e0e0e0',
              maxWidth: 300,
              mx: 'auto'
            }}>
              {renderCombinedView()}
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                mt: 2,
                pt: 2,
                borderTop: '1px solid #f0f0f0'
              }}>
                <IconButton color="primary">
                  <PersonIcon />
                </IconButton>
                <IconButton color="primary">
                  <CalendarTodayIcon />
                </IconButton>
                <IconButton color="primary">
                  <SmartToyIcon />
                </IconButton>
                <IconButton color="primary">
                  <AccountCircleIcon />
                </IconButton>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>
      
      <Box sx={{ p: 2, bgcolor: '#e3f2fd', mt: 3, textAlign: 'center' }}>
        <Typography variant="body1">
          Aplikacja dostosowuje się automatycznie do różnych urządzeń i orientacji ekranu
        </Typography>
      </Box>
    </Box>
  );
};

export default MobileView;
