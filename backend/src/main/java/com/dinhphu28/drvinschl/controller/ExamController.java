package com.dinhphu28.drvinschl.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.ExamRegistration;
import com.dinhphu28.drvinschl.entity.ExamSession;
import com.dinhphu28.drvinschl.entity.ExamType;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.model.BulkRegisterRequest;
import com.dinhphu28.drvinschl.service.ExamService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/exams")
@RestController
@RequiredArgsConstructor
public class ExamController {
    private final ExamService examService;

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @GetMapping
    public List<ExamSession> getExamSessions(@RequestParam ExamType type) {
        return examService.getExamSessions(type);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @PostMapping
    public ExamSession createExamSession(@RequestBody ExamSession session) {
        return examService.createExamSession(session);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @PostMapping("/{sessionId}/register/{studentId}")
    public ExamRegistration registerStudent(
            @PathVariable UUID sessionId,
            @PathVariable UUID studentId) {
        return examService.registerStudent(sessionId, studentId);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @PutMapping("/registrations/{id}/result")
    public ExamRegistration updateResult(
            @PathVariable UUID id,
            @RequestParam Boolean passed,
            @RequestParam(required = false) String score) {
        return examService.updateResult(id, passed, score);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @PutMapping("/{sessionId}/instructions")
    public ExamSession updateInstructions(
            @PathVariable UUID sessionId,
            @RequestParam String instructions) {
        return examService.updateInstructions(sessionId, instructions);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @GetMapping("/eligible-students")
    public List<Student> getEligibleStudents(@RequestParam ExamType type) {
        return examService.getEligibleStudents(type);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @PostMapping("/bulk-register")
    public List<ExamRegistration> bulkRegister(@RequestBody BulkRegisterRequest request) {
        return examService.bulkRegister(request);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @GetMapping("/retake-list")
    public List<Student> getRetakeList(@RequestParam ExamType type) {
        return examService.getRetakeStudents(type);
    }

    @PreAuthorize("hasRole('GIAO_VU_THI')")
    @PutMapping("/registrations/{id}/mark-retake")
    public ExamRegistration markRetake(@PathVariable UUID id) {
        return examService.markRetake(id);
    }
}
