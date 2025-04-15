import api from './api';

const ROOM_URL = '/rooms';

const RoomService = {
  // Pobieranie wszystkich sal
  getAllRooms: async () => {
    try {
      const response = await api.get(ROOM_URL);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania sal:', error);
      throw error;
    }
  },

  // Pobieranie sali po ID
  getRoomById: async (id) => {
    try {
      const response = await api.get(`${ROOM_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania sali o ID ${id}:`, error);
      throw error;
    }
  },

  // Pobieranie sal według szkoły
  getRoomsBySchool: async (schoolId) => {
    try {
      const response = await api.get(`${ROOM_URL}/school/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania sal szkoły ${schoolId}:`, error);
      throw error;
    }
  },

  // Pobieranie sal według wyposażenia
  getRoomsByEquipment: async (equipmentId) => {
    try {
      const response = await api.get(`${ROOM_URL}/equipment/${equipmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas pobierania sal z wyposażeniem ${equipmentId}:`, error);
      throw error;
    }
  },

  // Tworzenie nowej sali
  createRoom: async (roomData) => {
    try {
      const response = await api.post(ROOM_URL, roomData);
      return response.data;
    } catch (error) {
      console.error('Błąd podczas tworzenia sali:', error);
      throw error;
    }
  },

  // Aktualizacja sali
  updateRoom: async (id, roomData) => {
    try {
      const response = await api.put(`${ROOM_URL}/${id}`, roomData);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji sali o ID ${id}:`, error);
      throw error;
    }
  },

  // Usuwanie sali
  deleteRoom: async (id) => {
    try {
      const response = await api.delete(`${ROOM_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Błąd podczas usuwania sali o ID ${id}:`, error);
      throw error;
    }
  }
};

export default RoomService;
