package com.intelligentlessonplanning.repository;

import com.intelligentlessonplanning.model.RoomEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomEquipmentRepository extends JpaRepository<RoomEquipment, Long> {
    List<RoomEquipment> findByRoomId(Long roomId);
    List<RoomEquipment> findByEquipmentNameContainingIgnoreCase(String equipmentName);
}
