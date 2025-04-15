package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByRoomType(String roomType);
    List<Room> findByBuilding(String building);
    List<Room> findByFloor(Integer floor);
    List<Room> findByCapacityGreaterThanEqual(Integer capacity);
}
