package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByDifficultyLevel(Integer difficultyLevel);
    List<Subject> findByNameContainingIgnoreCase(String name);
}
