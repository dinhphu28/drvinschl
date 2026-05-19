package com.dinhphu28.drvinschl.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.UserProvider;

public interface UserProviderRepository extends JpaRepository<UserProvider, Integer> {
    Optional<UserProvider> findByUser(User user);
}
