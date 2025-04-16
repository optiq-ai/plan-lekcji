import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Container,
  Paper,
  Tooltip,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Button,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useNavigate, Routes, Route } from 'react-router-dom';

// Import stron
import Login from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import PlanEditor from '../../pages/PlanEditor';
import PlanAnalytics from '../../pages/PlanAnalytics';
import Settings from '../../pages/Settings';

// Szerokość szuflady nawigacyjnej
const drawerWidth = 240;

// Stylizowany AppBar z przesunięciem dla otwartej szuflady
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: 'linear-gradient(90deg, #3f51b5 0%, #5c6bc0 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
}));

// Stylizowana szuflada nawigacyjna
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
    background: '#f5f5f5',
    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
  },
}));

// Stylizowany pasek narzędzi
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingRight: 24,
}));

// Stylizowany kontener główny
const StyledMainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: '#f9f9f9',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
}));

// Główny komponent układu aplikacji
const AppLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [activeItem, setActiveItem] = useState('konfiguracja');

  // Obsługa otwierania/zamykania szuflady
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Obsługa menu użytkownika
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  // Obsługa menu powiadomień
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  // Obsługa nawigacji
  const handleNavigation = (path, item) => {
    navigate(path);
    setActiveItem(item);
  };

  // Elementy menu nawigacyjnego
  const menuItems = [
    { text: 'Konfiguracja', icon: <TuneIcon />, path: '/settings', id: 'konfiguracja' },
    { text: 'Plan klas', icon: <ClassIcon />, path: '/plan-editor', id: 'plan-klas' },
    { text: 'Plan nauczycieli', icon: <PersonIcon />, path: '/plan-editor?view=teachers', id: 'plan-nauczycieli' },
    { text: 'Sale lekcyjne', icon: <MeetingRoomIcon />, path: '/rooms', id: 'sale' },
    { text: 'Asystent AI', icon: <SmartToyIcon />, path: '/ai-assistant', id: 'asystent' },
    { text: 'Statystyki', icon: <BarChartIcon />, path: '/analytics', id: 'statystyki' },
    { text: 'Ustawienia', icon: <SettingsIcon />, path: '/settings', id: 'ustawienia' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Pasek aplikacji */}
      <StyledAppBar position="absolute" open={open}>
        <StyledToolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RocketLaunchIcon sx={{ mr: 1 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              Inteligentny Plan Lekcji
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="inherit" sx={{ mr: 2 }}>
              Zaawansowane funkcje
            </Typography>
            <Tooltip title="Pomoc">
              <IconButton color="inherit">
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Powiadomienia">
              <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Profil">
              <IconButton
                color="inherit"
                onClick={handleUserMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#e0f2f1' }}>
                  <AccountCircleIcon sx={{ color: '#00796b' }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      {/* Menu użytkownika */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>Mój profil</MenuItem>
        <MenuItem onClick={() => navigate('/account')}>Ustawienia konta</MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/login')}>Wyloguj</MenuItem>
      </Menu>

      {/* Menu powiadomień */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        onClick={handleNotificationMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: { width: 320, maxHeight: 400, overflow: 'auto' },
        }}
      >
        <MenuItem>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" color="primary">Nowy plan lekcji</Typography>
            <Typography variant="body2" color="text.secondary">
              Wygenerowano nowy plan lekcji dla klasy 2A
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              2 minuty temu
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" color="error">Konflikt w planie</Typography>
            <Typography variant="body2" color="text.secondary">
              Wykryto nakładające się zajęcia w sali 103
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              15 minut temu
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" color="success.main">Zastępstwo przydzielone</Typography>
            <Typography variant="body2" color="text.secondary">
              mgr Jan Nowak zastąpi mgr Annę Kowalską w dniu 15.04
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              1 godzina temu
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button color="primary">Zobacz wszystkie powiadomienia</Button>
          </Box>
        </MenuItem>
      </Menu>

      {/* Szuflada nawigacyjna */}
      <StyledDrawer variant="permanent" open={open}>
        <StyledToolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </StyledToolbar>
        <Divider />
        <List component="nav">
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => handleNavigation(item.path, item.id)}
              sx={{
                backgroundColor: activeItem === item.id ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(63, 81, 181, 0.12)',
                },
                borderLeft: activeItem === item.id ? '4px solid #3f51b5' : '4px solid transparent',
                pl: activeItem === item.id ? 2 : 3,
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeItem === item.id ? '#3f51b5' : 'rgba(0, 0, 0, 0.54)',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontWeight: activeItem === item.id ? 'bold' : 'normal',
                  color: activeItem === item.id ? '#3f51b5' : 'inherit',
                }}
              />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      {/* Główna zawartość */}
      <Box
        component="main"
        sx={{
          backgroundColor: '#f0f2f5',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <StyledToolbar />
        <StyledMainContainer maxWidth="xl">
          <Routes>
            <Route path="/" element={<PlanEditor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/plan-editor" element={<PlanEditor />} />
            <Route path="/analytics" element={<PlanAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StyledMainContainer>
        
        {/* Stopka */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: 'auto',
            backgroundColor: '#fff',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            Inteligentny Plan Lekcji © {new Date().getFullYear()} | Wersja 1.0.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
