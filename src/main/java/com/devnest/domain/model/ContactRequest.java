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