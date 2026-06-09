package com.dinhphu28.drvinschl.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.dinhphu28.drvinschl.entity.ExamPart;

public record ExamRegistrationResponse(
        UUID id,
        UUID studentId,
        String studentName,
        ExamSessionResponse examSession,
        Boolean passed,
        String score,
        boolean retake,
        BigDecimal retakeFee,
        ExamPart retakePart) {
}
