package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.ExtraRegistration;

public record ExtraRegistrationResponse(
        UUID id,
        ExtraRegistration.ExtraType extraType,
        Integer hours,
        BigDecimal fee) {
}
