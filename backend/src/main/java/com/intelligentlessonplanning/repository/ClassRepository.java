package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<Class, Long> {
    List<Class> findBySchoolId(Long schoolId);
    List<Class> findByGrade(Integer grade);
    List<Class> findByHomeroomTeacherId(Long teacherId);
}
