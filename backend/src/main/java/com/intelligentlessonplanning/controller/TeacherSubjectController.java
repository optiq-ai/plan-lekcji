package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.TeacherSubjectDto;
import com.intelligentlessonplanning.service.TeacherSubjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/teacher-subjects")
@Tag(name = "Teacher Subject Controller", description = "API for managing teacher-subject relationships")
public class TeacherSubjectController {

    private final TeacherSubjectService teacherSubjectService;

    @Autowired
    public TeacherSubjectController(TeacherSubjectService teacherSubjectService) {
        this.teacherSubjectService = teacherSubjectService;
    }

    @GetMapping
    @Operation(summary = "Get all teacher-subject relationships", description = "Retrieves a list of all teacher-subject relationships")
    public ResponseEntity<List<TeacherSubjectDto>> getAllTeacherSubjects() {
        List<TeacherSubjectDto> teacherSubjects = teacherSubjectService.getAllTeacherSubjects();
        return ResponseEntity.ok(teacherSubjects);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get teacher-subject by ID", description = "Retrieves a teacher-subject relationship by its ID")
    public ResponseEntity<TeacherSubjectDto> getTeacherSubjectById(@PathVariable Long id) {
        TeacherSubjectDto teacherSubject = teacherSubjectService.getTeacherSubjectById(id);
        return ResponseEntity.ok(teacherSubject);
    }

    @GetMapping("/teacher/{teacherId}")
    @Operation(summary = "Get subjects by teacher", description = "Retrieves all subjects taught by a specific teacher")
    public ResponseEntity<List<TeacherSubjectDto>> getSubjectsByTeacher(@PathVariable Long teacherId) {
        List<TeacherSubjectDto> teacherSubjects = teacherSubjectService.getTeacherSubjectsByTeacher(teacherId);
        return ResponseEntity.ok(teacherSubjects);
    }

    @GetMapping("/subject/{subjectId}")
    @Operation(summary = "Get teachers by subject", description = "Retrieves all teachers who teach a specific subject")
    public ResponseEntity<List<TeacherSubjectDto>> getTeachersBySubject(@PathVariable Long subjectId) {
        List<TeacherSubjectDto> teacherSubjects = teacherSubjectService.getTeacherSubjectsBySubject(subjectId);
        return ResponseEntity.ok(teacherSubjects);
    }

    @PostMapping
    @Operation(summary = "Create a new teacher-subject relationship", description = "Creates a new teacher-subject relationship")
    public ResponseEntity<TeacherSubjectDto> createTeacherSubject(@Valid @RequestBody TeacherSubjectDto teacherSubjectDto) {
        TeacherSubjectDto createdTeacherSubject = teacherSubjectService.createTeacherSubject(teacherSubjectDto);
        return new ResponseEntity<>(createdTeacherSubject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a teacher-subject relationship", description = "Updates an existing teacher-subject relationship by its ID")
    public ResponseEntity<TeacherSubjectDto> updateTeacherSubject(@PathVariable Long id, @Valid @RequestBody TeacherSubjectDto teacherSubjectDto) {
        TeacherSubjectDto updatedTeacherSubject = teacherSubjectService.updateTeacherSubject(id, teacherSubjectDto);
        return ResponseEntity.ok(updatedTeacherSubject);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a teacher-subject relationship", description = "Deletes a teacher-subject relationship by its ID")
    public ResponseEntity<Void> deleteTeacherSubject(@PathVariable Long id) {
        teacherSubjectService.deleteTeacherSubject(id);
        return ResponseEntity.noContent().build();
    }
}
