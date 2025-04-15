package com.intelligentlessonplanning.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "substitutions", schema = "lesson_planning")
public class Substitution extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "substitute_teacher_id")
    private Teacher substituteTeacher;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "substitute_room_id")
    private Room substituteRoom;
    
    @Column(name = "date", nullable = false)
    private LocalDate date;
    
    @Column(name = "reason")
    private String reason;
}
