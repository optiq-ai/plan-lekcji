package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.EventDto;
import com.intelligentlessonplanning.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Event Controller", description = "API for managing events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @Operation(summary = "Get all events", description = "Retrieves a list of all events")
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event by ID", description = "Retrieves an event by its ID")
    public ResponseEntity<EventDto> getEventById(@PathVariable Long id) {
        EventDto event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/school/{schoolId}")
    @Operation(summary = "Get events by school", description = "Retrieves events by school ID")
    public ResponseEntity<List<EventDto>> getEventsBySchool(@PathVariable Long schoolId) {
        List<EventDto> events = eventService.getEventsBySchool(schoolId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/date-range")
    @Operation(summary = "Get events by date range", description = "Retrieves events within a date range")
    public ResponseEntity<List<EventDto>> getEventsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<EventDto> events = eventService.getEventsByDateRange(startDate, endDate);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/type/{eventType}")
    @Operation(summary = "Get events by type", description = "Retrieves events by event type")
    public ResponseEntity<List<EventDto>> getEventsByType(@PathVariable String eventType) {
        List<EventDto> events = eventService.getEventsByType(eventType);
        return ResponseEntity.ok(events);
    }

    @PostMapping
    @Operation(summary = "Create a new event", description = "Creates a new event")
    public ResponseEntity<EventDto> createEvent(@Valid @RequestBody EventDto eventDto) {
        EventDto createdEvent = eventService.createEvent(eventDto);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an event", description = "Updates an existing event by its ID")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long id, @Valid @RequestBody EventDto eventDto) {
        EventDto updatedEvent = eventService.updateEvent(id, eventDto);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an event", description = "Deletes an event by its ID")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
