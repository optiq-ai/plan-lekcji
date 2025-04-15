import api from './api';

const USER_URL = '/users';

const UserService = {
  // Pobieranie wszystkich użytkowników
  getAllUsers: async () => {
    try {
      const response = await api.get(USER_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error);
      throw error;
    }
  },

  // Pobieranie użytkownika po ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`${USER_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania użytkownika o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie użytkownika po nazwie użytkownika
  getUserByUsername: async (username) => {
    try {
      const response = await api.get(`${USER_URL}/username/${username}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania użytkownika o nazwie ${username}:`, error);
      throw error;
    }
  },

  // Pobieranie użytkowników według szkoły
  getUsersBySchool: async (schoolId) => {
    try {
      const response = await api.get(`${USER_URL}/school/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania użytkowników szkoły ${schoolId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego użytkownika
  createUser: async (userData) => {
    try {
      const response = await api.post(USER_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia użytkownika:', error);
      throw error;
    }
  },

  // Aktualizacja użytkownika
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`${USER_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji użytkownika o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie użytkownika
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`${USER_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania użytkownika o ID ${id}:`, error);
      throw error;
    }
  },

  // Logowanie użytkownika
  login: async (credentials) => {
    try {
      const response = await api.post(`${USER_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
      throw error;
    }
  },

  // Wylogowanie użytkownika
  logout: async () => {
    try {
      const response = await api.post(`${USER_URL}/logout`);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
      throw error;
    }
  },

  // Pobieranie aktualnego użytkownika
  getCurrentUser: async () => {
    try {
      const response = await api.get(`${USER_URL}/current`);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania aktualnego użytkownika:', error);
      throw error;
    }
  }
};

export default UserService;
