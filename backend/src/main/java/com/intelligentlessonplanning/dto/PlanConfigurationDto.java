package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanConfigurationDto {
    private Long id;
    private LessonPlanDto lessonPlan;
    private String configKey;
    private String configValue;
    private String description;
}
