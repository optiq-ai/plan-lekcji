package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.TimeSlotDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.TimeSlot;
import com.intelligentlessonplanning.repository.TimeSlotRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TimeSlotService(TimeSlotRepository timeSlotRepository, ModelMapper modelMapper) {
        this.timeSlotRepository = timeSlotRepository;
        this.modelMapper = modelMapper;
    }

    public List<TimeSlotDto> getAllTimeSlots() {
        return timeSlotRepository.findAll().stream()
                .map(timeSlot -> modelMapper.map(timeSlot, TimeSlotDto.class))
                .collect(Collectors.toList());
    }

    public TimeSlotDto getTimeSlotById(Long id) {
        TimeSlot timeSlot = timeSlotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + id));
        return modelMapper.map(timeSlot, TimeSlotDto.class);
    }

    public List<TimeSlotDto> getTimeSlotsBySlotNumber(Integer slotNumber) {
        return timeSlotRepository.findBySlotNumber(slotNumber).stream()
                .map(timeSlot -> modelMapper.map(timeSlot, TimeSlotDto.class))
                .collect(Collectors.toList());
    }

    public List<TimeSlotDto> getTimeSlotsByTimeRange(LocalTime startTime, LocalTime endTime) {
        return timeSlotRepository.findByStartTimeGreaterThanEqualAndEndTimeLessThanEqual(startTime, endTime).stream()
                .map(timeSlot -> modelMapper.map(timeSlot, TimeSlotDto.class))
                .collect(Collectors.toList());
    }
    
    public List<TimeSlotDto> getTimeSlotsBySchool(Long schoolId) {
        // Assuming TimeSlot has a school relationship or we're filtering by school in some way
        // If there's no direct relationship, this might need to be implemented differently
        return timeSlotRepository.findAll().stream()
                .filter(timeSlot -> timeSlot.getSchool() != null && timeSlot.getSchool().getId().equals(schoolId))
                .map(timeSlot -> modelMapper.map(timeSlot, TimeSlotDto.class))
                .collect(Collectors.toList());
    }
    
    public List<TimeSlotDto> getTimeSlotsByDayOfWeek(DayOfWeek dayOfWeek) {
        // Assuming TimeSlot has a dayOfWeek field or we're filtering by day in some way
        // If there's no direct relationship, this might need to be implemented differently
        return timeSlotRepository.findAll().stream()
                .filter(timeSlot -> timeSlot.getDayOfWeek() != null && timeSlot.getDayOfWeek().equals(dayOfWeek.getValue()))
                .map(timeSlot -> modelMapper.map(timeSlot, TimeSlotDto.class))
                .collect(Collectors.toList());
    }

    public TimeSlotDto createTimeSlot(TimeSlotDto timeSlotDto) {
        TimeSlot timeSlot = modelMapper.map(timeSlotDto, TimeSlot.class);
        TimeSlot savedTimeSlot = timeSlotRepository.save(timeSlot);
        return modelMapper.map(savedTimeSlot, TimeSlotDto.class);
    }

    public TimeSlotDto updateTimeSlot(Long id, TimeSlotDto timeSlotDto) {
        TimeSlot existingTimeSlot = timeSlotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + id));
        
        existingTimeSlot.setStartTime(timeSlotDto.getStartTime());
        existingTimeSlot.setEndTime(timeSlotDto.getEndTime());
        existingTimeSlot.setSlotNumber(timeSlotDto.getSlotNumber());
        
        TimeSlot updatedTimeSlot = timeSlotRepository.save(existingTimeSlot);
        return modelMapper.map(updatedTimeSlot, TimeSlotDto.class);
    }

    public void deleteTimeSlot(Long id) {
        if (!timeSlotRepository.existsById(id)) {
            throw new ResourceNotFoundException("TimeSlot not found with id: " + id);
        }
        timeSlotRepository.deleteById(id);
    }
}
