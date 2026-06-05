package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.ExamRegistration;
import com.dinhphu28.drvinschl.entity.ExamSession;
import com.dinhphu28.drvinschl.entity.ExamType;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.repository.ExamRegistrationRepository;
import com.dinhphu28.drvinschl.repository.ExamSessionRepository;
import com.dinhphu28.drvinschl.repository.StudentRepository;
import com.dinhphu28.drvinschl.repository.SystemConfigRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamSessionRepository examSessionRepository;
    private final ExamRegistrationRepository examRegistrationRepository;
    private final SystemConfigRepository systemConfigRepository;
    private final StudentRepository studentRepository;
    private final UserContextService userContextService;

    public List<ExamSession> getExamSessions(ExamType type) {
        return examSessionRepository.findByExamType(type);
    }

    @Transactional
    public ExamSession createExamSession(ExamSession session) {
        return examSessionRepository.save(session);
    }

    @Transactional
    public ExamRegistration registerStudent(UUID examSessionId, UUID studentId) {
        ExamSession session = examSessionRepository.findById(examSessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam session not found"));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        ExamRegistration reg = new ExamRegistration();
        reg.setExamSession(session);
        reg.setStudent(student);
        return examRegistrationRepository.save(reg);
    }

    @Transactional
    public ExamRegistration registerRetake(String username, UUID examSessionId) {
        Student student = userContextService.requireStudent(username);
        ExamSession session = examSessionRepository.findById(examSessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam session not found"));

        BigDecimal retakeFee = systemConfigRepository.findByConfigKey("phi_thi_lai")
                .map(c -> new BigDecimal(c.getConfigValue()))
                .orElse(new BigDecimal("500000"));

        ExamRegistration reg = new ExamRegistration();
        reg.setExamSession(session);
        reg.setStudent(student);
        reg.setRetake(true);
        reg.setRetakeFee(retakeFee);
        return examRegistrationRepository.save(reg);
    }

    public List<ExamRegistration> getStudentExams(String username) {
        Student student = userContextService.requireStudent(username);
        return examRegistrationRepository.findByStudent(student);
    }

    @Transactional
    public ExamRegistration updateResult(UUID registrationId, Boolean passed, String score) {
        ExamRegistration reg = examRegistrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found"));
        reg.setPassed(passed);
        reg.setScore(score);
        return examRegistrationRepository.save(reg);
    }
}
