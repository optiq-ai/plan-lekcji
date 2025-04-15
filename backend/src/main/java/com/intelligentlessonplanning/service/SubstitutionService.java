package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.SubstitutionDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Lesson;
import com.intelligentlessonplanning.model.Room;
import com.intelligentlessonplanning.model.Substitution;
import com.intelligentlessonplanning.model.Teacher;
import com.intelligentlessonplanning.repository.LessonRepository;
import com.intelligentlessonplanning.repository.RoomRepository;
import com.intelligentlessonplanning.repository.SubstitutionRepository;
import com.intelligentlessonplanning.repository.TeacherRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubstitutionService {

    private final SubstitutionRepository substitutionRepository;
    private final LessonRepository lessonRepository;
    private final TeacherRepository teacherRepository;
    private final RoomRepository roomRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public SubstitutionService(SubstitutionRepository substitutionRepository,
                              LessonRepository lessonRepository,
                              TeacherRepository teacherRepository,
                              RoomRepository roomRepository,
                              ModelMapper modelMapper) {
        this.substitutionRepository = substitutionRepository;
        this.lessonRepository = lessonRepository;
        this.teacherRepository = teacherRepository;
        this.roomRepository = roomRepository;
        this.modelMapper = modelMapper;
    }

    public List<SubstitutionDto> getAllSubstitutions() {
        return substitutionRepository.findAll().stream()
                .map(substitution -> modelMapper.map(substitution, SubstitutionDto.class))
                .collect(Collectors.toList());
    }

    public SubstitutionDto getSubstitutionById(Long id) {
        Substitution substitution = substitutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Substitution not found with id: " + id));
        return modelMapper.map(substitution, SubstitutionDto.class);
    }

    public List<SubstitutionDto> getSubstitutionsByDate(LocalDate date) {
        return substitutionRepository.findByDate(date).stream()
                .map(substitution -> modelMapper.map(substitution, SubstitutionDto.class))
                .collect(Collectors.toList());
    }

    public List<SubstitutionDto> getSubstitutionsByLesson(Long lessonId) {
        return substitutionRepository.findByLessonId(lessonId).stream()
                .map(substitution -> modelMapper.map(substitution, SubstitutionDto.class))
                .collect(Collectors.toList());
    }

    public List<SubstitutionDto> getSubstitutionsByTeacher(Long teacherId) {
        return substitutionRepository.findBySubstituteTeacherId(teacherId).stream()
                .map(substitution -> modelMapper.map(substitution, SubstitutionDto.class))
                .collect(Collectors.toList());
    }
    
    public List<SubstitutionDto> getSubstitutionsBySubstituteTeacher(Long teacherId) {
        return getSubstitutionsByTeacher(teacherId);
    }

    public SubstitutionDto createSubstitution(SubstitutionDto substitutionDto) {
        Substitution substitution = new Substitution();
        substitution.setDate(substitutionDto.getDate());
        substitution.setReason(substitutionDto.getReason());
        
        // Set Lesson
        if (substitutionDto.getLesson() != null && substitutionDto.getLesson().getId() != null) {
            Lesson lesson = lessonRepository.findById(substitutionDto.getLesson().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + substitutionDto.getLesson().getId()));
            substitution.setLesson(lesson);
        }
        
        // Set Substitute Teacher
        if (substitutionDto.getSubstituteTeacher() != null && substitutionDto.getSubstituteTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(substitutionDto.getSubstituteTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + substitutionDto.getSubstituteTeacher().getId()));
            substitution.setSubstituteTeacher(teacher);
        }
        
        // Set Substitute Room
        if (substitutionDto.getSubstituteRoom() != null && substitutionDto.getSubstituteRoom().getId() != null) {
            Room room = roomRepository.findById(substitutionDto.getSubstituteRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + substitutionDto.getSubstituteRoom().getId()));
            substitution.setSubstituteRoom(room);
        }
        
        Substitution savedSubstitution = substitutionRepository.save(substitution);
        return modelMapper.map(savedSubstitution, SubstitutionDto.class);
    }

    public SubstitutionDto updateSubstitution(Long id, SubstitutionDto substitutionDto) {
        Substitution existingSubstitution = substitutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Substitution not found with id: " + id));
        
        existingSubstitution.setDate(substitutionDto.getDate());
        existingSubstitution.setReason(substitutionDto.getReason());
        
        // Update Lesson
        if (substitutionDto.getLesson() != null && substitutionDto.getLesson().getId() != null) {
            Lesson lesson = lessonRepository.findById(substitutionDto.getLesson().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + substitutionDto.getLesson().getId()));
            existingSubstitution.setLesson(lesson);
        }
        
        // Update Substitute Teacher
        if (substitutionDto.getSubstituteTeacher() != null && substitutionDto.getSubstituteTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(substitutionDto.getSubstituteTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + substitutionDto.getSubstituteTeacher().getId()));
            existingSubstitution.setSubstituteTeacher(teacher);
        }
        
        // Update Substitute Room
        if (substitutionDto.getSubstituteRoom() != null && substitutionDto.getSubstituteRoom().getId() != null) {
            Room room = roomRepository.findById(substitutionDto.getSubstituteRoom().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + substitutionDto.getSubstituteRoom().getId()));
            existingSubstitution.setSubstituteRoom(room);
        }
        
        Substitution updatedSubstitution = substitutionRepository.save(existingSubstitution);
        return modelMapper.map(updatedSubstitution, SubstitutionDto.class);
    }

    public void deleteSubstitution(Long id) {
        if (!substitutionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Substitution not found with id: " + id);
        }
        substitutionRepository.deleteById(id);
    }
}
