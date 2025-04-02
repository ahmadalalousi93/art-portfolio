package com.artporfolio.backend.controller;

import com.artporfolio.backend.model.InquiryRequest;
import com.artporfolio.backend.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class InquiryController {

    @Autowired
    private InquiryRepository inquiryRepository;

    // Public endpoint: Save a new inquiry (from contact form)
    @PostMapping("/api/inquiries")
    public String handleInquiry(@RequestBody InquiryRequest inquiry) {
        inquiryRepository.save(inquiry);
        return "Inquiry saved successfully!";
    }

    // Protected endpoint: View all inquiries (admin only)
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/admin/secure/inquiries")
    public List<InquiryRequest> getAllInquiries() {
        return inquiryRepository.findAll();
    }
}
