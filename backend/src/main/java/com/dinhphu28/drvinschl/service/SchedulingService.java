package com.dinhphu28.drvinschl.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.BookingStatus;
import com.dinhphu28.drvinschl.entity.SessionType;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.TrainingBooking;
import com.dinhphu28.drvinschl.entity.TrainingSlot;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.Vehicle;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.CreateTrainingSlotRequest;
import com.dinhphu28.drvinschl.repository.TrainingBookingRepository;
import com.dinhphu28.drvinschl.repository.TrainingSlotRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;
import com.dinhphu28.drvinschl.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SchedulingService {
    private final TrainingSlotRepository slotRepository;
    private final TrainingBookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final UserContextService userContextService;

    public List<TrainingSlot> getAvailableSlots(SessionType type) {
        return slotRepository.findBySessionTypeAndAvailableTrueAndStartTimeAfter(type, LocalDateTime.now());
    }

    @Transactional
    public TrainingBooking bookSlot(String username, UUID slotId) {
        Student student = userContextService.requireStudent(username);
        TrainingSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));
        if (!slot.isAvailable()) {
            throw new IllegalArgumentException("Slot is not available");
        }
        slot.setAvailable(false);
        slotRepository.save(slot);

        TrainingBooking booking = new TrainingBooking();
        booking.setStudent(student);
        booking.setSlot(slot);
        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    public List<TrainingBooking> getStudentBookings(String username) {
        Student student = userContextService.requireStudent(username);
        return bookingRepository.findByStudent(student);
    }

    public List<TrainingBooking> getTeacherSchedule(String username) {
        User teacher = userContextService.requireUser(username);
        return bookingRepository.findBySlotTeacher(teacher);
    }

    @Transactional
    public void rateTeacher(String username, UUID bookingId, Integer rating, String comment) {
        Student student = userContextService.requireStudent(username);
        TrainingBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getStudent().getId().equals(student.getId())) {
            throw new IllegalArgumentException("Not your booking");
        }
        booking.setTeacherRating(rating);
        booking.setTeacherComment(comment);
        booking.setStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
    }

    @Transactional
    public TrainingSlot createSlot(CreateTrainingSlotRequest request) {
        TrainingSlot slot = new TrainingSlot();
        slot.setSessionType(request.sessionType());
        slot.setStartTime(request.startTime());
        slot.setEndTime(request.endTime());
        slot.setAvailable(true);
        if (request.teacherId() != null) {
            User teacher = userRepository.findById(request.teacherId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
            slot.setTeacher(teacher);
        }
        if (request.vehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(request.vehicleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
            slot.setVehicle(vehicle);
        }
        return slotRepository.save(slot);
    }

    @Transactional
    public TrainingSlot assignTeacherAndVehicle(UUID slotId, Integer teacherId, UUID vehicleId) {
        TrainingSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
        slot.setTeacher(teacher);
        slot.setVehicle(vehicle);
        return slotRepository.save(slot);
    }

    @Transactional
    public TrainingBooking scheduleStudentForSlot(UUID studentId, SessionType sessionType,
            LocalDateTime startTime, LocalDateTime endTime, Integer teacherId, UUID vehicleId) {
        Student student = userContextService.requireStudentById(studentId);
        TrainingSlot slot = new TrainingSlot();
        slot.setSessionType(sessionType);
        slot.setStartTime(startTime);
        slot.setEndTime(endTime);
        slot.setAvailable(false);
        if (teacherId != null) {
            User teacher = userRepository.findById(teacherId)
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
            slot.setTeacher(teacher);
        }
        if (vehicleId != null) {
            Vehicle vehicle = vehicleRepository.findById(vehicleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
            slot.setVehicle(vehicle);
        }
        slotRepository.save(slot);

        TrainingBooking booking = new TrainingBooking();
        booking.setStudent(student);
        booking.setSlot(slot);
        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    public List<TrainingSlot> getCabinSlots(SessionType type) {
        return slotRepository.findBySessionType(type);
    }

    @Transactional
    public TrainingBooking assignStudentToCabin(UUID slotId, UUID studentId) {
        TrainingSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));
        if (!slot.isAvailable()) {
            throw new IllegalArgumentException("Slot is not available");
        }
        Student student = userContextService.requireStudentById(studentId);
        slot.setAvailable(false);
        slotRepository.save(slot);

        TrainingBooking booking = new TrainingBooking();
        booking.setStudent(student);
        booking.setSlot(slot);
        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    public List<TrainingSlot> getAllSlots(SessionType sessionType, LocalDateTime dateStart, LocalDateTime dateEnd) {
        if (sessionType != null && dateStart != null && dateEnd != null) {
            return slotRepository.findBySessionTypeAndStartTimeAfterAndEndTimeBefore(sessionType, dateStart, dateEnd);
        }
        if (sessionType != null) {
            return slotRepository.findBySessionType(sessionType);
        }
        if (dateStart != null && dateEnd != null) {
            return slotRepository.findByStartTimeAfterAndEndTimeBefore(dateStart, dateEnd);
        }
        return slotRepository.findAll();
    }

    @Transactional
    public TrainingBooking cancelBooking(String username, UUID bookingId) {
        Student student = userContextService.requireStudent(username);
        TrainingBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getStudent().getId().equals(student.getId())) {
            throw new IllegalArgumentException("Booking does not belong to current student");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        TrainingSlot slot = booking.getSlot();
        slot.setAvailable(true);
        slotRepository.save(slot);
        return booking;
    }
}
