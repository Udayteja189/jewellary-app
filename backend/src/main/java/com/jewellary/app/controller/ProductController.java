package com.jewellary.app.controller;

import com.jewellary.app.Entity.CartItem;
import com.jewellary.app.Entity.Product;
import com.jewellary.app.Entity.Wishlist;
import com.jewellary.app.service.CartService;
import com.jewellary.app.service.ProductService;
import com.jewellary.app.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/products")
@CrossOrigin(origins="http://localhost:3000")
public class ProductController {
    ProductService productService;
    private CartService cartService;
    private WishlistService wishlistService;

    public ProductController(ProductService productService, CartService cartService, WishlistService wishlistService) {
        this.productService = productService;
        this.cartService = cartService;
        this.wishlistService = wishlistService;
    }

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

    @PostMapping("/cart/{productId}")
    public CartItem addProductToCart(@PathVariable("productId") Integer productId,
                                   @RequestParam(value = "quantity", defaultValue = "1") int quantity,
                                   @RequestParam("username") String username) {
        return cartService.addToCart(username, productId, quantity);
    }

    @PostMapping("/wishlist/{productId}")
    public Wishlist addProductToWishlist(@PathVariable("productId") Integer productId,
                                       @RequestParam(value = "quantity", defaultValue = "1") int quantity,
                                       @RequestParam("username") String username) {
        return wishlistService.addToWishlist(username, productId, quantity);
    }

    @GetMapping("/cart")
    public List<CartItem> getCartProducts(@RequestParam("username") String username){
        return cartService.getCartForUser(username);
    }

    @GetMapping("/wishlisted")
    public List<Wishlist> getWishlistedProducts(@RequestParam("username") String username){
        return wishlistService.getWishlisted(username);
    }
}
