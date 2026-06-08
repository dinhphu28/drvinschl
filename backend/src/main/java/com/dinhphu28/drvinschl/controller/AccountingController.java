package com.dinhphu28.drvinschl.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.FuelRecord;
import com.dinhphu28.drvinschl.entity.PaymentRecord;
import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.model.CreateStudentAccountRequest;
import com.dinhphu28.drvinschl.model.FuelSummaryResponse;
import com.dinhphu28.drvinschl.model.PaymentRequest;
import com.dinhphu28.drvinschl.model.RefundRequest;
import com.dinhphu28.drvinschl.service.AccountingService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/accounting")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('KE_TOAN')")
public class AccountingController {
    private final AccountingService accountingService;

    @PostMapping("/students")
    public Student createStudentAccount(@RequestBody CreateStudentAccountRequest request) {
        return accountingService.createStudentAccount(request);
    }

    @PostMapping("/payments")
    public PaymentRecord recordPayment(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PaymentRequest request) {
        return accountingService.recordPayment(userDetails.getUsername(), request);
    }

    @GetMapping("/fuel")
    public List<FuelRecord> getFuelRecords(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return accountingService.getFuelByDateRange(start, end);
    }

    @GetMapping("/salaries")
    public List<SalaryRecord> getSalaries() {
        return accountingService.getAllSalaries();
    }

    @PostMapping("/refunds")
    public PaymentRecord recordRefund(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody RefundRequest request) {
        return accountingService.recordRefund(userDetails.getUsername(), request);
    }

    @GetMapping("/fuel-summary")
    public FuelSummaryResponse getFuelSummary(
            @RequestParam int year,
            @RequestParam int month) {
        return accountingService.getFuelSummary(year, month);
    }
}
