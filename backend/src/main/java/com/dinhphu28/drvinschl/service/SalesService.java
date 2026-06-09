package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.Contract;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.ContractResponse;
import com.dinhphu28.drvinschl.model.CreateContractRequest;
import com.dinhphu28.drvinschl.model.UpdateContractRequest;
import com.dinhphu28.drvinschl.repository.ContractRepository;
import com.dinhphu28.drvinschl.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SalesService {
    private final ContractRepository contractRepository;
    private final StudentRepository studentRepository;
    private final UserContextService userContextService;

    public List<Student> getAssignedStudents(String salesUsername) {
        User sales = userContextService.requireUser(salesUsername);
        return studentRepository.findByAssignedSales(sales);
    }

    @Transactional
    public ContractResponse recordContract(String salesUsername, CreateContractRequest request) {
        User sales = userContextService.requireUser(salesUsername);
        UUID studentId = request.studentId();
        if (studentId == null) {
            throw new IllegalArgumentException("Student ID is required");
        }
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        student.setAssignedSales(sales);
        studentRepository.save(student);

        Contract contractData = new Contract();
        contractData.setStudent(student);
        contractData.setSales(sales);
        contractData.setAppointmentDate(request.appointmentDate());
        contractData.setSignedDate(request.signedDate());
        contractData.setContractAmount(request.contractAmount());
        contractData.setCommissionAmount(request.commissionAmount());
        if (contractData.getCommissionAmount() == null && contractData.getContractAmount() != null) {
            contractData.setCommissionAmount(contractData.getContractAmount().multiply(new BigDecimal("0.05")));
        }
        return toResponse(contractRepository.save(contractData));
    }

    public List<ContractResponse> getContracts(String salesUsername) {
        User sales = userContextService.requireUser(salesUsername);
        return contractRepository.findBySales(sales).stream().map(this::toResponse).toList();
    }

    @Transactional
    public ContractResponse updateContract(String salesUsername, UUID contractId, UpdateContractRequest request) {
        User sales = userContextService.requireUser(salesUsername);
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
        if (!contract.getSales().getId().equals(sales.getId())) {
            throw new IllegalArgumentException("Không thể sửa hợp đồng của nhân sự khác");
        }
        if (request.appointmentDate() != null) {
            contract.setAppointmentDate(request.appointmentDate());
        }
        if (request.signedDate() != null) {
            contract.setSignedDate(request.signedDate());
        }
        if (request.contractAmount() != null) {
            contract.setContractAmount(request.contractAmount());
        }
        if (request.commissionAmount() != null) {
            contract.setCommissionAmount(request.commissionAmount());
        } else if (request.contractAmount() != null && contract.getCommissionAmount() == null) {
            contract.setCommissionAmount(request.contractAmount().multiply(new BigDecimal("0.05")));
        }
        contract.setSales(sales);
        return toResponse(contractRepository.save(contract));
    }

    @Transactional
    public Student updateDossier(String salesUsername, UUID studentId, boolean registrationForm, boolean photo,
            boolean healthCheck, boolean fee) {
        User sales = userContextService.requireUser(salesUsername);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Contract contract = contractRepository.findBySales(sales).stream()
                .filter(c -> c.getStudent().getId().equals(studentId))
                .findFirst()
                .orElseGet(() -> {
                    Contract c = new Contract();
                    c.setStudent(student);
                    c.setSales(sales);
                    return c;
                });
        contract.setRegistrationFormComplete(registrationForm);
        contract.setPhotoComplete(photo);
        contract.setHealthCheckComplete(healthCheck);
        contract.setFeeComplete(fee);
        contractRepository.save(contract);
        student.setRegistrationFormSubmitted(registrationForm);
        student.setPhotoSubmitted(photo);
        student.setHealthCheckSubmitted(healthCheck);
        if (healthCheck && student.getHealthCheckSubmittedDate() == null) {
            student.setHealthCheckSubmittedDate(LocalDate.now());
        }
        if (!healthCheck) {
            student.setHealthCheckSubmittedDate(null);
        }
        student.setSecondFeePaid(fee);
        studentRepository.save(student);
        return student;
    }

    private ContractResponse toResponse(Contract contract) {
        return new ContractResponse(
                contract.getId(),
                contract.getStudent().getId(),
                contract.getStudent().getFullName(),
                contract.getAppointmentDate(),
                contract.getSignedDate(),
                contract.getContractAmount(),
                contract.getCommissionAmount(),
                contract.getStudent().isRegistrationFormSubmitted(),
                contract.getStudent().isPhotoSubmitted(),
                contract.getStudent().isHealthCheckSubmitted(),
                contract.getStudent().isSecondFeePaid());
    }
}
