package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private Long id;
    private String name;
    private Integer capacity;
    private String roomType;
    private String building;
    private Integer floor;
}
