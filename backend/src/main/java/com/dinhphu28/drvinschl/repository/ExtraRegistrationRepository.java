package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.ExtraRegistration;
import com.dinhphu28.drvinschl.entity.Student;

public interface ExtraRegistrationRepository extends JpaRepository<ExtraRegistration, UUID> {
    List<ExtraRegistration> findByStudent(Student student);
}
