package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.FuelRecord;
import com.dinhphu28.drvinschl.entity.PaymentRecord;
import com.dinhphu28.drvinschl.entity.PaymentType;
import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.model.CreateStudentAccountRequest;
import com.dinhphu28.drvinschl.model.PaymentRequest;
import com.dinhphu28.drvinschl.repository.FuelRecordRepository;
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

    @Transactional
    public Student createStudentAccount(CreateStudentAccountRequest request) {
        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .firstName(request.fullName())
                .password(passwordEncoder.encode(request.password()))
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
        return studentRepository.save(student);
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
            student.setPaidFee(paid.add(request.amount()));
        } else if (request.paymentType() == PaymentType.HOAN_PHI) {
            student.setPaidFee(paid.subtract(request.amount()));
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
}
