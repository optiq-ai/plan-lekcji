package com.intelligentlessonplanning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferenceDto {
    private Long id;
    private UserDto user;
    private String preferenceKey;
    private String preferenceValue;
}
