package com.devnest.infrastructure.security;

import com.devnest.domain.model.Admin;
import com.devnest.domain.repository.AdminRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    public CustomUserDetailsService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + username));

        if (!admin.isActive()) {
            throw new UsernameNotFoundException("Admin account is deactivated");
        }

        return new User(
                admin.getEmail(),
                admin.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + admin.getRole().name()))
        );
    }
}
