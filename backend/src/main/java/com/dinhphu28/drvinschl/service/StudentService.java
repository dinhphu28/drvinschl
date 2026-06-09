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
import com.dinhphu28.drvinschl.entity.StudentCourseEnrollment;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.LearningProgressResponse;
import com.dinhphu28.drvinschl.model.ExtraRegistrationResponse;
import com.dinhphu28.drvinschl.model.RichTextConfigResponse;
import com.dinhphu28.drvinschl.model.StudentCourseEnrollmentResponse;
import com.dinhphu28.drvinschl.model.StudentProfileResponse;
import com.dinhphu28.drvinschl.model.UpdateStudentProfileRequest;
import com.dinhphu28.drvinschl.repository.ExtraRegistrationRepository;
import com.dinhphu28.drvinschl.repository.LearningProgressRepository;
import com.dinhphu28.drvinschl.repository.PaymentRecordRepository;
import com.dinhphu28.drvinschl.repository.StudentCourseEnrollmentRepository;
import com.dinhphu28.drvinschl.repository.StudentRepository;
import com.dinhphu28.drvinschl.repository.SystemConfigRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {
    public static final String SAT_HACH_INSTRUCTIONS_KEY = "SAT_HACH_INSTRUCTIONS_RICH_TEXT";
    private static final String DEFAULT_SAT_HACH_INSTRUCTIONS = """
            <h3>Hướng dẫn Thi Sát Hạch</h3>
            <p>Học viên theo dõi lịch thi, giấy tờ cần mang theo và yêu cầu dự thi theo thông báo mới nhất của trung tâm.</p>
            <ul>
              <li>Có mặt đúng giờ theo lịch thi được phân công.</li>
              <li>Mang CCCD/giấy tờ tùy thân hợp lệ và hồ sơ theo yêu cầu.</li>
              <li>Tuân thủ hướng dẫn của cán bộ coi thi và giáo vụ thi.</li>
            </ul>
            """;
    private final StudentRepository studentRepository;
    private final LearningProgressRepository learningProgressRepository;
    private final PaymentRecordRepository paymentRecordRepository;
    private final ExtraRegistrationRepository extraRegistrationRepository;
    private final UserContextService userContextService;
    private final SystemConfigRepository systemConfigRepository;
    private final StudentCourseEnrollmentRepository studentCourseEnrollmentRepository;

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
    public ExtraRegistrationResponse registerExtra(String username, ExtraRegistration.ExtraType type, Integer hours, BigDecimal fee) {
        Student student = userContextService.requireStudent(username);
        Integer requestedHours = hours != null && hours > 0 ? hours : 1;
        BigDecimal resolvedFee = fee != null ? fee : getExtraHourPrice(type).multiply(BigDecimal.valueOf(requestedHours));
        ExtraRegistration reg = new ExtraRegistration();
        reg.setStudent(student);
        reg.setExtraType(type);
        reg.setHours(requestedHours);
        reg.setFee(resolvedFee);
        ExtraRegistration saved = extraRegistrationRepository.save(reg);
        addExtraHoursToProgress(student, type, requestedHours);
        return new ExtraRegistrationResponse(saved.getId(), saved.getExtraType(), saved.getHours(), saved.getFee());
    }

    private void addExtraHoursToProgress(Student student, ExtraRegistration.ExtraType type, Integer hours) {
        LearningModule module = switch (type) {
            case DUONG_TRUONG -> LearningModule.DAT;
            case SA_HINH, SA_HINH_THO -> LearningModule.SA_HINH_THO;
            case SA_HINH_CAM_UNG_TAP, SA_HINH_CAM_UNG_THI -> LearningModule.SA_HINH_CAM_UNG;
        };
        LearningProgress progress = learningProgressRepository.findByStudentAndModule(student, module)
                .orElseGet(() -> {
                    LearningProgress p = new LearningProgress();
                    p.setStudent(student);
                    p.setModule(module);
                    p.setStatus(ProgressStatus.NOT_STARTED);
                    p.setCompletedHours(0);
                    p.setRequiredHours(0);
                    p.setTotalKm(0);
                    p.setRemainingKm(0);
                    p.setTotalMinutes(0);
                    return p;
                });
        progress.setRequiredHours((progress.getRequiredHours() != null ? progress.getRequiredHours() : 0) + hours);
        if (progress.getStatus() == null) {
            progress.setStatus(ProgressStatus.NOT_STARTED);
        }
        learningProgressRepository.save(progress);
    }

    private BigDecimal getExtraHourPrice(ExtraRegistration.ExtraType type) {
        String key = switch (type) {
            case DUONG_TRUONG -> "GIA_GIO_DUONG_TRUONG";
            case SA_HINH, SA_HINH_THO -> "GIA_GIO_SA_HINH_THO";
            case SA_HINH_CAM_UNG_TAP -> "GIA_GIO_SA_HINH_CAM_UNG_TAP";
            case SA_HINH_CAM_UNG_THI -> "GIA_GIO_SA_HINH_CAM_UNG_THI";
        };
        return systemConfigRepository.findByConfigKey(key)
                .or(() -> systemConfigRepository.findByConfigKey("gia_hoc_them"))
                .map(c -> new BigDecimal(c.getConfigValue()))
                .orElse(new BigDecimal("500000"));
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

    public List<ExtraRegistrationResponse> getExtraRegistrations(String username) {
        Student student = userContextService.requireStudent(username);
        return extraRegistrationRepository.findByStudent(student).stream()
                .map(item -> new ExtraRegistrationResponse(item.getId(), item.getExtraType(), item.getHours(), item.getFee()))
                .toList();
    }

    public RichTextConfigResponse getSatHachInstructions() {
        String content = systemConfigRepository.findByConfigKey(SAT_HACH_INSTRUCTIONS_KEY)
                .map(config -> config.getConfigValue())
                .orElse(DEFAULT_SAT_HACH_INSTRUCTIONS);
        return new RichTextConfigResponse(SAT_HACH_INSTRUCTIONS_KEY, content);
    }

    private StudentProfileResponse toProfileResponse(Student student) {
        BigDecimal total = student.getTotalFee() != null ? student.getTotalFee() : BigDecimal.ZERO;
        BigDecimal paid = student.getPaidFee() != null ? student.getPaidFee() : BigDecimal.ZERO;
        List<StudentCourseEnrollmentResponse> enrollments = getCourseEnrollments(student);
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
                student.isRegistrationFormSubmitted(),
                student.isPhotoSubmitted(),
                student.isHealthCheckSubmitted(),
                student.getHealthCheckSubmittedDate(),
                student.isSecondFeePaid(),
                student.isFinalFeePaid(),
                total.subtract(paid).compareTo(BigDecimal.ZERO) > 0,
                total,
                paid,
                total.subtract(paid),
                student.getCourseStatus(),
                enrollments);
    }

    private List<StudentCourseEnrollmentResponse> getCourseEnrollments(Student student) {
        List<StudentCourseEnrollment> enrollments = studentCourseEnrollmentRepository
                .findByStudentOrderByPrimaryCourseDescApplicationDateDescCreatedDateDesc(student);
        if (enrollments.isEmpty() && student.getCoursePackage() != null) {
            BigDecimal total = student.getTotalFee() != null ? student.getTotalFee() : BigDecimal.ZERO;
            BigDecimal paid = student.getPaidFee() != null ? student.getPaidFee() : BigDecimal.ZERO;
            return List.of(new StudentCourseEnrollmentResponse(
                    null,
                    student.getCoursePackage(),
                    student.getCourseStatus(),
                    student.getApplicationDate(),
                    student.getOpeningDate(),
                    student.getClosingDate(),
                    student.getSettlementDate(),
                    student.getCertificateReceivedDate(),
                    total,
                    paid,
                    total.subtract(paid),
                    true));
        }
        return enrollments.stream()
                .map(this::toCourseEnrollmentResponse)
                .toList();
    }

    private StudentCourseEnrollmentResponse toCourseEnrollmentResponse(StudentCourseEnrollment enrollment) {
        BigDecimal total = enrollment.getTotalFee() != null ? enrollment.getTotalFee() : BigDecimal.ZERO;
        BigDecimal paid = enrollment.getPaidFee() != null ? enrollment.getPaidFee() : BigDecimal.ZERO;
        return new StudentCourseEnrollmentResponse(
                enrollment.getId(),
                enrollment.getCoursePackage(),
                enrollment.getCourseStatus(),
                enrollment.getApplicationDate(),
                enrollment.getOpeningDate(),
                enrollment.getClosingDate(),
                enrollment.getSettlementDate(),
                enrollment.getCertificateReceivedDate(),
                total,
                paid,
                total.subtract(paid),
                enrollment.isPrimaryCourse());
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
