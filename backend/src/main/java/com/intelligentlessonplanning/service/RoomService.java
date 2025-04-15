package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.RoomDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Room;
import com.intelligentlessonplanning.repository.RoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public RoomService(RoomRepository roomRepository, ModelMapper modelMapper) {
        this.roomRepository = roomRepository;
        this.modelMapper = modelMapper;
    }

    public List<RoomDto> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(room -> modelMapper.map(room, RoomDto.class))
                .collect(Collectors.toList());
    }

    public RoomDto getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        return modelMapper.map(room, RoomDto.class);
    }

    public List<RoomDto> getRoomsByType(String roomType) {
        return roomRepository.findByRoomType(roomType).stream()
                .map(room -> modelMapper.map(room, RoomDto.class))
                .collect(Collectors.toList());
    }

    public List<RoomDto> getRoomsByBuilding(String building) {
        return roomRepository.findByBuilding(building).stream()
                .map(room -> modelMapper.map(room, RoomDto.class))
                .collect(Collectors.toList());
    }

    public List<RoomDto> getRoomsByFloor(Integer floor) {
        return roomRepository.findByFloor(floor).stream()
                .map(room -> modelMapper.map(room, RoomDto.class))
                .collect(Collectors.toList());
    }

    public List<RoomDto> getRoomsByMinCapacity(Integer capacity) {
        return roomRepository.findByCapacityGreaterThanEqual(capacity).stream()
                .map(room -> modelMapper.map(room, RoomDto.class))
                .collect(Collectors.toList());
    }

    public RoomDto createRoom(RoomDto roomDto) {
        Room room = modelMapper.map(roomDto, Room.class);
        Room savedRoom = roomRepository.save(room);
        return modelMapper.map(savedRoom, RoomDto.class);
    }

    public RoomDto updateRoom(Long id, RoomDto roomDto) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        
        existingRoom.setName(roomDto.getName());
        existingRoom.setCapacity(roomDto.getCapacity());
        existingRoom.setRoomType(roomDto.getRoomType());
        existingRoom.setBuilding(roomDto.getBuilding());
        existingRoom.setFloor(roomDto.getFloor());
        
        Room updatedRoom = roomRepository.save(existingRoom);
        return modelMapper.map(updatedRoom, RoomDto.class);
    }

    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Room not found with id: " + id);
        }
        roomRepository.deleteById(id);
    }
}
