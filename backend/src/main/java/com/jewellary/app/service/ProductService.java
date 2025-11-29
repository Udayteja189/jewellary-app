package com.jewellary.app.service;

import com.jewellary.app.Entity.Product;
import com.jewellary.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;
    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.getProductsByCategory(category);
    }

    public Product getProductById(Integer productId) {
        return productRepository.getProductById(productId);
    }

    public List<Product> getWishlistedProducts() {
        return productRepository.getWishlistedProducts();
    }

    public List<Product> getProductsInCart() {
        return productRepository.getProductsInCart();
    }

    public String addToCart(Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            boolean currentlyInCart = Boolean.TRUE.equals(product.isAddedToCart());
            product.setAddedToCart(!currentlyInCart);
            productRepository.save(product);
            return currentlyInCart ? "Product removed from cart" : "Product added to cart";
        } else {
            return "Product not found";
        }
    }

    public String addToWishlist(Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            boolean currentlyWishlisted = Boolean.TRUE.equals(product.isWishlisted());
            product.setWishlisted(!currentlyWishlisted);
            productRepository.save(product);
            return currentlyWishlisted ? "Product removed from wishlisted" : "Product added to Wishlist";
        } else {
            return "Product not found";
        }
    }

    public String addNewProduct(Product product) {
        Optional<Product> optionalProduct = productRepository.findById(product.getId());
        if(optionalProduct.isPresent()){
            return "Product already exists";
        }
        productRepository.save(product);
        return "Product added !!!";
    }
}
