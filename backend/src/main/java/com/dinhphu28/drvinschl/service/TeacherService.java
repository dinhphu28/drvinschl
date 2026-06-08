package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.FuelRecord;
import com.dinhphu28.drvinschl.entity.LeaveRequest;
import com.dinhphu28.drvinschl.entity.LeaveStatus;
import com.dinhphu28.drvinschl.entity.MaintenanceRecord;
import com.dinhphu28.drvinschl.entity.SessionReport;
import com.dinhphu28.drvinschl.entity.SessionType;
import com.dinhphu28.drvinschl.entity.TrainingBooking;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.Vehicle;
import com.dinhphu28.drvinschl.entity.VehicleLog;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.repository.FuelRecordRepository;
import com.dinhphu28.drvinschl.repository.LeaveRequestRepository;
import com.dinhphu28.drvinschl.repository.MaintenanceRecordRepository;
import com.dinhphu28.drvinschl.repository.SessionReportRepository;
import com.dinhphu28.drvinschl.repository.TrainingBookingRepository;
import com.dinhphu28.drvinschl.repository.VehicleLogRepository;
import com.dinhphu28.drvinschl.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final TrainingBookingRepository bookingRepository;
    private final SessionReportRepository sessionReportRepository;
    private final FuelRecordRepository fuelRecordRepository;
    private final VehicleLogRepository vehicleLogRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final VehicleRepository vehicleRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final UserContextService userContextService;

    public List<TrainingBooking> getSchedule(String username) {
        User teacher = userContextService.requireUser(username);
        return bookingRepository.findBySlotTeacher(teacher);
    }

    @Transactional
    public SessionReport submitSessionReport(String username, UUID bookingId, SessionType type,
            LocalDateTime start, LocalDateTime end, Integer km, Integer durationMinutes, String datScreenshot) {
        User teacher = userContextService.requireUser(username);
        TrainingBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        SessionReport report = new SessionReport();
        report.setBooking(booking);
        report.setSessionType(type);
        report.setStartTime(start);
        report.setEndTime(end);
        report.setKm(km);
        report.setDurationMinutes(durationMinutes);
        report.setDatScreenshotUrl(datScreenshot);
        report.setAttendanceMarked(true);
        return sessionReportRepository.save(report);
    }

    @Transactional
    public FuelRecord recordFuel(String username, UUID vehicleId, LocalDate date,
            java.math.BigDecimal liters, String receiptUrl, java.math.BigDecimal amount) {
        User teacher = userContextService.requireUser(username);
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        FuelRecord record = new FuelRecord();
        record.setTeacher(teacher);
        record.setVehicle(vehicle);
        record.setFuelDate(date);
        record.setLiters(liters);
        record.setReceiptUrl(receiptUrl);
        record.setAmount(amount);
        return fuelRecordRepository.save(record);
    }

    @Transactional
    public VehicleLog recordVehicleReturn(String username, UUID vehicleId, Integer odoReturn, LocalDateTime returnTime) {
        User teacher = userContextService.requireUser(username);
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        VehicleLog log = new VehicleLog();
        log.setTeacher(teacher);
        log.setVehicle(vehicle);
        log.setOdoReturn(odoReturn);
        log.setReturnTime(returnTime);
        vehicle.setCurrentOdo(odoReturn);
        vehicleRepository.save(vehicle);
        return vehicleLogRepository.save(log);
    }

    @Transactional
    public LeaveRequest requestLeave(String username, LocalDate start, LocalDate end, String reason) {
        User teacher = userContextService.requireUser(username);
        LeaveRequest request = new LeaveRequest();
        request.setTeacher(teacher);
        request.setStartDate(start);
        request.setEndDate(end);
        request.setReason(reason);
        request.setStatus(LeaveStatus.PENDING);
        return leaveRequestRepository.save(request);
    }

    @Transactional
    public VehicleLog recordVehicleDeparture(String username, UUID vehicleId, Integer odoDeparture,
            boolean isClean, LocalDateTime departureTime) {
        User teacher = userContextService.requireUser(username);
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        VehicleLog log = new VehicleLog();
        log.setTeacher(teacher);
        log.setVehicle(vehicle);
        log.setOdoDeparture(odoDeparture);
        log.setDepartureTime(departureTime);
        log.setClean(isClean);
        return vehicleLogRepository.save(log);
    }

    @Transactional
    public MaintenanceRecord submitMaintenanceRequest(String username, UUID vehicleId, LocalDate maintenanceDate,
            String description, BigDecimal cost) {
        userContextService.requireUser(username);
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        MaintenanceRecord record = new MaintenanceRecord();
        record.setVehicle(vehicle);
        record.setMaintenanceDate(maintenanceDate);
        record.setDescription(description);
        record.setCost(cost);
        record.setApproved(false);
        return maintenanceRecordRepository.save(record);
    }

    public Map<String, Object> getDashboardStats(String username) {
        User teacher = userContextService.requireUser(username);
        LocalDate firstDay = LocalDate.now().withDayOfMonth(1);
        LocalDate lastDay = LocalDate.now().withDayOfMonth(1).plusMonths(1).minusDays(1);
        LocalDateTime start = firstDay.atStartOfDay();
        LocalDateTime end = lastDay.plusDays(1).atStartOfDay();

        List<SessionReport> reports = sessionReportRepository.findByBookingSlotTeacherAndStartTimeBetween(
                teacher, start, end);

        Map<SessionType, Double> hoursByType = reports.stream()
                .filter(r -> r.getDurationMinutes() != null)
                .collect(Collectors.groupingBy(SessionReport::getSessionType,
                        Collectors.summingDouble(r -> r.getDurationMinutes() / 60.0)));

        double totalHours = hoursByType.values().stream().mapToDouble(Double::doubleValue).sum();

        int totalKm = reports.stream()
                .filter(r -> r.getKm() != null)
                .mapToInt(SessionReport::getKm)
                .sum();

        List<FuelRecord> fuelRecords = fuelRecordRepository.findByTeacherAndFuelDateBetween(
                teacher, firstDay, lastDay);

        BigDecimal totalFuel = fuelRecords.stream()
                .map(FuelRecord::getLiters)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> stats = new java.util.LinkedHashMap<>();
        stats.put("hoursByType", hoursByType);
        stats.put("totalHours", totalHours);
        stats.put("totalKm", totalKm);
        stats.put("totalFuel", totalFuel);
        return stats;
    }

    public Map<String, Object> getVehicleInfo(UUID vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        LocalDate firstDay = LocalDate.now().withDayOfMonth(1);
        LocalDate lastDay = LocalDate.now().withDayOfMonth(1).plusMonths(1).minusDays(1);
        LocalDateTime start = firstDay.atStartOfDay();
        LocalDateTime end = lastDay.plusDays(1).atStartOfDay();

        List<VehicleLog> logs = vehicleLogRepository.findByVehicleAndDepartureTimeBetween(
                vehicle, start, end);

        int kmThisMonth = logs.stream()
                .filter(l -> l.getOdoDeparture() != null && l.getOdoReturn() != null)
                .mapToInt(l -> l.getOdoReturn() - l.getOdoDeparture())
                .sum();

        List<FuelRecord> fuelRecords = fuelRecordRepository.findByVehicleAndFuelDateBetween(
                vehicle, firstDay, lastDay);

        BigDecimal fuelThisMonth = fuelRecords.stream()
                .map(FuelRecord::getLiters)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<MaintenanceRecord> maintenanceHistory = maintenanceRecordRepository
                .findByVehicleOrderByMaintenanceDateDesc(vehicle);

        Map<String, Object> info = new java.util.LinkedHashMap<>();
        info.put("vehicleId", vehicle.getId());
        info.put("licensePlate", vehicle.getLicensePlate());
        info.put("model", vehicle.getModel());
        info.put("registrationExpiry", vehicle.getRegistrationExpiry());
        info.put("learnerLicenseExpiry", vehicle.getLearnerLicenseExpiry());
        info.put("insuranceExpiry", vehicle.getInsuranceExpiry());
        info.put("mortgageInfo", vehicle.getMortgageInfo());
        info.put("ownershipInfo", vehicle.getOwnershipInfo());
        info.put("currentOdo", vehicle.getCurrentOdo());
        info.put("isClean", vehicle.isClean());
        info.put("active", vehicle.isActive());
        info.put("kmThisMonth", kmThisMonth);
        info.put("fuelThisMonth", fuelThisMonth);
        info.put("maintenanceHistory", maintenanceHistory);
        return info;
    }
}
