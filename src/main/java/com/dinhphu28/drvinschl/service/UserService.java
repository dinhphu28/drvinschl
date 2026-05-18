package com.dinhphu28.drvinschl.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.dinhphu28.drvinschl.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void activateUser(String email) {
        var user = userRepository.findByEmail(email).orElseThrow();
        user.setEnabled(true);
        userRepository.save(user);
    }
}
