package com.dinhphu28.drvinschl.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.FuelRecord;

public interface FuelRecordRepository extends JpaRepository<FuelRecord, UUID> {
    List<FuelRecord> findByFuelDateBetween(LocalDate start, LocalDate end);
}
