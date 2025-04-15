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
@Table(name = "users", schema = "lesson_planning")
public class User extends BaseEntity {

    @NotBlank
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    
    @NotBlank
    @Column(name = "password", nullable = false)
    private String password;
    
    @NotBlank
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @NotBlank
    @Column(name = "role", nullable = false)
    private String role;
    
    @Column(name = "is_active", columnDefinition = "boolean default true")
    private Boolean isActive;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}
