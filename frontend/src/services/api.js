import axios from 'axios';

// Konfiguracja bazowa dla axios
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Tworzenie instancji axios z domyślną konfiguracją
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do obsługi błędów
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Obsługa błędów autoryzacji
    if (error.response && error.response.status === 401) {
      // Przekierowanie do strony logowania lub odświeżenie tokenu
      console.error('Błąd autoryzacji:', error);
    }
    
    // Obsługa innych błędów
    console.error('Błąd API:', error);
    return Promise.reject(error);
  }
);

export default api;
