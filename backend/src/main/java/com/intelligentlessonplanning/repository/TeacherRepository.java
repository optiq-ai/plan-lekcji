package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByEmail(String email);
    List<Teacher> findByLastNameContainingIgnoreCase(String lastName);
    List<Teacher> findByEmploymentType(String employmentType);
    List<Teacher> findBySchoolId(Long schoolId);
    List<Teacher> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String firstName, String lastName, String email);
}
