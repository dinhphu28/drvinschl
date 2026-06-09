package com.dinhphu28.drvinschl.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_vehicle_log")
@Getter
@Setter
public class VehicleLog extends AbstractAuditableEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @Column(name = "departure_time")
    private LocalDateTime departureTime;

    @Column(name = "return_time")
    private LocalDateTime returnTime;

    @Column(name = "odo_departure")
    private Integer odoDeparture;

    @Column(name = "odo_return")
    private Integer odoReturn;

    @Column(name = "is_clean")
    private boolean clean;

    @Column(name = "clean_photo_url")
    private String cleanPhotoUrl;
}
