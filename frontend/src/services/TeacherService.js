import api from './api';

const TEACHER_URL = '/teachers';

const TeacherService = {
  // Pobieranie wszystkich nauczycieli
  getAllTeachers: async () => {
    try {
      const response = await api.get(TEACHER_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania nauczycieli:', error);
      throw error;
    }
  },

  // Pobieranie nauczyciela po ID
  getTeacherById: async (id) => {
    try {
      const response = await api.get(`${TEACHER_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania nauczyciela o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie nauczycieli według przedmiotu
  getTeachersBySubject: async (subjectId) => {
    try {
      const response = await api.get(`${TEACHER_URL}/subject/${subjectId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania nauczycieli przedmiotu ${subjectId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego nauczyciela
  createTeacher: async (teacherData) => {
    try {
      const response = await api.post(TEACHER_URL, teacherData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia nauczyciela:', error);
      throw error;
    }
  },

  // Aktualizacja nauczyciela
  updateTeacher: async (id, teacherData) => {
    try {
      const response = await api.put(`${TEACHER_URL}/${id}`, teacherData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji nauczyciela o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie nauczyciela
  deleteTeacher: async (id) => {
    try {
      const response = await api.delete(`${TEACHER_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania nauczyciela o ID ${id}:`, error);
      throw error;
    }
  }
};

export default TeacherService;
