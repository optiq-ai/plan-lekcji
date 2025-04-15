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
@Table(name = "school_types", schema = "lesson_planning")
public class SchoolType extends BaseEntity {

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "description")
    private String description;
}
