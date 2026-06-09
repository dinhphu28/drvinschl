package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.LeaveRequest;
import com.dinhphu28.drvinschl.entity.LeaveStatus;
import com.dinhphu28.drvinschl.entity.MaintenanceRecord;
import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.repository.LeaveRequestRepository;
import com.dinhphu28.drvinschl.repository.MaintenanceRecordRepository;
import com.dinhphu28.drvinschl.repository.SalaryRecordRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;
import com.dinhphu28.drvinschl.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AreaManagerService {
    private final LeaveRequestRepository leaveRequestRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final SalaryRecordRepository salaryRecordRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;
    private final LeaveWorkflowConfigService leaveWorkflowConfigService;

    public List<LeaveRequest> getPendingLeaveRequests() {
        return leaveRequestRepository.findByStatus(LeaveStatus.PENDING);
    }

    @Transactional
    public LeaveRequest approveLeave(UUID requestId, boolean approved) {
        LeaveRequest request = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));
        if (approved) {
            leaveWorkflowConfigService.validateApproval(request);
        }
        request.setStatus(approved ? LeaveStatus.APPROVED : LeaveStatus.REJECTED);
        return leaveRequestRepository.save(request);
    }

    public List<MaintenanceRecord> getPendingMaintenanceRequests() {
        return maintenanceRecordRepository.findByApprovedFalse();
    }

    @Transactional
    public MaintenanceRecord approveMaintenance(UUID recordId, boolean approved) {
        MaintenanceRecord record = maintenanceRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance record not found"));
        record.setApproved(approved);
        return maintenanceRecordRepository.save(record);
    }

    @Transactional
    public SalaryRecord calculateSalary(Integer teacherId, String month, BigDecimal baseSalary, BigDecimal bonus) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
        BigDecimal bonusAmount = bonus != null ? bonus : BigDecimal.ZERO;
        SalaryRecord salary = new SalaryRecord();
        salary.setTeacher(teacher);
        salary.setMonth(month);
        salary.setBaseSalary(baseSalary);
        salary.setBonus(bonusAmount);
        salary.setTotalAmount(baseSalary.add(bonusAmount));
        salary.setApprovedByAdmin(true);
        return salaryRecordRepository.save(salary);
    }

    public List<com.dinhphu28.drvinschl.entity.Vehicle> getVehicles() {
        return vehicleRepository.findAll();
    }
}
