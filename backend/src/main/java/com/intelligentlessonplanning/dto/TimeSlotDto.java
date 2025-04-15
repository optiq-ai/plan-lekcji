package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeSlotDto {
    private Long id;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer slotNumber;
}
