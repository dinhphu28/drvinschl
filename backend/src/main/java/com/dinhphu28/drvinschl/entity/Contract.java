package com.dinhphu28.drvinschl.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_contract")
@Getter
@Setter
public class Contract extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sales_id")
    private User sales;

    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;

    @Column(name = "signed_date")
    private LocalDate signedDate;

    @Column(name = "contract_amount")
    private BigDecimal contractAmount;

    @Column(name = "registration_form_complete")
    private boolean registrationFormComplete;

    @Column(name = "photo_complete")
    private boolean photoComplete;

    @Column(name = "health_check_complete")
    private boolean healthCheckComplete;

    @Column(name = "fee_complete")
    private boolean feeComplete;

    @Column(name = "commission_amount")
    private BigDecimal commissionAmount;
}
