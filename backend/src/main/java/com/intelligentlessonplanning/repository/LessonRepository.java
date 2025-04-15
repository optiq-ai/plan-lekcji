package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByLessonPlanId(Long lessonPlanId);
    List<Lesson> findByClassEntityId(Long classId);
    List<Lesson> findByTeacherId(Long teacherId);
    List<Lesson> findByRoomId(Long roomId);
    List<Lesson> findBySubjectId(Long subjectId);
    List<Lesson> findByDayOfWeekAndTimeSlotId(Integer dayOfWeek, Long timeSlotId);
    
    @Query("SELECT l FROM Lesson l WHERE l.lessonPlan.id = ?1 AND l.dayOfWeek = ?2 ORDER BY l.timeSlot.slotNumber")
    List<Lesson> findByLessonPlanIdAndDayOfWeekOrderByTimeSlot(Long lessonPlanId, Integer dayOfWeek);
    
    @Query("SELECT l FROM Lesson l WHERE l.lessonPlan.id = ?1 AND l.classEntity.id = ?2 ORDER BY l.dayOfWeek, l.timeSlot.slotNumber")
    List<Lesson> findByLessonPlanIdAndClassIdOrderByDayAndTimeSlot(Long lessonPlanId, Long classId);
    
    @Query("SELECT l FROM Lesson l WHERE l.lessonPlan.id = ?1 AND l.teacher.id = ?2 ORDER BY l.dayOfWeek, l.timeSlot.slotNumber")
    List<Lesson> findByLessonPlanIdAndTeacherIdOrderByDayAndTimeSlot(Long lessonPlanId, Long teacherId);
}
