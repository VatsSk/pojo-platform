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