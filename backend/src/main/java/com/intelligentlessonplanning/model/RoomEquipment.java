package com.intelligentlessonplanning.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "room_equipment", schema = "lesson_planning")
public class RoomEquipment extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
    
    @NotBlank
    @Column(name = "equipment_name", nullable = false)
    private String equipmentName;
    
    @Column(name = "quantity", columnDefinition = "integer default 1")
    private Integer quantity;
}
