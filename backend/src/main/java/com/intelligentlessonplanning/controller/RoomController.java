package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.RoomDto;
import com.intelligentlessonplanning.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@Tag(name = "Room Controller", description = "API for managing rooms")
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    @Operation(summary = "Get all rooms", description = "Retrieves a list of all rooms")
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        List<RoomDto> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room by ID", description = "Retrieves a room by its ID")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        RoomDto room = roomService.getRoomById(id);
        return ResponseEntity.ok(room);
    }

    @GetMapping("/type/{roomType}")
    @Operation(summary = "Get rooms by type", description = "Retrieves rooms by room type")
    public ResponseEntity<List<RoomDto>> getRoomsByType(@PathVariable String roomType) {
        List<RoomDto> rooms = roomService.getRoomsByType(roomType);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/building/{building}")
    @Operation(summary = "Get rooms by building", description = "Retrieves rooms by building")
    public ResponseEntity<List<RoomDto>> getRoomsByBuilding(@PathVariable String building) {
        List<RoomDto> rooms = roomService.getRoomsByBuilding(building);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/floor/{floor}")
    @Operation(summary = "Get rooms by floor", description = "Retrieves rooms by floor")
    public ResponseEntity<List<RoomDto>> getRoomsByFloor(@PathVariable Integer floor) {
        List<RoomDto> rooms = roomService.getRoomsByFloor(floor);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/capacity/{capacity}")
    @Operation(summary = "Get rooms by minimum capacity", description = "Retrieves rooms with capacity greater than or equal to the specified value")
    public ResponseEntity<List<RoomDto>> getRoomsByMinCapacity(@PathVariable Integer capacity) {
        List<RoomDto> rooms = roomService.getRoomsByMinCapacity(capacity);
        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    @Operation(summary = "Create a new room", description = "Creates a new room")
    public ResponseEntity<RoomDto> createRoom(@Valid @RequestBody RoomDto roomDto) {
        RoomDto createdRoom = roomService.createRoom(roomDto);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a room", description = "Updates an existing room by its ID")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @Valid @RequestBody RoomDto roomDto) {
        RoomDto updatedRoom = roomService.updateRoom(id, roomDto);
        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a room", description = "Deletes a room by its ID")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
