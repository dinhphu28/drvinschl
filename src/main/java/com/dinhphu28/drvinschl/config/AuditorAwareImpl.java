package com.dinhphu28.drvinschl.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.dinhphu28.drvinschl.entity.AuditUser;

@Component
public class AuditorAwareImpl implements AuditorAware<AuditUser> {

    @Override
    public Optional<AuditUser> getCurrentAuditor() {
        var context = SecurityContextHolder.getContext();

        if (context == null) {
            return Optional.empty();
        }

        var authentication = context.getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails userDetails) {
            return Optional.of(new AuditUser(
                    userDetails.getUsername()));
        }

        return Optional.empty();
    }
}
