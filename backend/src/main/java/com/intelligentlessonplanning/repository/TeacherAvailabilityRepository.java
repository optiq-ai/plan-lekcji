package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.TeacherAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherAvailabilityRepository extends JpaRepository<TeacherAvailability, Long> {
    List<TeacherAvailability> findByTeacherId(Long teacherId);
    List<TeacherAvailability> findByDayOfWeek(Integer dayOfWeek);
    List<TeacherAvailability> findByTimeSlotId(Long timeSlotId);
    List<TeacherAvailability> findByTeacherIdAndDayOfWeek(Long teacherId, Integer dayOfWeek);
    List<TeacherAvailability> findByTeacherIdAndIsAvailable(Long teacherId, Boolean isAvailable);
}
