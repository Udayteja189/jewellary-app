package com.jewellary.app.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private int id;
    @Column(name = "category")
    private String category;
    @Column(name = "name")
    private String name;
    @Column(name = "isWishlisted")
    private Boolean isWishlisted;
    @Column(name = "isAddedToCart")
    private Boolean isAddedToCart;
    @Column(name = "originalPrice")
    private BigDecimal originalPrice;
    @Column(name = "discountPrice")
    private BigDecimal discountPrice;
    @Column(name = "image")
    private String image;

    public Product(){

    }

    public Product(int id, String category, String name, Boolean isWishlisted, Boolean isAddedToCart, BigDecimal originalPrice, BigDecimal discountPrice, String image) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.isWishlisted = isWishlisted;
        this.isAddedToCart = isAddedToCart;
        this.originalPrice = originalPrice;
        this.discountPrice = discountPrice;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isWishlisted() {
        return isWishlisted;
    }

    public void setWishlisted(boolean wishlisted) {
        isWishlisted = wishlisted;
    }

    public boolean isAddedToCart() {
        return isAddedToCart;
    }

    public void setAddedToCart(boolean addedToCart) {
        isAddedToCart = addedToCart;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public BigDecimal getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(BigDecimal discountPrice) {
        this.discountPrice = discountPrice;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
