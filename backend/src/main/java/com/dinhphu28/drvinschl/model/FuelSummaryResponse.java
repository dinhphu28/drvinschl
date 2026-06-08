package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;

public record FuelSummaryResponse(
        int year,
        int month,
        BigDecimal totalLiters,
        BigDecimal totalCost) {
}
