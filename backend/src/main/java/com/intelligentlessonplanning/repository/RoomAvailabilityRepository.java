package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.RoomAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomAvailabilityRepository extends JpaRepository<RoomAvailability, Long> {
    List<RoomAvailability> findByRoomId(Long roomId);
    List<RoomAvailability> findByDayOfWeek(Integer dayOfWeek);
    List<RoomAvailability> findByTimeSlotId(Long timeSlotId);
    List<RoomAvailability> findByRoomIdAndDayOfWeek(Long roomId, Integer dayOfWeek);
    List<RoomAvailability> findByRoomIdAndIsAvailable(Long roomId, Boolean isAvailable);
}
