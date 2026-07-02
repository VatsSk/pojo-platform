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