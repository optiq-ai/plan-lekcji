package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherSubjectDto {
    private Long id;
    private TeacherDto teacher;
    private SubjectDto subject;
}
