package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.TeacherSubjectDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Subject;
import com.intelligentlessonplanning.model.Teacher;
import com.intelligentlessonplanning.model.TeacherSubject;
import com.intelligentlessonplanning.repository.SubjectRepository;
import com.intelligentlessonplanning.repository.TeacherRepository;
import com.intelligentlessonplanning.repository.TeacherSubjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherSubjectService {

    private final TeacherSubjectRepository teacherSubjectRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TeacherSubjectService(TeacherSubjectRepository teacherSubjectRepository,
                                TeacherRepository teacherRepository,
                                SubjectRepository subjectRepository,
                                ModelMapper modelMapper) {
        this.teacherSubjectRepository = teacherSubjectRepository;
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.modelMapper = modelMapper;
    }

    public List<TeacherSubjectDto> getAllTeacherSubjects() {
        return teacherSubjectRepository.findAll().stream()
                .map(teacherSubject -> modelMapper.map(teacherSubject, TeacherSubjectDto.class))
                .collect(Collectors.toList());
    }

    public TeacherSubjectDto getTeacherSubjectById(Long id) {
        TeacherSubject teacherSubject = teacherSubjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeacherSubject not found with id: " + id));
        return modelMapper.map(teacherSubject, TeacherSubjectDto.class);
    }

    public List<TeacherSubjectDto> getTeacherSubjectsByTeacherId(Long teacherId) {
        return teacherSubjectRepository.findByTeacherId(teacherId).stream()
                .map(teacherSubject -> modelMapper.map(teacherSubject, TeacherSubjectDto.class))
                .collect(Collectors.toList());
    }

    public List<TeacherSubjectDto> getTeacherSubjectsBySubjectId(Long subjectId) {
        return teacherSubjectRepository.findBySubjectId(subjectId).stream()
                .map(teacherSubject -> modelMapper.map(teacherSubject, TeacherSubjectDto.class))
                .collect(Collectors.toList());
    }
    
    public List<TeacherSubjectDto> getTeacherSubjectsByTeacher(Long teacherId) {
        return getTeacherSubjectsByTeacherId(teacherId);
    }
    
    public List<TeacherSubjectDto> getTeacherSubjectsBySubject(Long subjectId) {
        return getTeacherSubjectsBySubjectId(subjectId);
    }

    public TeacherSubjectDto createTeacherSubject(TeacherSubjectDto teacherSubjectDto) {
        TeacherSubject teacherSubject = new TeacherSubject();
        
        // Set Teacher
        if (teacherSubjectDto.getTeacher() != null && teacherSubjectDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(teacherSubjectDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + teacherSubjectDto.getTeacher().getId()));
            teacherSubject.setTeacher(teacher);
        }
        
        // Set Subject
        if (teacherSubjectDto.getSubject() != null && teacherSubjectDto.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(teacherSubjectDto.getSubject().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + teacherSubjectDto.getSubject().getId()));
            teacherSubject.setSubject(subject);
        }
        
        TeacherSubject savedTeacherSubject = teacherSubjectRepository.save(teacherSubject);
        return modelMapper.map(savedTeacherSubject, TeacherSubjectDto.class);
    }

    public TeacherSubjectDto updateTeacherSubject(Long id, TeacherSubjectDto teacherSubjectDto) {
        TeacherSubject existingTeacherSubject = teacherSubjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeacherSubject not found with id: " + id));
        
        // Update Teacher
        if (teacherSubjectDto.getTeacher() != null && teacherSubjectDto.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(teacherSubjectDto.getTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + teacherSubjectDto.getTeacher().getId()));
            existingTeacherSubject.setTeacher(teacher);
        }
        
        // Update Subject
        if (teacherSubjectDto.getSubject() != null && teacherSubjectDto.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(teacherSubjectDto.getSubject().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + teacherSubjectDto.getSubject().getId()));
            existingTeacherSubject.setSubject(subject);
        }
        
        TeacherSubject updatedTeacherSubject = teacherSubjectRepository.save(existingTeacherSubject);
        return modelMapper.map(updatedTeacherSubject, TeacherSubjectDto.class);
    }

    public void deleteTeacherSubject(Long id) {
        if (!teacherSubjectRepository.existsById(id)) {
            throw new ResourceNotFoundException("TeacherSubject not found with id: " + id);
        }
        teacherSubjectRepository.deleteById(id);
    }
}
