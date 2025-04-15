package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.UserPreferenceDto;
import com.intelligentlessonplanning.service.UserPreferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/user-preferences")
@Tag(name = "User Preference Controller", description = "API for managing user preferences")
public class UserPreferenceController {

    private final UserPreferenceService userPreferenceService;

    @Autowired
    public UserPreferenceController(UserPreferenceService userPreferenceService) {
        this.userPreferenceService = userPreferenceService;
    }

    @GetMapping
    @Operation(summary = "Get all user preferences", description = "Retrieves a list of all user preferences")
    public ResponseEntity<List<UserPreferenceDto>> getAllUserPreferences() {
        List<UserPreferenceDto> userPreferences = userPreferenceService.getAllUserPreferences();
        return ResponseEntity.ok(userPreferences);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user preference by ID", description = "Retrieves a user preference by its ID")
    public ResponseEntity<UserPreferenceDto> getUserPreferenceById(@PathVariable Long id) {
        UserPreferenceDto userPreference = userPreferenceService.getUserPreferenceById(id);
        return ResponseEntity.ok(userPreference);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get preferences by user", description = "Retrieves preferences by user ID")
    public ResponseEntity<List<UserPreferenceDto>> getPreferencesByUser(@PathVariable Long userId) {
        List<UserPreferenceDto> userPreferences = userPreferenceService.getUserPreferencesByUser(userId);
        return ResponseEntity.ok(userPreferences);
    }

    @GetMapping("/key/{preferenceKey}")
    @Operation(summary = "Get preferences by key", description = "Retrieves preferences by preference key")
    public ResponseEntity<List<UserPreferenceDto>> getPreferencesByKey(@PathVariable String preferenceKey) {
        List<UserPreferenceDto> userPreferences = userPreferenceService.getUserPreferencesByKey(preferenceKey);
        return ResponseEntity.ok(userPreferences);
    }

    @PostMapping
    @Operation(summary = "Create a new user preference", description = "Creates a new user preference")
    public ResponseEntity<UserPreferenceDto> createUserPreference(@Valid @RequestBody UserPreferenceDto userPreferenceDto) {
        UserPreferenceDto createdUserPreference = userPreferenceService.createUserPreference(userPreferenceDto);
        return new ResponseEntity<>(createdUserPreference, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a user preference", description = "Updates an existing user preference by its ID")
    public ResponseEntity<UserPreferenceDto> updateUserPreference(@PathVariable Long id, @Valid @RequestBody UserPreferenceDto userPreferenceDto) {
        UserPreferenceDto updatedUserPreference = userPreferenceService.updateUserPreference(id, userPreferenceDto);
        return ResponseEntity.ok(updatedUserPreference);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a user preference", description = "Deletes a user preference by its ID")
    public ResponseEntity<Void> deleteUserPreference(@PathVariable Long id) {
        userPreferenceService.deleteUserPreference(id);
        return ResponseEntity.noContent().build();
    }
}
