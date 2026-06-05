package com.dinhphu28.drvinschl.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_extra_registration")
@Getter
@Setter
public class ExtraRegistration extends AbstractAuditableEntity {

    public enum ExtraType {
        DUONG_TRUONG,
        SA_HINH
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    @Enumerated(EnumType.STRING)
    @Column(name = "extra_type", nullable = false)
    private ExtraType extraType;

    @Column(name = "hours")
    private Integer hours;

    @Column(name = "fee")
    private BigDecimal fee;
}
