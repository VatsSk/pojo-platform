package com.devnest.domain.repository;

import com.devnest.domain.model.ServiceItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceItemRepository extends MongoRepository<ServiceItem, String> {
}
