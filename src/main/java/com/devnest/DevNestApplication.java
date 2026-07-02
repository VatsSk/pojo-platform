package com.devnest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class DevNestApplication {
    public static void main(String[] args) {
        SpringApplication.run(DevNestApplication.class, args);
    }
}