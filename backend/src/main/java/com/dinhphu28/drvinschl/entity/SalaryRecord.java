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
@Table(name = "tbl_salary")
@Getter
@Setter
public class SalaryRecord extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @Column(name = "month", nullable = false)
    private String month;

    @Column(name = "base_salary")
    private BigDecimal baseSalary;

    @Column(name = "bonus")
    private BigDecimal bonus;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "approved_by_admin")
    private boolean approvedByAdmin;

    @Column(name = "approved_by_director")
    private boolean approvedByDirector;
}
