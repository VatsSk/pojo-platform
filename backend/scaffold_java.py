import os
import shutil

base_dir = r"D:\devNest\deVnest\src\main\java\com\devnest"

# Clean up Kotlin files
if os.path.exists(base_dir):
    shutil.rmtree(base_dir)

# Create directories
dirs = [
    "",
    "domain/model",
    "domain/repository",
    "application/dto/request",
    "application/dto/response",
    "application/service",
    "application/exception",
    "infrastructure/security",
    "presentation/controller"
]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

def write_file(path, content):
    with open(os.path.join(base_dir, path), "w", encoding="utf-8") as f:
        f.write(content.strip())

# === Main App ===
write_file("DevNestApplication.java", """
package com.devnest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class DevNestApplication {
    public static void main(String[] args) {
        SpringApplication.run(DevNestApplication.class, args);
    }
}
""")

# === Models ===
write_file("domain/model/Admin.java", """
package com.devnest.domain.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "admins")
public class Admin {
    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private AdminRole role = AdminRole.ADMIN;
    private boolean isActive = true;
    private String profileImage;
    private LocalDateTime lastLoginAt;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public enum AdminRole { SUPER_ADMIN, ADMIN, MODERATOR }
}
""")

write_file("domain/model/ContactRequest.java", """
package com.devnest.domain.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "contactRequests")
public class ContactRequest {
    @Id
    private String id;
    private String name;
    private String college;
    private String department;
    private String academicYear;
    private String email;
    private String phone;
    private PreferredContact preferredContact;
    private String concern;
    private String message;
    private ContactStatus status = ContactStatus.PENDING;
    private ContactSource source = ContactSource.CONTACT_FORM;
    private String internalNotes;
    private String assignedTo;
    private boolean adminEmailSent = false;
    private boolean studentEmailSent = false;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public enum PreferredContact { EMAIL, PHONE, WHATSAPP }
    public enum ContactStatus { PENDING, IN_PROGRESS, RESOLVED, CLOSED }
    public enum ContactSource { CONTACT_FORM, CHAT_POPUP, WHATSAPP }
}
""")

# === Repositories ===
write_file("domain/repository/AdminRepository.java", """
package com.devnest.domain.repository;

import com.devnest.domain.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Admin> findByIsActiveTrue();
}
""")

write_file("domain/repository/ContactRequestRepository.java", """
package com.devnest.domain.repository;

import com.devnest.domain.model.ContactRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRequestRepository extends MongoRepository<ContactRequest, String> {
}
""")

# === DTOs ===
write_file("application/dto/request/ContactRequestDto.java", """
package com.devnest.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactRequestDto {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "College is required")
    private String college;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Academic year is required")
    private String academicYear;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Valid phone number is required")
    private String phone;

    @NotBlank(message = "Preferred contact method is required")
    private String preferredContact;

    @NotBlank(message = "Concern is required")
    private String concern;

    @NotBlank(message = "Message is required")
    @Size(min = 20, max = 2000, message = "Message must be between 20 and 2000 characters")
    private String message;
}
""")

write_file("application/dto/request/ChatInquiryRequest.java", """
package com.devnest.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChatInquiryRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "College is required")
    private String college;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 1000, message = "Message must be between 10 and 1000 characters")
    private String message;
}
""")

write_file("application/dto/response/ApiResponse.java", """
package com.devnest.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
    
    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }
}
""")

# === Services ===
write_file("application/service/EmailService.java", """
package com.devnest.application.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    
    @Value("${spring.mail.username:}")
    private String fromEmail;
    
    @Value("${app.admin.email:}")
    private String adminEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendEmail(String to, String subject, String content, boolean isHtml) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            if (fromEmail != null && !fromEmail.isEmpty()) {
                helper.setFrom(fromEmail, "DevNest Team");
            }
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, isHtml);
            
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Async
    public void notifyAdminOfContact(String name, String email, String phone, String message) {
        String subject = "New Contact Request: " + name;
        String content = "<h2>New Contact Request</h2>" +
                "<p><strong>Name:</strong> " + name + "</p>" +
                "<p><strong>Email:</strong> " + email + "</p>" +
                "<p><strong>Phone:</strong> " + phone + "</p>" +
                "<br/><h3>Message:</h3><p>" + message + "</p>";
        
        sendEmail(adminEmail, subject, content, true);
    }

    @Async
    public void sendStudentAcknowledgement(String name, String email) {
        String subject = "DevNest - We've received your request!";
        String content = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>" +
                "<h2>Hello " + name + ",</h2>" +
                "<p>Thank you for reaching out to DevNest! We have received your request and our team of engineers will review it shortly.</p>" +
                "<p>We understand how important your query is, and we aim to get back to you within 24-48 hours.</p>" +
                "<br/><p>Best Regards,</p><p><strong>The DevNest Team</strong></p></div>";
        
        sendEmail(email, subject, content, true);
    }
}
""")

