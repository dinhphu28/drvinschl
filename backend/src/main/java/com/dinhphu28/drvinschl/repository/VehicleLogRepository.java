package com.dinhphu28.drvinschl.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.Vehicle;
import com.dinhphu28.drvinschl.entity.VehicleLog;

public interface VehicleLogRepository extends JpaRepository<VehicleLog, UUID> {
    List<VehicleLog> findByVehicleAndDepartureTimeBetween(Vehicle vehicle, LocalDateTime start, LocalDateTime end);

    List<VehicleLog> findByTeacherAndDepartureTimeBetween(User teacher, LocalDateTime start, LocalDateTime end);

    Optional<VehicleLog> findFirstByVehicleAndTeacherAndReturnTimeIsNullOrderByDepartureTimeDesc(
            Vehicle vehicle,
            User teacher);
}
