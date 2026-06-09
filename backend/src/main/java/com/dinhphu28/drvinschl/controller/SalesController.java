package com.dinhphu28.drvinschl.controller;

import java.util.UUID;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.model.ContractResponse;
import com.dinhphu28.drvinschl.model.CreateContractRequest;
import com.dinhphu28.drvinschl.model.UpdateContractRequest;
import com.dinhphu28.drvinschl.service.SalesService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/sales")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('KINH_DOANH')")
public class SalesController {
    private final SalesService salesService;

    @GetMapping("/students")
    public List<Student> getAssignedStudents(@AuthenticationPrincipal UserDetails userDetails) {
        return salesService.getAssignedStudents(userDetails.getUsername());
    }

    @PostMapping("/contracts")
    public ContractResponse recordContract(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CreateContractRequest request) {
        return salesService.recordContract(userDetails.getUsername(), request);
    }

    @PutMapping("/contracts/{contractId}")
    public ContractResponse updateContract(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID contractId,
            @RequestBody UpdateContractRequest request) {
        return salesService.updateContract(userDetails.getUsername(), contractId, request);
    }

    @GetMapping("/contracts")
    public java.util.List<ContractResponse> getContracts(@AuthenticationPrincipal UserDetails userDetails) {
        return salesService.getContracts(userDetails.getUsername());
    }

    @PutMapping("/students/{studentId}/dossier")
    public Student updateDossier(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID studentId,
            @RequestParam boolean registrationForm,
            @RequestParam boolean photo,
            @RequestParam boolean healthCheck,
            @RequestParam boolean fee) {
        return salesService.updateDossier(
                userDetails.getUsername(), studentId, registrationForm, photo, healthCheck, fee);
    }
}
