package com.dinhphu28.drvinschl.service;

import org.springframework.stereotype.Service;

import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.UserProvider;
import com.dinhphu28.drvinschl.repository.UserProviderRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserProviderRepository userProviderRepository;

    public void activateUser(String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        user.setEnabled(true);
        userRepository.save(user);
    }

    public User processGoogleUser(GoogleIdToken.Payload payload) {

        String email = payload.getEmail();
        String googleId = payload.getSubject();

        return userRepository.findByEmail(email)
                .map(user -> {
                    userProviderRepository.findByUser(user).orElseGet(() -> {
                        UserProvider userProvider = UserProvider.builder()
                                .providerName("GOOGLE")
                                .providerId(googleId)
                                .user(user)
                                .build();
                        return userProviderRepository.save(userProvider);
                    });

                    return user;
                })
                .orElseGet(() -> {
                    User user = User.builder()
                            .firstName((String) payload.get("given_name"))
                            .lastName((String) payload.get("family_name"))
                            .email(email)
                            .isEnabled(true)
                            .role(Role.USER)
                            .build();
                    userRepository.save(user);

                    UserProvider userProvider = UserProvider.builder()
                            .providerName("GOOGLE")
                            .providerId(googleId)
                            .user(user)
                            .build();
                    userProviderRepository.save(userProvider);

                    return user;
                });
    }
}
