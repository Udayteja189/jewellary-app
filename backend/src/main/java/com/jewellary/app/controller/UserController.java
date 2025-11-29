package com.jewellary.app.controller;

import com.jewellary.app.Entity.User;
import com.jewellary.app.UserDTO;
import com.jewellary.app.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (user != null)
            return userService.signup(user);
        return "User details are not Valid";
    }

    @GetMapping("/login")
    public String login(@RequestParam("email") String email, @RequestParam("password") String password) {
        if (email == null || password == null)
            return "Bad credentials";
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
