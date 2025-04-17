import axios from 'axios';

// Konfiguracja bazowa dla axios
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Tworzenie instancji axios z domyślną konfiguracją
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Dodanie timeout dla zapytań
  timeout: 10000,
});

// Interceptor do obsługi błędów
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Obsługa błędów serwera (500)
    if (error.response && error.response.status >= 500) {
      console.error('Błąd serwera:', error);
      return Promise.reject({
        ...error,
        isServerError: true,
        userMessage: 'Wystąpił błąd serwera. Spróbuj ponownie później.'
      });
    }
    
    // Obsługa błędów sieci (np. brak połączenia)
    if (error.message === 'Network Error') {
      console.error('Błąd sieci:', error);
      return Promise.reject({
        ...error,
        isNetworkError: true,
        userMessage: 'Brak połączenia z serwerem. Sprawdź swoje połączenie internetowe.'
      });
    }
    
    // Obsługa timeout
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout zapytania:', error);
      return Promise.reject({
        ...error,
        isTimeoutError: true,
        userMessage: 'Serwer nie odpowiada. Spróbuj ponownie później.'
      });
    }
    
    // Obsługa innych błędów
    console.error('Błąd API:', error);
    return Promise.reject({
      ...error,
      userMessage: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.'
    });
  }
);

export default api;
