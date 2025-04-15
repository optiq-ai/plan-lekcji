package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.TimeSlotDto;
import com.intelligentlessonplanning.service.TimeSlotService;
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
@RequestMapping("/api/time-slots")
@Tag(name = "Time Slot Controller", description = "API for managing time slots")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    @Autowired
    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    @GetMapping
    @Operation(summary = "Get all time slots", description = "Retrieves a list of all time slots")
    public ResponseEntity<List<TimeSlotDto>> getAllTimeSlots() {
        List<TimeSlotDto> timeSlots = timeSlotService.getAllTimeSlots();
        return ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get time slot by ID", description = "Retrieves a time slot by its ID")
    public ResponseEntity<TimeSlotDto> getTimeSlotById(@PathVariable Long id) {
        TimeSlotDto timeSlot = timeSlotService.getTimeSlotById(id);
        return ResponseEntity.ok(timeSlot);
    }

    @GetMapping("/school/{schoolId}")
    @Operation(summary = "Get time slots by school", description = "Retrieves time slots by school ID")
    public ResponseEntity<List<TimeSlotDto>> getTimeSlotsBySchool(@PathVariable Long schoolId) {
        List<TimeSlotDto> timeSlots = timeSlotService.getTimeSlotsBySchool(schoolId);
        return ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/day/{dayOfWeek}")
    @Operation(summary = "Get time slots by day of week", description = "Retrieves time slots by day of week")
    public ResponseEntity<List<TimeSlotDto>> getTimeSlotsByDayOfWeek(@PathVariable DayOfWeek dayOfWeek) {
        List<TimeSlotDto> timeSlots = timeSlotService.getTimeSlotsByDayOfWeek(dayOfWeek);
        return ResponseEntity.ok(timeSlots);
    }

    @PostMapping
    @Operation(summary = "Create a new time slot", description = "Creates a new time slot")
    public ResponseEntity<TimeSlotDto> createTimeSlot(@Valid @RequestBody TimeSlotDto timeSlotDto) {
        TimeSlotDto createdTimeSlot = timeSlotService.createTimeSlot(timeSlotDto);
        return new ResponseEntity<>(createdTimeSlot, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a time slot", description = "Updates an existing time slot by its ID")
    public ResponseEntity<TimeSlotDto> updateTimeSlot(@PathVariable Long id, @Valid @RequestBody TimeSlotDto timeSlotDto) {
        TimeSlotDto updatedTimeSlot = timeSlotService.updateTimeSlot(id, timeSlotDto);
        return ResponseEntity.ok(updatedTimeSlot);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a time slot", description = "Deletes a time slot by its ID")
    public ResponseEntity<Void> deleteTimeSlot(@PathVariable Long id) {
        timeSlotService.deleteTimeSlot(id);
        return ResponseEntity.noContent().build();
    }
}
