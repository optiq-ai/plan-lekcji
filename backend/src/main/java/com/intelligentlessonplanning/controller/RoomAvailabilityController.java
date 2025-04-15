package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.RoomAvailabilityDto;
import com.intelligentlessonplanning.service.RoomAvailabilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/api/room-availabilities")
@Tag(name = "Room Availability Controller", description = "API for managing room availabilities")
public class RoomAvailabilityController {

    private final RoomAvailabilityService roomAvailabilityService;

    @Autowired
    public RoomAvailabilityController(RoomAvailabilityService roomAvailabilityService) {
        this.roomAvailabilityService = roomAvailabilityService;
    }

    @GetMapping
    @Operation(summary = "Get all room availabilities", description = "Retrieves a list of all room availabilities")
    public ResponseEntity<List<RoomAvailabilityDto>> getAllRoomAvailabilities() {
        List<RoomAvailabilityDto> roomAvailabilities = roomAvailabilityService.getAllRoomAvailabilities();
        return ResponseEntity.ok(roomAvailabilities);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room availability by ID", description = "Retrieves a room availability by its ID")
    public ResponseEntity<RoomAvailabilityDto> getRoomAvailabilityById(@PathVariable Long id) {
        RoomAvailabilityDto roomAvailability = roomAvailabilityService.getRoomAvailabilityById(id);
        return ResponseEntity.ok(roomAvailability);
    }

    @GetMapping("/room/{roomId}")
    @Operation(summary = "Get availabilities by room", description = "Retrieves availabilities by room ID")
    public ResponseEntity<List<RoomAvailabilityDto>> getAvailabilitiesByRoom(@PathVariable Long roomId) {
        List<RoomAvailabilityDto> roomAvailabilities = roomAvailabilityService.getRoomAvailabilitiesByRoom(roomId);
        return ResponseEntity.ok(roomAvailabilities);
    }

    @GetMapping("/day/{dayOfWeek}")
    @Operation(summary = "Get availabilities by day of week", description = "Retrieves availabilities by day of week")
    public ResponseEntity<List<RoomAvailabilityDto>> getAvailabilitiesByDayOfWeek(@PathVariable DayOfWeek dayOfWeek) {
        List<RoomAvailabilityDto> roomAvailabilities = roomAvailabilityService.getRoomAvailabilitiesByDayOfWeek(dayOfWeek);
        return ResponseEntity.ok(roomAvailabilities);
    }

    @PostMapping
    @Operation(summary = "Create a new room availability", description = "Creates a new room availability")
    public ResponseEntity<RoomAvailabilityDto> createRoomAvailability(@Valid @RequestBody RoomAvailabilityDto roomAvailabilityDto) {
        RoomAvailabilityDto createdRoomAvailability = roomAvailabilityService.createRoomAvailability(roomAvailabilityDto);
        return new ResponseEntity<>(createdRoomAvailability, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a room availability", description = "Updates an existing room availability by its ID")
    public ResponseEntity<RoomAvailabilityDto> updateRoomAvailability(@PathVariable Long id, @Valid @RequestBody RoomAvailabilityDto roomAvailabilityDto) {
        RoomAvailabilityDto updatedRoomAvailability = roomAvailabilityService.updateRoomAvailability(id, roomAvailabilityDto);
        return ResponseEntity.ok(updatedRoomAvailability);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a room availability", description = "Deletes a room availability by its ID")
    public ResponseEntity<Void> deleteRoomAvailability(@PathVariable Long id) {
        roomAvailabilityService.deleteRoomAvailability(id);
        return ResponseEntity.noContent().build();
    }
}
