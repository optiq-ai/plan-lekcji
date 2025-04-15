package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.TeacherAvailabilityDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Teacher;
import com.intelligentlessonplanning.model.TeacherAvailability;
import com.intelligentlessonplanning.model.TimeSlot;
import com.intelligentlessonplanning.repository.TeacherAvailabilityRepository;
import com.intelligentlessonplanning.repository.TeacherRepository;
import com.intelligentlessonplanning.repository.TimeSlotRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherAvailabilityService {

    private final TeacherAvailabilityRepository teacherAvailabilityRepository;
    private final TeacherRepository teacherRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TeacherAvailabilityService(TeacherAvailabilityRepository teacherAvailabilityRepository,
                                     TeacherRepository teacherRepository,
                                     TimeSlotRepository timeSlotRepository,
                                     ModelMapper modelMapper) {
        this.teacherAvailabilityRepository = teacherAvailabilityRepository;
        this.teacherRepository = teacherRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.modelMapper = modelMapper;
    }

    public List<TeacherAvailabilityDto> getAllTeacherAvailabilities() {
        return teacherAvailabilityRepository.findAll().stream()
                .map(teacherAvailability -> modelMapper.map(teacherAvailability, TeacherAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public TeacherAvailabilityDto getTeacherAvailabilityById(Long id) {
        TeacherAvailability teacherAvailability = teacherAvailabilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeacherAvailability not found with id: " + id));
        return modelMapper.map(teacherAvailability, TeacherAvailabilityDto.class);
    }

    public List<TeacherAvailabilityDto> getTeacherAvailabilitiesByTeacher(Long teacherId) {
        return teacherAvailabilityRepository.findByTeacherId(teacherId).stream()
                .map(teacherAvailability -> modelMapper.map(teacherAvailability, TeacherAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public List<TeacherAvailabilityDto> getTeacherAvailabilitiesByDayOfWeek(Integer dayOfWeek) {
        return teacherAvailabilityRepository.findByDayOfWeek(dayOfWeek).stream()
                .map(teacherAvailability -> modelMapper.map(teacherAvailability, TeacherAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public List<TeacherAvailabilityDto> getTeacherAvailabilitiesByTimeSlot(Long timeSlotId) {
        return teacherAvailabilityRepository.findByTimeSlotId(timeSlotId).stream()
                .map(teacherAvailability -> modelMapper.map(teacherAvailability, TeacherAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public List<TeacherAvailabilityDto> getAvailableTeachersByDayAndTimeSlot(Integer dayOfWeek, Long timeSlotId) {
        return teacherAvailabilityRepository.findByDayOfWeekAndTimeSlotIdAndIsAvailableTrue(dayOfWeek, timeSlotId).stream()
                .map(teacherAvailability -> modelMapper.map(teacherAvailability, TeacherAvailabilityDto.class))
                .collect(Collectors.toList());
    }

    public TeacherAvailabilityDto createTeacherAvailability(TeacherAvailabilityDto teacherAvailabilityDto) {
        TeacherAvailability teacherAvailability = new TeacherAvailability();
        teacherAvailability.setDayOfWeek(teacherAvailabilityDto.getDayOfWeek());
        teacherAvailability.setIsAvailable(teacherAvailabilityDto.getIsAvailable());
        
        // Set Teacher
        if (teacherAvailabilityDto.getTeacher() != null && teacherAvailabilityDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(teacherAvailabilityDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + teacherAvailabilityDto.getTeacher().getId()));
            teacherAvailability.setTeacher(teacher);
        }
        
        // Set TimeSlot
        if (teacherAvailabilityDto.getTimeSlot() != null && teacherAvailabilityDto.getTimeSlot().getId() != null) {
            TimeSlot timeSlot = timeSlotRepository.findById(teacherAvailabilityDto.getTimeSlot().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + teacherAvailabilityDto.getTimeSlot().getId()));
            teacherAvailability.setTimeSlot(timeSlot);
        }
        
        TeacherAvailability savedTeacherAvailability = teacherAvailabilityRepository.save(teacherAvailability);
        return modelMapper.map(savedTeacherAvailability, TeacherAvailabilityDto.class);
    }

    public TeacherAvailabilityDto updateTeacherAvailability(Long id, TeacherAvailabilityDto teacherAvailabilityDto) {
        TeacherAvailability existingTeacherAvailability = teacherAvailabilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeacherAvailability not found with id: " + id));
        
        existingTeacherAvailability.setDayOfWeek(teacherAvailabilityDto.getDayOfWeek());
        existingTeacherAvailability.setIsAvailable(teacherAvailabilityDto.getIsAvailable());
        
        // Update Teacher
        if (teacherAvailabilityDto.getTeacher() != null && teacherAvailabilityDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(teacherAvailabilityDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + teacherAvailabilityDto.getTeacher().getId()));
            existingTeacherAvailability.setTeacher(teacher);
        }
        
        // Update TimeSlot
        if (teacherAvailabilityDto.getTimeSlot() != null && teacherAvailabilityDto.getTimeSlot().getId() != null) {
            TimeSlot timeSlot = timeSlotRepository.findById(teacherAvailabilityDto.getTimeSlot().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("TimeSlot not found with id: " + teacherAvailabilityDto.getTimeSlot().getId()));
            existingTeacherAvailability.setTimeSlot(timeSlot);
        }
        
        TeacherAvailability updatedTeacherAvailability = teacherAvailabilityRepository.save(existingTeacherAvailability);
        return modelMapper.map(updatedTeacherAvailability, TeacherAvailabilityDto.class);
    }

    public void deleteTeacherAvailability(Long id) {
        if (!teacherAvailabilityRepository.existsById(id)) {
            throw new ResourceNotFoundException("TeacherAvailability not found with id: " + id);
        }
        teacherAvailabilityRepository.deleteById(id);
    }
}
