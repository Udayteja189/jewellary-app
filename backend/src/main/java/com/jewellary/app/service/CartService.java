package com.jewellary.app.service;

import com.jewellary.app.Entity.CartItem;
import com.jewellary.app.Entity.Product;
import com.jewellary.app.Entity.User;
import com.jewellary.app.repository.CartRepository;
import com.jewellary.app.repository.ProductRepository;
import com.jewellary.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartItem> getCartForUser(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            return List.of();
        return cartItemRepository.findByUser(userOpt.get());
    }

    public CartItem addToCart(String username, Integer productId, int qty) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            throw new RuntimeException("User not found");
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty())
            throw new RuntimeException("Product not found");

        User user = userOpt.get();
        Product product = productOpt.get();

        Optional<CartItem> existing = cartItemRepository.findByUserAndProduct(user, product);
        CartItem item;
        if (existing.isPresent()) {
            item = existing.get();
            item.setQuantity(item.getQuantity() + qty);
            item.setAddedAt(LocalDateTime.now());
            cartItemRepository.save(item);
        } else {
            item = new CartItem();
            item.setUser(user);
            item.setProduct(product);
            item.setQuantity(qty);
            item.setAddedAt(LocalDateTime.now());
            cartItemRepository.save(item);
        }
        return item;
    }

    public String removeFromCart(String username, Integer productId) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            return "User not found";
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty())
            return "Product not found";

        User user = userOpt.get();
        Product product = productOpt.get();

        Optional<CartItem> existing = cartItemRepository.findByUserAndProduct(user, product);
        if (existing.isPresent()) {
            cartItemRepository.delete(existing.get());
            return "Product removed from cart";
        }
        return "Product not in cart";
    }
}
