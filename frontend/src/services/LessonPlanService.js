import api from './api';

const LESSON_PLAN_URL = '/lesson-plans';

const LessonPlanService = {
  // Pobieranie wszystkich planów lekcji
  getAllLessonPlans: async () => {
    try {
      const response = await api.get(LESSON_PLAN_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania planów lekcji:', error);
      throw error;
    }
  },

  // Pobieranie planu lekcji po ID
  getLessonPlanById: async (id) => {
    try {
      const response = await api.get(`${LESSON_PLAN_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania planu lekcji o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie planów lekcji według szkoły
  getLessonPlansBySchool: async (schoolId) => {
    try {
      const response = await api.get(`${LESSON_PLAN_URL}/school/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania planów lekcji szkoły ${schoolId}:`, error);
      throw error;
    }
  },

  // Pobieranie planów lekcji według klasy
  getLessonPlansByClass: async (classId) => {
    try {
      const response = await api.get(`${LESSON_PLAN_URL}/class/${classId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania planów lekcji klasy ${classId}:`, error);
      throw error;
    }
  },

  // Pobieranie planów lekcji według nauczyciela
  getLessonPlansByTeacher: async (teacherId) => {
    try {
      const response = await api.get(`${LESSON_PLAN_URL}/teacher/${teacherId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania planów lekcji nauczyciela ${teacherId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego planu lekcji
  createLessonPlan: async (lessonPlanData) => {
    try {
      const response = await api.post(LESSON_PLAN_URL, lessonPlanData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia planu lekcji:', error);
      throw error;
    }
  },

  // Aktualizacja planu lekcji
  updateLessonPlan: async (id, lessonPlanData) => {
    try {
      const response = await api.put(`${LESSON_PLAN_URL}/${id}`, lessonPlanData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji planu lekcji o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie planu lekcji
  deleteLessonPlan: async (id) => {
    try {
      const response = await api.delete(`${LESSON_PLAN_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania planu lekcji o ID ${id}:`, error);
      throw error;
    }
  },

  // Generowanie optymalnego planu lekcji
  generateOptimalPlan: async (configurationId) => {
    try {
      const response = await api.post(`${LESSON_PLAN_URL}/generate/${configurationId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas generowania optymalnego planu lekcji:`, error);
      throw error;
    }
  },

  // Ocena jakości planu lekcji
  evaluatePlan: async (id) => {
    try {
      const response = await api.get(`${LESSON_PLAN_URL}/${id}/evaluate`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas oceny planu lekcji o ID ${id}:`, error);
      throw error;
    }
  }
};

export default LessonPlanService;
