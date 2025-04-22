package com.artporfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private String shippingAddress;
    private String country;

    @ElementCollection
    private List<Long> artworkIds;

    private double totalPrice;
    private double shippingCost;
    private double taxAmount;
    private double finalTotal;

    private String status;
}
