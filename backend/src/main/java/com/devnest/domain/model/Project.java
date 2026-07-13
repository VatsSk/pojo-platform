package com.devnest.domain.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "projects")
public class Project {
    @Id
    private String id;
    private String title;
    private String description;
    private String category;
    private String imageUrl;
    private String projectUrl;
    private List<String> technologies;
    private List<ProjectFeature> features;
    private boolean featured;

    @Data
    public static class ProjectFeature {
        private String featureText;
        private String imageUrl;
    }

    private Boolean isActive = true;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
