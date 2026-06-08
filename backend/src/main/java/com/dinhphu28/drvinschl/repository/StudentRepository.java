package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dinhphu28.drvinschl.entity.CourseStatus;
import com.dinhphu28.drvinschl.entity.Student;
import com.dinhphu28.drvinschl.entity.User;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByUser(User user);

    List<Student> findByAssignedSales(User sales);

    long countByCourseStatus(CourseStatus status);

    @Query("""
            SELECT s FROM Student s
            JOIN s.user u
            WHERE :q = ''
               OR LOWER(s.fullName) LIKE LOWER(CONCAT('%', :q, '%'))
               OR LOWER(u.username) LIKE LOWER(CONCAT('%', :q, '%'))
               OR LOWER(COALESCE(u.email, '')) LIKE LOWER(CONCAT('%', :q, '%'))
               OR s.phone LIKE CONCAT('%', :q, '%')
            ORDER BY s.fullName ASC
            """)
    List<Student> searchForLookup(@Param("q") String q);
}
