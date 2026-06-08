package com.dinhphu28.drvinschl.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.FuelRecord;
import com.dinhphu28.drvinschl.entity.LeaveRequest;
import com.dinhphu28.drvinschl.entity.MaintenanceRecord;
import com.dinhphu28.drvinschl.entity.SessionReport;
import com.dinhphu28.drvinschl.entity.SessionType;
import com.dinhphu28.drvinschl.entity.TrainingBooking;
import com.dinhphu28.drvinschl.entity.VehicleLog;
import com.dinhphu28.drvinschl.service.TeacherService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/teachers")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('GIAO_VIEN')")
public class TeacherController {
    private final TeacherService teacherService;

    @GetMapping("/schedule")
    public List<TrainingBooking> getSchedule(@AuthenticationPrincipal UserDetails userDetails) {
        return teacherService.getSchedule(userDetails.getUsername());
    }

    @PostMapping("/sessions/{bookingId}/report")
    public SessionReport submitReport(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID bookingId,
            @RequestParam SessionType type,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @RequestParam(required = false) Integer km,
            @RequestParam(required = false) Integer durationMinutes,
            @RequestParam(required = false) String datScreenshot) {
        return teacherService.submitSessionReport(
                userDetails.getUsername(), bookingId, type, start, end, km, durationMinutes, datScreenshot);
    }

    @PostMapping("/fuel")
    public FuelRecord recordFuel(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam UUID vehicleId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam java.math.BigDecimal liters,
            @RequestParam(required = false) String receiptUrl,
            @RequestParam(required = false) java.math.BigDecimal amount) {
        return teacherService.recordFuel(userDetails.getUsername(), vehicleId, date, liters, receiptUrl, amount);
    }

    @PostMapping("/vehicles/{vehicleId}/return")
    public VehicleLog recordReturn(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID vehicleId,
            @RequestParam Integer odoReturn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime returnTime) {
        return teacherService.recordVehicleReturn(userDetails.getUsername(), vehicleId, odoReturn, returnTime);
    }

    @PostMapping("/leave")
    public LeaveRequest requestLeave(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            @RequestParam String reason) {
        return teacherService.requestLeave(userDetails.getUsername(), start, end, reason);
    }

    @PostMapping("/vehicles/{vehicleId}/departure")
    public VehicleLog recordDeparture(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID vehicleId,
            @RequestParam Integer odoDeparture,
            @RequestParam boolean isClean,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime departureTime) {
        return teacherService.recordVehicleDeparture(
                userDetails.getUsername(), vehicleId, odoDeparture, isClean, departureTime);
    }

    @PostMapping("/vehicles/{vehicleId}/maintenance-request")
    public MaintenanceRecord submitMaintenanceRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID vehicleId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate maintenanceDate,
            @RequestParam String description,
            @RequestParam(required = false) BigDecimal cost) {
        return teacherService.submitMaintenanceRequest(
                userDetails.getUsername(), vehicleId, maintenanceDate, description, cost);
    }

    @GetMapping("/dashboard-stats")
    public Map<String, Object> getDashboardStats(@AuthenticationPrincipal UserDetails userDetails) {
        return teacherService.getDashboardStats(userDetails.getUsername());
    }

    @GetMapping("/vehicle-info/{vehicleId}")
    public Map<String, Object> getVehicleInfo(@PathVariable UUID vehicleId) {
        return teacherService.getVehicleInfo(vehicleId);
    }
}
