import api from './api';

const USER_PREFERENCE_URL = '/user-preferences';

const UserPreferenceService = {
  // Pobieranie wszystkich preferencji użytkowników
  getAllUserPreferences: async () => {
    try {
      const response = await api.get(USER_PREFERENCE_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania preferencji użytkowników:', error);
      throw error;
    }
  },

  // Pobieranie preferencji użytkownika po ID
  getUserPreferenceById: async (id) => {
    try {
      const response = await api.get(`${USER_PREFERENCE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania preferencji użytkownika o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie preferencji według użytkownika
  getUserPreferencesByUser: async (userId) => {
    try {
      const response = await api.get(`${USER_PREFERENCE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania preferencji użytkownika ${userId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej preferencji użytkownika
  createUserPreference: async (preferenceData) => {
    try {
      const response = await api.post(USER_PREFERENCE_URL, preferenceData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia preferencji użytkownika:', error);
      throw error;
    }
  },

  // Aktualizacja preferencji użytkownika
  updateUserPreference: async (id, preferenceData) => {
    try {
      const response = await api.put(`${USER_PREFERENCE_URL}/${id}`, preferenceData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji preferencji użytkownika o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie preferencji użytkownika
  deleteUserPreference: async (id) => {
    try {
      const response = await api.delete(`${USER_PREFERENCE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania preferencji użytkownika o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie preferencji aktualnego użytkownika
  getCurrentUserPreferences: async () => {
    try {
      const response = await api.get(`${USER_PREFERENCE_URL}/current`);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania preferencji aktualnego użytkownika:', error);
      throw error;
    }
  },

  // Aktualizacja preferencji aktualnego użytkownika
  updateCurrentUserPreferences: async (preferenceData) => {
    try {
      const response = await api.put(`${USER_PREFERENCE_URL}/current`, preferenceData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas aktualizacji preferencji aktualnego użytkownika:', error);
      throw error;
    }
  }
};

export default UserPreferenceService;
