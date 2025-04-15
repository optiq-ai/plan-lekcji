package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    List<TimeSlot> findBySlotNumber(Integer slotNumber);
    List<TimeSlot> findByStartTimeGreaterThanEqual(LocalTime startTime);
    List<TimeSlot> findByEndTimeLessThanEqual(LocalTime endTime);
    List<TimeSlot> findByOrderBySlotNumberAsc();
}
