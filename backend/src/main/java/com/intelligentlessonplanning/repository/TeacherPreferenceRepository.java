package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.TeacherPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherPreferenceRepository extends JpaRepository<TeacherPreference, Long> {
    List<TeacherPreference> findByTeacherId(Long teacherId);
    List<TeacherPreference> findByPreferenceType(String preferenceType);
    List<TeacherPreference> findByTeacherIdAndPreferenceType(Long teacherId, String preferenceType);
    List<TeacherPreference> findByPriorityGreaterThanEqual(Integer priority);
}
