package com.artporfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "orders") // Avoid reserved word "order"
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

    private double totalPrice;     // Subtotal
    private double shippingCost;   // $25 x quantity
    private double taxAmount;      // 6% of subtotal
    private double finalTotal;     // Subtotal + shipping + tax
    private String status;         // Order status
}
