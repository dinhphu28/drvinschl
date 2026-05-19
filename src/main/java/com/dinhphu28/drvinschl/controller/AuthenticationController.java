package com.dinhphu28.drvinschl.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.model.AuthenticationRequest;
import com.dinhphu28.drvinschl.model.AuthenticationResponse;
import com.dinhphu28.drvinschl.model.AuthenticationResult;
import com.dinhphu28.drvinschl.model.GoogleLoginRequest;
import com.dinhphu28.drvinschl.model.RegisterRequest;
import com.dinhphu28.drvinschl.service.AuthenticationService;
import com.dinhphu28.drvinschl.service.GoogleAuthService;
import com.dinhphu28.drvinschl.service.JwtService;
import com.dinhphu28.drvinschl.service.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final GoogleAuthService googleAuthService;
    private final UserService userService;

    private final JwtService jwtService;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void register(@RequestBody RegisterRequest request) {
        authenticationService.register(request);
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResult authResult = authenticationService.authenticate(request);
        ResponseCookie cookie = ResponseCookie.from("refresh_token", authResult.refreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/api/v1/auth/refresh")
                .maxAge(authResult.refreshTokenExpiration() / 1000)
                .sameSite("Strict")
                .build();

        AuthenticationResponse response = new AuthenticationResponse(
                authResult.accessToken(),
                authResult.accessTokenExpiration());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping(value = "/refresh", produces = MediaType.APPLICATION_JSON_VALUE)
    public AuthenticationResponse refreshToken(
            @CookieValue(name = "refresh_token", required = false) String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalArgumentException("Refresh token is missing");
        }
        return authenticationService.refreshToken(refreshToken);
    }

    @PostMapping(value = "/google", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> authenticateWithGoogle(@RequestBody GoogleLoginRequest request) {
        var payload = googleAuthService.verify(request.idToken());

        User user = userService.processGoogleUser(payload);

        String accessToken = jwtService.generateToken(user);

        AuthenticationResponse response = new AuthenticationResponse(
                accessToken,
                0L);

        return ResponseEntity.ok().body(response);
    }
}
