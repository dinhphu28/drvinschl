package com.dinhphu28.drvinschl.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.CoursePackage;
import com.dinhphu28.drvinschl.entity.SystemConfig;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.ResourceNotFoundException;
import com.dinhphu28.drvinschl.model.CreateUserRequest;
import com.dinhphu28.drvinschl.model.UserProfileResponse;
import com.dinhphu28.drvinschl.repository.CoursePackageRepository;
import com.dinhphu28.drvinschl.repository.SystemConfigRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private static final Set<String> RELEASE_COURSE_PACKAGE_NAMES = Set.of("A", "A1", "B Số Sàn", "B Tự Động", "C1");

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

    public List<UserProfileResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserProfileResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getRole()))
                .toList();
    }

    public List<CoursePackage> getCoursePackages() {
        return coursePackageRepository.findAll().stream()
                .filter(pkg -> RELEASE_COURSE_PACKAGE_NAMES.contains(pkg.getName()))
                .toList();
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

    public CoursePackage getCoursePackage(UUID id) {
        return coursePackageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course package not found"));
    }

    @Transactional
    public SystemConfig configureRetakeFee(String key, BigDecimal value, String description) {
        return upsertConfig(key, value.toPlainString(), description);
    }

    @Transactional
    public SystemConfig configureExtraHourPrice(String key, BigDecimal value, String description) {
        return upsertConfig(key, value.toPlainString(), description);
    }

    @Transactional
    public SystemConfig configureLeaveWorkflow(String key, String value, String description) {
        return upsertConfig(key, value, description);
    }

    @Transactional
    public CoursePackage updateCoursePackage(UUID id, CoursePackage updates) {
        CoursePackage existing = getCoursePackage(id);
        if (updates.getName() != null) {
            existing.setName(updates.getName());
        }
        if (updates.getPrice() != null) {
            existing.setPrice(updates.getPrice());
        }
        if (updates.getTheoryHours() != null) {
            existing.setTheoryHours(updates.getTheoryHours());
        }
        if (updates.getSimulationHours() != null) {
            existing.setSimulationHours(updates.getSimulationHours());
        }
        if (updates.getBasic4hHours() != null) {
            existing.setBasic4hHours(updates.getBasic4hHours());
        }
        if (updates.getCabinHours() != null) {
            existing.setCabinHours(updates.getCabinHours());
        }
        if (updates.getDatHours() != null) {
            existing.setDatHours(updates.getDatHours());
        }
        if (updates.getDatKm() != null) {
            existing.setDatKm(updates.getDatKm());
        }
        if (updates.getSaHinhHours() != null) {
            existing.setSaHinhHours(updates.getSaHinhHours());
        }
        if (updates.getPracticalRoadHours() != null) {
            existing.setPracticalRoadHours(updates.getPracticalRoadHours());
        }
        if (updates.getRawYardHours() != null) {
            existing.setRawYardHours(updates.getRawYardHours());
        }
        if (updates.getSensorPracticeHours() != null) {
            existing.setSensorPracticeHours(updates.getSensorPracticeHours());
        }
        if (updates.getSensorExamHours() != null) {
            existing.setSensorExamHours(updates.getSensorExamHours());
        }
        existing.setActive(updates.isActive());
        return coursePackageRepository.save(existing);
    }

    @Transactional
    public CoursePackage deactivateCoursePackage(UUID id) {
        CoursePackage pkg = getCoursePackage(id);
        pkg.setActive(false);
        return coursePackageRepository.save(pkg);
    }

    @Transactional
    public SystemConfig updateTheorySchedule(String module, String scheduleInfo) {
        String configKey = "SCHEDULE_" + module;
        return upsertConfig(configKey, scheduleInfo, "Schedule for " + module);
    }
}
