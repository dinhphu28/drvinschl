package com.dinhphu28.drvinschl.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CoursePackage;
import com.dinhphu28.drvinschl.entity.SystemConfig;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.CreateUserRequest;
import com.dinhphu28.drvinschl.repository.CoursePackageRepository;
import com.dinhphu28.drvinschl.repository.SystemConfigRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final CoursePackageRepository coursePackageRepository;
    private final SystemConfigRepository systemConfigRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(CreateUserRequest request) {
        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .isEnabled(true)
                .build();
        return userRepository.save(user);
    }

    public List<CoursePackage> getCoursePackages() {
        return coursePackageRepository.findAll();
    }

    @Transactional
    public CoursePackage saveCoursePackage(CoursePackage pkg) {
        return coursePackageRepository.save(pkg);
    }

    public List<SystemConfig> getConfigs() {
        return systemConfigRepository.findAll();
    }

    @Transactional
    public SystemConfig upsertConfig(String key, String value, String description) {
        SystemConfig config = systemConfigRepository.findByConfigKey(key)
                .orElseGet(SystemConfig::new);
        config.setConfigKey(key);
        config.setConfigValue(value);
        config.setDescription(description);
        return systemConfigRepository.save(config);
    }

    public CoursePackage getCoursePackage(java.util.UUID id) {
        return coursePackageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course package not found"));
    }
}
