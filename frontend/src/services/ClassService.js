import api from './api';

const CLASS_URL = '/classes';

const ClassService = {
  // Pobieranie wszystkich klas
  getAllClasses: async () => {
    try {
      const response = await api.get(CLASS_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania klas:', error);
      throw error;
    }
  },

  // Pobieranie klasy po ID
  getClassById: async (id) => {
    try {
      const response = await api.get(`${CLASS_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania klasy o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie klas według szkoły
  getClassesBySchool: async (schoolId) => {
    try {
      const response = await api.get(`${CLASS_URL}/school/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania klas szkoły ${schoolId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej klasy
  createClass: async (classData) => {
    try {
      const response = await api.post(CLASS_URL, classData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia klasy:', error);
      throw error;
    }
  },

  // Aktualizacja klasy
  updateClass: async (id, classData) => {
    try {
      const response = await api.put(`${CLASS_URL}/${id}`, classData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji klasy o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie klasy
  deleteClass: async (id) => {
    try {
      const response = await api.delete(`${CLASS_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania klasy o ID ${id}:`, error);
      throw error;
    }
  }
};

export default ClassService;
