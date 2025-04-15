package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.SchoolTypeDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.SchoolType;
import com.intelligentlessonplanning.repository.SchoolTypeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolTypeService {

    private final SchoolTypeRepository schoolTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public SchoolTypeService(SchoolTypeRepository schoolTypeRepository, ModelMapper modelMapper) {
        this.schoolTypeRepository = schoolTypeRepository;
        this.modelMapper = modelMapper;
    }

    public List<SchoolTypeDto> getAllSchoolTypes() {
        return schoolTypeRepository.findAll().stream()
                .map(schoolType -> modelMapper.map(schoolType, SchoolTypeDto.class))
                .collect(Collectors.toList());
    }

    public SchoolTypeDto getSchoolTypeById(Long id) {
        SchoolType schoolType = schoolTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SchoolType not found with id: " + id));
        return modelMapper.map(schoolType, SchoolTypeDto.class);
    }

    public SchoolTypeDto createSchoolType(SchoolTypeDto schoolTypeDto) {
        SchoolType schoolType = modelMapper.map(schoolTypeDto, SchoolType.class);
        SchoolType savedSchoolType = schoolTypeRepository.save(schoolType);
        return modelMapper.map(savedSchoolType, SchoolTypeDto.class);
    }

    public SchoolTypeDto updateSchoolType(Long id, SchoolTypeDto schoolTypeDto) {
        SchoolType existingSchoolType = schoolTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SchoolType not found with id: " + id));
        
        existingSchoolType.setName(schoolTypeDto.getName());
        existingSchoolType.setDescription(schoolTypeDto.getDescription());
        
        SchoolType updatedSchoolType = schoolTypeRepository.save(existingSchoolType);
        return modelMapper.map(updatedSchoolType, SchoolTypeDto.class);
    }

    public void deleteSchoolType(Long id) {
        if (!schoolTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("SchoolType not found with id: " + id);
        }
        schoolTypeRepository.deleteById(id);
    }
}
