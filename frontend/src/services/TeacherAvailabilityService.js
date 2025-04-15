import api from './api';

const TEACHER_AVAILABILITY_URL = '/teacher-availabilities';

const TeacherAvailabilityService = {
  // Pobieranie wszystkich dostępności nauczycieli
  getAllTeacherAvailabilities: async () => {
    try {
      const response = await api.get(TEACHER_AVAILABILITY_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania dostępności nauczycieli:', error);
      throw error;
    }
  },

  // Pobieranie dostępności nauczyciela po ID
  getTeacherAvailabilityById: async (id) => {
    try {
      const response = await api.get(`${TEACHER_AVAILABILITY_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania dostępności nauczyciela o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie dostępności według nauczyciela
  getTeacherAvailabilitiesByTeacher: async (teacherId) => {
    try {
      const response = await api.get(`${TEACHER_AVAILABILITY_URL}/teacher/${teacherId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania dostępności nauczyciela ${teacherId}:`, error);
      throw error;
    }
  },

  // Pobieranie dostępności według dnia tygodnia
  getTeacherAvailabilitiesByDayOfWeek: async (dayOfWeek) => {
    try {
      const response = await api.get(`${TEACHER_AVAILABILITY_URL}/day/${dayOfWeek}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania dostępności nauczycieli w dniu ${dayOfWeek}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej dostępności nauczyciela
  createTeacherAvailability: async (availabilityData) => {
    try {
      const response = await api.post(TEACHER_AVAILABILITY_URL, availabilityData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia dostępności nauczyciela:', error);
      throw error;
    }
  },

  // Aktualizacja dostępności nauczyciela
  updateTeacherAvailability: async (id, availabilityData) => {
    try {
      const response = await api.put(`${TEACHER_AVAILABILITY_URL}/${id}`, availabilityData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji dostępności nauczyciela o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie dostępności nauczyciela
  deleteTeacherAvailability: async (id) => {
    try {
      const response = await api.delete(`${TEACHER_AVAILABILITY_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania dostępności nauczyciela o ID ${id}:`, error);
      throw error;
    }
  },

  // Masowe ustawianie dostępności nauczyciela
  setBulkTeacherAvailability: async (teacherId, availabilityData) => {
    try {
      const response = await api.post(`${TEACHER_AVAILABILITY_URL}/bulk/${teacherId}`, availabilityData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas masowego ustawiania dostępności nauczyciela ${teacherId}:`, error);
      throw error;
    }
  }
};

export default TeacherAvailabilityService;
