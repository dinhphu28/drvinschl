package com.dinhphu28.drvinschl.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.model.ApiResponse;
import com.dinhphu28.drvinschl.model.AuthenticationRequest;
import com.dinhphu28.drvinschl.model.AuthenticationResponse;
import com.dinhphu28.drvinschl.model.AuthenticationResult;
import com.dinhphu28.drvinschl.model.ChangePasswordRequest;
import com.dinhphu28.drvinschl.model.CurrentUserResponse;
import com.dinhphu28.drvinschl.service.AuthenticationService;
import com.dinhphu28.drvinschl.service.JwtLogoutHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtLogoutHandler jwtLogoutHandler;
    @org.springframework.beans.factory.annotation.Value("${application.security.jwt.refresh-token.secure:false}")
    private boolean secureRefreshCookie;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(@Valid @RequestBody AuthenticationRequest request) {
        AuthenticationResult result = authenticationService.authenticate(request);
        ResponseCookie cookie = buildRefreshCookie(result.refreshToken(), result.refreshTokenExpiration());
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ApiResponse.success(new AuthenticationResponse(result.accessToken(), result.accessTokenExpiration())));
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refresh(
            @CookieValue(name = "refresh_token", required = false) String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new IllegalArgumentException("Refresh token is missing");
        }
        return ApiResponse.success(authenticationService.refreshToken(refreshToken));
    }

    @PutMapping("/change-password")
    public ApiResponse<Void> changePassword(@AuthenticationPrincipal User user,
            @Valid @RequestBody ChangePasswordRequest request) {
        authenticationService.changePassword(user, request);
        return ApiResponse.success(null, "Password changed");
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        jwtLogoutHandler.logout(request, response, authentication);
        return ApiResponse.success(null, "Logged out");
    }

    @GetMapping("/me")
    public ApiResponse<CurrentUserResponse> me(@AuthenticationPrincipal UserDetails userDetails) {
        return ApiResponse.success(authenticationService.me(userDetails.getUsername()));
    }

    private ResponseCookie buildRefreshCookie(String refreshToken, long refreshExpirationMillis) {
        return ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(secureRefreshCookie)
                .path("/api/v1/auth")
                .maxAge(refreshExpirationMillis / 1000)
                .sameSite("Lax")
                .build();
    }
}
