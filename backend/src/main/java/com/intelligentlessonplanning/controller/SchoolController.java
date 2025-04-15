package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.SchoolDto;
import com.intelligentlessonplanning.service.SchoolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/schools")
@Tag(name = "School Controller", description = "API for managing schools")
public class SchoolController {

    private final SchoolService schoolService;

    @Autowired
    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @GetMapping
    @Operation(summary = "Get all schools", description = "Retrieves a list of all schools")
    public ResponseEntity<List<SchoolDto>> getAllSchools() {
        List<SchoolDto> schools = schoolService.getAllSchools();
        return ResponseEntity.ok(schools);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get school by ID", description = "Retrieves a school by its ID")
    public ResponseEntity<SchoolDto> getSchoolById(@PathVariable Long id) {
        SchoolDto school = schoolService.getSchoolById(id);
        return ResponseEntity.ok(school);
    }

    @GetMapping("/type/{schoolTypeId}")
    @Operation(summary = "Get schools by type", description = "Retrieves schools by school type ID")
    public ResponseEntity<List<SchoolDto>> getSchoolsByType(@PathVariable Long schoolTypeId) {
        List<SchoolDto> schools = schoolService.getSchoolsByType(schoolTypeId);
        return ResponseEntity.ok(schools);
    }

    @PostMapping
    @Operation(summary = "Create a new school", description = "Creates a new school")
    public ResponseEntity<SchoolDto> createSchool(@Valid @RequestBody SchoolDto schoolDto) {
        SchoolDto createdSchool = schoolService.createSchool(schoolDto);
        return new ResponseEntity<>(createdSchool, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a school", description = "Updates an existing school by its ID")
    public ResponseEntity<SchoolDto> updateSchool(@PathVariable Long id, @Valid @RequestBody SchoolDto schoolDto) {
        SchoolDto updatedSchool = schoolService.updateSchool(id, schoolDto);
        return ResponseEntity.ok(updatedSchool);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a school", description = "Deletes a school by its ID")
    public ResponseEntity<Void> deleteSchool(@PathVariable Long id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }
}
