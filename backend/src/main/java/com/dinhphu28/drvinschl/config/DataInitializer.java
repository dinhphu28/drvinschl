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
                student.setCoursePackage("B Số Sàn");
                student.setTotalFee(new BigDecimal("15000000"));
                student.setPaidFee(new BigDecimal("7500000"));
                student.setCourseStatus(CourseStatus.DANG_HOC);
                student.setApplicationDate(LocalDate.now().minusMonths(2));
                student.setOpeningDate(LocalDate.now().minusMonths(1));
                studentRepository.save(student);

            }
            upsertCoursePackage("A", "6000000", 12, 0, 0, 0, 0, 0, 4, 6, 2, 1);
            upsertCoursePackage("A1", "6500000", 12, 0, 0, 0, 0, 0, 4, 6, 2, 1);
            upsertCoursePackage("B Số Sàn", "15000000", 24, 8, 4, 2, 16, 200, 10, 6, 4, 2);
            upsertCoursePackage("B Tự Động", "16000000", 24, 8, 4, 0, 16, 200, 10, 6, 4, 2);
            upsertCoursePackage("C1", "20000000", 28, 8, 4, 2, 24, 300, 12, 8, 4, 2);
            deactivateLegacyPackage("B2");

            upsertConfig("GIA_GIO_DUONG_TRUONG", "500000", "Giá thêm giờ thực hành đường trường");
            upsertConfig("GIA_GIO_SA_HINH_THO", "450000", "Giá thêm giờ sa hình thô");
            upsertConfig("GIA_GIO_SA_HINH_CAM_UNG_TAP", "550000", "Giá thêm giờ sa hình cảm ứng tập");
            upsertConfig("GIA_GIO_SA_HINH_CAM_UNG_THI", "650000", "Giá thêm giờ sa hình cảm ứng thi");
            upsertConfig("THI_LAI_TOT_NGHIEP", "500000", "Phí thi lại tốt nghiệp");
            upsertConfig("THI_LAI_SAT_HACH", "700000", "Phí thi lại sát hạch");
            upsertConfig("THI_LAI_LY_THUYET", "300000", "Phí thi lại lý thuyết");
            upsertConfig("THI_LAI_MO_PHONG", "300000", "Phí thi lại mô phỏng");
            upsertConfig("THI_LAI_SA_HINH", "500000", "Phí thi lại sa hình");
            upsertConfig("THI_LAI_DUONG_TRUONG", "500000", "Phí thi lại đường trường");
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

    private void deactivateLegacyPackage(String name) {
        coursePackageRepository.findByName(name).ifPresent(pkg -> {
            pkg.setActive(false);
            coursePackageRepository.save(pkg);
        });
    }

    private void upsertCoursePackage(
            String name,
            String price,
            int theoryHours,
            int simulationHours,
            int basic4hHours,
            int cabinHours,
            int datHours,
            int datKm,
            int practicalRoadHours,
            int rawYardHours,
            int sensorPracticeHours,
            int sensorExamHours) {
        CoursePackage pkg = coursePackageRepository.findByName(name).orElseGet(CoursePackage::new);
        pkg.setName(name);
        if (pkg.getPrice() == null) {
            pkg.setPrice(new BigDecimal(price));
        }
        pkg.setTheoryHours(theoryHours);
        pkg.setSimulationHours(simulationHours);
        pkg.setBasic4hHours(basic4hHours);
        pkg.setCabinHours(cabinHours);
        pkg.setDatHours(datHours);
        pkg.setDatKm(datKm);
        pkg.setSaHinhHours(rawYardHours + sensorPracticeHours + sensorExamHours);
        pkg.setPracticalRoadHours(practicalRoadHours);
        pkg.setRawYardHours(rawYardHours);
        pkg.setSensorPracticeHours(sensorPracticeHours);
        pkg.setSensorExamHours(sensorExamHours);
        pkg.setActive(true);
        coursePackageRepository.save(pkg);
    }
}
