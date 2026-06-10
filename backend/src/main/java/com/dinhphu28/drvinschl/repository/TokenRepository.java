package com.dinhphu28.drvinschl.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinhphu28.drvinschl.entity.Token;
import com.dinhphu28.drvinschl.entity.User;

public interface TokenRepository extends JpaRepository<Token, UUID> {

    Optional<Token> findByToken(String token);

    List<Token> findAllByUserAndExpiredFalseAndRevokedFalse(User user);
}
