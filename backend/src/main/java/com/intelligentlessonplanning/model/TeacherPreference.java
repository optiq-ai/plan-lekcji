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
@Table(name = "teacher_preferences", schema = "lesson_planning")
public class TeacherPreference extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;
    
    @NotBlank
    @Column(name = "preference_type", nullable = false)
    private String preferenceType;
    
    @NotBlank
    @Column(name = "preference_value", nullable = false)
    private String preferenceValue;
    
    @Column(name = "priority", columnDefinition = "integer default 1")
    private Integer priority;
}
