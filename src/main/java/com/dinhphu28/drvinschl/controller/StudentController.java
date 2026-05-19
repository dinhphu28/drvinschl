package com.dinhphu28.drvinschl.controller;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.model.UpdateStudentProfileRequest;
import com.dinhphu28.drvinschl.service.StudentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/api/v1/students")
@RestController
@RequiredArgsConstructor
@Slf4j
public class StudentController {
    private final StudentService studentService;

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value = "/profile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateStudentProfileRequest request) {

        String username = userDetails.getUsername();
        log.info("CTL -------> USERNAME is {}", username);
        studentService.upsertProfile(username, request);
    }
}
