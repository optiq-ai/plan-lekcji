package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.SubstitutionDto;
import com.intelligentlessonplanning.service.SubstitutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/substitutions")
@Tag(name = "Substitution Controller", description = "API for managing substitutions")
public class SubstitutionController {

    private final SubstitutionService substitutionService;

    @Autowired
    public SubstitutionController(SubstitutionService substitutionService) {
        this.substitutionService = substitutionService;
    }

    @GetMapping
    @Operation(summary = "Get all substitutions", description = "Retrieves a list of all substitutions")
    public ResponseEntity<List<SubstitutionDto>> getAllSubstitutions() {
        List<SubstitutionDto> substitutions = substitutionService.getAllSubstitutions();
        return ResponseEntity.ok(substitutions);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get substitution by ID", description = "Retrieves a substitution by its ID")
    public ResponseEntity<SubstitutionDto> getSubstitutionById(@PathVariable Long id) {
        SubstitutionDto substitution = substitutionService.getSubstitutionById(id);
        return ResponseEntity.ok(substitution);
    }

    @GetMapping("/date/{date}")
    @Operation(summary = "Get substitutions by date", description = "Retrieves substitutions by date")
    public ResponseEntity<List<SubstitutionDto>> getSubstitutionsByDate(@PathVariable LocalDate date) {
        List<SubstitutionDto> substitutions = substitutionService.getSubstitutionsByDate(date);
        return ResponseEntity.ok(substitutions);
    }

    @GetMapping("/teacher/{teacherId}")
    @Operation(summary = "Get substitutions by teacher", description = "Retrieves substitutions by teacher ID")
    public ResponseEntity<List<SubstitutionDto>> getSubstitutionsByTeacher(@PathVariable Long teacherId) {
        List<SubstitutionDto> substitutions = substitutionService.getSubstitutionsByTeacher(teacherId);
        return ResponseEntity.ok(substitutions);
    }

    @GetMapping("/substitute-teacher/{substituteTeacherId}")
    @Operation(summary = "Get substitutions by substitute teacher", description = "Retrieves substitutions by substitute teacher ID")
    public ResponseEntity<List<SubstitutionDto>> getSubstitutionsBySubstituteTeacher(@PathVariable Long substituteTeacherId) {
        List<SubstitutionDto> substitutions = substitutionService.getSubstitutionsBySubstituteTeacher(substituteTeacherId);
        return ResponseEntity.ok(substitutions);
    }

    @GetMapping("/lesson/{lessonId}")
    @Operation(summary = "Get substitutions by lesson", description = "Retrieves substitutions by lesson ID")
    public ResponseEntity<List<SubstitutionDto>> getSubstitutionsByLesson(@PathVariable Long lessonId) {
        List<SubstitutionDto> substitutions = substitutionService.getSubstitutionsByLesson(lessonId);
        return ResponseEntity.ok(substitutions);
    }

    @PostMapping
    @Operation(summary = "Create a new substitution", description = "Creates a new substitution")
    public ResponseEntity<SubstitutionDto> createSubstitution(@Valid @RequestBody SubstitutionDto substitutionDto) {
        SubstitutionDto createdSubstitution = substitutionService.createSubstitution(substitutionDto);
        return new ResponseEntity<>(createdSubstitution, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a substitution", description = "Updates an existing substitution by its ID")
    public ResponseEntity<SubstitutionDto> updateSubstitution(@PathVariable Long id, @Valid @RequestBody SubstitutionDto substitutionDto) {
        SubstitutionDto updatedSubstitution = substitutionService.updateSubstitution(id, substitutionDto);
        return ResponseEntity.ok(updatedSubstitution);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a substitution", description = "Deletes a substitution by its ID")
    public ResponseEntity<Void> deleteSubstitution(@PathVariable Long id) {
        substitutionService.deleteSubstitution(id);
        return ResponseEntity.noContent().build();
    }
}
