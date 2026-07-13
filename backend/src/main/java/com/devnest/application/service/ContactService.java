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