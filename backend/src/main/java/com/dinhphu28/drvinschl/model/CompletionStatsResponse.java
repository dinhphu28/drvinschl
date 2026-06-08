package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;

public record CompletionStatsResponse(
        java.util.Map<String, Long> totalCompletedByMonth,
        BigDecimal completionRate) {
}
