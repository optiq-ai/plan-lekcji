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
@Table(name = "classes", schema = "lesson_planning")
public class Class extends BaseEntity {

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "school_id")
    private School school;
    
    @Column(name = "grade")
    private Integer grade;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "homeroom_teacher_id")
    private Teacher homeroomTeacher;
    
    @Column(name = "students_count")
    private Integer studentsCount;
}
