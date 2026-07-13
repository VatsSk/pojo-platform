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
                helper.setFrom(fromEmail, "pojo.dev Team");
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
        String content = "<div style='font-family: \"Inter\", Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111; color: #fff; border-radius: 16px; padding: 40px; border: 1px solid #333;'>" +
                "<div style='text-align: center; margin-bottom: 30px;'><h1 style='color: #a855f7; margin: 0; font-size: 28px;'>pojo.dev</h1><p style='color: #888; margin-top: 5px;'>New Contact Form Submission</p></div>" +
                "<div style='background-color: #1a1a1a; border-radius: 12px; padding: 25px; margin-bottom: 25px;'>" +
                "<p style='margin: 0 0 10px 0; color: #e5e7eb;'><strong>Name:</strong> " + name + "</p>" +
                "<p style='margin: 0 0 10px 0; color: #e5e7eb;'><strong>Email:</strong> <a href='mailto:" + email + "' style='color: #a855f7; text-decoration: none;'>" + email + "</a></p>" +
                "<p style='margin: 0 0 10px 0; color: #e5e7eb;'><strong>Phone:</strong> " + phone + "</p>" +
                "</div>" +
                "<h3 style='color: #a855f7; font-size: 18px; margin-top: 0;'>Message:</h3>" +
                "<div style='background-color: #1a1a1a; border-radius: 12px; padding: 25px; color: #e5e7eb; line-height: 1.6; border-left: 4px solid #a855f7;'>" + message + "</div>" +
                "</div>";
        
        sendEmail(adminEmail, subject, content, true);
    }

    @Async
    public void sendStudentAcknowledgement(String name, String email) {
        String subject = "We've received your request! | pojo.dev";
        String content = "<div style='font-family: \"Inter\", Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111; color: #e5e7eb; border-radius: 16px; padding: 40px; border: 1px solid #333;'>" +
                "<div style='text-align: center; margin-bottom: 30px;'><h1 style='color: #a855f7; margin: 0; font-size: 32px; letter-spacing: -1px;'>pojo.dev</h1></div>" +
                "<h2 style='color: #fff; font-size: 24px; margin-bottom: 20px;'>Hello " + name + ",</h2>" +
                "<p style='font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 20px;'>Thank you for reaching out to <strong>pojo.dev</strong>! We have received your request and our team is already reviewing it.</p>" +
                "<p style='font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 40px;'>We understand how important your project or query is, and we aim to get back to you within 24 hours.</p>" +
                "<div style='text-align: center; margin-bottom: 40px;'>" +
                "<a href='https://pojo.dev' style='display: inline-block; background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);'>Visit our Website</a>" +
                "</div>" +
                "<hr style='border: none; border-top: 1px solid #333; margin-bottom: 20px;' />" +
                "<p style='font-size: 14px; color: #71717a; margin: 0;'>Best Regards,</p>" +
                "<p style='font-size: 16px; color: #e5e7eb; font-weight: bold; margin: 5px 0 0 0;'>The pojo.dev Team</p>" +
                "</div>";
        
        sendEmail(email, subject, content, true);
    }
}