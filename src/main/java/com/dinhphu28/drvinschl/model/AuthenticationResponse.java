package com.dinhphu28.drvinschl.model;

public record AuthenticationResponse(
        String accessToken,
        long accessTokenExpiration) {
}
