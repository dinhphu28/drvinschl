package com.dinhphu28.drvinschl.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.SalaryRecord;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
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
}
