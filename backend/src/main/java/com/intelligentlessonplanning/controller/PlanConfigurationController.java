package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.PlanConfigurationDto;
import com.intelligentlessonplanning.service.PlanConfigurationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/plan-configurations")
@Tag(name = "Plan Configuration Controller", description = "API for managing plan configurations")
public class PlanConfigurationController {

    private final PlanConfigurationService planConfigurationService;

    @Autowired
    public PlanConfigurationController(PlanConfigurationService planConfigurationService) {
        this.planConfigurationService = planConfigurationService;
    }

    @GetMapping
    @Operation(summary = "Get all plan configurations", description = "Retrieves a list of all plan configurations")
    public ResponseEntity<List<PlanConfigurationDto>> getAllPlanConfigurations() {
        List<PlanConfigurationDto> planConfigurations = planConfigurationService.getAllPlanConfigurations();
        return ResponseEntity.ok(planConfigurations);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get plan configuration by ID", description = "Retrieves a plan configuration by its ID")
    public ResponseEntity<PlanConfigurationDto> getPlanConfigurationById(@PathVariable Long id) {
        PlanConfigurationDto planConfiguration = planConfigurationService.getPlanConfigurationById(id);
        return ResponseEntity.ok(planConfiguration);
    }

    @GetMapping("/lesson-plan/{lessonPlanId}")
    @Operation(summary = "Get configurations by lesson plan", description = "Retrieves configurations by lesson plan ID")
    public ResponseEntity<List<PlanConfigurationDto>> getConfigurationsByLessonPlan(@PathVariable Long lessonPlanId) {
        List<PlanConfigurationDto> planConfigurations = planConfigurationService.getPlanConfigurationsByLessonPlan(lessonPlanId);
        return ResponseEntity.ok(planConfigurations);
    }

    @PostMapping
    @Operation(summary = "Create a new plan configuration", description = "Creates a new plan configuration")
    public ResponseEntity<PlanConfigurationDto> createPlanConfiguration(@Valid @RequestBody PlanConfigurationDto planConfigurationDto) {
        PlanConfigurationDto createdPlanConfiguration = planConfigurationService.createPlanConfiguration(planConfigurationDto);
        return new ResponseEntity<>(createdPlanConfiguration, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a plan configuration", description = "Updates an existing plan configuration by its ID")
    public ResponseEntity<PlanConfigurationDto> updatePlanConfiguration(@PathVariable Long id, @Valid @RequestBody PlanConfigurationDto planConfigurationDto) {
        PlanConfigurationDto updatedPlanConfiguration = planConfigurationService.updatePlanConfiguration(id, planConfigurationDto);
        return ResponseEntity.ok(updatedPlanConfiguration);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a plan configuration", description = "Deletes a plan configuration by its ID")
    public ResponseEntity<Void> deletePlanConfiguration(@PathVariable Long id) {
        planConfigurationService.deletePlanConfiguration(id);
        return ResponseEntity.noContent().build();
    }
}
