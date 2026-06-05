package com.dinhphu28.drvinschl.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.MaintenanceRecord;
import com.dinhphu28.drvinschl.entity.Vehicle;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.repository.MaintenanceRecordRepository;
import com.dinhphu28.drvinschl.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Transactional
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle getVehicle(UUID id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
    }

    @Transactional
    public MaintenanceRecord addMaintenance(UUID vehicleId, MaintenanceRecord record) {
        Vehicle vehicle = getVehicle(vehicleId);
        record.setVehicle(vehicle);
        return maintenanceRecordRepository.save(record);
    }

    public List<MaintenanceRecord> getMaintenanceHistory(UUID vehicleId) {
        return maintenanceRecordRepository.findAll().stream()
                .filter(m -> m.getVehicle().getId().equals(vehicleId))
                .toList();
    }
}
