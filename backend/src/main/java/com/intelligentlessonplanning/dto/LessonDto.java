package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonDto {
    private Long id;
    private LessonPlanDto lessonPlan;
    private ClassDto classEntity;
    private SubjectDto subject;
    private TeacherDto teacher;
    private RoomDto room;
    private Integer dayOfWeek;
    private TimeSlotDto timeSlot;
}
