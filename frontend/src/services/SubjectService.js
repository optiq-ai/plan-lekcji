import api from './api';

const SUBJECT_URL = '/subjects';

const SubjectService = {
  // Pobieranie wszystkich przedmiotów
  getAllSubjects: async () => {
    try {
      const response = await api.get(SUBJECT_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania przedmiotów:', error);
      throw error;
    }
  },

  // Pobieranie przedmiotu po ID
  getSubjectById: async (id) => {
    try {
      const response = await api.get(`${SUBJECT_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania przedmiotu o ID ${id}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego przedmiotu
  createSubject: async (subjectData) => {
    try {
      const response = await api.post(SUBJECT_URL, subjectData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia przedmiotu:', error);
      throw error;
    }
  },

  // Aktualizacja przedmiotu
  updateSubject: async (id, subjectData) => {
    try {
      const response = await api.put(`${SUBJECT_URL}/${id}`, subjectData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji przedmiotu o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie przedmiotu
  deleteSubject: async (id) => {
    try {
      const response = await api.delete(`${SUBJECT_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania przedmiotu o ID ${id}:`, error);
      throw error;
    }
  }
};

export default SubjectService;
