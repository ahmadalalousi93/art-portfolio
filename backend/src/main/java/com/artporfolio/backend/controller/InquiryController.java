package com.artporfolio.backend.controller;

import com.artporfolio.backend.model.InquiryRequest;
import com.artporfolio.backend.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = "http://localhost:5173")
public class InquiryController {

    @Autowired
    private InquiryRepository inquiryRepository;

    @PostMapping
    public String handleInquiry(@RequestBody InquiryRequest inquiry) {
        inquiryRepository.save(inquiry);
        return "Inquiry saved successfully!";
    }
}
