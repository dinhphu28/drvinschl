package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.ExamRegistration;
import com.dinhphu28.drvinschl.entity.ExamPart;
import com.dinhphu28.drvinschl.entity.ExamSession;
import com.dinhphu28.drvinschl.entity.ExamType;
import com.dinhphu28.drvinschl.entity.LearningModule;
import com.dinhphu28.drvinschl.entity.LearningProgress;
import com.dinhphu28.drvinschl.entity.ProgressStatus;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.BulkRegisterRequest;
import com.dinhphu28.drvinschl.repository.ExamRegistrationRepository;
import com.dinhphu28.drvinschl.repository.ExamSessionRepository;
import com.dinhphu28.drvinschl.repository.LearningProgressRepository;
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
    private final LearningProgressRepository learningProgressRepository;
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
    public ExamRegistration registerRetake(String username, UUID examSessionId, ExamPart part) {
        Student student = userContextService.requireStudent(username);
        ExamSession session = examSessionRepository.findById(examSessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam session not found"));

        BigDecimal retakeFee = getRetakeFee(session.getExamType(), part);

        ExamRegistration reg = new ExamRegistration();
        reg.setExamSession(session);
        reg.setStudent(student);
        reg.setRetake(true);
        reg.setRetakePart(part != null ? part : defaultPart(session.getExamType()));
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

    @Transactional
    public ExamSession updateInstructions(UUID sessionId, String instructions) {
        ExamSession session = examSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam session not found"));
        session.setInstructions(instructions);
        return examSessionRepository.save(session);
    }

    public List<Student> getEligibleStudents(ExamType type) {
        List<Student> allStudents = studentRepository.findAll();
        return allStudents.stream()
                .filter(s -> isEligible(s, type))
                .toList();
    }

    @Transactional
    public List<ExamRegistration> bulkRegister(BulkRegisterRequest request) {
        ExamSession session = examSessionRepository.findById(request.examSessionId())
                .orElseThrow(() -> new ResourceNotFoundException("Exam session not found"));

        List<ExamRegistration> registrations = new ArrayList<>();
        for (UUID studentId : request.studentIds()) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Student not found with id: " + studentId));

            ExamRegistration reg = new ExamRegistration();
            reg.setExamSession(session);
            reg.setStudent(student);
            registrations.add(reg);
        }
        return examRegistrationRepository.saveAll(registrations);
    }

    public List<Student> getRetakeStudents(ExamType type) {
        List<ExamSession> sessions = examSessionRepository.findByExamType(type);
        Set<UUID> studentIds = new HashSet<>();
        for (ExamSession session : sessions) {
            List<ExamRegistration> failed = examRegistrationRepository
                    .findByExamSessionAndPassedFalseAndRetakeFalse(session);
            failed.forEach(r -> studentIds.add(r.getStudent().getId()));
        }
        return studentRepository.findAllById(studentIds);
    }

    @Transactional
    public ExamRegistration markRetake(UUID id) {
        ExamRegistration reg = examRegistrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found"));
        reg.setRetake(true);
        BigDecimal retakeFee = getRetakeFee(reg.getExamSession().getExamType(), reg.getRetakePart());
        reg.setRetakeFee(retakeFee);
        return examRegistrationRepository.save(reg);
    }

    private BigDecimal getRetakeFee(ExamType type, ExamPart part) {
        String key = switch (part != null ? part : defaultPart(type)) {
            case LY_THUYET -> "THI_LAI_LY_THUYET";
            case MO_PHONG -> "THI_LAI_MO_PHONG";
            case SA_HINH -> "THI_LAI_SA_HINH";
            case DUONG_TRUONG -> "THI_LAI_DUONG_TRUONG";
            case TOT_NGHIEP -> "THI_LAI_TOT_NGHIEP";
            case SAT_HACH -> "THI_LAI_SAT_HACH";
        };
        String groupedKey = type == ExamType.TOT_NGHIEP ? "THI_LAI_TOT_NGHIEP" : "THI_LAI_SAT_HACH";
        return systemConfigRepository.findByConfigKey(key)
                .or(() -> systemConfigRepository.findByConfigKey(groupedKey))
                .or(() -> systemConfigRepository.findByConfigKey("phi_thi_lai"))
                .map(c -> new BigDecimal(c.getConfigValue()))
                .orElse(new BigDecimal("500000"));
    }

    private ExamPart defaultPart(ExamType type) {
        return type == ExamType.TOT_NGHIEP ? ExamPart.TOT_NGHIEP : ExamPart.SAT_HACH;
    }

    private boolean isEligible(Student student, ExamType type) {
        List<LearningProgress> progressList = learningProgressRepository.findByStudent(student);
        LearningModule[] requiredModules;
        if (type == ExamType.TOT_NGHIEP) {
            requiredModules = new LearningModule[]{
                    LearningModule.LY_THUYET,
                    LearningModule.MO_PHONG,
                    LearningModule.CO_BAN_4H
            };
        } else {
            requiredModules = new LearningModule[]{
                    LearningModule.LY_THUYET,
                    LearningModule.MO_PHONG,
                    LearningModule.CO_BAN_4H,
                    LearningModule.CABIN,
                    LearningModule.DAT,
                    LearningModule.SA_HINH_THO,
                    LearningModule.SA_HINH_CAM_UNG
            };
        }
        for (LearningModule module : requiredModules) {
            boolean completed = progressList.stream().anyMatch(p ->
                    p.getModule() == module && p.getStatus() == ProgressStatus.COMPLETED);
            if (!completed) {
                return false;
            }
        }
        return true;
    }
}
