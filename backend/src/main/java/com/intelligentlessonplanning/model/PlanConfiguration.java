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
@Table(name = "plan_configurations", schema = "lesson_planning")
public class PlanConfiguration extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_plan_id", nullable = false)
    private LessonPlan lessonPlan;
    
    @NotBlank
    @Column(name = "config_key", nullable = false)
    private String configKey;
    
    @NotBlank
    @Column(name = "config_value", nullable = false)
    private String configValue;
    
    @Column(name = "description")
    private String description;
}
