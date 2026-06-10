package com.dinhphu28.drvinschl.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.Permission;
import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.exception.NotFoundException;
import com.dinhphu28.drvinschl.model.PermissionResponse;
import com.dinhphu28.drvinschl.model.RolePermissionsRequest;
import com.dinhphu28.drvinschl.model.RoleRequest;
import com.dinhphu28.drvinschl.model.RoleResponse;
import com.dinhphu28.drvinschl.repository.PermissionRepository;
import com.dinhphu28.drvinschl.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @Transactional(readOnly = true)
    public List<RoleResponse> listRoles() {
        return roleRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PermissionResponse> listPermissions() {
        return permissionRepository.findAll().stream()
                .map(permission -> new PermissionResponse(permission.getId(), permission.getCode(), permission.getName()))
                .toList();
    }

    @Transactional
    public RoleResponse createRole(RoleRequest request) {
        Role role = Role.builder()
                .code(request.code())
                .name(request.name())
                .build();
        return toResponse(roleRepository.save(role));
    }

    @Transactional
    public RoleResponse updateRole(UUID id, RoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ROLE_NOT_FOUND", "Role not found"));
        role.setCode(request.code());
        role.setName(request.name());
        return toResponse(roleRepository.save(role));
    }

    @Transactional
    public RoleResponse updateRolePermissions(UUID id, RolePermissionsRequest request) {
        Role role = roleRepository.findWithPermissionsById(id)
                .orElseThrow(() -> new NotFoundException("ROLE_NOT_FOUND", "Role not found"));
        List<Permission> permissions = permissionRepository.findAllById(request.permissionIds());
        if (permissions.size() != request.permissionIds().size()) {
            throw new NotFoundException("PERMISSION_NOT_FOUND", "One or more permissions not found");
        }
        role.getPermissions().clear();
        role.getPermissions().addAll(permissions);
        return toResponse(roleRepository.save(role));
    }

    private RoleResponse toResponse(Role role) {
        List<PermissionResponse> permissions = role.getPermissions().stream()
                .map(permission -> new PermissionResponse(permission.getId(), permission.getCode(), permission.getName()))
                .toList();
        return new RoleResponse(role.getId(), role.getCode(), role.getName(), permissions);
    }
}
