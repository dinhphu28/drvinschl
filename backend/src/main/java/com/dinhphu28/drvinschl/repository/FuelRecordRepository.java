package com.dinhphu28.drvinschl.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.FuelRecord;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.Vehicle;

public interface FuelRecordRepository extends JpaRepository<FuelRecord, UUID> {
    List<FuelRecord> findByFuelDateBetween(LocalDate start, LocalDate end);

    List<FuelRecord> findByTeacherAndFuelDateBetween(User teacher, LocalDate start, LocalDate end);

    List<FuelRecord> findByVehicleAndFuelDateBetween(Vehicle vehicle, LocalDate start, LocalDate end);
}
