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
    public Contract recordContract(String salesUsername, UUID studentId, Contract contractData) {
        User sales = userContextService.requireUser(salesUsername);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        student.setAssignedSales(sales);
        studentRepository.save(student);

        contractData.setStudent(student);
        contractData.setSales(sales);
        if (contractData.getCommissionAmount() == null && contractData.getContractAmount() != null) {
            contractData.setCommissionAmount(contractData.getContractAmount().multiply(new BigDecimal("0.05")));
        }
        return contractRepository.save(contractData);
    }

    public List<Contract> getContracts(String salesUsername) {
        User sales = userContextService.requireUser(salesUsername);
        return contractRepository.findBySales(sales);
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
}
