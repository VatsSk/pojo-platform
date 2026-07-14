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

    private String college;

    private String department;


    private String academicYear;

    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Valid phone number is required")
    private String phone;

    @NotBlank(message = "Preferred contact method is required")
    private String preferredContact;


    private String concern;

    @Size(max = 2000, message = "Message cannot exceed 2000 characters")
    private String message;
}