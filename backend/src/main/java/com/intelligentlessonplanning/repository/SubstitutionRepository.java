package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.Substitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SubstitutionRepository extends JpaRepository<Substitution, Long> {
    List<Substitution> findByLessonId(Long lessonId);
    List<Substitution> findBySubstituteTeacherId(Long teacherId);
    List<Substitution> findBySubstituteRoomId(Long roomId);
    List<Substitution> findByDate(LocalDate date);
    List<Substitution> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
