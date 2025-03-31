package com.artporfolio.backend.repository;

import com.artporfolio.backend.model.InquiryRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepository extends JpaRepository<InquiryRequest, Long> {
}
