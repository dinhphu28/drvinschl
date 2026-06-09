package com.dinhphu28.drvinschl.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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

import com.dinhphu28.drvinschl.model.CreateStudentCourseEnrollmentRequest;
import com.dinhphu28.drvinschl.model.CreateStudentAccountRequest;
import com.dinhphu28.drvinschl.model.FuelRecordResponse;
import com.dinhphu28.drvinschl.model.FuelSummaryResponse;
import com.dinhphu28.drvinschl.model.PaymentRequest;
import com.dinhphu28.drvinschl.model.RefundRequest;
import com.dinhphu28.drvinschl.model.SalaryRecordResponse;
import com.dinhphu28.drvinschl.model.StudentCourseEnrollmentResponse;
import com.dinhphu28.drvinschl.model.StudentProfileResponse;
import com.dinhphu28.drvinschl.service.AccountingService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/accounting")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('KE_TOAN')")
public class AccountingController {
    private final AccountingService accountingService;

    @PostMapping("/students")
    public StudentProfileResponse createStudentAccount(@RequestBody CreateStudentAccountRequest request) {
        return accountingService.createStudentAccount(request);
    }

    @PostMapping("/student-course-enrollments")
    public StudentCourseEnrollmentResponse createStudentCourseEnrollment(@RequestBody CreateStudentCourseEnrollmentRequest request) {
        return accountingService.createStudentCourseEnrollment(request);
    }

    @PostMapping("/payments")
    public com.dinhphu28.drvinschl.model.PaymentRecordResponse recordPayment(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PaymentRequest request) {
        return accountingService.recordPayment(userDetails.getUsername(), request);
    }

    @GetMapping("/fuel")
    public List<FuelRecordResponse> getFuelRecords(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return accountingService.getFuelByDateRange(start, end);
    }

    @GetMapping("/salaries")
    public List<SalaryRecordResponse> getSalaries() {
        return accountingService.getAllSalaries();
    }

    @PostMapping("/refunds")
    public com.dinhphu28.drvinschl.model.PaymentRecordResponse recordRefund(
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
