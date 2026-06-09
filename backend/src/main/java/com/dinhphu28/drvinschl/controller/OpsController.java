package com.dinhphu28.drvinschl.controller;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.SessionType;
import com.dinhphu28.drvinschl.entity.TrainingSlot;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.model.CreateTrainingSlotRequest;
import com.dinhphu28.drvinschl.model.ScheduleStudentRequest;
import com.dinhphu28.drvinschl.model.TrainingBookingResponse;
import com.dinhphu28.drvinschl.service.OpsService;
import com.dinhphu28.drvinschl.service.SchedulingService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/ops")
@RestController
@RequiredArgsConstructor
public class OpsController {
    private final OpsService opsService;
    private final SchedulingService schedulingService;

    @PreAuthorize("hasAnyRole('GIAO_VU_KHU_VUC', 'GIAO_VU_SA_HINH')")
    @GetMapping("/bookings")
    public List<TrainingBookingResponse> getBookings() {
        return opsService.getPendingBookings();
    }

    @PreAuthorize("hasAnyRole('GIAO_VU_KHU_VUC', 'GIAO_VU_SA_HINH')")
    @PostMapping("/slots")
    public TrainingSlot createSlot(@RequestBody CreateTrainingSlotRequest request) {
        return schedulingService.createSlot(request);
    }

    @PreAuthorize("hasAnyRole('GIAO_VU_KHU_VUC', 'GIAO_VU_SA_HINH')")
    @PutMapping("/slots/{slotId}/assign")
    public TrainingSlot assignResources(
            @PathVariable UUID slotId,
            @RequestParam Integer teacherId,
            @RequestParam UUID vehicleId) {
        return schedulingService.assignTeacherAndVehicle(slotId, teacherId, vehicleId);
    }

    @PreAuthorize("hasRole('GIAO_VU_KHU_VUC')")
    @PutMapping("/students/{studentId}/complete")
    public Student markCourseCompleted(@PathVariable UUID studentId) {
        return opsService.markCourseCompleted(studentId);
    }

    @PreAuthorize("hasAnyRole('GIAO_VU_KHU_VUC', 'GIAO_VU_SA_HINH')")
    @PostMapping("/students/{studentId}/schedule")
    public TrainingBookingResponse scheduleStudent(
            @PathVariable UUID studentId,
            @RequestParam SessionType sessionType,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end,
            @RequestParam(required = false) Integer teacherId,
            @RequestParam(required = false) UUID vehicleId) {
        return schedulingService.scheduleStudentForSlot(
                studentId, sessionType, start, end, teacherId, vehicleId);
    }

    @PreAuthorize("hasAnyRole('GIAO_VU_KHU_VUC', 'GIAO_VU_SA_HINH')")
    @GetMapping("/cabin-slots")
    public List<TrainingSlot> getCabinSlots(
            @RequestParam(defaultValue = "CABIN") SessionType type) {
        return schedulingService.getCabinSlots(type);
    }

    @PreAuthorize("hasAnyRole('GIAO_VU_KHU_VUC', 'GIAO_VU_SA_HINH')")
    @PutMapping("/cabin/{slotId}/assign-student")
    public TrainingBookingResponse assignStudentToCabin(
            @PathVariable UUID slotId,
            @RequestParam UUID studentId) {
        return schedulingService.assignStudentToCabin(slotId, studentId);
    }

    @PreAuthorize("hasAnyRole('GIAO_VU_KHU_VUC', 'GIAO_VU_SA_HINH')")
    @GetMapping("/slots/all")
    public List<TrainingSlot> getAllSlots(
            @RequestParam(required = false) SessionType sessionType,
            @RequestParam(required = false) LocalDateTime dateStart,
            @RequestParam(required = false) LocalDateTime dateEnd) {
        return schedulingService.getAllSlots(sessionType, dateStart, dateEnd);
    }
}
