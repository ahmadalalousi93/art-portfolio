package com.artporfolio.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String customerName;
    private String customerEmail;
    private String shippingAddress;
    private String country;
    private List<Long> artworkIds;
    private List<String> artworkTitles;
    private double totalPrice;     // Subtotal of items
    private double shippingCost;   // Based on quantity
    private double taxAmount;      // 6% calculated tax
    private double finalTotal;     // totalPrice + shippingCost + taxAmount
    private String status;         // e.g., pending, confirmed, etc.
}
