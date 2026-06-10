package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.User;

public interface UserRepository extends JpaRepository<User, UUID> {

    @EntityGraph(attributePaths = { "roles", "roles.permissions" })
    Optional<User> findByUsername(String username);

    @EntityGraph(attributePaths = { "roles", "roles.permissions" })
    Optional<User> findByEmail(String email);

    @EntityGraph(attributePaths = { "roles", "roles.permissions" })
    List<User> findAllByDeletedAtIsNull();
}
