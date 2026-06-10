package com.dinhphu28.drvinschl.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import com.dinhphu28.drvinschl.model.ApiResponse;
import com.dinhphu28.drvinschl.model.PermissionResponse;
import com.dinhphu28.drvinschl.model.RolePermissionsRequest;
import com.dinhphu28.drvinschl.model.RoleRequest;
import com.dinhphu28.drvinschl.model.RoleResponse;
import com.dinhphu28.drvinschl.service.RoleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/roles")
    @PreAuthorize("hasAuthority('ROLE_READ')")
    public ApiResponse<List<RoleResponse>> listRoles() {
        return ApiResponse.success(roleService.listRoles());
    }

    @PostMapping("/roles")
    @PreAuthorize("hasAuthority('ROLE_CREATE')")
    public ApiResponse<RoleResponse> createRole(@Valid @RequestBody RoleRequest request) {
        return ApiResponse.success(roleService.createRole(request));
    }

    @PutMapping("/roles/{id}")
    @PreAuthorize("hasAuthority('ROLE_UPDATE')")
    public ApiResponse<RoleResponse> updateRole(@PathVariable UUID id, @Valid @RequestBody RoleRequest request) {
        return ApiResponse.success(roleService.updateRole(id, request));
    }

    @GetMapping("/permissions")
    @PreAuthorize("hasAuthority('PERMISSION_READ')")
    public ApiResponse<List<PermissionResponse>> listPermissions() {
        return ApiResponse.success(roleService.listPermissions());
    }

    @PutMapping("/roles/{id}/permissions")
    @PreAuthorize("hasAuthority('ROLE_PERMISSION_UPDATE')")
    public ApiResponse<RoleResponse> updateRolePermissions(@PathVariable UUID id,
            @Valid @RequestBody RolePermissionsRequest request) {
        return ApiResponse.success(roleService.updateRolePermissions(id, request));
    }
}
