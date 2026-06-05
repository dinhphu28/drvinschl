package com.dinhphu28.drvinschl.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_fuel_record")
@Getter
@Setter
public class FuelRecord extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @Column(name = "fuel_date", nullable = false)
    private LocalDate fuelDate;

    @Column(name = "liters", nullable = false)
    private BigDecimal liters;

    @Column(name = "receipt_url")
    private String receiptUrl;

    @Column(name = "amount")
    private BigDecimal amount;
}
