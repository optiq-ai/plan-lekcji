import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Divider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  IconButton, 
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Avatar
} from '@mui/material';
import { 
  CalendarToday, 
  CalendarMonth,
  Event,
  EventAvailable,
  EventBusy,
  Sync,
  CloudSync,
  CloudDone,
  Download, 
  Add,
  Link,
  Delete,
  Refresh,
  Settings,
  Check,
  Close,
  Google,
  Apple,
  Microsoft
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { usePerformance } from '../../context/PerformanceContext';

/**
 * Komponent integracji z kalendarzami zewnętrznymi
 * Umożliwia synchronizację planu lekcji z popularnymi kalendarzami
 */
const CalendarIntegration = () => {
  const theme = useTheme();
  const { shouldEnableFeature } = usePerformance();
  
  const [activeTab, setActiveTab] = useState('connected');
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [autoSync, setAutoSync] = useState(true);
  const [notifyChanges, setNotifyChanges] = useState(true);
  const [syncScope, setSyncScope] = useState('all');
  const [selectedCalendarType, setSelectedCalendarType] = useState('google');
  const [calendarEmail, setCalendarEmail] = useState('');
  const [calendarUrl, setCalendarUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('15.04.2025, 14:30');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState('');
  
  // Symulacja połączonych kalendarzy
  const [connectedCalendars, setConnectedCalendars] = useState([
    { 
      id: 'cal1', 
      name: 'Google Calendar (Praca)', 
      type: 'google', 
      email: 'jan.kowalski@gmail.com',
      lastSync: '15.04.2025, 14:30',
      status: 'synced'
    },
    { 
      id: 'cal2', 
      name: 'Outlook (Szkoła)', 
      type: 'outlook', 
      email: 'szkola@outlook.com',
      lastSync: '14.04.2025, 09:15',
      status: 'synced'
    },
    { 
      id: 'cal3', 
      name: 'Apple Calendar', 
      type: 'apple', 
      email: 'jan.kowalski@icloud.com',
      lastSync: '10.04.2025, 18:45',
      status: 'error'
    }
  ]);
  
  // Obsługa zmiany zakładki
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Obsługa zmiany częstotliwości synchronizacji
  const handleSyncFrequencyChange = (event) => {
    setSyncFrequency(event.target.value);
  };
  
  // Obsługa zmiany automatycznej synchronizacji
  const handleAutoSyncChange = (event) => {
    setAutoSync(event.target.checked);
  };
  
  // Obsługa zmiany powiadomień o zmianach
  const handleNotifyChangesChange = (event) => {
    setNotifyChanges(event.target.checked);
  };
  
  // Obsługa zmiany zakresu synchronizacji
  const handleSyncScopeChange = (event) => {
    setSyncScope(event.target.value);
  };
  
  // Obsługa zmiany typu kalendarza
  const handleCalendarTypeChange = (event) => {
    setSelectedCalendarType(event.target.value);
  };
  
  // Obsługa zmiany adresu email kalendarza
  const handleCalendarEmailChange = (event) => {
    setCalendarEmail(event.target.value);
  };
  
  // Obsługa zmiany URL kalendarza
  const handleCalendarUrlChange = (event) => {
    setCalendarUrl(event.target.value);
  };
  
  // Obsługa otwarcia dialogu dodawania kalendarza
  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };
  
  // Obsługa zamknięcia dialogu dodawania kalendarza
  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    // Resetowanie pól formularza
    setSelectedCalendarType('google');
    setCalendarEmail('');
    setCalendarUrl('');
  };
  
  // Obsługa dodawania nowego kalendarza
  const handleAddCalendar = () => {
    // Symulacja dodawania nowego kalendarza
    const newCalendar = {
      id: `cal${connectedCalendars.length + 1}`,
      name: `${selectedCalendarType === 'google' ? 'Google Calendar' : 
             selectedCalendarType === 'outlook' ? 'Outlook' : 
             selectedCalendarType === 'apple' ? 'Apple Calendar' : 'Inny kalendarz'}`,
      type: selectedCalendarType,
      email: calendarEmail,
      lastSync: 'Nigdy',
      status: 'pending'
    };
    
    setConnectedCalendars([...connectedCalendars, newCalendar]);
    handleCloseAddDialog();
    
    // Symulacja automatycznej synchronizacji po dodaniu
    setTimeout(() => {
      handleSyncCalendar(newCalendar.id);
    }, 1000);
  };
  
  // Obsługa usuwania kalendarza
  const handleRemoveCalendar = (calendarId) => {
    setConnectedCalendars(connectedCalendars.filter(cal => cal.id !== calendarId));
  };
  
  // Obsługa otwarcia dialogu synchronizacji
  const handleOpenSyncDialog = () => {
    setSyncDialogOpen(true);
    setSyncProgress(0);
    setSyncStatus('Przygotowanie do synchronizacji...');
    
    // Symulacja procesu synchronizacji
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSyncProgress(progress);
      
      if (progress === 30) {
        setSyncStatus('Pobieranie danych z kalendarzy...');
      } else if (progress === 60) {
        setSyncStatus('Aktualizacja wydarzeń...');
      } else if (progress === 90) {
        setSyncStatus('Finalizowanie synchronizacji...');
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setSyncStatus('Synchronizacja zakończona!');
        setLastSyncTime(new Date().toLocaleString('pl-PL', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }));
        
        // Aktualizacja statusu kalendarzy
        const updatedCalendars = connectedCalendars.map(cal => ({
          ...cal,
          lastSync: new Date().toLocaleString('pl-PL', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: Math.random() > 0.1 ? 'synced' : 'error' // 10% szans na błąd dla symulacji
        }));
        setConnectedCalendars(updatedCalendars);
        
        // Zamknięcie dialogu po 2 sekundach
        setTimeout(() => {
          setSyncDialogOpen(false);
        }, 2000);
      }
    }, 500);
  };
  
  // Obsługa zamknięcia dialogu synchronizacji
  const handleCloseSyncDialog = () => {
    setSyncDialogOpen(false);
  };
  
  // Obsługa synchronizacji pojedynczego kalendarza
  const handleSyncCalendar = (calendarId) => {
    setIsSyncing(true);
    
    // Symulacja synchronizacji
    setTimeout(() => {
      const updatedCalendars = connectedCalendars.map(cal => 
        cal.id === calendarId ? {
          ...cal,
          lastSync: new Date().toLocaleString('pl-PL', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: Math.random() > 0.1 ? 'synced' : 'error' // 10% szans na błąd dla symulacji
        } : cal
      );
      
      setConnectedCalendars(updatedCalendars);
      setIsSyncing(false);
    }, 2000);
  };
  
  // Renderowanie ikony typu kalendarza
  const renderCalendarTypeIcon = (type) => {
    switch (type) {
      case 'google':
        return <Google />;
      case 'outlook':
        return <Microsoft />;
      case 'apple':
        return <Apple />;
      default:
        return <CalendarToday />;
    }
  };
  
  // Renderowanie statusu kalendarza
  const renderCalendarStatus = (status) => {
    switch (status) {
      case 'synced':
        return (
          <Tooltip title="Zsynchronizowano">
            <CloudDone color="success" />
          </Tooltip>
        );
      case 'pending':
        return (
          <Tooltip title="Oczekuje na synchronizację">
            <CloudSync color="primary" />
          </Tooltip>
        );
      case 'error':
        return (
          <Tooltip title="Błąd synchronizacji">
            <EventBusy color="error" />
          </Tooltip>
        );
      default:
        return (
          <Tooltip title="Status nieznany">
            <CalendarToday color="disabled" />
          </Tooltip>
        );
    }
  };

  return (
    <Box sx={{ p: 3 }} className="grid-background">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonth sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Integracja z kalendarzami</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Sync />}
            onClick={handleOpenSyncDialog}
            sx={{ mr: 2 }}
            className="robot-button"
            disabled={isSyncing || connectedCalendars.length === 0}
          >
            Synchronizuj wszystkie
          </Button>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleOpenAddDialog}
          >
            Dodaj kalendarz
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className="hologram-card" sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
              <Button
                sx={{
                  px: 3,
                  py: 2,
                  borderBottom: activeTab === 'connected' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 0,
                  color: activeTab === 'connected' ? theme.palette.primary.main : 'inherit'
                }}
                onClick={() => handleTabChange('connected')}
              >
                Połączone kalendarze
              </Button>
              <Button
                sx={{
                  px: 3,
                  py: 2,
                  borderBottom: activeTab === 'settings' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 0,
                  color: activeTab === 'settings' ? theme.palette.primary.main : 'inherit'
                }}
                onClick={() => handleTabChange('settings')}
              >
                Ustawienia synchronizacji
              </Button>
            </Box>
            
            <CardContent>
              {activeTab === 'connected' && (
                <>
                  {connectedCalendars.length > 0 ? (
                    <List>
                      {connectedCalendars.map((calendar) => (
                        <ListItem
                          key={calendar.id}
                          sx={{
                            mb: 1,
                            borderRadius: 2,
                            border: '1px solid rgba(77, 171, 245, 0.1)',
                            backgroundColor: 'rgba(77, 171, 245, 0.05)',
                            '&:hover': {
                              backgroundColor: 'rgba(77, 171, 245, 0.1)',
                            }
                          }}
                        >
                          <ListItemIcon>
                            <Avatar
                              sx={{
                                bgcolor: calendar.type === 'google' ? '#DB4437' :
                                         calendar.type === 'outlook' ? '#0078D4' :
                                         calendar.type === 'apple' ? '#999999' : theme.palette.primary.main
                              }}
                            >
                              {renderCalendarTypeIcon(calendar.type)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={calendar.name}
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="textSecondary">
                                  {calendar.email}
                                </Typography>
                                <br />
                                <Typography component="span" variant="caption" color="textSecondary">
                                  Ostatnia synchronizacja: {calendar.lastSync}
                                </Typography>
                              </>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {renderCalendarStatus(calendar.status)}
                              <Tooltip title="Synchronizuj">
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleSyncCalendar(calendar.id)}
                                  disabled={isSyncing}
                                  sx={{ ml: 1 }}
                                >
                                  <Refresh />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Usuń">
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleRemoveCalendar(calendar.id)}
                                  sx={{ ml: 1 }}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      backgroundColor: 'rgba(77, 171, 245, 0.05)',
                      borderRadius: 2
                    }}>
                      <CalendarToday sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Brak połączonych kalendarzy
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Dodaj swój pierwszy kalendarz, aby rozpocząć synchronizację planu lekcji.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleOpenAddDialog}
                      >
                        Dodaj kalendarz
                      </Button>
                    </Box>
                  )}
                </>
              )}
              
              {activeTab === 'settings' && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel id="sync-frequency-label">Częstotliwość synchronizacji</InputLabel>
                      <Select
                        labelId="sync-frequency-label"
                        value={syncFrequency}
                        label="Częstotliwość synchronizacji"
                        onChange={handleSyncFrequencyChange}
                      >
                        <MenuItem value="hourly">Co godzinę</MenuItem>
                        <MenuItem value="daily">Raz dziennie</MenuItem>
                        <MenuItem value="weekly">Raz w tygodniu</MenuItem>
                        <MenuItem value="manual">Tylko ręcznie</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel id="sync-scope-label">Zakres synchronizacji</InputLabel>
                      <Select
                        labelId="sync-scope-label"
                        value={syncScope}
                        label="Zakres synchronizacji"
                        onChange={handleSyncScopeChange}
                      >
                        <MenuItem value="all">Wszystkie wydarzenia</MenuItem>
                        <MenuItem value="future">Tylko przyszłe wydarzenia</MenuItem>
                        <MenuItem value="month">Bieżący miesiąc</MenuItem>
                        <MenuItem value="week">Bieżący tydzień</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={autoSync} 
                          onChange={handleAutoSyncChange}
                          color="primary"
                        />
                      }
                      label="Automatyczna synchronizacja"
                      sx={{ mb: 2, width: '100%' }}
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifyChanges} 
                          onChange={handleNotifyChangesChange}
                          color="primary"
                        />
                      }
                      label="Powiadomienia o zmianach w planie"
                      sx={{ mb: 2, width: '100%' }}
                    />
                    
                    <Box sx={{ 
                      p: 2, 
                      mt: 2,
                      borderRadius: 2,
                      backgroundColor: 'rgba(77, 171, 245, 0.05)',
                      border: '1px solid rgba(77, 171, 245, 0.1)'
                    }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Ostatnia synchronizacja
                      </Typography>
                      <Typography variant="body2">
                        {lastSyncTime}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Settings />}
                        onClick={() => {
                          // Symulacja zapisywania ustawień
                          console.log('Zapisano ustawienia synchronizacji');
                        }}
                      >
                        Zapisz ustawienia
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Obsługiwane kalendarze
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#DB4437' }}>
                      <Google />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Google Calendar" 
                    secondary="Synchronizacja dwukierunkowa" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#0078D4' }}>
                      <Microsoft />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Microsoft Outlook" 
                    secondary="Synchronizacja dwukierunkowa" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#999999' }}>
                      <Apple />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Apple Calendar" 
                    secondary="Synchronizacja dwukierunkowa" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar>
                      <Event />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Inne kalendarze iCal" 
                    secondary="Tylko eksport (jednokierunkowa)" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Wskazówki
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" paragraph>
                • Synchronizacja dwukierunkowa oznacza, że zmiany w planie lekcji będą widoczne w kalendarzu i odwrotnie.
              </Typography>
              <Typography variant="body2" paragraph>
                • Aby uniknąć konfliktów, zalecamy ustawienie jednego kalendarza jako głównego.
              </Typography>
              <Typography variant="body2" paragraph>
                • Możesz wybrać, które wydarzenia z planu lekcji mają być synchronizowane.
              </Typography>
              <Typography variant="body2">
                • W przypadku problemów z synchronizacją, spróbuj usunąć i ponownie dodać kalendarz.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Dialog dodawania kalendarza */}
      <Dialog
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Dodaj nowy kalendarz
            </Typography>
            <IconButton onClick={handleCloseAddDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="calendar-type-label">Typ kalendarza</InputLabel>
            <Select
              labelId="calendar-type-label"
              value={selectedCalendarType}
              label="Typ kalendarza"
              onChange={handleCalendarTypeChange}
            >
              <MenuItem value="google">Google Calendar</MenuItem>
              <MenuItem value="outlook">Microsoft Outlook</MenuItem>
              <MenuItem value="apple">Apple Calendar</MenuItem>
              <MenuItem value="other">Inny kalendarz (iCal)</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Adres email"
            value={calendarEmail}
            onChange={handleCalendarEmailChange}
            fullWidth
            sx={{ mb: 3 }}
          />
          
          {selectedCalendarType === 'other' && (
            <TextField
              label="URL kalendarza (iCal)"
              value={calendarUrl}
              onChange={handleCalendarUrlChange}
              fullWidth
              sx={{ mb: 3 }}
              placeholder="https://example.com/calendar.ics"
            />
          )}
          
          <Box sx={{ 
            p: 2, 
            borderRadius: 2,
            backgroundColor: 'rgba(77, 171, 245, 0.05)',
            border: '1px solid rgba(77, 171, 245, 0.1)'
          }}>
            <Typography variant="body2" color="textSecondary">
              {selectedCalendarType === 'google' && 
                'Po dodaniu kalendarza, zostaniesz przekierowany do strony logowania Google, aby autoryzować dostęp do kalendarza.'}
              {selectedCalendarType === 'outlook' && 
                'Po dodaniu kalendarza, zostaniesz przekierowany do strony logowania Microsoft, aby autoryzować dostęp do kalendarza.'}
              {selectedCalendarType === 'apple' && 
                'Po dodaniu kalendarza, zostaniesz przekierowany do strony logowania Apple, aby autoryzować dostęp do kalendarza.'}
              {selectedCalendarType === 'other' && 
                'Podaj publiczny adres URL kalendarza w formacie iCal (.ics). Synchronizacja będzie jednokierunkowa (tylko eksport).'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Anuluj</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddCalendar}
            disabled={!calendarEmail || (selectedCalendarType === 'other' && !calendarUrl)}
          >
            Dodaj kalendarz
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog synchronizacji */}
      <Dialog
        open={syncDialogOpen}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            Synchronizacja kalendarzy
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CircularProgress 
              variant="determinate" 
              value={syncProgress} 
              size={80} 
              thickness={4}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              {syncProgress}%
            </Typography>
            <Typography variant="body1">
              {syncStatus}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseSyncDialog}
            disabled={syncProgress < 100}
          >
            {syncProgress < 100 ? 'Synchronizacja w toku...' : 'Zamknij'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarIntegration;
