package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.RoomEquipmentDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Room;
import com.intelligentlessonplanning.model.RoomEquipment;
import com.intelligentlessonplanning.repository.RoomEquipmentRepository;
import com.intelligentlessonplanning.repository.RoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomEquipmentService {

    private final RoomEquipmentRepository roomEquipmentRepository;
    private final RoomRepository roomRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public RoomEquipmentService(RoomEquipmentRepository roomEquipmentRepository,
                               RoomRepository roomRepository,
                               ModelMapper modelMapper) {
        this.roomEquipmentRepository = roomEquipmentRepository;
        this.roomRepository = roomRepository;
        this.modelMapper = modelMapper;
    }

    public List<RoomEquipmentDto> getAllRoomEquipment() {
        return roomEquipmentRepository.findAll().stream()
                .map(roomEquipment -> modelMapper.map(roomEquipment, RoomEquipmentDto.class))
                .collect(Collectors.toList());
    }

    public RoomEquipmentDto getRoomEquipmentById(Long id) {
        RoomEquipment roomEquipment = roomEquipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoomEquipment not found with id: " + id));
        return modelMapper.map(roomEquipment, RoomEquipmentDto.class);
    }

    public List<RoomEquipmentDto> getRoomEquipmentByRoomId(Long roomId) {
        return roomEquipmentRepository.findByRoomId(roomId).stream()
                .map(roomEquipment -> modelMapper.map(roomEquipment, RoomEquipmentDto.class))
                .collect(Collectors.toList());
    }

    public List<RoomEquipmentDto> getRoomEquipmentByName(String equipmentName) {
        return roomEquipmentRepository.findByEquipmentNameContainingIgnoreCase(equipmentName).stream()
                .map(roomEquipment -> modelMapper.map(roomEquipment, RoomEquipmentDto.class))
                .collect(Collectors.toList());
    }
    
    public List<RoomEquipmentDto> getRoomEquipmentByRoom(Long roomId) {
        return getRoomEquipmentByRoomId(roomId);
    }
    
    public List<RoomEquipmentDto> getRoomEquipmentByType(String equipmentType) {
        return getRoomEquipmentByName(equipmentType);
    }

    public RoomEquipmentDto createRoomEquipment(RoomEquipmentDto roomEquipmentDto) {
        RoomEquipment roomEquipment = new RoomEquipment();
        roomEquipment.setEquipmentName(roomEquipmentDto.getEquipmentName());
        roomEquipment.setQuantity(roomEquipmentDto.getQuantity());
        
        // Set Room
        if (roomEquipmentDto.getRoom() != null && roomEquipmentDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(roomEquipmentDto.getRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + roomEquipmentDto.getRoom().getId()));
            roomEquipment.setRoom(room);
        }
        
        RoomEquipment savedRoomEquipment = roomEquipmentRepository.save(roomEquipment);
        return modelMapper.map(savedRoomEquipment, RoomEquipmentDto.class);
    }

    public RoomEquipmentDto updateRoomEquipment(Long id, RoomEquipmentDto roomEquipmentDto) {
        RoomEquipment existingRoomEquipment = roomEquipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoomEquipment not found with id: " + id));
        
        existingRoomEquipment.setEquipmentName(roomEquipmentDto.getEquipmentName());
        existingRoomEquipment.setQuantity(roomEquipmentDto.getQuantity());
        
        // Update Room
        if (roomEquipmentDto.getRoom() != null && roomEquipmentDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(roomEquipmentDto.getRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + roomEquipmentDto.getRoom().getId()));
            existingRoomEquipment.setRoom(room);
        }
        
        RoomEquipment updatedRoomEquipment = roomEquipmentRepository.save(existingRoomEquipment);
        return modelMapper.map(updatedRoomEquipment, RoomEquipmentDto.class);
    }

    public void deleteRoomEquipment(Long id) {
        if (!roomEquipmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("RoomEquipment not found with id: " + id);
        }
        roomEquipmentRepository.deleteById(id);
    }
}
