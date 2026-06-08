package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.ExamRegistration;
import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.CompletionStatsResponse;
import com.dinhphu28.drvinschl.model.ExamStatsResponse;
import com.dinhphu28.drvinschl.repository.ExamRegistrationRepository;
import com.dinhphu28.drvinschl.repository.SalaryRecordRepository;
import com.dinhphu28.drvinschl.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DirectorService {
    private final StudentRepository studentRepository;
    private final ExamRegistrationRepository examRegistrationRepository;
    private final SalaryRecordRepository salaryRecordRepository;

    public Map<String, Object> getSystemOverview() {
        long completedCourses = studentRepository.countByCourseStatus(CourseStatus.HOAN_THANH);
        long totalStudents = studentRepository.count();
        long passedExams = examRegistrationRepository.countByPassed(true);
        long failedExams = examRegistrationRepository.countByPassed(false);

        return Map.of(
                "totalStudents", totalStudents,
                "completedCourses", completedCourses,
                "passedExams", passedExams,
                "failedExams", failedExams);
    }

    @Transactional
    public SalaryRecord approveSalary(java.util.UUID salaryId) {
        SalaryRecord salary = salaryRecordRepository.findById(salaryId)
                .orElseThrow(() -> new ResourceNotFoundException("Salary record not found"));
        salary.setApprovedByDirector(true);
        return salaryRecordRepository.save(salary);
    }

    public List<SalaryRecord> getPendingSalaries() {
        return salaryRecordRepository.findByApprovedByAdminTrueAndApprovedByDirectorFalse();
    }

    public ExamStatsResponse getExamStats() {
        List<ExamRegistration> allExams = examRegistrationRepository.findAll();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("yyyy-MM");

        Map<String, Long> totalByType = new LinkedHashMap<>();
        Map<String, Long> passedByType = new LinkedHashMap<>();

        for (ExamRegistration exam : allExams) {
            String type = exam.getExamSession().getExamType().name();
            totalByType.merge(type, 1L, Long::sum);
            if (Boolean.TRUE.equals(exam.getPassed())) {
                passedByType.merge(type, 1L, Long::sum);
            }
        }

        Map<String, BigDecimal> passRateByType = totalByType.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> {
                            long total = e.getValue();
                            long passed = passedByType.getOrDefault(e.getKey(), 0L);
                            return total > 0 ? BigDecimal.valueOf(passed * 100 / total) : BigDecimal.ZERO;
                        }
                ));

        Map<String, Long> totalExamsByMonth = allExams.stream()
                .filter(exam -> exam.getCreatedDate() != null)
                .collect(Collectors.groupingBy(
                        exam -> exam.getCreatedDate().format(monthFormatter),
                        Collectors.counting()
                ));

        return new ExamStatsResponse(passRateByType, totalExamsByMonth);
    }

    public CompletionStatsResponse getCompletionStats() {
        List<com.dinhphu28.drvinschl.entity.Student> allStudents = studentRepository.findAll();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("yyyy-MM");

        long completedCount = studentRepository.countByCourseStatus(CourseStatus.HOAN_THANH);
        long totalCount = allStudents.size();

        Map<String, Long> totalCompletedByMonth = allStudents.stream()
                .filter(s -> s.getCourseStatus() == CourseStatus.HOAN_THANH && s.getLastModifiedDate() != null)
                .collect(Collectors.groupingBy(
                        s -> s.getLastModifiedDate().format(monthFormatter),
                        Collectors.counting()
                ));

        BigDecimal completionRate = totalCount > 0
                ? BigDecimal.valueOf(completedCount * 100 / totalCount)
                : BigDecimal.ZERO;

        return new CompletionStatsResponse(totalCompletedByMonth, completionRate);
    }
}
