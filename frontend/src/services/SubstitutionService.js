import api from './api';

const SUBSTITUTION_URL = '/substitutions';

const SubstitutionService = {
  // Pobieranie wszystkich zastępstw
  getAllSubstitutions: async () => {
    try {
      const response = await api.get(SUBSTITUTION_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania zastępstw:', error);
      throw error;
    }
  },

  // Pobieranie zastępstwa po ID
  getSubstitutionById: async (id) => {
    try {
      const response = await api.get(`${SUBSTITUTION_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania zastępstwa o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie zastępstw według nauczyciela
  getSubstitutionsByTeacher: async (teacherId) => {
    try {
      const response = await api.get(`${SUBSTITUTION_URL}/teacher/${teacherId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania zastępstw nauczyciela ${teacherId}:`, error);
      throw error;
    }
  },

  // Pobieranie zastępstw według daty
  getSubstitutionsByDate: async (date) => {
    try {
      const response = await api.get(`${SUBSTITUTION_URL}/date/${date}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania zastępstw z dnia ${date}:`, error);
      throw error;
    }
  },

  // Pobieranie zastępstw według klasy
  getSubstitutionsByClass: async (classId) => {
    try {
      const response = await api.get(`${SUBSTITUTION_URL}/class/${classId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania zastępstw klasy ${classId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego zastępstwa
  createSubstitution: async (substitutionData) => {
    try {
      const response = await api.post(SUBSTITUTION_URL, substitutionData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia zastępstwa:', error);
      throw error;
    }
  },

  // Aktualizacja zastępstwa
  updateSubstitution: async (id, substitutionData) => {
    try {
      const response = await api.put(`${SUBSTITUTION_URL}/${id}`, substitutionData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji zastępstwa o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie zastępstwa
  deleteSubstitution: async (id) => {
    try {
      const response = await api.delete(`${SUBSTITUTION_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania zastępstwa o ID ${id}:`, error);
      throw error;
    }
  },

  // Automatyczne generowanie propozycji zastępstw
  generateSubstitutionProposals: async (lessonId) => {
    try {
      const response = await api.get(`${SUBSTITUTION_URL}/generate-proposals/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas generowania propozycji zastępstw dla lekcji ${lessonId}:`, error);
      throw error;
    }
  }
};

export default SubstitutionService;
