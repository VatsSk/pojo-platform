package com.devnest.infrastructure.config;

import com.devnest.domain.model.Admin;
import com.devnest.domain.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initDatabase(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!adminRepository.existsByEmail("admin@devnest.in")) {
                Admin defaultAdmin = new Admin();
                defaultAdmin.setEmail("admin@devnest.in");
                // Securely hash the default password
                defaultAdmin.setPassword(passwordEncoder.encode("admin123"));
                defaultAdmin.setFirstName("Super");
                defaultAdmin.setLastName("Admin");
                defaultAdmin.setRole(Admin.AdminRole.SUPER_ADMIN);
                defaultAdmin.setActive(true);
                
                adminRepository.save(defaultAdmin);
                System.out.println("===========================================");
                System.out.println("Default admin user created successfully:");
                System.out.println("Email: admin@devnest.in");
                System.out.println("Password: admin123");
                System.out.println("===========================================");
            }
        };
    }
}
