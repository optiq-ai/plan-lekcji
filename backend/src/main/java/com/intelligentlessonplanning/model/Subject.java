package com.intelligentlessonplanning.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
@Table(name = "subjects", schema = "lesson_planning")
public class Subject extends BaseEntity {

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "short_name")
    private String shortName;
    
    @Column(name = "color")
    private String color;
    
    @Min(1)
    @Max(5)
    @Column(name = "difficulty_level")
    private Integer difficultyLevel;
}
