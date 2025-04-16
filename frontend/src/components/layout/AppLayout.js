import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CalendarMonth as CalendarIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  MeetingRoom as RoomIcon,
  Book as BookIcon,
  SwapHoriz as SwapIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Sync as SyncIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { usePerformance } from '../../context/PerformanceContext';

const drawerWidth = 240;

const AppLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { performanceMode } = usePerformance();
  
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const menuItems = [
    { text: 'Pulpit', icon: <DashboardIcon />, path: '/' },
    { text: 'Plany lekcji', icon: <CalendarIcon />, path: '/lesson-plans' },
    { text: 'Nauczyciele', icon: <PeopleIcon />, path: '/teachers' },
    { text: 'Klasy', icon: <SchoolIcon />, path: '/classes' },
    { text: 'Sale', icon: <RoomIcon />, path: '/rooms' },
    { text: 'Przedmioty', icon: <BookIcon />, path: '/subjects' },
    { text: 'Zastępstwa', icon: <SwapIcon />, path: '/substitutions' },
    { text: 'Integracje', icon: <SyncIcon />, path: '/integrations' },
    { text: 'Ustawienia', icon: <SettingsIcon />, path: '/settings' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? drawerWidth : 0}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundImage: 'linear-gradient(90deg, #0a1929 0%, #132f4c 100%)',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.5)',
          borderBottom: '1px solid rgba(77, 171, 245, 0.2)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Inteligentny Plan Lekcji
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {performanceMode && (
              <Tooltip title={`Tryb wydajności: ${
                performanceMode === 'high-performance' ? 'Wysoka wydajność' :
                performanceMode === 'balanced' ? 'Zrównoważony' :
                performanceMode === 'feature-rich' ? 'Bogaty w funkcje' : 'Niestandardowy'
              }`}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mr: 2, 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 1,
                    bgcolor: alpha(
                      performanceMode === 'high-performance' ? theme.palette.warning.main :
                      performanceMode === 'balanced' ? theme.palette.primary.main :
                      performanceMode === 'feature-rich' ? theme.palette.secondary.main : 
                      theme.palette.grey[500],
                      0.2
                    ),
                    border: '1px solid',
                    borderColor: alpha(
                      performanceMode === 'high-performance' ? theme.palette.warning.main :
                      performanceMode === 'balanced' ? theme.palette.primary.main :
                      performanceMode === 'feature-rich' ? theme.palette.secondary.main : 
                      theme.palette.grey[500],
                      0.3
                    ),
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/settings')}
                >
                  <Typography variant="caption" sx={{ fontWeight: 'medium', letterSpacing: 0.5 }}>
                    {performanceMode === 'high-performance' ? 'WYSOKA WYDAJNOŚĆ' :
                     performanceMode === 'balanced' ? 'ZRÓWNOWAŻONY' :
                     performanceMode === 'feature-rich' ? 'PEŁNE FUNKCJE' : 'NIESTANDARDOWY'}
                  </Typography>
                </Box>
              </Tooltip>
            )}

            <Tooltip title="Powiadomienia">
              <IconButton 
                color="inherit" 
                onClick={handleOpenNotificationsMenu}
                sx={{ mr: 1 }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Profil użytkownika">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                <Avatar 
                  alt="Jan Kowalski" 
                  src="/static/images/avatar/1.jpg" 
                  sx={{ 
                    border: '2px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.5)
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
            color: '#e3f2fd',
            borderRight: '1px solid rgba(77, 171, 245, 0.2)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
            <CalendarIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" noWrap component="div">
              Plan Lekcji
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(77, 171, 245, 0.15)',
                    borderLeft: '4px solid #4dabf5',
                    '&:hover': {
                      backgroundColor: 'rgba(77, 171, 245, 0.25)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(77, 171, 245, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'rgba(227, 242, 253, 0.7)' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mt: 'auto' }} />
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Inteligentny Plan Lekcji v1.0
          </Typography>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? drawerWidth : 0}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar /> {/* Spacer to push content below AppBar */}
        <Outlet />
      </Box>

      {/* User Menu */}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        PaperProps={{
          sx: {
            backgroundImage: 'linear-gradient(145deg, rgba(19, 47, 76, 0.95), rgba(10, 25, 41, 0.98))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(77, 171, 245, 0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Box sx={{ px: 2, py: 1, textAlign: 'center' }}>
          <Avatar 
            alt="Jan Kowalski" 
            src="/static/images/avatar/1.jpg" 
            sx={{ 
              width: 56, 
              height: 56, 
              mx: 'auto',
              border: '2px solid',
              borderColor: alpha(theme.palette.primary.main, 0.5)
            }}
          />
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Jan Kowalski
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administrator
          </Typography>
        </Box>
        <Divider sx={{ my: 1, borderColor: 'rgba(77, 171, 245, 0.1)' }} />
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">Mój profil</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">Ustawienia</Typography>
        </MenuItem>
        <Divider sx={{ my: 1, borderColor: 'rgba(77, 171, 245, 0.1)' }} />
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">Wyloguj</Typography>
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-notifications"
        anchorEl={anchorElNotifications}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElNotifications)}
        onClose={handleCloseNotificationsMenu}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            backgroundImage: 'linear-gradient(145deg, rgba(19, 47, 76, 0.95), rgba(10, 25, 41, 0.98))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(77, 171, 245, 0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            Powiadomienia
          </Typography>
          <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
            Oznacz wszystkie jako przeczytane
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(77, 171, 245, 0.1)' }} />
        <MenuItem onClick={handleCloseNotificationsMenu} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Badge color="error" variant="dot">
              <SwapIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Nowe zastępstwo: Matematyka 2B</Typography>
            <Typography variant="caption" color="text.secondary">
              15 minut temu
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleCloseNotificationsMenu} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Badge color="error" variant="dot">
              <CalendarIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Zmiana w planie: Fizyka 3A</Typography>
            <Typography variant="caption" color="text.secondary">
              2 godziny temu
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleCloseNotificationsMenu} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SyncIcon fontSize="small" />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Eksport planu zakończony</Typography>
            <Typography variant="caption" color="text.secondary">
              wczoraj
            </Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(77, 171, 245, 0.1)' }} />
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
            Zobacz wszystkie powiadomienia
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default AppLayout;
