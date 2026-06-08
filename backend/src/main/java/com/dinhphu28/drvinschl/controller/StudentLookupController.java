package com.dinhphu28.drvinschl.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.model.StudentLookupResponse;
import com.dinhphu28.drvinschl.service.StudentLookupService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/student-lookup")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('KINH_DOANH','KE_TOAN','GIAO_VU_KHU_VUC','GIAO_VU_SA_HINH','GIAO_VU_THI','ADMIN')")
public class StudentLookupController {
    private final StudentLookupService studentLookupService;

    @GetMapping
    public List<StudentLookupResponse> search(@RequestParam(defaultValue = "") String q) {
        return studentLookupService.search(q);
    }
}
