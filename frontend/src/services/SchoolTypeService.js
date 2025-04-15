import api from './api';

const SCHOOL_TYPE_URL = '/school-types';

const SchoolTypeService = {
  // Pobieranie wszystkich typów szkół
  getAllSchoolTypes: async () => {
    try {
      const response = await api.get(SCHOOL_TYPE_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania typów szkół:', error);
      throw error;
    }
  },

  // Pobieranie typu szkoły po ID
  getSchoolTypeById: async (id) => {
    try {
      const response = await api.get(`${SCHOOL_TYPE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania typu szkoły o ID ${id}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego typu szkoły
  createSchoolType: async (schoolTypeData) => {
    try {
      const response = await api.post(SCHOOL_TYPE_URL, schoolTypeData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia typu szkoły:', error);
      throw error;
    }
  },

  // Aktualizacja typu szkoły
  updateSchoolType: async (id, schoolTypeData) => {
    try {
      const response = await api.put(`${SCHOOL_TYPE_URL}/${id}`, schoolTypeData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji typu szkoły o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie typu szkoły
  deleteSchoolType: async (id) => {
    try {
      const response = await api.delete(`${SCHOOL_TYPE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania typu szkoły o ID ${id}:`, error);
      throw error;
    }
  }
};

export default SchoolTypeService;
