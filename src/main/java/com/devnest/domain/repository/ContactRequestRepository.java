package com.devnest.domain.repository;

import com.devnest.domain.model.ContactRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRequestRepository extends MongoRepository<ContactRequest, String> {
}