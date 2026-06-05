package com.dinhphu28.drvinschl.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_student")
@Getter
@Setter
public class Student extends AbstractAuditableEntity {

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "dob", nullable = false)
    private LocalDate dob;

    @Column(name = "course_package")
    private String coursePackage;

    @Column(name = "application_date")
    private LocalDate applicationDate;

    @Column(name = "opening_date")
    private LocalDate openingDate;

    @Column(name = "closing_date")
    private LocalDate closingDate;

    @Column(name = "settlement_date")
    private LocalDate settlementDate;

    @Column(name = "certificate_received_date")
    private LocalDate certificateReceivedDate;

    @Column(name = "total_fee")
    private BigDecimal totalFee;

    @Column(name = "paid_fee")
    private BigDecimal paidFee;

    @Enumerated(EnumType.STRING)
    @Column(name = "course_status")
    private CourseStatus courseStatus;

    @ManyToOne
    @JoinColumn(name = "assigned_sales_id")
    private User assignedSales;
}
