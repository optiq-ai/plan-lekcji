package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.TeacherPreferenceDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Teacher;
import com.intelligentlessonplanning.model.TeacherPreference;
import com.intelligentlessonplanning.repository.TeacherPreferenceRepository;
import com.intelligentlessonplanning.repository.TeacherRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherPreferenceService {

    private final TeacherPreferenceRepository teacherPreferenceRepository;
    private final TeacherRepository teacherRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TeacherPreferenceService(TeacherPreferenceRepository teacherPreferenceRepository,
                                   TeacherRepository teacherRepository,
                                   ModelMapper modelMapper) {
        this.teacherPreferenceRepository = teacherPreferenceRepository;
        this.teacherRepository = teacherRepository;
        this.modelMapper = modelMapper;
    }

    public List<TeacherPreferenceDto> getAllTeacherPreferences() {
        return teacherPreferenceRepository.findAll().stream()
                .map(teacherPreference -> modelMapper.map(teacherPreference, TeacherPreferenceDto.class))
                .collect(Collectors.toList());
    }

    public TeacherPreferenceDto getTeacherPreferenceById(Long id) {
        TeacherPreference teacherPreference = teacherPreferenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeacherPreference not found with id: " + id));
        return modelMapper.map(teacherPreference, TeacherPreferenceDto.class);
    }

    public List<TeacherPreferenceDto> getTeacherPreferencesByTeacher(Long teacherId) {
        return teacherPreferenceRepository.findByTeacherId(teacherId).stream()
                .map(teacherPreference -> modelMapper.map(teacherPreference, TeacherPreferenceDto.class))
                .collect(Collectors.toList());
    }

    public List<TeacherPreferenceDto> getTeacherPreferencesByType(String preferenceType) {
        return teacherPreferenceRepository.findByPreferenceType(preferenceType).stream()
                .map(teacherPreference -> modelMapper.map(teacherPreference, TeacherPreferenceDto.class))
                .collect(Collectors.toList());
    }

    public TeacherPreferenceDto createTeacherPreference(TeacherPreferenceDto teacherPreferenceDto) {
        TeacherPreference teacherPreference = new TeacherPreference();
        teacherPreference.setPreferenceType(teacherPreferenceDto.getPreferenceType());
        teacherPreference.setPreferenceValue(teacherPreferenceDto.getPreferenceValue());
        teacherPreference.setPriority(teacherPreferenceDto.getPriority());
        
        // Set Teacher
        if (teacherPreferenceDto.getTeacher() != null && teacherPreferenceDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(teacherPreferenceDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + teacherPreferenceDto.getTeacher().getId()));
            teacherPreference.setTeacher(teacher);
        }
        
        TeacherPreference savedTeacherPreference = teacherPreferenceRepository.save(teacherPreference);
        return modelMapper.map(savedTeacherPreference, TeacherPreferenceDto.class);
    }

    public TeacherPreferenceDto updateTeacherPreference(Long id, TeacherPreferenceDto teacherPreferenceDto) {
        TeacherPreference existingTeacherPreference = teacherPreferenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeacherPreference not found with id: " + id));
        
        existingTeacherPreference.setPreferenceType(teacherPreferenceDto.getPreferenceType());
        existingTeacherPreference.setPreferenceValue(teacherPreferenceDto.getPreferenceValue());
        existingTeacherPreference.setPriority(teacherPreferenceDto.getPriority());
        
        // Update Teacher
        if (teacherPreferenceDto.getTeacher() != null && teacherPreferenceDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(teacherPreferenceDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + teacherPreferenceDto.getTeacher().getId()));
            existingTeacherPreference.setTeacher(teacher);
        }
        
        TeacherPreference updatedTeacherPreference = teacherPreferenceRepository.save(existingTeacherPreference);
        return modelMapper.map(updatedTeacherPreference, TeacherPreferenceDto.class);
    }

    public void deleteTeacherPreference(Long id) {
        if (!teacherPreferenceRepository.existsById(id)) {
            throw new ResourceNotFoundException("TeacherPreference not found with id: " + id);
        }
        teacherPreferenceRepository.deleteById(id);
    }
}
