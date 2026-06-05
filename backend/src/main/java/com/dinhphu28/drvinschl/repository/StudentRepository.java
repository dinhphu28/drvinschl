package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByUser(User user);

    List<Student> findByAssignedSales(User sales);

    long countByCourseStatus(CourseStatus status);
}
