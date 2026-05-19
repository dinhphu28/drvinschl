package com.dinhphu28.drvinschl.service;

import org.springframework.security.core.AuthenticationException;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.Token;
import com.dinhphu28.drvinschl.entity.TokenType;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.model.AuthenticationRequest;
import com.dinhphu28.drvinschl.model.AuthenticationResponse;
import com.dinhphu28.drvinschl.model.AuthenticationResult;
import com.dinhphu28.drvinschl.model.RegisterRequest;
import com.dinhphu28.drvinschl.repository.TokenRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long REFRESH_EXPIRATION;

    @Value("${application.security.jwt.expiration}")
    private long ACCESS_TOKEN_EXPIRATION;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;

    public void register(@NonNull RegisterRequest request) {
        var user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .isEnabled(true) // NOTE: Should be false if email verification is implemented
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }

    public @NonNull AuthenticationResult authenticate(@NonNull AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()));

        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new AuthenticationException("User not found") {
                });

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        saveRefreshToken(user, refreshToken);

        return new AuthenticationResult(
                accessToken,
                ACCESS_TOKEN_EXPIRATION,
                refreshToken,
                REFRESH_EXPIRATION);
    }

    public @NonNull AuthenticationResponse refreshToken(@NonNull String refreshToken) {
        Token storedToken = tokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new AuthenticationException("Refresh token not found") {
                });
        if (storedToken.isExpired() || storedToken.isRevoked() || jwtService.isTokenExpired(refreshToken)) {
            throw new AuthenticationException("Refresh token is invalid") {
            };
        }

        User user = storedToken.getUser();

        String newAccessToken = jwtService.generateToken(user);
        return new AuthenticationResponse(
                newAccessToken,
                ACCESS_TOKEN_EXPIRATION);
    }

    private void saveRefreshToken(User user, String refreshToken) {
        var token = Token.builder()
                .user(user)
                .token(refreshToken)
                .tokenType(TokenType.REFRESH)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }
}
