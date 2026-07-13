package com.devnest.domain.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "services")
public class ServiceItem {
    @Id
    private String id;
    private String title;
    private String description;
    private String icon; // Icon identifier for frontend (e.g., 'Laptop', 'Cpu')
    private java.util.List<String> tags;
    private String pricing;
    private java.util.List<String> pricingOptions;
    private String imageUrl;
    
    private Boolean isActive = true;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
