package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.SubjectDto;
import com.intelligentlessonplanning.service.SubjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@Tag(name = "Subject Controller", description = "API for managing subjects")
public class SubjectController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    @Operation(summary = "Get all subjects", description = "Retrieves a list of all subjects")
    public ResponseEntity<List<SubjectDto>> getAllSubjects() {
        List<SubjectDto> subjects = subjectService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get subject by ID", description = "Retrieves a subject by its ID")
    public ResponseEntity<SubjectDto> getSubjectById(@PathVariable Long id) {
        SubjectDto subject = subjectService.getSubjectById(id);
        return ResponseEntity.ok(subject);
    }

    @GetMapping("/name/{name}")
    @Operation(summary = "Get subjects by name", description = "Retrieves subjects containing the given name")
    public ResponseEntity<List<SubjectDto>> getSubjectsByName(@PathVariable String name) {
        List<SubjectDto> subjects = subjectService.getSubjectsByName(name);
        return ResponseEntity.ok(subjects);
    }

    @PostMapping
    @Operation(summary = "Create a new subject", description = "Creates a new subject")
    public ResponseEntity<SubjectDto> createSubject(@Valid @RequestBody SubjectDto subjectDto) {
        SubjectDto createdSubject = subjectService.createSubject(subjectDto);
        return new ResponseEntity<>(createdSubject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a subject", description = "Updates an existing subject by its ID")
    public ResponseEntity<SubjectDto> updateSubject(@PathVariable Long id, @Valid @RequestBody SubjectDto subjectDto) {
        SubjectDto updatedSubject = subjectService.updateSubject(id, subjectDto);
        return ResponseEntity.ok(updatedSubject);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a subject", description = "Deletes a subject by its ID")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}
