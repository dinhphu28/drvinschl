package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.StudentCourseEnrollment;

public interface StudentCourseEnrollmentRepository extends JpaRepository<StudentCourseEnrollment, UUID> {
    List<StudentCourseEnrollment> findByStudentOrderByPrimaryCourseDescApplicationDateDescCreatedDateDesc(Student student);

    Optional<StudentCourseEnrollment> findFirstByStudentAndPrimaryCourseTrue(Student student);

    boolean existsByStudentAndCoursePackage(Student student, String coursePackage);
}
