package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;

public record ExamStatsResponse(
        java.util.Map<String, BigDecimal> passRateByType,
        java.util.Map<String, Long> totalExamsByMonth) {
}
