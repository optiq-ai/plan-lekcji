package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.SubjectDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.Subject;
import com.intelligentlessonplanning.repository.SubjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository, ModelMapper modelMapper) {
        this.subjectRepository = subjectRepository;
        this.modelMapper = modelMapper;
    }

    public List<SubjectDto> getAllSubjects() {
        return subjectRepository.findAll().stream()
                .map(subject -> modelMapper.map(subject, SubjectDto.class))
                .collect(Collectors.toList());
    }

    public SubjectDto getSubjectById(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));
        return modelMapper.map(subject, SubjectDto.class);
    }

    public List<SubjectDto> getSubjectsByDifficultyLevel(Integer difficultyLevel) {
        return subjectRepository.findByDifficultyLevel(difficultyLevel).stream()
                .map(subject -> modelMapper.map(subject, SubjectDto.class))
                .collect(Collectors.toList());
    }

    public SubjectDto createSubject(SubjectDto subjectDto) {
        Subject subject = modelMapper.map(subjectDto, Subject.class);
        Subject savedSubject = subjectRepository.save(subject);
        return modelMapper.map(savedSubject, SubjectDto.class);
    }

    public SubjectDto updateSubject(Long id, SubjectDto subjectDto) {
        Subject existingSubject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));
        
        existingSubject.setName(subjectDto.getName());
        existingSubject.setShortName(subjectDto.getShortName());
        existingSubject.setColor(subjectDto.getColor());
        existingSubject.setDifficultyLevel(subjectDto.getDifficultyLevel());
        
        Subject updatedSubject = subjectRepository.save(existingSubject);
        return modelMapper.map(updatedSubject, SubjectDto.class);
    }

    public void deleteSubject(Long id) {
        if (!subjectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Subject not found with id: " + id);
        }
        subjectRepository.deleteById(id);
    }
}
