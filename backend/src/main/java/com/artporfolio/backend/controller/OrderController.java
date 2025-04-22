package com.artporfolio.backend.controller;

import com.artporfolio.backend.dto.OrderDTO;
import com.artporfolio.backend.model.Artwork;
import com.artporfolio.backend.model.Order;
import com.artporfolio.backend.repository.ArtworkRepository;
import com.artporfolio.backend.repository.OrderRepository;
import com.artporfolio.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ArtworkRepository artworkRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        order.setStatus("pending");

        int quantity = order.getArtworkIds() != null ? order.getArtworkIds().size() : 0;

        boolean isUS = "US".equalsIgnoreCase(order.getCountry());

        double shippingCost = isUS ? quantity * 25.0 : quantity * 50.0;
        double tax = isUS ? order.getTotalPrice() * 0.06 : 0.0;

        double finalTotal = order.getTotalPrice() + shippingCost + tax;

        order.setShippingCost(shippingCost);
        order.setTaxAmount(tax);
        order.setFinalTotal(finalTotal);

        Order saved = orderRepository.save(order);
        emailService.sendOrderConfirmation(saved);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/admin/secure/orders")
    public Page<OrderDTO> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Order> orderPage = (status != null)
                ? orderRepository.findByStatus(status, pageable)
                : orderRepository.findAll(pageable);

        return orderPage.map(this::convertToDTO);
    }

    @PutMapping("/admin/secure/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) return ResponseEntity.notFound().build();

        Order order = optionalOrder.get();
        order.setStatus(status);
        orderRepository.save(order);
        return ResponseEntity.ok(convertToDTO(order));
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setCountry(order.getCountry());
        dto.setArtworkIds(order.getArtworkIds());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setShippingCost(order.getShippingCost());
        dto.setTaxAmount(order.getTaxAmount());
        dto.setFinalTotal(order.getFinalTotal());
        dto.setStatus(order.getStatus());

        List<String> titles = order.getArtworkIds().stream()
                .map(id -> artworkRepository.findById(id).map(Artwork::getTitle).orElse("Unknown Artwork"))
                .collect(Collectors.toList());

        dto.setArtworkTitles(titles);
        return dto;
    }
}
