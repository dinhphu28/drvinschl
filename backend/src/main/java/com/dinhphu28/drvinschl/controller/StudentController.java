package com.dinhphu28.drvinschl.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.MediaType;
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

import com.dinhphu28.drvinschl.entity.ExtraRegistration;
import com.dinhphu28.drvinschl.entity.PaymentRecord;
import com.dinhphu28.drvinschl.entity.SessionType;
import com.dinhphu28.drvinschl.entity.TrainingBooking;
import com.dinhphu28.drvinschl.entity.TrainingSlot;
import com.dinhphu28.drvinschl.model.BookSlotRequest;
import com.dinhphu28.drvinschl.model.LearningProgressResponse;
import com.dinhphu28.drvinschl.model.RateTeacherRequest;
import com.dinhphu28.drvinschl.model.StudentProfileResponse;
import com.dinhphu28.drvinschl.model.UpdateStudentProfileRequest;
import com.dinhphu28.drvinschl.service.ExamService;
import com.dinhphu28.drvinschl.service.SchedulingService;
import com.dinhphu28.drvinschl.service.StudentService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/students")
@RestController
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final SchedulingService schedulingService;
    private final ExamService examService;

    @PreAuthorize("hasRole('HOC_VIEN')")
    @GetMapping("/profile")
    public StudentProfileResponse getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return studentService.getProfile(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @PutMapping(value = "/profile", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateStudentProfileRequest request) {
        studentService.upsertProfile(userDetails.getUsername(), request);
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @GetMapping("/progress")
    public List<LearningProgressResponse> getProgress(@AuthenticationPrincipal UserDetails userDetails) {
        return studentService.getLearningProgress(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @GetMapping("/payments")
    public List<PaymentRecord> getPayments(@AuthenticationPrincipal UserDetails userDetails) {
        return studentService.getPayments(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @GetMapping("/slots")
    public List<TrainingSlot> getAvailableSlots(@RequestParam SessionType type) {
        return schedulingService.getAvailableSlots(type);
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @PostMapping("/bookings")
    public TrainingBooking bookSlot(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody BookSlotRequest request) {
        return schedulingService.bookSlot(userDetails.getUsername(), request.slotId());
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @GetMapping("/bookings")
    public List<TrainingBooking> getBookings(@AuthenticationPrincipal UserDetails userDetails) {
        return schedulingService.getStudentBookings(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @PostMapping("/bookings/{id}/rate")
    public void rateTeacher(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable java.util.UUID id,
            @RequestBody RateTeacherRequest request) {
        schedulingService.rateTeacher(userDetails.getUsername(), id, request.rating(), request.comment());
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @GetMapping("/exams")
    public List<com.dinhphu28.drvinschl.entity.ExamRegistration> getExams(
            @AuthenticationPrincipal UserDetails userDetails) {
        return examService.getStudentExams(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @PostMapping("/exams/{sessionId}/retake")
    public com.dinhphu28.drvinschl.entity.ExamRegistration registerRetake(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable java.util.UUID sessionId) {
        return examService.registerRetake(userDetails.getUsername(), sessionId);
    }

    @PreAuthorize("hasRole('HOC_VIEN')")
    @PostMapping("/extra-registration")
    public ExtraRegistration registerExtra(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam ExtraRegistration.ExtraType type,
            @RequestParam(required = false) Integer hours,
            @RequestParam(required = false) BigDecimal fee) {
        return studentService.registerExtra(userDetails.getUsername(), type, hours, fee);
    }
}
