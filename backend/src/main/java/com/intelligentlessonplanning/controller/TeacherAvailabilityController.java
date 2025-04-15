package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.TeacherAvailabilityDto;
import com.intelligentlessonplanning.service.TeacherAvailabilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/api/teacher-availabilities")
@Tag(name = "Teacher Availability Controller", description = "API for managing teacher availabilities")
public class TeacherAvailabilityController {

    private final TeacherAvailabilityService teacherAvailabilityService;

    @Autowired
    public TeacherAvailabilityController(TeacherAvailabilityService teacherAvailabilityService) {
        this.teacherAvailabilityService = teacherAvailabilityService;
    }

    @GetMapping
    @Operation(summary = "Get all teacher availabilities", description = "Retrieves a list of all teacher availabilities")
    public ResponseEntity<List<TeacherAvailabilityDto>> getAllTeacherAvailabilities() {
        List<TeacherAvailabilityDto> teacherAvailabilities = teacherAvailabilityService.getAllTeacherAvailabilities();
        return ResponseEntity.ok(teacherAvailabilities);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get teacher availability by ID", description = "Retrieves a teacher availability by its ID")
    public ResponseEntity<TeacherAvailabilityDto> getTeacherAvailabilityById(@PathVariable Long id) {
        TeacherAvailabilityDto teacherAvailability = teacherAvailabilityService.getTeacherAvailabilityById(id);
        return ResponseEntity.ok(teacherAvailability);
    }

    @GetMapping("/teacher/{teacherId}")
    @Operation(summary = "Get availabilities by teacher", description = "Retrieves availabilities by teacher ID")
    public ResponseEntity<List<TeacherAvailabilityDto>> getAvailabilitiesByTeacher(@PathVariable Long teacherId) {
        List<TeacherAvailabilityDto> teacherAvailabilities = teacherAvailabilityService.getTeacherAvailabilitiesByTeacher(teacherId);
        return ResponseEntity.ok(teacherAvailabilities);
    }

    @GetMapping("/day/{dayOfWeek}")
    @Operation(summary = "Get availabilities by day of week", description = "Retrieves availabilities by day of week")
    public ResponseEntity<List<TeacherAvailabilityDto>> getAvailabilitiesByDayOfWeek(@PathVariable DayOfWeek dayOfWeek) {
        List<TeacherAvailabilityDto> teacherAvailabilities = teacherAvailabilityService.getTeacherAvailabilitiesByDayOfWeek(dayOfWeek);
        return ResponseEntity.ok(teacherAvailabilities);
    }

    @PostMapping
    @Operation(summary = "Create a new teacher availability", description = "Creates a new teacher availability")
    public ResponseEntity<TeacherAvailabilityDto> createTeacherAvailability(@Valid @RequestBody TeacherAvailabilityDto teacherAvailabilityDto) {
        TeacherAvailabilityDto createdTeacherAvailability = teacherAvailabilityService.createTeacherAvailability(teacherAvailabilityDto);
        return new ResponseEntity<>(createdTeacherAvailability, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a teacher availability", description = "Updates an existing teacher availability by its ID")
    public ResponseEntity<TeacherAvailabilityDto> updateTeacherAvailability(@PathVariable Long id, @Valid @RequestBody TeacherAvailabilityDto teacherAvailabilityDto) {
        TeacherAvailabilityDto updatedTeacherAvailability = teacherAvailabilityService.updateTeacherAvailability(id, teacherAvailabilityDto);
        return ResponseEntity.ok(updatedTeacherAvailability);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a teacher availability", description = "Deletes a teacher availability by its ID")
    public ResponseEntity<Void> deleteTeacherAvailability(@PathVariable Long id) {
        teacherAvailabilityService.deleteTeacherAvailability(id);
        return ResponseEntity.noContent().build();
    }
}
