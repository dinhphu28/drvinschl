package com.dinhphu28.drvinschl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    List<User> findByRole(Role role);

    @Query("SELECT u.username FROM User u WHERE u.username LIKE CONCAT(:base, '%')")
    List<String> findAllUsernamesStartingWith(@Param("base") String base);
}
