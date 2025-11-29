package com.jewellary.app.controller;

import com.jewellary.app.Entity.Product;
import com.jewellary.app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable("id") Integer id) {
        return productService.getProductById(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> getAllProductsByCategory(@PathVariable("category") String category) {
        return productService.getProductsByCategory(category);
    }

    @GetMapping("/wishlisted")
    public List<Product> getWishlistedProducts() {
        return productService.getWishlistedProducts();
    }

    @GetMapping("/cart")
    public List<Product> getProductsInCart() {
        return productService.getProductsInCart();
    }

    @PutMapping("/cart/{id}")
    public String addProductToCart(@PathVariable("id") Integer id) {
        return productService.addToCart(id);
    }

    @PutMapping("/wishlisted/{id}")
    public String addProductToWishlist(@PathVariable("id") Integer id) {
        return productService.addToWishlist(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String addNewProduct(@RequestBody Product product) {
        return productService.addNewProduct(product);
    }
}
