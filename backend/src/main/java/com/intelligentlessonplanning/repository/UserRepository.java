package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
    List<User> findByIsActive(Boolean isActive);
    List<User> findByTeacherId(Long teacherId);
    List<User> findBySchoolId(Long schoolId);
}
