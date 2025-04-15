import api from './api';

const PLAN_CONFIGURATION_URL = '/plan-configurations';

const PlanConfigurationService = {
  // Pobieranie wszystkich konfiguracji planów
  getAllPlanConfigurations: async () => {
    try {
      const response = await api.get(PLAN_CONFIGURATION_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania konfiguracji planów:', error);
      throw error;
    }
  },

  // Pobieranie konfiguracji planu po ID
  getPlanConfigurationById: async (id) => {
    try {
      const response = await api.get(`${PLAN_CONFIGURATION_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania konfiguracji planu o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie konfiguracji planów według szkoły
  getPlanConfigurationsBySchool: async (schoolId) => {
    try {
      const response = await api.get(`${PLAN_CONFIGURATION_URL}/school/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania konfiguracji planów szkoły ${schoolId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej konfiguracji planu
  createPlanConfiguration: async (configurationData) => {
    try {
      const response = await api.post(PLAN_CONFIGURATION_URL, configurationData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia konfiguracji planu:', error);
      throw error;
    }
  },

  // Aktualizacja konfiguracji planu
  updatePlanConfiguration: async (id, configurationData) => {
    try {
      const response = await api.put(`${PLAN_CONFIGURATION_URL}/${id}`, configurationData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji konfiguracji planu o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie konfiguracji planu
  deletePlanConfiguration: async (id) => {
    try {
      const response = await api.delete(`${PLAN_CONFIGURATION_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania konfiguracji planu o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie predefiniowanych szablonów konfiguracji
  getPredefinedTemplates: async () => {
    try {
      const response = await api.get(`${PLAN_CONFIGURATION_URL}/templates`);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania predefiniowanych szablonów konfiguracji:', error);
      throw error;
    }
  },

  // Tworzenie konfiguracji na podstawie szablonu
  createFromTemplate: async (templateId, schoolId) => {
    try {
      const response = await api.post(`${PLAN_CONFIGURATION_URL}/from-template/${templateId}/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas tworzenia konfiguracji z szablonu ${templateId}:`, error);
      throw error;
    }
  }
};

export default PlanConfigurationService;
