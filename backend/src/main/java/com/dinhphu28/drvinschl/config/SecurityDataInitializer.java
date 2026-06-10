package com.dinhphu28.drvinschl.config;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.Permission;
import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.repository.PermissionRepository;
import com.dinhphu28.drvinschl.repository.RoleRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SecurityDataInitializer implements ApplicationRunner {

    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${application.bootstrap.admin-username:admin}")
    private String adminUsername;

    @Value("${application.bootstrap.admin-password:admin123}")
    private String adminPassword;

    @Value("${application.bootstrap.admin-full-name:System Admin}")
    private String adminFullName;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedPermissions();
        seedRoles();
        seedAdminUser();
    }

    private void seedPermissions() {
        List<PermissionSpec> specs = List.of(
                new PermissionSpec("USER_READ", "Read users"),
                new PermissionSpec("USER_CREATE", "Create users"),
                new PermissionSpec("USER_UPDATE", "Update users"),
                new PermissionSpec("USER_STATUS", "Change user status"),
                new PermissionSpec("USER_RESET_PASSWORD", "Reset user password"),
                new PermissionSpec("ROLE_READ", "Read roles"),
                new PermissionSpec("ROLE_CREATE", "Create roles"),
                new PermissionSpec("ROLE_UPDATE", "Update roles"),
                new PermissionSpec("ROLE_PERMISSION_UPDATE", "Update role permissions"),
                new PermissionSpec("PERMISSION_READ", "Read permissions"));

        for (PermissionSpec spec : specs) {
            permissionRepository.findByCode(spec.code())
                    .orElseGet(() -> permissionRepository.save(Permission.builder()
                            .code(spec.code())
                            .name(spec.name())
                            .build()));
        }
    }

    private void seedRoles() {
        List<String> codes = List.of(
                "ADMIN",
                "DIRECTOR",
                "AREA_MANAGER",
                "SALES",
                "ACCOUNTANT",
                "EDUCATION_STAFF",
                "EXAM_STAFF",
                "TEACHER",
                "STUDENT");

        Set<Permission> adminPermissions = Set.copyOf(permissionRepository.findAll());

        for (String code : codes) {
            roleRepository.findByCode(code).orElseGet(() -> {
                Role role = Role.builder()
                        .code(code)
                        .name(code.replace('_', ' '))
                        .build();
                if ("ADMIN".equals(code)) {
                    role.setPermissions(new java.util.HashSet<>(adminPermissions));
                }
                return roleRepository.save(role);
            });
        }

        roleRepository.findByCode("ADMIN").ifPresent(role -> {
            role.getPermissions().clear();
            role.getPermissions().addAll(adminPermissions);
            roleRepository.save(role);
        });
    }

    private void seedAdminUser() {
        if (userRepository.findByUsername(adminUsername).isPresent()) {
            return;
        }

        Role adminRole = roleRepository.findByCode("ADMIN")
                .orElseThrow(() -> new IllegalStateException("ADMIN role is missing"));

        User admin = User.builder()
                .username(adminUsername)
                .passwordHash(passwordEncoder.encode(adminPassword))
                .fullName(adminFullName)
                .status("ACTIVE")
                .roles(new java.util.HashSet<>(Set.of(adminRole)))
                .build();
        userRepository.save(admin);
    }

    private record PermissionSpec(String code, String name) {
    }
}
