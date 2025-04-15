package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.ClassDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Class;
import com.intelligentlessonplanning.model.School;
import com.intelligentlessonplanning.model.Teacher;
import com.intelligentlessonplanning.repository.ClassRepository;
import com.intelligentlessonplanning.repository.SchoolRepository;
import com.intelligentlessonplanning.repository.TeacherRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassService {

    private final ClassRepository classRepository;
    private final SchoolRepository schoolRepository;
    private final TeacherRepository teacherRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ClassService(ClassRepository classRepository,
                       SchoolRepository schoolRepository,
                       TeacherRepository teacherRepository,
                       ModelMapper modelMapper) {
        this.classRepository = classRepository;
        this.schoolRepository = schoolRepository;
        this.teacherRepository = teacherRepository;
        this.modelMapper = modelMapper;
    }

    public List<ClassDto> getAllClasses() {
        return classRepository.findAll().stream()
                .map(classEntity -> modelMapper.map(classEntity, ClassDto.class))
                .collect(Collectors.toList());
    }

    public ClassDto getClassById(Long id) {
        Class classEntity = classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + id));
        return modelMapper.map(classEntity, ClassDto.class);
    }

    public List<ClassDto> getClassesBySchool(Long schoolId) {
        return classRepository.findBySchoolId(schoolId).stream()
                .map(classEntity -> modelMapper.map(classEntity, ClassDto.class))
                .collect(Collectors.toList());
    }

    public List<ClassDto> getClassesByGrade(Integer grade) {
        return classRepository.findByGrade(grade).stream()
                .map(classEntity -> modelMapper.map(classEntity, ClassDto.class))
                .collect(Collectors.toList());
    }

    public List<ClassDto> getClassesByHomeroomTeacher(Long teacherId) {
        return classRepository.findByHomeroomTeacherId(teacherId).stream()
                .map(classEntity -> modelMapper.map(classEntity, ClassDto.class))
                .collect(Collectors.toList());
    }

    public ClassDto createClass(ClassDto classDto) {
        Class classEntity = new Class();
        classEntity.setName(classDto.getName());
        classEntity.setGrade(classDto.getGrade());
        classEntity.setStudentsCount(classDto.getStudentsCount());
        
        // Set School
        if (classDto.getSchool() != null && classDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(classDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + classDto.getSchool().getId()));
            classEntity.setSchool(school);
        }
        
        // Set Homeroom Teacher
        if (classDto.getHomeroomTeacher() != null && classDto.getHomeroomTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(classDto.getHomeroomTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + classDto.getHomeroomTeacher().getId()));
            classEntity.setHomeroomTeacher(teacher);
        }
        
        Class savedClass = classRepository.save(classEntity);
        return modelMapper.map(savedClass, ClassDto.class);
    }

    public ClassDto updateClass(Long id, ClassDto classDto) {
        Class existingClass = classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found with id: " + id));
        
        existingClass.setName(classDto.getName());
        existingClass.setGrade(classDto.getGrade());
        existingClass.setStudentsCount(classDto.getStudentsCount());
        
        // Update School
        if (classDto.getSchool() != null && classDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(classDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + classDto.getSchool().getId()));
            existingClass.setSchool(school);
        }
        
        // Update Homeroom Teacher
        if (classDto.getHomeroomTeacher() != null && classDto.getHomeroomTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(classDto.getHomeroomTeacher().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + classDto.getHomeroomTeacher().getId()));
            existingClass.setHomeroomTeacher(teacher);
        }
        
        Class updatedClass = classRepository.save(existingClass);
        return modelMapper.map(updatedClass, ClassDto.class);
    }

    public void deleteClass(Long id) {
        if (!classRepository.existsById(id)) {
            throw new ResourceNotFoundException("Class not found with id: " + id);
        }
        classRepository.deleteById(id);
    }
}
