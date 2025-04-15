package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomAvailabilityDto {
    private Long id;
    private RoomDto room;
    private Integer dayOfWeek;
    private TimeSlotDto timeSlot;
    private Boolean isAvailable;
}
