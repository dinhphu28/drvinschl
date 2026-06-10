package com.dinhphu28.drvinschl.service;

import java.util.List;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.Token;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.ConflictException;
import com.dinhphu28.drvinschl.exception.NotFoundException;
import com.dinhphu28.drvinschl.model.ResetPasswordRequest;
import com.dinhphu28.drvinschl.model.UserCreateRequest;
import com.dinhphu28.drvinschl.model.UserResponse;
import com.dinhphu28.drvinschl.model.UserStatusUpdateRequest;
import com.dinhphu28.drvinschl.model.UserUpdateRequest;
import com.dinhphu28.drvinschl.repository.RoleRepository;
import com.dinhphu28.drvinschl.repository.TokenRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UserResponse> listUsers() {
        return userRepository.findAllByDeletedAtIsNull().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserResponse getUser(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        return toResponse(user);
    }

    @Transactional
    public UserResponse createUser(UserCreateRequest request) {
        assertUserNotExists(request.username(), request.email());
        User user = new User();
        user.setUsername(request.username());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFullName(request.fullName());
        user.setPhone(request.phone());
        user.setEmail(request.email());
        user.setStatus(request.status());
        user.setRoles(loadRoles(request.roleIds()));
        return toResponse(userRepository.save(user));
    }

    @Transactional
    public UserResponse updateUser(UUID id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        user.setFullName(request.fullName());
        user.setPhone(request.phone());
        user.setEmail(request.email());
        user.setStatus(request.status());
        if (request.roleIds() != null) {
            user.setRoles(loadRoles(request.roleIds()));
        }
        return toResponse(userRepository.save(user));
    }

    @Transactional
    public UserResponse updateStatus(UUID id, UserStatusUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        user.setStatus(request.status());
        return toResponse(userRepository.save(user));
    }

    @Transactional
    public void resetPassword(UUID id, ResetPasswordRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
        revokeAllRefreshTokens(user);
    }

    private void assertUserNotExists(String username, String email) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new ConflictException("USERNAME_EXISTS", "Username already exists");
        }
        if (email != null && userRepository.findByEmail(email).isPresent()) {
            throw new ConflictException("EMAIL_EXISTS", "Email already exists");
        }
    }

    private Set<Role> loadRoles(List<UUID> roleIds) {
        if (roleIds == null || roleIds.isEmpty()) {
            throw new NotFoundException("ROLE_NOT_FOUND", "At least one role is required");
        }
        List<Role> roles = roleRepository.findAllById(roleIds);
        if (roles.size() != roleIds.size()) {
            throw new NotFoundException("ROLE_NOT_FOUND", "One or more roles not found");
        }
        return new HashSet<>(roles);
    }

    private void revokeAllRefreshTokens(User user) {
        List<Token> activeTokens = tokenRepository.findAllByUserAndExpiredFalseAndRevokedFalse(user);
        activeTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(activeTokens);
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getPhone(),
                user.getEmail(),
                user.getStatus(),
                user.getRoles().stream().map(Role::getCode).sorted().toList());
    }
}
