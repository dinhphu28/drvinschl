package com.dinhphu28.drvinschl.entity;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
    HOC_VIEN(Collections.emptySet()),
    KINH_DOANH(Collections.emptySet()),
    KE_TOAN(Collections.emptySet()),
    GIAO_VU_KHU_VUC(Collections.emptySet()),
    GIAO_VU_SA_HINH(Collections.emptySet()),
    GIAO_VU_THI(Collections.emptySet()),
    GIAO_VIEN(Collections.emptySet()),
    QUAN_LY_KHU_VUC(Collections.emptySet()),
    ADMIN(
            Set.of(
                    Permission.ADMIN_READ,
                    Permission.ADMIN_UPDATE,
                    Permission.ADMIN_DELETE,
                    Permission.ADMIN_CREATE)),
    GIAM_DOC(Collections.emptySet());

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
