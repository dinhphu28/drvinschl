package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.entity.User;

public interface SalaryRecordRepository extends JpaRepository<SalaryRecord, UUID> {
    List<SalaryRecord> findByTeacher(User teacher);

    java.util.Optional<SalaryRecord> findByTeacherAndMonth(User teacher, String month);

    List<SalaryRecord> findByMonth(String month);

    List<SalaryRecord> findByMonthAndApprovedByDirectorFalse(String month);

    List<SalaryRecord> findByApprovedByAdminTrueAndApprovedByDirectorFalse();
}
