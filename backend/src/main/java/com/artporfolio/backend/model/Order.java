package com.artporfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "orders") // ✅ Fix: Avoid using reserved word "order"
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private String shippingAddress;

    @ElementCollection
    private List<Long> artworkIds;

    private double totalPrice;

    private String status;
}
