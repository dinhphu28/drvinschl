package com.dinhphu28.drvinschl.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.model.ApiResponse;
import com.dinhphu28.drvinschl.model.ResetPasswordRequest;
import com.dinhphu28.drvinschl.model.UserCreateRequest;
import com.dinhphu28.drvinschl.model.UserResponse;
import com.dinhphu28.drvinschl.model.UserStatusUpdateRequest;
import com.dinhphu28.drvinschl.model.UserUpdateRequest;
import com.dinhphu28.drvinschl.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('USER_READ')")
    public ApiResponse<List<UserResponse>> listUsers() {
        return ApiResponse.success(userService.listUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('USER_READ')")
    public ApiResponse<UserResponse> getUser(@PathVariable UUID id) {
        return ApiResponse.success(userService.getUser(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER_CREATE')")
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody UserCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(userService.createUser(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER_UPDATE')")
    public ApiResponse<UserResponse> updateUser(@PathVariable UUID id, @Valid @RequestBody UserUpdateRequest request) {
        return ApiResponse.success(userService.updateUser(id, request));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('USER_STATUS')")
    public ApiResponse<UserResponse> updateStatus(@PathVariable UUID id,
            @Valid @RequestBody UserStatusUpdateRequest request) {
        return ApiResponse.success(userService.updateStatus(id, request));
    }

    @PutMapping("/{id}/reset-password")
    @PreAuthorize("hasAuthority('USER_RESET_PASSWORD')")
    public ApiResponse<Void> resetPassword(@PathVariable UUID id, @Valid @RequestBody ResetPasswordRequest request) {
        userService.resetPassword(id, request);
        return ApiResponse.success(null, "Password reset");
    }
}
