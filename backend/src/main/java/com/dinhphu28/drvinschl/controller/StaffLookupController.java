package com.dinhphu28.drvinschl.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.model.StaffLookupResponse;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/staff-lookup")
@RestController
@RequiredArgsConstructor
public class StaffLookupController {
    private final UserRepository userRepository;

    @PreAuthorize("hasAnyRole('ADMIN','GIAO_VU_KHU_VUC','GIAO_VU_SA_HINH','GIAO_VU_THI','QUAN_LY_KHU_VUC')")
    @GetMapping
    public List<StaffLookupResponse> search(
            @RequestParam(required = false) Role role,
            @RequestParam(defaultValue = "") String q) {
        String term = q.trim().toLowerCase();
        return userRepository.findAll().stream()
                .filter(user -> role == null || user.getRole() == role)
                .filter(user -> term.isEmpty()
                        || user.getUsername().toLowerCase().contains(term)
                        || fullName(user.getFirstName(), user.getLastName()).toLowerCase().contains(term)
                        || (user.getEmail() != null && user.getEmail().toLowerCase().contains(term)))
                .limit(20)
                .map(user -> new StaffLookupResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        fullName(user.getFirstName(), user.getLastName()),
                        user.getRole()))
                .toList();
    }

    private String fullName(String firstName, String lastName) {
        return ((firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "")).trim();
    }
}
