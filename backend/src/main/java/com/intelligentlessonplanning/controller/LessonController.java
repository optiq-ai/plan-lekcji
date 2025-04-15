package com.intelligentlessonplanning.controller;

import com.intelligentlessonplanning.dto.LessonDto;
import com.intelligentlessonplanning.service.LessonService;
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
@RequestMapping("/api/lessons")
@Tag(name = "Lesson Controller", description = "API for managing lessons")
public class LessonController {

    private final LessonService lessonService;

    @Autowired
    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    @Operation(summary = "Get all lessons", description = "Retrieves a list of all lessons")
    public ResponseEntity<List<LessonDto>> getAllLessons() {
        List<LessonDto> lessons = lessonService.getAllLessons();
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get lesson by ID", description = "Retrieves a lesson by its ID")
    public ResponseEntity<LessonDto> getLessonById(@PathVariable Long id) {
        LessonDto lesson = lessonService.getLessonById(id);
        return ResponseEntity.ok(lesson);
    }

    @GetMapping("/plan/{lessonPlanId}")
    @Operation(summary = "Get lessons by lesson plan", description = "Retrieves lessons by lesson plan ID")
    public ResponseEntity<List<LessonDto>> getLessonsByLessonPlan(@PathVariable Long lessonPlanId) {
        List<LessonDto> lessons = lessonService.getLessonsByLessonPlan(lessonPlanId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/class/{classId}")
    @Operation(summary = "Get lessons by class", description = "Retrieves lessons by class ID")
    public ResponseEntity<List<LessonDto>> getLessonsByClass(@PathVariable Long classId) {
        List<LessonDto> lessons = lessonService.getLessonsByClass(classId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/teacher/{teacherId}")
    @Operation(summary = "Get lessons by teacher", description = "Retrieves lessons by teacher ID")
    public ResponseEntity<List<LessonDto>> getLessonsByTeacher(@PathVariable Long teacherId) {
        List<LessonDto> lessons = lessonService.getLessonsByTeacher(teacherId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/subject/{subjectId}")
    @Operation(summary = "Get lessons by subject", description = "Retrieves lessons by subject ID")
    public ResponseEntity<List<LessonDto>> getLessonsBySubject(@PathVariable Long subjectId) {
        List<LessonDto> lessons = lessonService.getLessonsBySubject(subjectId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/room/{roomId}")
    @Operation(summary = "Get lessons by room", description = "Retrieves lessons by room ID")
    public ResponseEntity<List<LessonDto>> getLessonsByRoom(@PathVariable Long roomId) {
        List<LessonDto> lessons = lessonService.getLessonsByRoom(roomId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/day/{dayOfWeek}")
    @Operation(summary = "Get lessons by day of week", description = "Retrieves lessons by day of week")
    public ResponseEntity<List<LessonDto>> getLessonsByDayOfWeek(@PathVariable DayOfWeek dayOfWeek) {
        List<LessonDto> lessons = lessonService.getLessonsByDayOfWeek(dayOfWeek);
        return ResponseEntity.ok(lessons);
    }

    @PostMapping
    @Operation(summary = "Create a new lesson", description = "Creates a new lesson")
    public ResponseEntity<LessonDto> createLesson(@Valid @RequestBody LessonDto lessonDto) {
        LessonDto createdLesson = lessonService.createLesson(lessonDto);
        return new ResponseEntity<>(createdLesson, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a lesson", description = "Updates an existing lesson by its ID")
    public ResponseEntity<LessonDto> updateLesson(@PathVariable Long id, @Valid @RequestBody LessonDto lessonDto) {
        LessonDto updatedLesson = lessonService.updateLesson(id, lessonDto);
        return ResponseEntity.ok(updatedLesson);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a lesson", description = "Deletes a lesson by its ID")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }
}