write_file("application/service/ContactService.java", """
package com.devnest.application.service;

import com.devnest.application.dto.request.ChatInquiryRequest;
import com.devnest.application.dto.request.ContactRequestDto;
import com.devnest.application.dto.response.ApiResponse;
import com.devnest.domain.model.ContactRequest;
import com.devnest.domain.repository.ContactRequestRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRequestRepository contactRequestRepository;
    private final EmailService emailService;

    public ContactService(ContactRequestRepository contactRequestRepository, EmailService emailService) {
        this.contactRequestRepository = contactRequestRepository;
        this.emailService = emailService;
    }

    public ApiResponse<String> submitContactForm(ContactRequestDto request) {
        ContactRequest contact = new ContactRequest();
        contact.setName(request.getName());
        contact.setCollege(request.getCollege());
        contact.setDepartment(request.getDepartment());
        contact.setAcademicYear(request.getAcademicYear());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        try {
            contact.setPreferredContact(ContactRequest.PreferredContact.valueOf(request.getPreferredContact().toUpperCase()));
        } catch (Exception e) {
            contact.setPreferredContact(ContactRequest.PreferredContact.EMAIL);
        }
        contact.setConcern(request.getConcern());
        contact.setMessage(request.getMessage());
        contact.setSource(ContactRequest.ContactSource.CONTACT_FORM);
        
        contactRequestRepository.save(contact);
        
        emailService.notifyAdminOfContact(request.getName(), request.getEmail(), request.getPhone(), request.getMessage());
        emailService.sendStudentAcknowledgement(request.getName(), request.getEmail());
        
        return new ApiResponse<>(true, "Contact request submitted successfully");
    }

    public ApiResponse<String> submitChatInquiry(ChatInquiryRequest request) {
        ContactRequest contact = new ContactRequest();
        contact.setName(request.getName());
        contact.setCollege(request.getCollege());
        contact.setDepartment("N/A");
        contact.setAcademicYear("N/A");
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setPreferredContact(ContactRequest.PreferredContact.EMAIL);
        contact.setConcern("Chat Inquiry");
        contact.setMessage(request.getMessage());
        contact.setSource(ContactRequest.ContactSource.CHAT_POPUP);
        
        contactRequestRepository.save(contact);
        
        emailService.notifyAdminOfContact(request.getName(), request.getEmail(), request.getPhone(), request.getMessage());
        emailService.sendStudentAcknowledgement(request.getName(), request.getEmail());
        
        return new ApiResponse<>(true, "Chat inquiry submitted successfully");
    }
}
""")

# === Exception Handler ===
write_file("application/exception/GlobalExceptionHandler.java", """
package com.devnest.application.exception;

import com.devnest.application.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ApiResponse<>(false, "Validation failed", errors);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleAllUncaughtException(Exception ex) {
        ex.printStackTrace();
        return new ApiResponse<>(false, "An unexpected error occurred: " + ex.getMessage());
    }
}
""")

# === Controllers ===
write_file("presentation/controller/PublicController.java", """
package com.devnest.presentation.controller;

import com.devnest.application.dto.request.ChatInquiryRequest;
import com.devnest.application.dto.request.ContactRequestDto;
import com.devnest.application.dto.response.ApiResponse;
import com.devnest.application.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final ContactService contactService;

    public PublicController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/ping")
    public ResponseEntity<ApiResponse<String>> ping() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Pong"));
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<String>> submitContact(@Valid @RequestBody ContactRequestDto request) {
        return ResponseEntity.ok(contactService.submitContactForm(request));
    }

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<String>> submitChat(@Valid @RequestBody ChatInquiryRequest request) {
        return ResponseEntity.ok(contactService.submitChatInquiry(request));
    }
}
""")

# === Security ===
write_file("infrastructure/security/SecurityConfig.java", """
package com.devnest.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/api/admin/**").hasAnyRole("SUPER_ADMIN", "ADMIN", "MODERATOR")
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
""")

print("Java files generated successfully.")
