import api from './api';

const SCHOOL_URL = '/schools';

const SchoolService = {
  // Pobieranie wszystkich szkół
  getAllSchools: async () => {
    try {
      const response = await api.get(SCHOOL_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania szkół:', error);
      throw error;
    }
  },

  // Pobieranie szkoły po ID
  getSchoolById: async (id) => {
    try {
      const response = await api.get(`${SCHOOL_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania szkoły o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie szkół według typu
  getSchoolsByType: async (typeId) => {
    try {
      const response = await api.get(`${SCHOOL_URL}/type/${typeId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania szkół typu ${typeId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej szkoły
  createSchool: async (schoolData) => {
    try {
      const response = await api.post(SCHOOL_URL, schoolData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia szkoły:', error);
      throw error;
    }
  },

  // Aktualizacja szkoły
  updateSchool: async (id, schoolData) => {
    try {
      const response = await api.put(`${SCHOOL_URL}/${id}`, schoolData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji szkoły o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie szkoły
  deleteSchool: async (id) => {
    try {
      const response = await api.delete(`${SCHOOL_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania szkoły o ID ${id}:`, error);
      throw error;
    }
  }
};

export default SchoolService;
