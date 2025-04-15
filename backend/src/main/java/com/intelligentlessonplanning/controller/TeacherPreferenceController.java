package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.TeacherPreferenceDto;
import com.intelligentlessonplanning.service.TeacherPreferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/teacher-preferences")
@Tag(name = "Teacher Preference Controller", description = "API for managing teacher preferences")
public class TeacherPreferenceController {

    private final TeacherPreferenceService teacherPreferenceService;

    @Autowired
    public TeacherPreferenceController(TeacherPreferenceService teacherPreferenceService) {
        this.teacherPreferenceService = teacherPreferenceService;
    }

    @GetMapping
    @Operation(summary = "Get all teacher preferences", description = "Retrieves a list of all teacher preferences")
    public ResponseEntity<List<TeacherPreferenceDto>> getAllTeacherPreferences() {
        List<TeacherPreferenceDto> teacherPreferences = teacherPreferenceService.getAllTeacherPreferences();
        return ResponseEntity.ok(teacherPreferences);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get teacher preference by ID", description = "Retrieves a teacher preference by its ID")
    public ResponseEntity<TeacherPreferenceDto> getTeacherPreferenceById(@PathVariable Long id) {
        TeacherPreferenceDto teacherPreference = teacherPreferenceService.getTeacherPreferenceById(id);
        return ResponseEntity.ok(teacherPreference);
    }

    @GetMapping("/teacher/{teacherId}")
    @Operation(summary = "Get preferences by teacher", description = "Retrieves preferences by teacher ID")
    public ResponseEntity<List<TeacherPreferenceDto>> getPreferencesByTeacher(@PathVariable Long teacherId) {
        List<TeacherPreferenceDto> teacherPreferences = teacherPreferenceService.getTeacherPreferencesByTeacher(teacherId);
        return ResponseEntity.ok(teacherPreferences);
    }

    @GetMapping("/type/{preferenceType}")
    @Operation(summary = "Get preferences by type", description = "Retrieves preferences by preference type")
    public ResponseEntity<List<TeacherPreferenceDto>> getPreferencesByType(@PathVariable String preferenceType) {
        List<TeacherPreferenceDto> teacherPreferences = teacherPreferenceService.getTeacherPreferencesByType(preferenceType);
        return ResponseEntity.ok(teacherPreferences);
    }

    @PostMapping
    @Operation(summary = "Create a new teacher preference", description = "Creates a new teacher preference")
    public ResponseEntity<TeacherPreferenceDto> createTeacherPreference(@Valid @RequestBody TeacherPreferenceDto teacherPreferenceDto) {
        TeacherPreferenceDto createdTeacherPreference = teacherPreferenceService.createTeacherPreference(teacherPreferenceDto);
        return new ResponseEntity<>(createdTeacherPreference, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a teacher preference", description = "Updates an existing teacher preference by its ID")
    public ResponseEntity<TeacherPreferenceDto> updateTeacherPreference(@PathVariable Long id, @Valid @RequestBody TeacherPreferenceDto teacherPreferenceDto) {
        TeacherPreferenceDto updatedTeacherPreference = teacherPreferenceService.updateTeacherPreference(id, teacherPreferenceDto);
        return ResponseEntity.ok(updatedTeacherPreference);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a teacher preference", description = "Deletes a teacher preference by its ID")
    public ResponseEntity<Void> deleteTeacherPreference(@PathVariable Long id) {
        teacherPreferenceService.deleteTeacherPreference(id);
        return ResponseEntity.noContent().build();
    }
}
