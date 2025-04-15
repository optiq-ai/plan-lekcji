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
@Table(name = "teachers", schema = "lesson_planning")
public class Teacher extends BaseEntity {

    @NotBlank
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @NotBlank
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(name = "email", unique = true)
    private String email;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "employment_type")
    private String employmentType;
    
    @Column(name = "hours_per_week")
    private Integer hoursPerWeek;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;
}
