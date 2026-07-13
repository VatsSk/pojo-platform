package com.devnest.domain.repository;

import com.devnest.domain.model.SiteConfig;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteConfigRepository extends MongoRepository<SiteConfig, String> {
}
