package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.RoomEquipmentDto;
import com.intelligentlessonplanning.service.RoomEquipmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/room-equipment")
@Tag(name = "Room Equipment Controller", description = "API for managing room equipment")
public class RoomEquipmentController {

    private final RoomEquipmentService roomEquipmentService;

    @Autowired
    public RoomEquipmentController(RoomEquipmentService roomEquipmentService) {
        this.roomEquipmentService = roomEquipmentService;
    }

    @GetMapping
    @Operation(summary = "Get all room equipment", description = "Retrieves a list of all room equipment")
    public ResponseEntity<List<RoomEquipmentDto>> getAllRoomEquipment() {
        List<RoomEquipmentDto> roomEquipment = roomEquipmentService.getAllRoomEquipment();
        return ResponseEntity.ok(roomEquipment);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room equipment by ID", description = "Retrieves room equipment by its ID")
    public ResponseEntity<RoomEquipmentDto> getRoomEquipmentById(@PathVariable Long id) {
        RoomEquipmentDto roomEquipment = roomEquipmentService.getRoomEquipmentById(id);
        return ResponseEntity.ok(roomEquipment);
    }

    @GetMapping("/room/{roomId}")
    @Operation(summary = "Get equipment by room", description = "Retrieves all equipment for a specific room")
    public ResponseEntity<List<RoomEquipmentDto>> getEquipmentByRoom(@PathVariable Long roomId) {
        List<RoomEquipmentDto> roomEquipment = roomEquipmentService.getRoomEquipmentByRoom(roomId);
        return ResponseEntity.ok(roomEquipment);
    }

    @GetMapping("/type/{equipmentType}")
    @Operation(summary = "Get rooms by equipment type", description = "Retrieves all rooms that have a specific type of equipment")
    public ResponseEntity<List<RoomEquipmentDto>> getRoomsByEquipmentType(@PathVariable String equipmentType) {
        List<RoomEquipmentDto> roomEquipment = roomEquipmentService.getRoomEquipmentByType(equipmentType);
        return ResponseEntity.ok(roomEquipment);
    }

    @PostMapping
    @Operation(summary = "Create new room equipment", description = "Creates a new room equipment entry")
    public ResponseEntity<RoomEquipmentDto> createRoomEquipment(@Valid @RequestBody RoomEquipmentDto roomEquipmentDto) {
        RoomEquipmentDto createdRoomEquipment = roomEquipmentService.createRoomEquipment(roomEquipmentDto);
        return new ResponseEntity<>(createdRoomEquipment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update room equipment", description = "Updates an existing room equipment entry by its ID")
    public ResponseEntity<RoomEquipmentDto> updateRoomEquipment(@PathVariable Long id, @Valid @RequestBody RoomEquipmentDto roomEquipmentDto) {
        RoomEquipmentDto updatedRoomEquipment = roomEquipmentService.updateRoomEquipment(id, roomEquipmentDto);
        return ResponseEntity.ok(updatedRoomEquipment);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete room equipment", description = "Deletes a room equipment entry by its ID")
    public ResponseEntity<Void> deleteRoomEquipment(@PathVariable Long id) {
        roomEquipmentService.deleteRoomEquipment(id);
        return ResponseEntity.noContent().build();
    }
}
