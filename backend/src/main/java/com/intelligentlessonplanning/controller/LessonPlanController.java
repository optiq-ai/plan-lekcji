package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.LessonPlanDto;
import com.intelligentlessonplanning.service.LessonPlanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/lesson-plans")
@Tag(name = "Lesson Plan Controller", description = "API for managing lesson plans")
public class LessonPlanController {

    private final LessonPlanService lessonPlanService;

    @Autowired
    public LessonPlanController(LessonPlanService lessonPlanService) {
        this.lessonPlanService = lessonPlanService;
    }

    @GetMapping
    @Operation(summary = "Get all lesson plans", description = "Retrieves a list of all lesson plans")
    public ResponseEntity<List<LessonPlanDto>> getAllLessonPlans() {
        List<LessonPlanDto> lessonPlans = lessonPlanService.getAllLessonPlans();
        return ResponseEntity.ok(lessonPlans);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get lesson plan by ID", description = "Retrieves a lesson plan by its ID")
    public ResponseEntity<LessonPlanDto> getLessonPlanById(@PathVariable Long id) {
        LessonPlanDto lessonPlan = lessonPlanService.getLessonPlanById(id);
        return ResponseEntity.ok(lessonPlan);
    }

    @GetMapping("/school/{schoolId}")
    @Operation(summary = "Get lesson plans by school", description = "Retrieves lesson plans by school ID")
    public ResponseEntity<List<LessonPlanDto>> getLessonPlansBySchool(@PathVariable Long schoolId) {
        List<LessonPlanDto> lessonPlans = lessonPlanService.getLessonPlansBySchool(schoolId);
        return ResponseEntity.ok(lessonPlans);
    }

    @GetMapping("/active")
    @Operation(summary = "Get active lesson plans", description = "Retrieves all active lesson plans")
    public ResponseEntity<List<LessonPlanDto>> getActiveLessonPlans() {
        List<LessonPlanDto> lessonPlans = lessonPlanService.getActiveLessonPlans();
        return ResponseEntity.ok(lessonPlans);
    }

    @GetMapping("/name/{name}")
    @Operation(summary = "Get lesson plans by name", description = "Retrieves lesson plans containing the given name")
    public ResponseEntity<List<LessonPlanDto>> getLessonPlansByName(@PathVariable String name) {
        List<LessonPlanDto> lessonPlans = lessonPlanService.getLessonPlansByName(name);
        return ResponseEntity.ok(lessonPlans);
    }

    @PostMapping
    @Operation(summary = "Create a new lesson plan", description = "Creates a new lesson plan")
    public ResponseEntity<LessonPlanDto> createLessonPlan(@Valid @RequestBody LessonPlanDto lessonPlanDto) {
        LessonPlanDto createdLessonPlan = lessonPlanService.createLessonPlan(lessonPlanDto);
        return new ResponseEntity<>(createdLessonPlan, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a lesson plan", description = "Updates an existing lesson plan by its ID")
    public ResponseEntity<LessonPlanDto> updateLessonPlan(@PathVariable Long id, @Valid @RequestBody LessonPlanDto lessonPlanDto) {
        LessonPlanDto updatedLessonPlan = lessonPlanService.updateLessonPlan(id, lessonPlanDto);
        return ResponseEntity.ok(updatedLessonPlan);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a lesson plan", description = "Deletes a lesson plan by its ID")
    public ResponseEntity<Void> deleteLessonPlan(@PathVariable Long id) {
        lessonPlanService.deleteLessonPlan(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/optimize")
    @Operation(summary = "Optimize a lesson plan", description = "Optimizes an existing lesson plan using AI algorithms")
    public ResponseEntity<LessonPlanDto> optimizeLessonPlan(@PathVariable Long id, @RequestParam(required = false) String optimizationStyle) {
        LessonPlanDto optimizedLessonPlan = lessonPlanService.optimizeLessonPlan(id, optimizationStyle);
        return ResponseEntity.ok(optimizedLessonPlan);
    }

    @PostMapping("/{id}/clone")
    @Operation(summary = "Clone a lesson plan", description = "Creates a copy of an existing lesson plan")
    public ResponseEntity<LessonPlanDto> cloneLessonPlan(@PathVariable Long id, @RequestParam(required = false) String newName) {
        LessonPlanDto clonedLessonPlan = lessonPlanService.cloneLessonPlan(id, newName);
        return new ResponseEntity<>(clonedLessonPlan, HttpStatus.CREATED);
    }
}
