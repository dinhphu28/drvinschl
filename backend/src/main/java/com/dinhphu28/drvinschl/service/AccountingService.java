package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.FuelRecord;
import com.dinhphu28.drvinschl.entity.CoursePackage;
import com.dinhphu28.drvinschl.entity.LearningModule;
import com.dinhphu28.drvinschl.entity.LearningProgress;
import com.dinhphu28.drvinschl.entity.PaymentRecord;
import com.dinhphu28.drvinschl.entity.PaymentType;
import com.dinhphu28.drvinschl.entity.ProgressStatus;
import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.model.CreateStudentAccountRequest;
import com.dinhphu28.drvinschl.model.PaymentRequest;
import com.dinhphu28.drvinschl.repository.CoursePackageRepository;
import com.dinhphu28.drvinschl.repository.FuelRecordRepository;
import com.dinhphu28.drvinschl.repository.LearningProgressRepository;
import com.dinhphu28.drvinschl.repository.PaymentRecordRepository;
import com.dinhphu28.drvinschl.repository.SalaryRecordRepository;
import com.dinhphu28.drvinschl.repository.StudentRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountingService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PaymentRecordRepository paymentRecordRepository;
    private final FuelRecordRepository fuelRecordRepository;
    private final SalaryRecordRepository salaryRecordRepository;
    private final UserContextService userContextService;
    private final PasswordEncoder passwordEncoder;
    private final CoursePackageRepository coursePackageRepository;
    private final LearningProgressRepository learningProgressRepository;

    @Transactional
    public Student createStudentAccount(CreateStudentAccountRequest request) {
        String username = resolveStudentUsername(request.username(), request.fullName());
        String password = hasText(request.password()) ? request.password().trim() : request.phone();
        String email = hasText(request.email()) ? request.email().trim() : null;

        User user = User.builder()
                .username(username)
                .email(email)
                .firstName(request.fullName())
                .password(passwordEncoder.encode(password))
                .role(Role.HOC_VIEN)
                .isEnabled(true)
                .build();
        userRepository.save(user);

        Student student = new Student();
        student.setUser(user);
        student.setFullName(request.fullName());
        student.setPhone(request.phone());
        student.setDob(request.dob());
        student.setCoursePackage(request.coursePackage());
        student.setTotalFee(request.totalFee());
        student.setPaidFee(BigDecimal.ZERO);
        student.setApplicationDate(LocalDate.now());
        student.setCourseStatus(CourseStatus.DANG_KY);
        Student saved = studentRepository.save(student);
        initLearningProgress(saved);
        return saved;
    }

    private void initLearningProgress(Student student) {
        CoursePackage pkg = coursePackageRepository.findByName(student.getCoursePackage()).orElse(null);
        createProgress(student, LearningModule.LY_THUYET, pkg != null ? pkg.getTheoryHours() : 0, 0);
        createProgress(student, LearningModule.MO_PHONG, pkg != null ? pkg.getSimulationHours() : 0, 0);
        createProgress(student, LearningModule.CO_BAN_4H, pkg != null ? pkg.getBasic4hHours() : 0, 0);
        createProgress(student, LearningModule.CABIN, pkg != null ? pkg.getCabinHours() : 0, 0);
        createProgress(student, LearningModule.DAT, pkg != null ? pkg.getDatHours() : 0, pkg != null ? pkg.getDatKm() : 0);
        createProgress(student, LearningModule.SA_HINH_THO, pkg != null ? pkg.getRawYardHours() : 0, 0);
        int sensorHours = pkg != null
                ? (pkg.getSensorPracticeHours() != null ? pkg.getSensorPracticeHours() : 0)
                    + (pkg.getSensorExamHours() != null ? pkg.getSensorExamHours() : 0)
                : 0;
        createProgress(student, LearningModule.SA_HINH_CAM_UNG, sensorHours, 0);
    }

    private void createProgress(Student student, LearningModule module, Integer requiredHours, Integer requiredKm) {
        if (learningProgressRepository.findByStudentAndModule(student, module).isPresent()) {
            return;
        }
        LearningProgress progress = new LearningProgress();
        progress.setStudent(student);
        progress.setModule(module);
        progress.setStatus(ProgressStatus.NOT_STARTED);
        progress.setCompletedHours(0);
        progress.setRequiredHours(requiredHours != null ? requiredHours : 0);
        progress.setTotalKm(0);
        progress.setRemainingKm(requiredKm != null ? requiredKm : 0);
        progress.setTotalMinutes(0);
        learningProgressRepository.save(progress);
    }

    private String resolveStudentUsername(String requestedUsername, String fullName) {
        String base = hasText(requestedUsername) ? requestedUsername.trim() : toPlainUsername(fullName);
        if (!hasText(base)) {
            base = "hocvien";
        }
        String candidate = base;
        int suffix = 2;
        while (userRepository.findByUsername(candidate).isPresent()) {
            candidate = base + suffix;
            suffix++;
        }
        return candidate;
    }

    private String toPlainUsername(String value) {
        String normalized = Normalizer.normalize(value == null ? "" : value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replace('đ', 'd')
                .replace('Đ', 'D')
                .toLowerCase(Locale.ROOT);
        return normalized.replaceAll("[^a-z0-9]", "");
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    @Transactional
    public PaymentRecord recordPayment(String recorderUsername, PaymentRequest request) {
        User recorder = userContextService.requireUser(recorderUsername);
        Student student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        PaymentRecord payment = new PaymentRecord();
        payment.setStudent(student);
        payment.setPaymentType(request.paymentType());
        payment.setAmount(request.amount());
        payment.setPaidAt(LocalDateTime.now());
        payment.setNote(request.note());
        payment.setRecordedBy(recorder);

        BigDecimal paid = student.getPaidFee() != null ? student.getPaidFee() : BigDecimal.ZERO;
        if (request.paymentType() == PaymentType.HOC_PHI || request.paymentType() == PaymentType.HOC_THEM) {
            BigDecimal newPaid = paid.add(request.amount());
            student.setPaidFee(newPaid);
            BigDecimal total = student.getTotalFee() != null ? student.getTotalFee() : BigDecimal.ZERO;
            if (total.compareTo(BigDecimal.ZERO) > 0 && newPaid.compareTo(total) >= 0) {
                student.setFinalFeePaid(true);
            }
        } else if (request.paymentType() == PaymentType.HOAN_PHI) {
            student.setPaidFee(paid.subtract(request.amount()));
            student.setFinalFeePaid(false);
        }
        studentRepository.save(student);

        return paymentRecordRepository.save(payment);
    }

    public List<FuelRecord> getFuelByDateRange(LocalDate start, LocalDate end) {
        return fuelRecordRepository.findByFuelDateBetween(start, end);
    }

    public List<SalaryRecord> getAllSalaries() {
        return salaryRecordRepository.findAll();
    }

    @Transactional
    public PaymentRecord recordRefund(String username, com.dinhphu28.drvinschl.model.RefundRequest request) {
        User recorder = userContextService.requireUser(username);
        Student student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        PaymentRecord payment = new PaymentRecord();
        payment.setStudent(student);
        payment.setPaymentType(PaymentType.HOAN_PHI);
        payment.setAmount(request.amount());
        payment.setPaidAt(LocalDateTime.now());
        payment.setNote(request.note());
        payment.setRecordedBy(recorder);

        BigDecimal paid = student.getPaidFee() != null ? student.getPaidFee() : BigDecimal.ZERO;
        student.setPaidFee(paid.subtract(request.amount()));
        studentRepository.save(student);

        return paymentRecordRepository.save(payment);
    }

    public com.dinhphu28.drvinschl.model.FuelSummaryResponse getFuelSummary(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.plusMonths(1).minusDays(1);
        List<FuelRecord> records = fuelRecordRepository.findByFuelDateBetween(start, end);

        BigDecimal totalLiters = records.stream()
                .map(FuelRecord::getLiters)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalCost = records.stream()
                .map(FuelRecord::getAmount)
                .filter(a -> a != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new com.dinhphu28.drvinschl.model.FuelSummaryResponse(year, month, totalLiters, totalCost);
    }
}
