package com.artporfolio.backend.controller;

import com.artporfolio.backend.dto.OrderDTO;
import com.artporfolio.backend.model.Order;
import com.artporfolio.backend.repository.OrderRepository;
import com.artporfolio.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    // ✅ Public endpoint for order creation
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        order.setStatus("pending");
        Order saved = orderRepository.save(order);
        emailService.sendOrderConfirmation(saved);
        return ResponseEntity.ok(saved);
    }

    // ✅ Secure Admin GET with pagination & filtering
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

    // ✅ Secure Admin PUT for status update
    @PutMapping("/admin/secure/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) return ResponseEntity.notFound().build();

        Order order = optionalOrder.get();
        order.setStatus(status);
        orderRepository.save(order);
        return ResponseEntity.ok(convertToDTO(order));
    }

    // 🔁 Convert Entity to DTO
    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setArtworkIds(order.getArtworkIds());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        return dto;
    }
}
