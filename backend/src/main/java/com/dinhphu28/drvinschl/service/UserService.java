package com.dinhphu28.drvinschl.service;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.NullMarked;
import org.jspecify.annotations.Nullable;
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

    @NullMarked
    public User updateUser(UserUpdateRequest updateRequest, String username) {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow();
        user.setEmail(updateRequest.email());
        return userRepository.save(user);
    }

    @NullMarked
    public boolean isUsernameExisted(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent();
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
                            .username(generateUniqueUsername(firstName, lastName))
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

    @NullMarked
    private String generateUniqueUsername(String firstName, @Nullable String lastName) {
        if (firstName.isBlank()) {
            throw new IllegalArgumentException("First name cannot be blank");
        }

        String fullName = (lastName != null)
                ? lastName.trim() + firstName.trim()
                : firstName.trim();

        String base = removeVietnameseAccents(fullName)
                .toLowerCase()
                .replaceAll("[^a-z0-9]", "");
        if (base.isBlank()) {
            base = "wolf";
        }

        List<String> takenUsernames = userRepository.findAllUsernamesStartingWith(base);
        if (takenUsernames.isEmpty() || !takenUsernames.contains(base)) {
            return base;
        }

        int maxNumber = 0;
        int baseLength = base.length();

        for (String taken : takenUsernames) {
            if (taken.equals(base))
                continue;

            String suffix = taken.substring(baseLength);
            if (suffix.matches("\\d+")) {
                try {
                    int currentNum = Integer.parseInt(suffix);
                    if (currentNum > maxNumber) {
                        maxNumber = currentNum;
                    }
                } catch (NumberFormatException ignored) {
                    // Safe handling for structural overflows
                }
            }
        }

        return base + (maxNumber + 1);
    }

    @NullMarked
    private static String removeVietnameseAccents(String input) {
        if (input == null)
            return "";
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("").replace("đ", "d").replace("Đ", "D");
    }

}
