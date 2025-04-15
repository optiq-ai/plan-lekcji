package com.intelligentlessonplanning.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "events", schema = "lesson_planning")
public class Event extends BaseEntity {

    @NotBlank
    @Column(name = "title", nullable = false)
    private String title;
    
    @Column(name = "description")
    private String description;
    
    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;
    
    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;
    
    @Column(name = "event_type")
    private String eventType;
    
    @Column(name = "is_all_day", columnDefinition = "boolean default false")
    private Boolean isAllDay;
}
