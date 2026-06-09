package com.dinhphu28.drvinschl.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.LeaveRequest;
import com.dinhphu28.drvinschl.entity.LeaveStatus;
import com.dinhphu28.drvinschl.entity.SystemConfig;
import com.dinhphu28.drvinschl.model.LeaveWorkflowConfig;
import com.dinhphu28.drvinschl.repository.LeaveRequestRepository;
import com.dinhphu28.drvinschl.repository.SystemConfigRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveWorkflowConfigService {
    private final SystemConfigRepository systemConfigRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LeaveWorkflowConfig getConfig() {
        return systemConfigRepository.findByConfigKey(LeaveWorkflowConfig.CONFIG_KEY)
                .map(SystemConfig::getConfigValue)
                .map(this::parseConfig)
                .orElseGet(LeaveWorkflowConfig::defaults)
                .normalized();
    }

    @Transactional
    public LeaveWorkflowConfig saveConfig(LeaveWorkflowConfig request) {
        LeaveWorkflowConfig config = request.normalized();
        SystemConfig entity = systemConfigRepository.findByConfigKey(LeaveWorkflowConfig.CONFIG_KEY)
                .orElseGet(SystemConfig::new);
        entity.setConfigKey(LeaveWorkflowConfig.CONFIG_KEY);
        entity.setConfigValue(writeConfig(config));
        entity.setDescription("Quy trình nghỉ phép theo quy định của trung tâm");
        systemConfigRepository.save(entity);
        return config;
    }

    public void validateNewRequest(LocalDate start, LocalDate end, String reason) {
        LeaveWorkflowConfig config = getConfig();
        if (start == null || end == null || end.isBefore(start)) {
            throw new IllegalArgumentException("Ngày nghỉ không hợp lệ");
        }
        long days = ChronoUnit.DAYS.between(start, end) + 1;
        if (days > config.maxConsecutiveDays()) {
            throw new IllegalArgumentException("Số ngày nghỉ liên tiếp tối đa là " + config.maxConsecutiveDays() + " ngày");
        }
        if (start.isBefore(LocalDate.now().plusDays(config.minimumAdvanceDays()))) {
            throw new IllegalArgumentException("Yêu cầu nghỉ phép phải gửi trước tối thiểu " + config.minimumAdvanceDays() + " ngày");
        }
        if (Boolean.TRUE.equals(config.requireReason()) && (reason == null || reason.isBlank())) {
            throw new IllegalArgumentException("Vui lòng nhập lý do nghỉ phép");
        }
    }

    public void validateApproval(LeaveRequest request) {
        LeaveWorkflowConfig config = getConfig();
        LocalDate date = request.getStartDate();
        while (!date.isAfter(request.getEndDate())) {
            LocalDate current = date;
            long approvedTeachers = leaveRequestRepository.findByStatus(LeaveStatus.APPROVED).stream()
                    .filter(existing -> !existing.getId().equals(request.getId()))
                    .filter(existing -> !existing.getTeacher().getId().equals(request.getTeacher().getId()))
                    .filter(existing -> !existing.getStartDate().isAfter(current) && !existing.getEndDate().isBefore(current))
                    .count();
            if (approvedTeachers >= config.maxTeachersOffPerDay()) {
                throw new IllegalArgumentException(
                        "Không thể duyệt: đã đủ " + config.maxTeachersOffPerDay() + " giáo viên nghỉ ngày " + current);
            }
            date = date.plusDays(1);
        }
    }

    private LeaveWorkflowConfig parseConfig(String value) {
        try {
            return objectMapper.readValue(value, LeaveWorkflowConfig.class);
        } catch (JsonProcessingException ex) {
            return LeaveWorkflowConfig.defaults();
        }
    }

    private String writeConfig(LeaveWorkflowConfig config) {
        try {
            return objectMapper.writeValueAsString(config);
        } catch (JsonProcessingException ex) {
            throw new IllegalArgumentException("Không thể lưu cấu hình nghỉ phép");
        }
    }
}
