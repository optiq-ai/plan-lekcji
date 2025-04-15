package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherPreferenceDto {
    private Long id;
    private TeacherDto teacher;
    private String preferenceType;
    private String preferenceValue;
    private Integer priority;
}
