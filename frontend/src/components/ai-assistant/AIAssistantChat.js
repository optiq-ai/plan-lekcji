import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';

/**
 * Komponent czatu z asystentem AI
 * Umożliwia interaktywną komunikację z asystentem AI w celu optymalizacji planu lekcji
 */
const AIAssistantChat = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  // Symulacja początkowego powitania od asystenta
  useEffect(() => {
    const initialMessage = {
      id: 1,
      sender: 'ai',
      text: 'Witaj! Jestem Twoim asystentem AI do planowania lekcji. W czym mogę Ci dzisiaj pomóc?',
      timestamp: new Date().toISOString()
    };
    
    setMessages([initialMessage]);
    
    // Symulacja sugestii
    setSuggestions([
      'Zoptymalizuj plan klasy 1A',
      'Znajdź wolne sale w czwartek',
      'Zaplanuj zastępstwo za nauczyciela matematyki',
      'Wykryj konflikty w planie'
    ]);
  }, []);

  // Automatyczne przewijanie do najnowszej wiadomości
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Obsługa wysyłania wiadomości
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Dodanie wiadomości użytkownika
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Symulacja odpowiedzi asystenta po krótkim opóźnieniu
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage);
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Symulacja generowania odpowiedzi AI
  const generateAIResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseText = '';
    
    if (lowerCaseMessage.includes('optymalizuj') || lowerCaseMessage.includes('zoptymalizuj')) {
      responseText = 'Rozpoczynam optymalizację planu. Analizuję obecny rozkład zajęć, obciążenie nauczycieli i dostępność sal. Na podstawie analizy sugeruję następujące zmiany:\n\n1. Zamiana matematyki z klasy 1A (wtorek, 8:00) z fizyką klasy 2B (środa, 10:45)\n2. Przesunięcie WF klasy 3C z piątku na poniedziałek\n3. Zmiana sali 103 na 107 dla zajęć informatyki w czwartek\n\nCzy chcesz, abym wprowadził te zmiany automatycznie?';
    } else if (lowerCaseMessage.includes('wolne sale') || lowerCaseMessage.includes('dostępne sale')) {
      responseText = 'Sprawdzam dostępność sal na czwartek. Oto wolne sale:\n\n- Sala 103: 8:00-9:40, 13:40-15:20\n- Sala 105: cały dzień\n- Sala 107: 11:50-13:30\n- Sala 110: 8:00-11:30, 15:30-17:10\n\nCzy chcesz zarezerwować którąś z tych sal?';
    } else if (lowerCaseMessage.includes('zastępstwo') || lowerCaseMessage.includes('nieobecność')) {
      responseText = 'Planuję zastępstwo za nauczyciela matematyki. Na podstawie analizy dostępności i kompetencji, proponuję:\n\n- Lekcja 1A (wtorek, 8:00): mgr Janina Kowalczyk\n- Lekcja 2B (środa, 10:45): mgr Adam Nowak\n- Lekcja 3C (piątek, 12:45): przesunięcie na przyszły tydzień\n\nCzy akceptujesz te propozycje?';
    } else if (lowerCaseMessage.includes('konflikt') || lowerCaseMessage.includes('problem')) {
      responseText = 'Wykryłem następujące konflikty w planie:\n\n⚠️ Nauczyciel Jan Kowalski ma przypisane dwie lekcje równocześnie (wtorek, 9:50)\n⚠️ Sala 104 ma zaplanowane dwie różne lekcje (środa, 11:50)\n⚠️ Klasa 2A ma zbyt dużo trudnych przedmiotów pod rząd (czwartek)\n\nCzy chcesz, abym zaproponował rozwiązania tych konfliktów?';
    } else {
      responseText = 'Rozumiem. Aby lepiej pomóc, potrzebuję więcej informacji. Czy chodzi o optymalizację planu, znalezienie wolnych sal, zaplanowanie zastępstwa, czy może wykrycie konfliktów w planie?';
    }
    
    return {
      id: messages.length + 2,
      sender: 'ai',
      text: responseText,
      timestamp: new Date().toISOString()
    };
  };

  // Obsługa kliknięcia sugestii
  const handleSuggestionClick = (suggestion) => {
    setNewMessage(suggestion);
  };

  // Formatowanie daty
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SmartToyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5">Asystent AI</Typography>
        </Box>
        <Box>
          <IconButton size="small" sx={{ mr: 1 }}>
            <HistoryIcon />
          </IconButton>
          <IconButton size="small">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          flexGrow: 1, 
          mb: 2, 
          maxHeight: 'calc(100vh - 250px)', 
          overflowY: 'auto',
          bgcolor: theme.palette.background.default
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            {message.sender === 'ai' && (
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.primary.main,
                  mr: 1
                }}
              >
                <SmartToyIcon />
              </Avatar>
            )}
            
            <Box
              sx={{
                maxWidth: '70%',
                p: 2,
                borderRadius: 2,
                bgcolor: message.sender === 'user' ? theme.palette.primary.main : theme.palette.background.paper,
                color: message.sender === 'user' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                boxShadow: 1
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {message.text}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'right', opacity: 0.7 }}>
                {formatTimestamp(message.timestamp)}
              </Typography>
            </Box>
            
            {message.sender === 'user' && (
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.secondary.main,
                  ml: 1
                }}
              >
                <PersonIcon />
              </Avatar>
            )}
          </Box>
        ))}
        
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 7 }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              Asystent pisze...
            </Typography>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Sugerowane zapytania:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {suggestions.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              icon={<LightbulbIcon />}
              variant="outlined"
              color="primary"
              sx={{ borderRadius: '16px' }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Napisz wiadomość..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ''}
        >
          Wyślij
        </Button>
      </Box>
    </Box>
  );
};

export default AIAssistantChat;
