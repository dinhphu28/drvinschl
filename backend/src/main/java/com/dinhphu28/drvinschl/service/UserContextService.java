package com.dinhphu28.drvinschl.service;

import org.springframework.stereotype.Service;

import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.repository.StudentRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserContextService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public User requireUser(String username) {
        return userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Student requireStudent(String username) {
        User user = requireUser(username);
        return studentRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Student profile not found"));
    }
}
