package com.devnest.presentation.controller;

import com.devnest.application.dto.response.ApiResponse;
import com.devnest.domain.model.ContactRequest;
import com.devnest.domain.model.Project;
import com.devnest.domain.model.ServiceItem;
import com.devnest.domain.model.SiteConfig;
import com.devnest.domain.repository.ContactRequestRepository;
import com.devnest.domain.repository.ProjectRepository;
import com.devnest.domain.repository.ServiceItemRepository;
import com.devnest.domain.repository.SiteConfigRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.devnest.application.service.CloudinaryService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ContactRequestRepository contactRequestRepository;
    private final ProjectRepository projectRepository;
    private final ServiceItemRepository serviceItemRepository;
    private final SiteConfigRepository siteConfigRepository;
    private final CloudinaryService cloudinaryService;

    public AdminController(ContactRequestRepository contactRequestRepository,
                           ProjectRepository projectRepository,
                           ServiceItemRepository serviceItemRepository,
                           SiteConfigRepository siteConfigRepository,
                           CloudinaryService cloudinaryService) {
        this.contactRequestRepository = contactRequestRepository;
        this.projectRepository = projectRepository;
        this.serviceItemRepository = serviceItemRepository;
        this.siteConfigRepository = siteConfigRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping("/contacts")
    public ResponseEntity<ApiResponse<List<ContactRequest>>> getAllContacts() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Fetched all contact requests", contactRequestRepository.findAll()));
    }

    @PutMapping("/contacts/{id}/status")
    public ResponseEntity<ApiResponse<ContactRequest>> updateContactStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        ContactRequest contact = contactRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        contact.setStatus(ContactRequest.ContactStatus.valueOf(body.get("status")));
        return ResponseEntity.ok(new ApiResponse<>(true, "Status updated", contactRequestRepository.save(contact)));
    }
    
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<String>> getDashboardStats() {
        long totalContacts = contactRequestRepository.count();
        long totalProjects = projectRepository.count();
        return ResponseEntity.ok(new ApiResponse<>(true, "Stats loaded", "Total Contact Requests: " + totalContacts + ", Total Projects: " + totalProjects));
    }

    // Projects CRUD
    @PostMapping("/projects")
    public ResponseEntity<ApiResponse<Project>> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Project created", projectRepository.save(project)));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<Project>> updateProject(@PathVariable String id, @RequestBody Project project) {
        project.setId(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Project updated", projectRepository.save(project)));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable String id) {
        projectRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Project deleted", null));
    }

    // Services CRUD
    @PostMapping("/services")
    public ResponseEntity<ApiResponse<ServiceItem>> createService(@RequestBody ServiceItem serviceItem) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Service created", serviceItemRepository.save(serviceItem)));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ApiResponse<ServiceItem>> updateService(@PathVariable String id, @RequestBody ServiceItem serviceItem) {
        serviceItem.setId(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Service updated", serviceItemRepository.save(serviceItem)));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteService(@PathVariable String id) {
        serviceItemRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Service deleted", null));
    }

    // Site Config
    @GetMapping("/site-config")
    public ResponseEntity<ApiResponse<SiteConfig>> getSiteConfig() {
        List<SiteConfig> configs = siteConfigRepository.findAll();
        SiteConfig config = configs.isEmpty() ? new SiteConfig() : configs.get(0);
        return ResponseEntity.ok(new ApiResponse<>(true, "Site config fetched", config));
    }

    @PutMapping("/site-config")
    public ResponseEntity<ApiResponse<SiteConfig>> updateSiteConfig(@RequestBody SiteConfig config) {
        List<SiteConfig> configs = siteConfigRepository.findAll();
        if (!configs.isEmpty()) {
            config.setId(configs.get(0).getId());
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Site config updated", siteConfigRepository.save(config)));
    }

    // Image Upload
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            String url = cloudinaryService.uploadImage(image);
            return ResponseEntity.ok(new ApiResponse<>(true, "Image uploaded successfully", Map.of("url", url)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Image upload failed: " + e.getMessage(), null));
        }
    }
}
