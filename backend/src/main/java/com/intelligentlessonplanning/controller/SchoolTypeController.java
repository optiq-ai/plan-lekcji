package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.SchoolTypeDto;
import com.intelligentlessonplanning.service.SchoolTypeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/school-types")
@Tag(name = "School Type Controller", description = "API for managing school types")
public class SchoolTypeController {

    private final SchoolTypeService schoolTypeService;

    @Autowired
    public SchoolTypeController(SchoolTypeService schoolTypeService) {
        this.schoolTypeService = schoolTypeService;
    }

    @GetMapping
    @Operation(summary = "Get all school types", description = "Retrieves a list of all school types")
    public ResponseEntity<List<SchoolTypeDto>> getAllSchoolTypes() {
        List<SchoolTypeDto> schoolTypes = schoolTypeService.getAllSchoolTypes();
        return ResponseEntity.ok(schoolTypes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get school type by ID", description = "Retrieves a school type by its ID")
    public ResponseEntity<SchoolTypeDto> getSchoolTypeById(@PathVariable Long id) {
        SchoolTypeDto schoolType = schoolTypeService.getSchoolTypeById(id);
        return ResponseEntity.ok(schoolType);
    }

    @PostMapping
    @Operation(summary = "Create a new school type", description = "Creates a new school type")
    public ResponseEntity<SchoolTypeDto> createSchoolType(@Valid @RequestBody SchoolTypeDto schoolTypeDto) {
        SchoolTypeDto createdSchoolType = schoolTypeService.createSchoolType(schoolTypeDto);
        return new ResponseEntity<>(createdSchoolType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a school type", description = "Updates an existing school type by its ID")
    public ResponseEntity<SchoolTypeDto> updateSchoolType(@PathVariable Long id, @Valid @RequestBody SchoolTypeDto schoolTypeDto) {
        SchoolTypeDto updatedSchoolType = schoolTypeService.updateSchoolType(id, schoolTypeDto);
        return ResponseEntity.ok(updatedSchoolType);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a school type", description = "Deletes a school type by its ID")
    public ResponseEntity<Void> deleteSchoolType(@PathVariable Long id) {
        schoolTypeService.deleteSchoolType(id);
        return ResponseEntity.noContent().build();
    }
}
