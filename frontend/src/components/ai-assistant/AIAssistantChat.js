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
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as AIIcon,
  Person as PersonIcon,
  Lightbulb as LightbulbIcon,
  Settings as SettingsIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import LessonPlanService from '../../services/LessonPlanService';

const AIAssistantChat = ({ planId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Przykładowe sugestie asystenta AI
  const defaultSuggestions = [
    'Zoptymalizuj plan pod kątem komfortu uczniów',
    'Zrównoważ obciążenie nauczycieli',
    'Popraw wykorzystanie sal lekcyjnych',
    'Znajdź i rozwiąż konflikty w planie',
    'Zaproponuj lepszy rozkład przedmiotów'
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!planId) return;
      
      try {
        setLoading(true);
        
        // Pobierz dane planu lekcji
        const planResponse = await LessonPlanService.getLessonPlanById(planId);
        setPlanData(planResponse);
        
        // Inicjalizacja wiadomości powitalnej od asystenta
        setMessages([
          {
            id: 1,
            sender: 'ai',
            text: `Witaj! Jestem Twoim asystentem AI do planowania lekcji. Jak mogę pomóc z planem "${planResponse.name}"?`,
            timestamp: new Date()
          }
        ]);
        
        // Ustaw domyślne sugestie
        setSuggestions(defaultSuggestions);
        
        setLoading(false);
      } catch (err) {
        console.error('Błąd podczas pobierania danych planu:', err);
        setError('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [planId]);

  // Funkcja do wysyłania wiadomości
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Dodaj wiadomość użytkownika do listy
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    
    // Symulacja odpowiedzi asystenta AI (w rzeczywistej aplikacji byłoby to zapytanie do API)
    setLoading(true);
    
    setTimeout(() => {
      // Przykładowe odpowiedzi asystenta w zależności od zapytania
      let aiResponse = '';
      let newSuggestions = [...defaultSuggestions];
      
      if (inputMessage.toLowerCase().includes('optymalizuj') || inputMessage.toLowerCase().includes('zoptymalizuj')) {
        aiResponse = 'Rozpoczynam optymalizację planu lekcji. Analizuję obciążenie nauczycieli, rozkład przedmiotów i wykorzystanie sal...';
        newSuggestions = [
          'Pokaż szczegóły optymalizacji',
          'Zastosuj zmiany w planie',
          'Porównaj z obecnym planem',
          'Zapisz jako nowy wariant planu'
        ];
      } else if (inputMessage.toLowerCase().includes('konflikt') || inputMessage.toLowerCase().includes('problem')) {
        aiResponse = 'Wykryłem 3 konflikty w planie lekcji: nakładające się lekcje dla nauczyciela Jan Kowalski, zbyt duże obciążenie klasy 3A w środy, oraz nieoptymalne wykorzystanie sali 102.';
        newSuggestions = [
          'Rozwiąż wszystkie konflikty automatycznie',
          'Pokaż szczegóły konfliktów',
          'Rozwiąż konflikt nauczyciela',
          'Rozwiąż konflikt klasy 3A'
        ];
      } else if (inputMessage.toLowerCase().includes('nauczyciel') || inputMessage.toLowerCase().includes('obciążenie')) {
        aiResponse = 'Analizuję obciążenie nauczycieli. Wykryłem nierównomierne rozłożenie godzin. Nauczyciel Anna Nowak ma 28 godzin tygodniowo, podczas gdy średnia wynosi 22 godziny.';
        newSuggestions = [
          'Zrównoważ obciążenie nauczycieli',
          'Pokaż szczegółową analizę obciążenia',
          'Optymalizuj plan dla Anny Nowak',
          'Porównaj obciążenie wszystkich nauczycieli'
        ];
      } else {
        aiResponse = 'Przeanalizowałem plan lekcji i znalazłem kilka możliwości optymalizacji. Mogę pomóc z równomiernym rozłożeniem przedmiotów, optymalizacją wykorzystania sal lub zrównoważeniem obciążenia nauczycieli.';
      }
      
      const aiMessageResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessageResponse]);
      setSuggestions(newSuggestions);
      setLoading(false);
    }, 1500);
  };

  // Obsługa naciśnięcia Enter w polu tekstowym
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Obsługa kliknięcia sugestii
  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  // Formatowanie daty wiadomości
  const formatMessageTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AIIcon sx={{ mr: 1 }} />
          <Typography variant="h6">
            Asystent AI
            {planData && ` - ${planData.name}`}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: theme.palette.primary.contrastText }}>
          <SettingsIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      {/* Obszar wiadomości */}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 2,
        backgroundColor: theme.palette.grey[50],
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {messages.map((message) => (
          <Box 
            key={message.id}
            sx={{ 
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              {message.sender === 'ai' && (
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <AIIcon />
                </Avatar>
              )}
              
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2,
                  backgroundColor: message.sender === 'user' 
                    ? theme.palette.primary.light 
                    : theme.palette.background.paper,
                  borderRadius: 2,
                  borderTopRightRadius: message.sender === 'user' ? 0 : 2,
                  borderTopLeftRadius: message.sender === 'ai' ? 0 : 2
                }}
              >
                <Typography variant="body1">
                  {message.text}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
                  {formatMessageTime(message.timestamp)}
                </Typography>
              </Paper>
              
              {message.sender === 'user' && (
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  <PersonIcon />
                </Avatar>
              )}
            </Box>
          </Box>
        ))}
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
      
      {/* Sugestie */}
      <Box sx={{ p: 1, backgroundColor: theme.palette.grey[100] }}>
        <Typography variant="caption" color="textSecondary" sx={{ ml: 1, mb: 1, display: 'block' }}>
          Sugestie:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {suggestions.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              size="small"
              icon={<LightbulbIcon />}
              onClick={() => handleSuggestionClick(suggestion)}
              sx={{ 
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText
                }
              }}
            />
          ))}
        </Box>
      </Box>
      
      <Divider />
      
      {/* Pole wprowadzania wiadomości */}
      <Box sx={{ p: 2, backgroundColor: theme.palette.background.paper, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Napisz wiadomość do asystenta AI..."
          size="small"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={sendMessage}
          disabled={!inputMessage.trim() || loading}
        >
          Wyślij
        </Button>
      </Box>
    </Paper>
  );
};

export default AIAssistantChat;
