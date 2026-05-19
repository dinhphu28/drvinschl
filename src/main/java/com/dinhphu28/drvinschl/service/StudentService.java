package com.dinhphu28.drvinschl.service;

import org.springframework.stereotype.Service;

import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.model.UpdateStudentProfileRequest;
import com.dinhphu28.drvinschl.repository.StudentRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentService {
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public void upsertProfile(String username, UpdateStudentProfileRequest request) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = studentRepository.findByUser(user)
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setUser(user);
                    return newStudent;
                });

        student.setFullName(request.fullName());
        student.setPhone(request.phone());
        student.setDob(request.dob());

        studentRepository.save(student);
    }
}
