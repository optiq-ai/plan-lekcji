import api from './api';

const EVENT_URL = '/events';

const EventService = {
  // Pobieranie wszystkich wydarzeń
  getAllEvents: async () => {
    try {
      const response = await api.get(EVENT_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania wydarzeń:', error);
      throw error;
    }
  },

  // Pobieranie wydarzenia po ID
  getEventById: async (id) => {
    try {
      const response = await api.get(`${EVENT_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania wydarzenia o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie wydarzeń według szkoły
  getEventsBySchool: async (schoolId) => {
    try {
      const response = await api.get(`${EVENT_URL}/school/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania wydarzeń szkoły ${schoolId}:`, error);
      throw error;
    }
  },

  // Pobieranie wydarzeń według daty
  getEventsByDate: async (date) => {
    try {
      const response = await api.get(`${EVENT_URL}/date/${date}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania wydarzeń z dnia ${date}:`, error);
      throw error;
    }
  },

  // Pobieranie wydarzeń według zakresu dat
  getEventsByDateRange: async (startDate, endDate) => {
    try {
      const response = await api.get(`${EVENT_URL}/range/${startDate}/${endDate}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania wydarzeń z zakresu ${startDate} - ${endDate}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego wydarzenia
  createEvent: async (eventData) => {
    try {
      const response = await api.post(EVENT_URL, eventData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia wydarzenia:', error);
      throw error;
    }
  },

  // Aktualizacja wydarzenia
  updateEvent: async (id, eventData) => {
    try {
      const response = await api.put(`${EVENT_URL}/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji wydarzenia o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie wydarzenia
  deleteEvent: async (id) => {
    try {
      const response = await api.delete(`${EVENT_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania wydarzenia o ID ${id}:`, error);
      throw error;
    }
  }
};

export default EventService;
