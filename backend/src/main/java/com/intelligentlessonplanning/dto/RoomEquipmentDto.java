package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomEquipmentDto {
    private Long id;
    private RoomDto room;
    private String equipmentName;
    private Integer quantity;
}
