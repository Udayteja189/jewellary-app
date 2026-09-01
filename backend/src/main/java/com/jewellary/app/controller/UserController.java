package com.jewellary.app.controller;

import com.jewellary.app.Entity.User;
import com.jewellary.app.dto.UserAuthDTO;
import com.jewellary.app.dto.UserDTO;
import com.jewellary.app.dto.UserLoginDTO;
import com.jewellary.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/users")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserAuthDTO> signup(@RequestBody User user) {
        if (user != null)
            return userService.signup(user);
        throw new RuntimeException("User details are not Valid");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO user) {
        if (user == null)
            return ResponseEntity.badRequest().body("Email or Password cannot be null");
        return userService.login(user.getUsername(), user.getPassword());
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
