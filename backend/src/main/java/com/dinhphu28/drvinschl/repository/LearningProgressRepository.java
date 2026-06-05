package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.LearningModule;
import com.dinhphu28.drvinschl.entity.LearningProgress;
import com.dinhphu28.drvinschl.entity.Student;

public interface LearningProgressRepository extends JpaRepository<LearningProgress, UUID> {
    List<LearningProgress> findByStudent(Student student);

    Optional<LearningProgress> findByStudentAndModule(Student student, LearningModule module);
}
