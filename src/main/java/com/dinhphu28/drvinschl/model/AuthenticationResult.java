package com.dinhphu28.drvinschl.model;

public record AuthenticationResult(
        String accessToken,
        long accessTokenExpiration,
        String refreshToken,
        long refreshTokenExpiration) {
}
