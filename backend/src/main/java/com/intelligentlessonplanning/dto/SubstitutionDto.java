package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubstitutionDto {
    private Long id;
    private LessonDto lesson;
    private TeacherDto substituteTeacher;
    private RoomDto substituteRoom;
    private LocalDate date;
    private String reason;
}
