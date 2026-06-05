package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.ExtraRegistration;
import com.dinhphu28.drvinschl.entity.LearningModule;
import com.dinhphu28.drvinschl.entity.LearningProgress;
import com.dinhphu28.drvinschl.entity.ProgressStatus;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.LearningProgressResponse;
import com.dinhphu28.drvinschl.model.StudentProfileResponse;
import com.dinhphu28.drvinschl.model.UpdateStudentProfileRequest;
import com.dinhphu28.drvinschl.repository.ExtraRegistrationRepository;
import com.dinhphu28.drvinschl.repository.LearningProgressRepository;
import com.dinhphu28.drvinschl.repository.PaymentRecordRepository;
import com.dinhphu28.drvinschl.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final LearningProgressRepository learningProgressRepository;
    private final PaymentRecordRepository paymentRecordRepository;
    private final ExtraRegistrationRepository extraRegistrationRepository;
    private final UserContextService userContextService;

    public StudentProfileResponse getProfile(String username) {
        Student student = userContextService.requireStudent(username);
        return toProfileResponse(student);
    }

    @Transactional
    public void upsertProfile(String username, UpdateStudentProfileRequest request) {
        User user = userContextService.requireUser(username);
        Student student = studentRepository.findByUser(user)
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setUser(user);
                    newStudent.setFullName(user.getFirstName() + " " + (user.getLastName() != null ? user.getLastName() : ""));
                    newStudent.setCourseStatus(CourseStatus.DANG_KY);
                    newStudent.setTotalFee(BigDecimal.ZERO);
                    newStudent.setPaidFee(BigDecimal.ZERO);
                    return newStudent;
                });

        student.setPhone(request.phone());
        student.setDob(request.dob());
        if (request.fullName() != null) {
            student.setFullName(request.fullName());
        }
        studentRepository.save(student);
        initLearningProgress(student);
    }

    public List<LearningProgressResponse> getLearningProgress(String username) {
        Student student = userContextService.requireStudent(username);
        return learningProgressRepository.findByStudent(student).stream()
                .map(this::toProgressResponse)
                .toList();
    }

    public List<com.dinhphu28.drvinschl.entity.PaymentRecord> getPayments(String username) {
        Student student = userContextService.requireStudent(username);
        return paymentRecordRepository.findByStudent(student);
    }

    @Transactional
    public ExtraRegistration registerExtra(String username, ExtraRegistration.ExtraType type, Integer hours, BigDecimal fee) {
        Student student = userContextService.requireStudent(username);
        ExtraRegistration reg = new ExtraRegistration();
        reg.setStudent(student);
        reg.setExtraType(type);
        reg.setHours(hours);
        reg.setFee(fee);
        return extraRegistrationRepository.save(reg);
    }

    private void initLearningProgress(Student student) {
        if (!learningProgressRepository.findByStudent(student).isEmpty()) {
            return;
        }
        Arrays.stream(LearningModule.values()).forEach(module -> {
            LearningProgress progress = new LearningProgress();
            progress.setStudent(student);
            progress.setModule(module);
            progress.setStatus(ProgressStatus.NOT_STARTED);
            progress.setCompletedHours(0);
            progress.setRequiredHours(0);
            progress.setTotalKm(0);
            progress.setRemainingKm(0);
            progress.setTotalMinutes(0);
            learningProgressRepository.save(progress);
        });
    }

    public Student requireById(java.util.UUID id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }

    private StudentProfileResponse toProfileResponse(Student student) {
        BigDecimal total = student.getTotalFee() != null ? student.getTotalFee() : BigDecimal.ZERO;
        BigDecimal paid = student.getPaidFee() != null ? student.getPaidFee() : BigDecimal.ZERO;
        return new StudentProfileResponse(
                student.getId(),
                student.getFullName(),
                student.getDob(),
                student.getPhone(),
                student.getCoursePackage(),
                student.getApplicationDate(),
                student.getOpeningDate(),
                student.getClosingDate(),
                student.getSettlementDate(),
                student.getCertificateReceivedDate(),
                total,
                paid,
                total.subtract(paid),
                student.getCourseStatus());
    }

    private LearningProgressResponse toProgressResponse(LearningProgress p) {
        return new LearningProgressResponse(
                p.getId(),
                p.getModule(),
                p.getStatus(),
                p.getCompletedHours(),
                p.getRequiredHours(),
                p.getTotalKm(),
                p.getRemainingKm(),
                p.getTotalMinutes());
    }
}
