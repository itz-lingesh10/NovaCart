package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String slug;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private String description;
    private Long categoryId;
    private String categoryName;
}
