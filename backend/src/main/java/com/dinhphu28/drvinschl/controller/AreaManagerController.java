package com.dinhphu28.drvinschl.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.LeaveRequest;
import com.dinhphu28.drvinschl.entity.MaintenanceRecord;
import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.entity.Vehicle;
import com.dinhphu28.drvinschl.service.AreaManagerService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/area-manager")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('QUAN_LY_KHU_VUC')")
public class AreaManagerController {
    private final AreaManagerService areaManagerService;

    @GetMapping("/leave-requests")
    public List<LeaveRequest> getPendingLeave() {
        return areaManagerService.getPendingLeaveRequests();
    }

    @PutMapping("/leave-requests/{id}")
    public LeaveRequest approveLeave(@PathVariable UUID id, @RequestParam boolean approved) {
        return areaManagerService.approveLeave(id, approved);
    }

    @PutMapping("/maintenance/{id}")
    public MaintenanceRecord approveMaintenance(@PathVariable UUID id, @RequestParam boolean approved) {
        return areaManagerService.approveMaintenance(id, approved);
    }

    @GetMapping("/maintenance")
    public List<MaintenanceRecord> getPendingMaintenance() {
        return areaManagerService.getPendingMaintenanceRequests();
    }

    @PostMapping("/salaries")
    public SalaryRecord calculateSalary(
            @RequestParam Integer teacherId,
            @RequestParam String month,
            @RequestParam BigDecimal baseSalary,
            @RequestParam(required = false) BigDecimal bonus) {
        return areaManagerService.calculateSalary(teacherId, month, baseSalary, bonus);
    }

    @GetMapping("/vehicles")
    public List<Vehicle> getVehicles() {
        return areaManagerService.getVehicles();
    }
}
