package com.dinhphu28.drvinschl.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.FuelRecord;
import com.dinhphu28.drvinschl.entity.LeaveRequest;
import com.dinhphu28.drvinschl.entity.LeaveStatus;
import com.dinhphu28.drvinschl.entity.SessionReport;
import com.dinhphu28.drvinschl.entity.SessionType;
import com.dinhphu28.drvinschl.entity.TrainingBooking;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.Vehicle;
import com.dinhphu28.drvinschl.entity.VehicleLog;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.repository.FuelRecordRepository;
import com.dinhphu28.drvinschl.repository.LeaveRequestRepository;
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
}
