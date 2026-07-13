package com.devnest.presentation.controller;

import com.devnest.application.dto.request.ChatInquiryRequest;
import com.devnest.application.dto.request.ContactRequestDto;
import com.devnest.application.dto.response.ApiResponse;
import com.devnest.application.service.ContactService;
import com.devnest.domain.model.Project;
import com.devnest.domain.model.ServiceItem;
import com.devnest.domain.model.SiteConfig;
import com.devnest.domain.repository.ProjectRepository;
import com.devnest.domain.repository.ServiceItemRepository;
import com.devnest.domain.repository.SiteConfigRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final ContactService contactService;
    private final ProjectRepository projectRepository;
    private final ServiceItemRepository serviceItemRepository;
    private final SiteConfigRepository siteConfigRepository;

    public PublicController(ContactService contactService,
                            ProjectRepository projectRepository,
                            ServiceItemRepository serviceItemRepository,
                            SiteConfigRepository siteConfigRepository) {
        this.contactService = contactService;
        this.projectRepository = projectRepository;
        this.serviceItemRepository = serviceItemRepository;
        this.siteConfigRepository = siteConfigRepository;
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

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<Project>>> getProjects() {
        List<Project> activeProjects = projectRepository.findAll().stream()
                .filter(p -> p.getIsActive() == null || p.getIsActive())
                .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Projects fetched", activeProjects));
    }

    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<ServiceItem>>> getServices() {
        List<ServiceItem> activeServices = serviceItemRepository.findAll().stream()
                .filter(s -> s.getIsActive() == null || s.getIsActive())
                .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Services fetched", activeServices));
    }

    @GetMapping("/site-config")
    public ResponseEntity<ApiResponse<SiteConfig>> getSiteConfig() {
        List<SiteConfig> configs = siteConfigRepository.findAll();
        SiteConfig config = configs.isEmpty() ? new SiteConfig() : configs.get(0);
        return ResponseEntity.ok(new ApiResponse<>(true, "Site config fetched", config));
    }
}