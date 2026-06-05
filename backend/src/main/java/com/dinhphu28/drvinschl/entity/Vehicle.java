package com.dinhphu28.drvinschl.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_vehicle")
@Getter
@Setter
public class Vehicle extends AbstractAuditableEntity {

    @Column(name = "license_plate", nullable = false, unique = true)
    private String licensePlate;

    @Column(name = "model")
    private String model;

    @Column(name = "registration_expiry")
    private LocalDate registrationExpiry;

    @Column(name = "learner_license_expiry")
    private LocalDate learnerLicenseExpiry;

    @Column(name = "insurance_expiry")
    private LocalDate insuranceExpiry;

    @Column(name = "mortgage_info")
    private String mortgageInfo;

    @Column(name = "ownership_info")
    private String ownershipInfo;

    @Column(name = "current_odo")
    private Integer currentOdo;

    @Column(name = "is_clean")
    private boolean clean;

    @Column(name = "active")
    private boolean active;
}
