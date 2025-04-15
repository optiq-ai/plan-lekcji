package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassDto {
    private Long id;
    private String name;
    private SchoolDto school;
    private Integer grade;
    private TeacherDto homeroomTeacher;
    private Integer studentsCount;
}
