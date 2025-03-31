package com.artporfolio.backend.controller;
import com.artporfolio.backend.model.InquiryRequest;
import org.springframework.web.bind.annotation.*;


    @RestController
    @RequestMapping("/api/inquiries")
    @CrossOrigin(origins = "http://localhost:5173")  // Allow React to talk to backend
    public class InquiryController {

        @PostMapping
        public String handleInquiry(@RequestBody InquiryRequest inquiry) {
            System.out.println("✅ New Inquiry Received:");
            System.out.println("Name: " + inquiry.getName());
            System.out.println("Email: " + inquiry.getEmail());
            System.out.println("Phone: " + inquiry.getPhone());
            System.out.println("Message: " + inquiry.getMessage());
            System.out.println("Artwork: " + inquiry.getArtworkTitle());
            return "Inquiry received!";
        }
    }

