package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.TrainingBooking;
import com.dinhphu28.drvinschl.entity.User;

public interface TrainingBookingRepository extends JpaRepository<TrainingBooking, UUID> {
    List<TrainingBooking> findByStudent(Student student);

    List<TrainingBooking> findBySlotTeacher(User teacher);
}
