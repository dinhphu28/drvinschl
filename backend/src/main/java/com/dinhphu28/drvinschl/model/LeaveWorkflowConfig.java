package com.dinhphu28.drvinschl.model;

public record LeaveWorkflowConfig(
        Integer maxTeachersOffPerDay,
        Integer minimumAdvanceDays,
        Integer maxConsecutiveDays,
        Boolean requireReason,
        String approvalSteps,
        String notes) {

    public static final String CONFIG_KEY = "LEAVE_WORKFLOW_CONFIG";

    public static LeaveWorkflowConfig defaults() {
        return new LeaveWorkflowConfig(
                1,
                1,
                3,
                true,
                "Giáo viên gửi yêu cầu -> Quản lý khu vực kiểm tra lịch -> Duyệt hoặc từ chối",
                "Không duyệt nếu đã có giáo viên khác nghỉ cùng ngày, trừ khi Giám đốc quyết định ngoài hệ thống.");
    }

    public LeaveWorkflowConfig normalized() {
        LeaveWorkflowConfig defaults = defaults();
        return new LeaveWorkflowConfig(
                positiveOrDefault(maxTeachersOffPerDay, defaults.maxTeachersOffPerDay),
                nonNegativeOrDefault(minimumAdvanceDays, defaults.minimumAdvanceDays),
                positiveOrDefault(maxConsecutiveDays, defaults.maxConsecutiveDays),
                requireReason != null ? requireReason : defaults.requireReason,
                textOrDefault(approvalSteps, defaults.approvalSteps),
                textOrDefault(notes, defaults.notes));
    }

    private static Integer positiveOrDefault(Integer value, Integer fallback) {
        return value != null && value > 0 ? value : fallback;
    }

    private static Integer nonNegativeOrDefault(Integer value, Integer fallback) {
        return value != null && value >= 0 ? value : fallback;
    }

    private static String textOrDefault(String value, String fallback) {
        return value != null && !value.isBlank() ? value.trim() : fallback;
    }
}
