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
@Table(name = "user_preferences", schema = "lesson_planning")
public class UserPreference extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotBlank
    @Column(name = "preference_key", nullable = false)
    private String preferenceKey;
    
    @NotBlank
    @Column(name = "preference_value", nullable = false)
    private String preferenceValue;
}
