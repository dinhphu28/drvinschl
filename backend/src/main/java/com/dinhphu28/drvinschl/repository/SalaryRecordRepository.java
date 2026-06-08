package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.entity.User;

public interface SalaryRecordRepository extends JpaRepository<SalaryRecord, UUID> {
    List<SalaryRecord> findByTeacher(User teacher);

    List<SalaryRecord> findByApprovedByAdminTrueAndApprovedByDirectorFalse();
}
