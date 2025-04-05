package com.artporfolio.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String customerName;
    private String customerEmail;
    private String shippingAddress;
    private List<Long> artworkIds;
    private double totalPrice;
    private String status;
}
