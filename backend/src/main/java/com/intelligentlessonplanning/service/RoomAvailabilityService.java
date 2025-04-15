package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.RoomAvailabilityDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Room;
import com.intelligentlessonplanning.model.RoomAvailability;
import com.intelligentlessonplanning.model.TimeSlot;
import com.intelligentlessonplanning.repository.RoomAvailabilityRepository;
import com.intelligentlessonplanning.repository.RoomRepository;
import com.intelligentlessonplanning.repository.TimeSlotRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomAvailabilityService {

    private final RoomAvailabilityRepository roomAvailabilityRepository;
    private final RoomRepository roomRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public RoomAvailabilityService(RoomAvailabilityRepository roomAvailabilityRepository,
                                  RoomRepository roomRepository,
                                  TimeSlotRepository timeSlotRepository,
                                  ModelMapper modelMapper) {
        this.roomAvailabilityRepository = roomAvailabilityRepository;
        this.roomRepository = roomRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.modelMapper = modelMapper;
    }

    public List<RoomAvailabilityDto> getAllRoomAvailabilities() {
        return roomAvailabilityRepository.findAll().stream()
                .map(roomAvailability -> modelMapper.map(roomAvailability, RoomAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public RoomAvailabilityDto getRoomAvailabilityById(Long id) {
        RoomAvailability roomAvailability = roomAvailabilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoomAvailability not found with id: " + id));
        return modelMapper.map(roomAvailability, RoomAvailabilityDto.class);
    }

    public List<RoomAvailabilityDto> getRoomAvailabilitiesByRoom(Long roomId) {
        return roomAvailabilityRepository.findByRoomId(roomId).stream()
                .map(roomAvailability -> modelMapper.map(roomAvailability, RoomAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public List<RoomAvailabilityDto> getRoomAvailabilitiesByDayOfWeek(DayOfWeek dayOfWeek) {
        return roomAvailabilityRepository.findByDayOfWeek(dayOfWeek.getValue()).stream()
                .map(roomAvailability -> modelMapper.map(roomAvailability, RoomAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public List<RoomAvailabilityDto> getRoomAvailabilitiesByTimeSlot(Long timeSlotId) {
        return roomAvailabilityRepository.findByTimeSlotId(timeSlotId).stream()
                .map(roomAvailability -> modelMapper.map(roomAvailability, RoomAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public List<RoomAvailabilityDto> getAvailableRoomsByDayAndTimeSlot(Integer dayOfWeek, Long timeSlotId) {
        return roomAvailabilityRepository.findByDayOfWeekAndTimeSlotIdAndIsAvailableTrue(dayOfWeek, timeSlotId).stream()
                .map(roomAvailability -> modelMapper.map(roomAvailability, RoomAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public RoomAvailabilityDto createRoomAvailability(RoomAvailabilityDto roomAvailabilityDto) {
        RoomAvailability roomAvailability = new RoomAvailability();
        roomAvailability.setDayOfWeek(roomAvailabilityDto.getDayOfWeek());
        roomAvailability.setIsAvailable(roomAvailabilityDto.getIsAvailable());
        
        // Set Room
        if (roomAvailabilityDto.getRoom() != null && roomAvailabilityDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(roomAvailabilityDto.getRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + roomAvailabilityDto.getRoom().getId()));
            roomAvailability.setRoom(room);
        }
        
        // Set TimeSlot
        if (roomAvailabilityDto.getTimeSlot() != null && roomAvailabilityDto.getTimeSlot().getId() != null) {
            TimeSlot timeSlot = timeSlotRepository.findById(roomAvailabilityDto.getTimeSlot().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + roomAvailabilityDto.getTimeSlot().getId()));
            roomAvailability.setTimeSlot(timeSlot);
        }
        
        RoomAvailability savedRoomAvailability = roomAvailabilityRepository.save(roomAvailability);
        return modelMapper.map(savedRoomAvailability, RoomAvailabilityDto.class);
    }

    public RoomAvailabilityDto updateRoomAvailability(Long id, RoomAvailabilityDto roomAvailabilityDto) {
        RoomAvailability existingRoomAvailability = roomAvailabilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoomAvailability not found with id: " + id));
        
        existingRoomAvailability.setDayOfWeek(roomAvailabilityDto.getDayOfWeek());
        existingRoomAvailability.setIsAvailable(roomAvailabilityDto.getIsAvailable());
        
        // Update Room
        if (roomAvailabilityDto.getRoom() != null && roomAvailabilityDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(roomAvailabilityDto.getRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + roomAvailabilityDto.getRoom().getId()));
            existingRoomAvailability.setRoom(room);
        }
        
        // Update TimeSlot
        if (roomAvailabilityDto.getTimeSlot() != null && roomAvailabilityDto.getTimeSlot().getId() != null) {
            TimeSlot timeSlot = timeSlotRepository.findById(roomAvailabilityDto.getTimeSlot().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + roomAvailabilityDto.getTimeSlot().getId()));
            existingRoomAvailability.setTimeSlot(timeSlot);
        }
        
        RoomAvailability updatedRoomAvailability = roomAvailabilityRepository.save(existingRoomAvailability);
        return modelMapper.map(updatedRoomAvailability, RoomAvailabilityDto.class);
    }

    public void deleteRoomAvailability(Long id) {
        if (!roomAvailabilityRepository.existsById(id)) {
            throw new ResourceNotFoundException("RoomAvailability not found with id: " + id);
        }
        roomAvailabilityRepository.deleteById(id);
    }
}
