package com.dinhphu28.drvinschl.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.model.StudentLookupResponse;
import com.dinhphu28.drvinschl.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentLookupService {
    private final StudentRepository studentRepository;

    public List<StudentLookupResponse> search(String query) {
        String normalized = query == null ? "" : query.trim();
        return studentRepository.searchForLookup(normalized).stream()
                .limit(20)
                .map(this::toResponse)
                .toList();
    }

    private StudentLookupResponse toResponse(Student student) {
        return new StudentLookupResponse(
                student.getId(),
                student.getUser().getUsername(),
                student.getFullName(),
                student.getPhone(),
                student.getCoursePackage(),
                student.getCourseStatus() != null ? student.getCourseStatus().name() : null);
    }
}
