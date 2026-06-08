package com.dinhphu28.drvinschl.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_course_package")
@Getter
@Setter
public class CoursePackage extends AbstractAuditableEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "theory_hours")
    private Integer theoryHours;

    @Column(name = "simulation_hours")
    private Integer simulationHours;

    @Column(name = "basic_4h_hours")
    private Integer basic4hHours;

    @Column(name = "cabin_hours")
    private Integer cabinHours;

    @Column(name = "dat_hours")
    private Integer datHours;

    @Column(name = "dat_km")
    private Integer datKm;

    @Column(name = "sa_hinh_hours")
    private Integer saHinhHours;

    @Column(name = "practical_road_hours")
    private Integer practicalRoadHours;

    @Column(name = "raw_yard_hours")
    private Integer rawYardHours;

    @Column(name = "sensor_practice_hours")
    private Integer sensorPracticeHours;

    @Column(name = "sensor_exam_hours")
    private Integer sensorExamHours;

    @Column(name = "active")
    private boolean active;
}
