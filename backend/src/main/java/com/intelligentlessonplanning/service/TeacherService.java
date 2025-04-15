package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.TeacherDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.School;
import com.intelligentlessonplanning.model.Teacher;
import com.intelligentlessonplanning.repository.SchoolRepository;
import com.intelligentlessonplanning.repository.TeacherRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final SchoolRepository schoolRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, 
                         SchoolRepository schoolRepository,
                         ModelMapper modelMapper) {
        this.teacherRepository = teacherRepository;
        this.schoolRepository = schoolRepository;
        this.modelMapper = modelMapper;
    }

    public List<TeacherDto> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .map(teacher -> modelMapper.map(teacher, TeacherDto.class))
                .collect(Collectors.toList());
    }

    public TeacherDto getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
        return modelMapper.map(teacher, TeacherDto.class);
    }

    public TeacherDto getTeacherByEmail(String email) {
        Teacher teacher = teacherRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with email: " + email));
        return modelMapper.map(teacher, TeacherDto.class);
    }

    public List<TeacherDto> getTeachersByLastName(String lastName) {
        return teacherRepository.findByLastNameContainingIgnoreCase(lastName).stream()
                .map(teacher -> modelMapper.map(teacher, TeacherDto.class))
                .collect(Collectors.toList());
    }

    public List<TeacherDto> getTeachersByEmploymentType(String employmentType) {
        return teacherRepository.findByEmploymentType(employmentType).stream()
                .map(teacher -> modelMapper.map(teacher, TeacherDto.class))
                .collect(Collectors.toList());
    }
    
    public List<TeacherDto> getTeachersBySchool(Long schoolId) {
        return teacherRepository.findBySchoolId(schoolId).stream()
                .map(teacher -> modelMapper.map(teacher, TeacherDto.class))
                .collect(Collectors.toList());
    }
    
    public List<TeacherDto> searchTeachers(String searchTerm) {
        return teacherRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                searchTerm, searchTerm, searchTerm).stream()
                .map(teacher -> modelMapper.map(teacher, TeacherDto.class))
                .collect(Collectors.toList());
    }

    public TeacherDto createTeacher(TeacherDto teacherDto) {
        Teacher teacher = modelMapper.map(teacherDto, Teacher.class);
        
        // Set School if provided
        if (teacherDto.getSchool() != null && teacherDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(teacherDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + teacherDto.getSchool().getId()));
            teacher.setSchool(school);
        }
        
        Teacher savedTeacher = teacherRepository.save(teacher);
        return modelMapper.map(savedTeacher, TeacherDto.class);
    }

    public TeacherDto updateTeacher(Long id, TeacherDto teacherDto) {
        Teacher existingTeacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
        
        existingTeacher.setFirstName(teacherDto.getFirstName());
        existingTeacher.setLastName(teacherDto.getLastName());
        existingTeacher.setEmail(teacherDto.getEmail());
        existingTeacher.setPhone(teacherDto.getPhone());
        existingTeacher.setEmploymentType(teacherDto.getEmploymentType());
        existingTeacher.setHoursPerWeek(teacherDto.getHoursPerWeek());
        
        // Update School if provided
        if (teacherDto.getSchool() != null && teacherDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(teacherDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + teacherDto.getSchool().getId()));
            existingTeacher.setSchool(school);
        }
        
        Teacher updatedTeacher = teacherRepository.save(existingTeacher);
        return modelMapper.map(updatedTeacher, TeacherDto.class);
    }

    public void deleteTeacher(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new ResourceNotFoundException("Teacher not found with id: " + id);
        }
        teacherRepository.deleteById(id);
    }
}
