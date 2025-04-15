import api from './api';

const TIME_SLOT_URL = '/time-slots';

const TimeSlotService = {
  // Pobieranie wszystkich przedziałów czasowych
  getAllTimeSlots: async () => {
    try {
      const response = await api.get(TIME_SLOT_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania przedziałów czasowych:', error);
      throw error;
    }
  },

  // Pobieranie przedziału czasowego po ID
  getTimeSlotById: async (id) => {
    try {
      const response = await api.get(`${TIME_SLOT_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania przedziału czasowego o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie przedziałów czasowych według szkoły
  getTimeSlotsBySchool: async (schoolId) => {
    try {
      const response = await api.get(`${TIME_SLOT_URL}/school/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania przedziałów czasowych szkoły ${schoolId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowego przedziału czasowego
  createTimeSlot: async (timeSlotData) => {
    try {
      const response = await api.post(TIME_SLOT_URL, timeSlotData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia przedziału czasowego:', error);
      throw error;
    }
  },

  // Aktualizacja przedziału czasowego
  updateTimeSlot: async (id, timeSlotData) => {
    try {
      const response = await api.put(`${TIME_SLOT_URL}/${id}`, timeSlotData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji przedziału czasowego o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie przedziału czasowego
  deleteTimeSlot: async (id) => {
    try {
      const response = await api.delete(`${TIME_SLOT_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania przedziału czasowego o ID ${id}:`, error);
      throw error;
    }
  }
};

export default TimeSlotService;
