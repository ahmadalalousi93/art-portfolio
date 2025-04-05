package com.artporfolio.backend.controller;

import com.artporfolio.backend.model.Order;
import com.artporfolio.backend.repository.OrderRepository;
import com.artporfolio.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        order.setStatus("pending");
        Order saved = orderRepository.save(order);

        emailService.sendOrderConfirmation(saved); // ✅ Send email using your service

        return ResponseEntity.ok(saved);
    }
}
