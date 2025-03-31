package com.artporfolio.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryRequest {
        private String name;
        private String email;
        private String phone;
        private String message;
        private String artworkId;
        private String artworkTitle;
}


