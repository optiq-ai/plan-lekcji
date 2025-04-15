package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.SchoolDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.School;
import com.intelligentlessonplanning.model.SchoolType;
import com.intelligentlessonplanning.repository.SchoolRepository;
import com.intelligentlessonplanning.repository.SchoolTypeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolService {

    private final SchoolRepository schoolRepository;
    private final SchoolTypeRepository schoolTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public SchoolService(SchoolRepository schoolRepository, 
                         SchoolTypeRepository schoolTypeRepository,
                         ModelMapper modelMapper) {
        this.schoolRepository = schoolRepository;
        this.schoolTypeRepository = schoolTypeRepository;
        this.modelMapper = modelMapper;
    }

    public List<SchoolDto> getAllSchools() {
        return schoolRepository.findAll().stream()
                .map(school -> modelMapper.map(school, SchoolDto.class))
                .collect(Collectors.toList());
    }

    public SchoolDto getSchoolById(Long id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));
        return modelMapper.map(school, SchoolDto.class);
    }

    public List<SchoolDto> getSchoolsBySchoolType(Long schoolTypeId) {
        return schoolRepository.findBySchoolTypeId(schoolTypeId).stream()
                .map(school -> modelMapper.map(school, SchoolDto.class))
                .collect(Collectors.toList());
    }

    public SchoolDto createSchool(SchoolDto schoolDto) {
        School school = modelMapper.map(schoolDto, School.class);
        
        // Ensure SchoolType exists
        if (schoolDto.getSchoolType() != null && schoolDto.getSchoolType().getId() != null) {
            SchoolType schoolType = schoolTypeRepository.findById(schoolDto.getSchoolType().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("SchoolType not found with id: " + schoolDto.getSchoolType().getId()));
            school.setSchoolType(schoolType);
        }
        
        School savedSchool = schoolRepository.save(school);
        return modelMapper.map(savedSchool, SchoolDto.class);
    }

    public SchoolDto updateSchool(Long id, SchoolDto schoolDto) {
        School existingSchool = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));
        
        existingSchool.setName(schoolDto.getName());
        existingSchool.setAddress(schoolDto.getAddress());
        
        // Update SchoolType if provided
        if (schoolDto.getSchoolType() != null && schoolDto.getSchoolType().getId() != null) {
            SchoolType schoolType = schoolTypeRepository.findById(schoolDto.getSchoolType().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("SchoolType not found with id: " + schoolDto.getSchoolType().getId()));
            existingSchool.setSchoolType(schoolType);
        }
        
        School updatedSchool = schoolRepository.save(existingSchool);
        return modelMapper.map(updatedSchool, SchoolDto.class);
    }

    public void deleteSchool(Long id) {
        if (!schoolRepository.existsById(id)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }
        schoolRepository.deleteById(id);
    }
}
