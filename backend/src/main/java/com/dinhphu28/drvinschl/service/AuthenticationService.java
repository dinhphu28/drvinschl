package com.dinhphu28.drvinschl.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinhphu28.drvinschl.entity.Token;
import com.dinhphu28.drvinschl.entity.TokenType;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.exception.NotFoundException;
import com.dinhphu28.drvinschl.exception.UnauthorizedException;
import com.dinhphu28.drvinschl.model.AuthenticationRequest;
import com.dinhphu28.drvinschl.model.AuthenticationResponse;
import com.dinhphu28.drvinschl.model.AuthenticationResult;
import com.dinhphu28.drvinschl.model.ChangePasswordRequest;
import com.dinhphu28.drvinschl.model.CurrentUserResponse;
import com.dinhphu28.drvinschl.repository.TokenRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpirationMillis;

    @Value("${application.security.jwt.expiration}")
    private long accessTokenExpirationMillis;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Transactional
    public AuthenticationResult authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        } catch (BadCredentialsException exception) {
            throw new UnauthorizedException("INVALID_CREDENTIALS", "Invalid username or password");
        }

        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));

        revokeAllRefreshTokens(user);

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        saveRefreshToken(user, refreshToken);

        return new AuthenticationResult(
                accessToken,
                accessTokenExpirationMillis,
                refreshToken,
                refreshExpirationMillis);
    }

    @Transactional(readOnly = true)
    public AuthenticationResponse refreshToken(String refreshToken) {
        Token storedToken = tokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new UnauthorizedException("INVALID_REFRESH_TOKEN", "Refresh token is invalid"));

        if (storedToken.isExpired() || storedToken.isRevoked() || jwtService.isTokenExpired(refreshToken)) {
            throw new UnauthorizedException("INVALID_REFRESH_TOKEN", "Refresh token is invalid");
        }

        String newAccessToken = jwtService.generateToken(storedToken.getUser());
        return new AuthenticationResponse(newAccessToken, accessTokenExpirationMillis);
    }

    @Transactional(readOnly = true)
    public CurrentUserResponse me(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        return toCurrentUserResponse(user);
    }

    @Transactional
    public void changePassword(User user, ChangePasswordRequest request) {
        User currentUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));

        if (!passwordEncoder.matches(request.oldPassword(), currentUser.getPassword())) {
            throw new UnauthorizedException("INVALID_PASSWORD", "Old password is incorrect");
        }

        currentUser.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(currentUser);
        revokeAllRefreshTokens(currentUser);
    }

    private void saveRefreshToken(User user, String refreshToken) {
        Token token = Token.builder()
                .token(refreshToken)
                .tokenType(TokenType.REFRESH)
                .revoked(false)
                .expired(false)
                .expiresAt(LocalDateTime.now().plusNanos(refreshExpirationMillis * 1_000_000L))
                .user(user)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllRefreshTokens(User user) {
        List<Token> activeTokens = tokenRepository.findAllByUserAndExpiredFalseAndRevokedFalse(user);
        if (activeTokens.isEmpty()) {
            return;
        }

        activeTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(activeTokens);
    }

    private CurrentUserResponse toCurrentUserResponse(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getCode())
                .collect(Collectors.toSet());
        Set<String> permissions = user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(permission -> permission.getCode())
                .collect(Collectors.toSet());
        return new CurrentUserResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getPhone(),
                user.getEmail(),
                user.getStatus(),
                roles.stream().sorted().toList(),
                permissions.stream().sorted().toList());
    }
}
