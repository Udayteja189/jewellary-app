package com.jewellary.app.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private int id;
    @Column(name = "category")
    private String category;
    @Column(name = "name")
    private String name;
    @Column(name = "originalPrice")
    private BigDecimal originalPrice;
    @Column(name = "discountPrice")
    private BigDecimal discountPrice;
    @Column(name = "image")
    private String image;
}
