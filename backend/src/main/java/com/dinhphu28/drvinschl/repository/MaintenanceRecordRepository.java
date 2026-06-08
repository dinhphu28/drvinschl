package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.MaintenanceRecord;
import com.dinhphu28.drvinschl.entity.Vehicle;

public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, UUID> {
    List<MaintenanceRecord> findByVehicleOrderByMaintenanceDateDesc(Vehicle vehicle);

    List<MaintenanceRecord> findByApprovedFalse();
}
