package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByEventType(String eventType);
    List<Event> findByStartDateGreaterThanEqual(LocalDateTime startDate);
    List<Event> findByEndDateLessThanEqual(LocalDateTime endDate);
    List<Event> findByStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Event> findByIsAllDay(Boolean isAllDay);
}
