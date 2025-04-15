package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.ClassDto;
import com.intelligentlessonplanning.service.ClassService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/classes")
@Tag(name = "Class Controller", description = "API for managing school classes")
public class ClassController {

    private final ClassService classService;

    @Autowired
    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping
    @Operation(summary = "Get all classes", description = "Retrieves a list of all school classes")
    public ResponseEntity<List<ClassDto>> getAllClasses() {
        List<ClassDto> classes = classService.getAllClasses();
        return ResponseEntity.ok(classes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get class by ID", description = "Retrieves a school class by its ID")
    public ResponseEntity<ClassDto> getClassById(@PathVariable Long id) {
        ClassDto classDto = classService.getClassById(id);
        return ResponseEntity.ok(classDto);
    }

    @GetMapping("/school/{schoolId}")
    @Operation(summary = "Get classes by school", description = "Retrieves classes by school ID")
    public ResponseEntity<List<ClassDto>> getClassesBySchool(@PathVariable Long schoolId) {
        List<ClassDto> classes = classService.getClassesBySchool(schoolId);
        return ResponseEntity.ok(classes);
    }

    @GetMapping("/grade/{grade}")
    @Operation(summary = "Get classes by grade", description = "Retrieves classes by grade level")
    public ResponseEntity<List<ClassDto>> getClassesByGrade(@PathVariable Integer grade) {
        List<ClassDto> classes = classService.getClassesByGrade(grade);
        return ResponseEntity.ok(classes);
    }

    @PostMapping
    @Operation(summary = "Create a new class", description = "Creates a new school class")
    public ResponseEntity<ClassDto> createClass(@Valid @RequestBody ClassDto classDto) {
        ClassDto createdClass = classService.createClass(classDto);
        return new ResponseEntity<>(createdClass, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a class", description = "Updates an existing school class by its ID")
    public ResponseEntity<ClassDto> updateClass(@PathVariable Long id, @Valid @RequestBody ClassDto classDto) {
        ClassDto updatedClass = classService.updateClass(id, classDto);
        return ResponseEntity.ok(updatedClass);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a class", description = "Deletes a school class by its ID")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }
}
