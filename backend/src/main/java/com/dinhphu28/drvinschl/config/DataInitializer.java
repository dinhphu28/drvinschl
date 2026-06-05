package com.dinhphu28.drvinschl.config;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dinhphu28.drvinschl.entity.CoursePackage;
import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.SystemConfig;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.repository.CoursePackageRepository;
import com.dinhphu28.drvinschl.repository.StudentRepository;
import com.dinhphu28.drvinschl.repository.SystemConfigRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CoursePackageRepository coursePackageRepository;
    private final SystemConfigRepository systemConfigRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    @Profile("!test")
    CommandLineRunner initData() {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                createUser("admin", "admin@drvinschl.local", "System", "Admin", Role.ADMIN);
                createUser("ketoan", "ketoan@drvinschl.local", "Ke", "Toan", Role.KE_TOAN);
                createUser("kinhdoanh", "sales@drvinschl.local", "Kinh", "Doanh", Role.KINH_DOANH);
                createUser("giaovien", "teacher@drvinschl.local", "Giao", "Vien", Role.GIAO_VIEN);
                createUser("giaovu", "ops@drvinschl.local", "Giao", "Vu", Role.GIAO_VU_KHU_VUC);
                createUser("giaovuthi", "exam@drvinschl.local", "Giao", "Vu Thi", Role.GIAO_VU_THI);
                createUser("quanly", "manager@drvinschl.local", "Quan", "Ly", Role.QUAN_LY_KHU_VUC);
                createUser("giamdoc", "director@drvinschl.local", "Giam", "Doc", Role.GIAM_DOC);

                User studentUser = createUser("hocvien", "student@drvinschl.local", "Nguyen", "Van A", Role.HOC_VIEN);
                Student student = new Student();
                student.setUser(studentUser);
                student.setFullName("Nguyen Van A");
                student.setPhone("0901234567");
                student.setDob(LocalDate.of(2000, 1, 15));
                student.setCoursePackage("B2");
                student.setTotalFee(new BigDecimal("15000000"));
                student.setPaidFee(new BigDecimal("7500000"));
                student.setCourseStatus(CourseStatus.DANG_HOC);
                student.setApplicationDate(LocalDate.now().minusMonths(2));
                student.setOpeningDate(LocalDate.now().minusMonths(1));
                studentRepository.save(student);

                CoursePackage pkg = new CoursePackage();
                pkg.setName("B2");
                pkg.setPrice(new BigDecimal("15000000"));
                pkg.setTheoryHours(24);
                pkg.setSimulationHours(8);
                pkg.setBasic4hHours(4);
                pkg.setCabinHours(2);
                pkg.setDatHours(16);
                pkg.setDatKm(200);
                pkg.setSaHinhHours(10);
                pkg.setActive(true);
                coursePackageRepository.save(pkg);

                upsertConfig("gia_hoc_them", "500000", "Giá học thêm mỗi giờ");
                upsertConfig("phi_thi_lai", "500000", "Phí thi lại sát hạch");
            }
        };
    }

    private User createUser(String username, String email, String first, String last, Role role) {
        User user = User.builder()
                .username(username)
                .email(email)
                .firstName(first)
                .lastName(last)
                .password(passwordEncoder.encode("password123"))
                .role(role)
                .isEnabled(true)
                .build();
        return userRepository.save(user);
    }

    private void upsertConfig(String key, String value, String desc) {
        if (systemConfigRepository.findByConfigKey(key).isEmpty()) {
            SystemConfig config = new SystemConfig();
            config.setConfigKey(key);
            config.setConfigValue(value);
            config.setDescription(desc);
            systemConfigRepository.save(config);
        }
    }
}
