package com.dinhphu28.drvinschl.service;

import java.util.List;
import java.util.UUID;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.TrainingBooking;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.repository.StudentRepository;
import com.dinhphu28.drvinschl.repository.TrainingBookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpsService {
    private final TrainingBookingRepository bookingRepository;
    private final StudentRepository studentRepository;
    private final SchedulingService schedulingService;

    public List<TrainingBooking> getPendingBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public void assignResources(UUID slotId, Integer teacherId, UUID vehicleId) {
        schedulingService.assignTeacherAndVehicle(slotId, teacherId, vehicleId);
    }

    @Transactional
    public Student markCourseCompleted(UUID studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        student.setCourseStatus(CourseStatus.HOAN_THANH);
        student.setClosingDate(LocalDate.now());
        if (student.getSettlementDate() == null) {
            student.setSettlementDate(LocalDate.now());
        }
        return studentRepository.save(student);
    }
}
