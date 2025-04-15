import api from './api';

const ROOM_AVAILABILITY_URL = '/room-availabilities';

const RoomAvailabilityService = {
  // Pobieranie wszystkich dostępności sal
  getAllRoomAvailabilities: async () => {
    try {
      const response = await api.get(ROOM_AVAILABILITY_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania dostępności sal:', error);
      throw error;
    }
  },

  // Pobieranie dostępności sali po ID
  getRoomAvailabilityById: async (id) => {
    try {
      const response = await api.get(`${ROOM_AVAILABILITY_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania dostępności sali o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie dostępności według sali
  getRoomAvailabilitiesByRoom: async (roomId) => {
    try {
      const response = await api.get(`${ROOM_AVAILABILITY_URL}/room/${roomId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania dostępności sali ${roomId}:`, error);
      throw error;
    }
  },

  // Pobieranie dostępności według dnia tygodnia
  getRoomAvailabilitiesByDayOfWeek: async (dayOfWeek) => {
    try {
      const response = await api.get(`${ROOM_AVAILABILITY_URL}/day/${dayOfWeek}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania dostępności sal w dniu ${dayOfWeek}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej dostępności sali
  createRoomAvailability: async (availabilityData) => {
    try {
      const response = await api.post(ROOM_AVAILABILITY_URL, availabilityData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia dostępności sali:', error);
      throw error;
    }
  },

  // Aktualizacja dostępności sali
  updateRoomAvailability: async (id, availabilityData) => {
    try {
      const response = await api.put(`${ROOM_AVAILABILITY_URL}/${id}`, availabilityData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji dostępności sali o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie dostępności sali
  deleteRoomAvailability: async (id) => {
    try {
      const response = await api.delete(`${ROOM_AVAILABILITY_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania dostępności sali o ID ${id}:`, error);
      throw error;
    }
  },

  // Masowe ustawianie dostępności sali
  setBulkRoomAvailability: async (roomId, availabilityData) => {
    try {
      const response = await api.post(`${ROOM_AVAILABILITY_URL}/bulk/${roomId}`, availabilityData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas masowego ustawiania dostępności sali ${roomId}:`, error);
      throw error;
    }
  }
};

export default RoomAvailabilityService;
