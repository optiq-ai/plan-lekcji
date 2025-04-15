package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherAvailabilityDto {
    private Long id;
    private TeacherDto teacher;
    private Integer dayOfWeek;
    private TimeSlotDto timeSlot;
    private Boolean isAvailable;
}
