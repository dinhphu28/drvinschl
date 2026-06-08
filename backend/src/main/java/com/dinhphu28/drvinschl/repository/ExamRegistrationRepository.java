package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.ExamRegistration;
import com.dinhphu28.drvinschl.entity.ExamSession;
import com.dinhphu28.drvinschl.entity.Student;

public interface ExamRegistrationRepository extends JpaRepository<ExamRegistration, UUID> {
    List<ExamRegistration> findByStudent(Student student);

    long countByPassed(Boolean passed);

    List<ExamRegistration> findByExamSessionAndPassedFalseAndRetakeFalse(ExamSession session);
}
