package com.dinhphu28.drvinschl.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {
}
