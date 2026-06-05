package com.dinhphu28.drvinschl.controller;

import java.util.List;
import java.util.UUID;

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

import com.dinhphu28.drvinschl.entity.Contract;
import com.dinhphu28.drvinschl.entity.Student;
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

    @PostMapping("/contracts/{studentId}")
    public Contract recordContract(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID studentId,
            @RequestBody Contract contract) {
        return salesService.recordContract(userDetails.getUsername(), studentId, contract);
    }

    @GetMapping("/contracts")
    public List<Contract> getContracts(@AuthenticationPrincipal UserDetails userDetails) {
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
