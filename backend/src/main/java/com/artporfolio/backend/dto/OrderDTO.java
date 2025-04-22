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
    private double totalPrice;
    private double shippingCost;
    private double taxAmount;
    private double finalTotal;
    private String status;
}
