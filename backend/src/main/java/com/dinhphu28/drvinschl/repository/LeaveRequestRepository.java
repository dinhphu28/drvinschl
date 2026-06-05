package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.LeaveRequest;
import com.dinhphu28.drvinschl.entity.LeaveStatus;
import com.dinhphu28.drvinschl.entity.User;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, UUID> {
    List<LeaveRequest> findByTeacher(User teacher);

    List<LeaveRequest> findByStatus(LeaveStatus status);
}
