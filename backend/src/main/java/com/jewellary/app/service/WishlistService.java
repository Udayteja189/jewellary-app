package com.jewellary.app.service;

import com.jewellary.app.Entity.CartItem;
import com.jewellary.app.Entity.Product;
import com.jewellary.app.Entity.User;
import com.jewellary.app.Entity.Wishlist;
import com.jewellary.app.repository.ProductRepository;
import com.jewellary.app.repository.UserRepository;
import com.jewellary.app.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    UserRepository userRepository;
    ProductRepository productRepository;
    WishlistRepository wishlistRepository;

    public WishlistService(UserRepository userRepository, ProductRepository productRepository, WishlistRepository wishlistRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.wishlistRepository = wishlistRepository;
    }

    public Wishlist addToWishlist(String username, Integer productId, int quantity) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            throw new RuntimeException("User not found");
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty())
            throw new RuntimeException("Product not found");

        User user = userOpt.get();
        Product product = productOpt.get();

        Optional<Wishlist> existing = wishlistRepository.findByUserAndProduct(user, product);
        if (existing.isPresent()) {
            return existing.get();
        } else {
            Wishlist wishlisted = new Wishlist();
            wishlisted.setUser(user);
            wishlisted.setProduct(product);
            wishlisted.setAddedAt(LocalDateTime.now());

            wishlistRepository.save(wishlisted);
            return wishlisted;
        }
    }

    public List<Wishlist> getWishlisted(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty())
            return List.of();
        List<Wishlist> wishlisted =  wishlistRepository.findByUser(userOpt.get());
        return wishlisted;
    }
}
