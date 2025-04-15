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
@Table(name = "rooms", schema = "lesson_planning")
public class Room extends BaseEntity {

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "capacity")
    private Integer capacity;
    
    @Column(name = "room_type")
    private String roomType;
    
    @Column(name = "building")
    private String building;
    
    @Column(name = "floor")
    private Integer floor;
}
