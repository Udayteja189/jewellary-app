package com.jewellary.app.controller;

import com.jewellary.app.Entity.CartItem;
import com.jewellary.app.Entity.User;
import com.jewellary.app.dto.UserDTO;
import com.jewellary.app.service.CartService;
import com.jewellary.app.service.UserService;
import com.jewellary.app.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class UserController {

    private UserService userService;
    private CartService cartService;
    private WishlistService wishlistService;

    public UserController(UserService userService, CartService cartService, WishlistService wishlistService) {
        this.userService = userService;
        this.cartService = cartService;
        this.wishlistService = wishlistService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (user != null)
            return userService.signup(user);
        return "User details are not Valid";
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam("email") String email,
            @RequestParam("password") String password) {
        if (email == null || password == null)
            return ResponseEntity.badRequest().body("Email or Password cannot be null");
        return userService.login(email, password);
    }

    @GetMapping("/")
    public List<UserDTO> users() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable("id") int userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable("id") int userId, @RequestBody User user) {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int userId) {
        return userService.deleteUser(userId);
    }

}
