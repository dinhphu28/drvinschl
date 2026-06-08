package com.dinhphu28.drvinschl.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.CoursePackage;

public interface CoursePackageRepository extends JpaRepository<CoursePackage, UUID> {
    Optional<CoursePackage> findByName(String name);
}
