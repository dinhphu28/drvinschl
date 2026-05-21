package com.dinhphu28.drvinschl.service;

import org.springframework.stereotype.Service;

import com.dinhphu28.drvinschl.entity.Role;
import com.dinhphu28.drvinschl.entity.User;
import com.dinhphu28.drvinschl.entity.UserProvider;
import com.dinhphu28.drvinschl.model.UserUpdateRequest;
import com.dinhphu28.drvinschl.repository.UserProviderRepository;
import com.dinhphu28.drvinschl.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserProviderRepository userProviderRepository;

    public User updateUser(UserUpdateRequest updateRequest, String username) {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow();
        user.setEmail(updateRequest.email());
        return userRepository.save(user);
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
                    String firstName = (String) payload.get("given_name");
                    String lastName = (String) payload.get("family_name");
                    User user = User.builder()
                            .firstName(firstName)
                            .lastName(lastName)
                            .email(email)
                            .username(generateRandomUsername(firstName, lastName))
                            .isEnabled(true)
                            .role(Role.USER)
                            .build();
                    User savedUser = userRepository.save(user);

                    UserProvider userProvider = UserProvider.builder()
                            .providerName("GOOGLE")
                            .providerId(googleId)
                            .user(savedUser)
                            .build();
                    userProviderRepository.save(userProvider);

                    return user;
                });
    }

    public void activateUser(String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        user.setEnabled(true);
        userRepository.save(user);
    }

    private String generateRandomUsername(String firstName, String lastName) {
        String tmpUsername = firstName + lastName;
        // TODO: Reduce tmpUsername to ascii alphabet characters only
        // Check if existed then add postfix number
        // For simplicity, can find in database; Or can use bloom filter
        return tmpUsername;
    }
}
