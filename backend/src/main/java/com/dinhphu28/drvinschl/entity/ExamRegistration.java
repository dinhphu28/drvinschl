package com.dinhphu28.drvinschl.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_exam_registration")
@Getter
@Setter
public class ExamRegistration extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(optional = false)
    @JoinColumn(name = "exam_session_id")
    private ExamSession examSession;

    @Column(name = "passed")
    private Boolean passed;

    @Column(name = "score")
    private String score;

    @Column(name = "is_retake")
    private boolean retake;

    @Column(name = "retake_fee")
    private BigDecimal retakeFee;
}
