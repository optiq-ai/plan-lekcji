package com.intelligentlessonplanning.service;

import com.intelligentlessonplanning.dto.PlanConfigurationDto;
import com.intelligentlessonplanning.exception.ResourceNotFoundException;
import com.intelligentlessonplanning.model.LessonPlan;
import com.intelligentlessonplanning.model.PlanConfiguration;
import com.intelligentlessonplanning.repository.LessonPlanRepository;
import com.intelligentlessonplanning.repository.PlanConfigurationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanConfigurationService {

    private final PlanConfigurationRepository planConfigurationRepository;
    private final LessonPlanRepository lessonPlanRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PlanConfigurationService(PlanConfigurationRepository planConfigurationRepository,
                                   LessonPlanRepository lessonPlanRepository,
                                   ModelMapper modelMapper) {
        this.planConfigurationRepository = planConfigurationRepository;
        this.lessonPlanRepository = lessonPlanRepository;
        this.modelMapper = modelMapper;
    }

    public List<PlanConfigurationDto> getAllPlanConfigurations() {
        return planConfigurationRepository.findAll().stream()
                .map(planConfiguration -> modelMapper.map(planConfiguration, PlanConfigurationDto.class))
                .collect(Collectors.toList());
    }

    public PlanConfigurationDto getPlanConfigurationById(Long id) {
        PlanConfiguration planConfiguration = planConfigurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PlanConfiguration not found with id: " + id));
        return modelMapper.map(planConfiguration, PlanConfigurationDto.class);
    }

    public List<PlanConfigurationDto> getPlanConfigurationsByLessonPlan(Long lessonPlanId) {
        return planConfigurationRepository.findByLessonPlanId(lessonPlanId).stream()
                .map(planConfiguration -> modelMapper.map(planConfiguration, PlanConfigurationDto.class))
                .collect(Collectors.toList());
    }

    public PlanConfigurationDto createPlanConfiguration(PlanConfigurationDto planConfigurationDto) {
        PlanConfiguration planConfiguration = new PlanConfiguration();
        planConfiguration.setConfigKey(planConfigurationDto.getConfigKey());
        planConfiguration.setConfigValue(planConfigurationDto.getConfigValue());
        planConfiguration.setDescription(planConfigurationDto.getDescription());
        
        // Set LessonPlan
        if (planConfigurationDto.getLessonPlan() != null && planConfigurationDto.getLessonPlan().getId() != null) {
            LessonPlan lessonPlan = lessonPlanRepository.findById(planConfigurationDto.getLessonPlan().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + planConfigurationDto.getLessonPlan().getId()));
            planConfiguration.setLessonPlan(lessonPlan);
        }
        
        PlanConfiguration savedPlanConfiguration = planConfigurationRepository.save(planConfiguration);
        return modelMapper.map(savedPlanConfiguration, PlanConfigurationDto.class);
    }

    public PlanConfigurationDto updatePlanConfiguration(Long id, PlanConfigurationDto planConfigurationDto) {
        PlanConfiguration existingPlanConfiguration = planConfigurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PlanConfiguration not found with id: " + id));
        
        existingPlanConfiguration.setConfigKey(planConfigurationDto.getConfigKey());
        existingPlanConfiguration.setConfigValue(planConfigurationDto.getConfigValue());
        existingPlanConfiguration.setDescription(planConfigurationDto.getDescription());
        
        // Update LessonPlan
        if (planConfigurationDto.getLessonPlan() != null && planConfigurationDto.getLessonPlan().getId() != null) {
            LessonPlan lessonPlan = lessonPlanRepository.findById(planConfigurationDto.getLessonPlan().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("LessonPlan not found with id: " + planConfigurationDto.getLessonPlan().getId()));
            existingPlanConfiguration.setLessonPlan(lessonPlan);
        }
        
        PlanConfiguration updatedPlanConfiguration = planConfigurationRepository.save(existingPlanConfiguration);
        return modelMapper.map(updatedPlanConfiguration, PlanConfigurationDto.class);
    }

    public void deletePlanConfiguration(Long id) {
        if (!planConfigurationRepository.existsById(id)) {
            throw new ResourceNotFoundException("PlanConfiguration not found with id: " + id);
        }
        planConfigurationRepository.deleteById(id);
    }
}
