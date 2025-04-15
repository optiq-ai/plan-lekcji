import api from './api';

const LESSON_URL = '/lessons';

const LessonService = {
  // Pobieranie wszystkich lekcji
  getAllLessons: async () => {
    try {
      const response = await api.get(LESSON_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania lekcji:', error);
      throw error;
    }
  },

  // Pobieranie lekcji po ID
  getLessonById: async (id) => {
    try {
      const response = await api.get(`${LESSON_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania lekcji o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie lekcji według planu lekcji
  getLessonsByPlan: async (planId) => {
    try {
      const response = await api.get(`${LESSON_URL}/plan/${planId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania lekcji planu ${planId}:`, error);
      throw error;
    }
  },

  // Pobieranie lekcji według nauczyciela
  getLessonsByTeacher: async (teacherId) => {
    try {
      const response = await api.get(`${LESSON_URL}/teacher/${teacherId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania lekcji nauczyciela ${teacherId}:`, error);
      throw error;
    }
  },

  // Pobieranie lekcji według klasy
  getLessonsByClass: async (classId) => {
    try {
      const response = await api.get(`${LESSON_URL}/class/${classId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania lekcji klasy ${classId}:`, error);
      throw error;
    }
  },

  // Pobieranie lekcji według sali
  getLessonsByRoom: async (roomId) => {
    try {
      const response = await api.get(`${LESSON_URL}/room/${roomId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania lekcji w sali ${roomId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej lekcji
  createLesson: async (lessonData) => {
    try {
      const response = await api.post(LESSON_URL, lessonData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia lekcji:', error);
      throw error;
    }
  },

  // Aktualizacja lekcji
  updateLesson: async (id, lessonData) => {
    try {
      const response = await api.put(`${LESSON_URL}/${id}`, lessonData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji lekcji o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie lekcji
  deleteLesson: async (id) => {
    try {
      const response = await api.delete(`${LESSON_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania lekcji o ID ${id}:`, error);
      throw error;
    }
  }
};

export default LessonService;
