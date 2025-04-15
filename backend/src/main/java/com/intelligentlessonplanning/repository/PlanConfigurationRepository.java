package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.PlanConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanConfigurationRepository extends JpaRepository<PlanConfiguration, Long> {
    List<PlanConfiguration> findByLessonPlanId(Long lessonPlanId);
    Optional<PlanConfiguration> findByLessonPlanIdAndConfigKey(Long lessonPlanId, String configKey);
}
