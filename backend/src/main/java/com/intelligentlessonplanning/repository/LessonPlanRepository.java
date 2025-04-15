package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.LessonPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LessonPlanRepository extends JpaRepository<LessonPlan, Long> {
    List<LessonPlan> findBySchoolId(Long schoolId);
    List<LessonPlan> findByIsActiveTrue();
    List<LessonPlan> findByStartDateGreaterThanEqual(LocalDate date);
    List<LessonPlan> findByEndDateLessThanEqual(LocalDate date);
    List<LessonPlan> findByPlanStyle(String planStyle);
    List<LessonPlan> findByNameContainingIgnoreCase(String name);
    List<LessonPlan> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(LocalDate startDate, LocalDate endDate);
}
