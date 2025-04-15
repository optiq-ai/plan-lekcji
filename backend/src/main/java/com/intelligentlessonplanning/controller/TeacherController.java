package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.TeacherDto;
import com.intelligentlessonplanning.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@Tag(name = "Teacher Controller", description = "API for managing teachers")
public class TeacherController {

    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    @Operation(summary = "Get all teachers", description = "Retrieves a list of all teachers")
    public ResponseEntity<List<TeacherDto>> getAllTeachers() {
        List<TeacherDto> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get teacher by ID", description = "Retrieves a teacher by their ID")
    public ResponseEntity<TeacherDto> getTeacherById(@PathVariable Long id) {
        TeacherDto teacher = teacherService.getTeacherById(id);
        return ResponseEntity.ok(teacher);
    }

    @GetMapping("/school/{schoolId}")
    @Operation(summary = "Get teachers by school", description = "Retrieves teachers by school ID")
    public ResponseEntity<List<TeacherDto>> getTeachersBySchool(@PathVariable Long schoolId) {
        List<TeacherDto> teachers = teacherService.getTeachersBySchool(schoolId);
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/search")
    @Operation(summary = "Search teachers", description = "Searches teachers by name")
    public ResponseEntity<List<TeacherDto>> searchTeachers(@RequestParam String name) {
        List<TeacherDto> teachers = teacherService.searchTeachers(name);
        return ResponseEntity.ok(teachers);
    }

    @PostMapping
    @Operation(summary = "Create a new teacher", description = "Creates a new teacher")
    public ResponseEntity<TeacherDto> createTeacher(@Valid @RequestBody TeacherDto teacherDto) {
        TeacherDto createdTeacher = teacherService.createTeacher(teacherDto);
        return new ResponseEntity<>(createdTeacher, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a teacher", description = "Updates an existing teacher by their ID")
    public ResponseEntity<TeacherDto> updateTeacher(@PathVariable Long id, @Valid @RequestBody TeacherDto teacherDto) {
        TeacherDto updatedTeacher = teacherService.updateTeacher(id, teacherDto);
        return ResponseEntity.ok(updatedTeacher);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a teacher", description = "Deletes a teacher by their ID")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }
}
