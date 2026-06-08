package com.dinhphu28.drvinschl.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.CoursePackage;
import com.dinhphu28.drvinschl.entity.SystemConfig;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.model.CreateUserRequest;
import com.dinhphu28.drvinschl.model.TheoryScheduleRequest;
import com.dinhphu28.drvinschl.service.AdminService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/admin")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/users")
    public User createUser(@RequestBody CreateUserRequest request) {
        return adminService.createUser(request);
    }

    @GetMapping("/course-packages")
    public List<CoursePackage> getCoursePackages() {
        return adminService.getCoursePackages();
    }

    @PostMapping("/course-packages")
    public CoursePackage saveCoursePackage(@RequestBody CoursePackage pkg) {
        return adminService.saveCoursePackage(pkg);
    }

    @GetMapping("/configs")
    public List<SystemConfig> getConfigs() {
        return adminService.getConfigs();
    }

    @PutMapping("/configs")
    public SystemConfig upsertConfig(
            @RequestParam String key,
            @RequestParam String value,
            @RequestParam(required = false) String description) {
        return adminService.upsertConfig(key, value, description);
    }

    @PutMapping("/configs/retake-fee")
    public SystemConfig configureRetakeFee(
            @RequestParam String key,
            @RequestParam BigDecimal value,
            @RequestParam(required = false) String description) {
        return adminService.configureRetakeFee(key, value, description);
    }

    @PutMapping("/configs/extra-hour-price")
    public SystemConfig configureExtraHourPrice(
            @RequestParam String key,
            @RequestParam BigDecimal value,
            @RequestParam(required = false) String description) {
        return adminService.configureExtraHourPrice(key, value, description);
    }

    @PutMapping("/configs/leave-workflow")
    public SystemConfig configureLeaveWorkflow(
            @RequestParam String key,
            @RequestParam String value,
            @RequestParam(required = false) String description) {
        return adminService.configureLeaveWorkflow(key, value, description);
    }

    @PutMapping("/course-packages/{id}")
    public CoursePackage updateCoursePackage(
            @PathVariable UUID id,
            @RequestBody CoursePackage updates) {
        return adminService.updateCoursePackage(id, updates);
    }

    @DeleteMapping("/course-packages/{id}")
    public CoursePackage deactivateCoursePackage(@PathVariable UUID id) {
        return adminService.deactivateCoursePackage(id);
    }

    @PostMapping("/theory-schedule")
    public SystemConfig updateTheorySchedule(@RequestBody TheoryScheduleRequest request) {
        return adminService.updateTheorySchedule(request.module(), request.scheduleInfo());
    }
}
