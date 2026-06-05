package com.dinhphu28.drvinschl.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.MaintenanceRecord;
import com.dinhphu28.drvinschl.entity.Vehicle;
import com.dinhphu28.drvinschl.service.VehicleService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/vehicles")
@RestController
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;

    @PreAuthorize("hasAnyRole('ADMIN', 'QUAN_LY_KHU_VUC', 'GIAO_VU_KHU_VUC')")
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.createVehicle(vehicle);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'QUAN_LY_KHU_VUC')")
    @GetMapping("/{id}")
    public Vehicle getVehicle(@PathVariable UUID id) {
        return vehicleService.getVehicle(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'QUAN_LY_KHU_VUC')")
    @PostMapping("/{id}/maintenance")
    public MaintenanceRecord addMaintenance(@PathVariable UUID id, @RequestBody MaintenanceRecord record) {
        return vehicleService.addMaintenance(id, record);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'QUAN_LY_KHU_VUC')")
    @GetMapping("/{id}/maintenance")
    public List<MaintenanceRecord> getMaintenanceHistory(@PathVariable UUID id) {
        return vehicleService.getMaintenanceHistory(id);
    }
}
