package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.LessonPlanDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.LessonPlan;
import com.intelligentlessonplanning.model.School;
import com.intelligentlessonplanning.repository.LessonPlanRepository;
import com.intelligentlessonplanning.repository.SchoolRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonPlanService {

    private final LessonPlanRepository lessonPlanRepository;
    private final SchoolRepository schoolRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LessonPlanService(LessonPlanRepository lessonPlanRepository,
                            SchoolRepository schoolRepository,
                            ModelMapper modelMapper) {
        this.lessonPlanRepository = lessonPlanRepository;
        this.schoolRepository = schoolRepository;
        this.modelMapper = modelMapper;
    }

    public List<LessonPlanDto> getAllLessonPlans() {
        return lessonPlanRepository.findAll().stream()
                .map(lessonPlan -> modelMapper.map(lessonPlan, LessonPlanDto.class))
                .collect(Collectors.toList());
    }

    public LessonPlanDto getLessonPlanById(Long id) {
        LessonPlan lessonPlan = lessonPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + id));
        return modelMapper.map(lessonPlan, LessonPlanDto.class);
    }

    public List<LessonPlanDto> getLessonPlansBySchool(Long schoolId) {
        return lessonPlanRepository.findBySchoolId(schoolId).stream()
                .map(lessonPlan -> modelMapper.map(lessonPlan, LessonPlanDto.class))
                .collect(Collectors.toList());
    }
    
    public List<LessonPlanDto> getLessonPlansByName(String name) {
        return lessonPlanRepository.findByNameContainingIgnoreCase(name).stream()
                .map(lessonPlan -> modelMapper.map(lessonPlan, LessonPlanDto.class))
                .collect(Collectors.toList());
    }

    public List<LessonPlanDto> getActiveLessonPlans() {
        return lessonPlanRepository.findByIsActiveTrue().stream()
                .map(lessonPlan -> modelMapper.map(lessonPlan, LessonPlanDto.class))
                .collect(Collectors.toList());
    }

    public List<LessonPlanDto> getLessonPlansByDateRange(LocalDate startDate, LocalDate endDate) {
        return lessonPlanRepository.findByStartDateGreaterThanEqualAndEndDateLessThanEqual(startDate, endDate).stream()
                .map(lessonPlan -> modelMapper.map(lessonPlan, LessonPlanDto.class))
                .collect(Collectors.toList());
    }

    public List<LessonPlanDto> getLessonPlansByPlanStyle(String planStyle) {
        return lessonPlanRepository.findByPlanStyle(planStyle).stream()
                .map(lessonPlan -> modelMapper.map(lessonPlan, LessonPlanDto.class))
                .collect(Collectors.toList());
    }
    
    public LessonPlanDto optimizeLessonPlan(Long id, String optimizationStrategy) {
        LessonPlan lessonPlan = lessonPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + id));
        
        // Implementacja logiki optymalizacji planu lekcji
        // W rzeczywistej aplikacji tutaj byłby algorytm optymalizacyjny
        // Na potrzeby implementacji zwracamy po prostu istniejący plan
        
        return modelMapper.map(lessonPlan, LessonPlanDto.class);
    }
    
    public LessonPlanDto cloneLessonPlan(Long id, String newName) {
        LessonPlan sourceLessonPlan = lessonPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + id));
        
        // Tworzenie kopii planu lekcji
        LessonPlan clonedLessonPlan = new LessonPlan();
        clonedLessonPlan.setName(newName);
        clonedLessonPlan.setDescription(sourceLessonPlan.getDescription() + " (kopia)");
        clonedLessonPlan.setStartDate(sourceLessonPlan.getStartDate());
        clonedLessonPlan.setEndDate(sourceLessonPlan.getEndDate());
        clonedLessonPlan.setIsActive(false); // Kopia nie jest aktywna domyślnie
        clonedLessonPlan.setPlanStyle(sourceLessonPlan.getPlanStyle());
        clonedLessonPlan.setSchool(sourceLessonPlan.getSchool());
        
        LessonPlan savedLessonPlan = lessonPlanRepository.save(clonedLessonPlan);
        return modelMapper.map(savedLessonPlan, LessonPlanDto.class);
    }

    public LessonPlanDto createLessonPlan(LessonPlanDto lessonPlanDto) {
        LessonPlan lessonPlan = new LessonPlan();
        lessonPlan.setName(lessonPlanDto.getName());
        lessonPlan.setDescription(lessonPlanDto.getDescription());
        lessonPlan.setStartDate(lessonPlanDto.getStartDate());
        lessonPlan.setEndDate(lessonPlanDto.getEndDate());
        lessonPlan.setIsActive(lessonPlanDto.getIsActive());
        lessonPlan.setPlanStyle(lessonPlanDto.getPlanStyle());
        
        // Set School
        if (lessonPlanDto.getSchool() != null && lessonPlanDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(lessonPlanDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + lessonPlanDto.getSchool().getId()));
            lessonPlan.setSchool(school);
        }
        
        LessonPlan savedLessonPlan = lessonPlanRepository.save(lessonPlan);
        return modelMapper.map(savedLessonPlan, LessonPlanDto.class);
    }

    public LessonPlanDto updateLessonPlan(Long id, LessonPlanDto lessonPlanDto) {
        LessonPlan existingLessonPlan = lessonPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + id));
        
        existingLessonPlan.setName(lessonPlanDto.getName());
        existingLessonPlan.setDescription(lessonPlanDto.getDescription());
        existingLessonPlan.setStartDate(lessonPlanDto.getStartDate());
        existingLessonPlan.setEndDate(lessonPlanDto.getEndDate());
        existingLessonPlan.setIsActive(lessonPlanDto.getIsActive());
        existingLessonPlan.setPlanStyle(lessonPlanDto.getPlanStyle());
        
        // Update School
        if (lessonPlanDto.getSchool() != null && lessonPlanDto.getSchool().getId() != null) {
            School school = schoolRepository.findById(lessonPlanDto.getSchool().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + lessonPlanDto.getSchool().getId()));
            existingLessonPlan.setSchool(school);
        }
        
        LessonPlan updatedLessonPlan = lessonPlanRepository.save(existingLessonPlan);
        return modelMapper.map(updatedLessonPlan, LessonPlanDto.class);
    }

    public void deleteLessonPlan(Long id) {
        if (!lessonPlanRepository.existsById(id)) {
            throw new ResourceNotFoundException("LessonPlan not found with id: " + id);
        }
        lessonPlanRepository.deleteById(id);
    }
}
