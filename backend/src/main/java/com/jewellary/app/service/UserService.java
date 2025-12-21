package com.jewellary.app.service;

import com.jewellary.app.Entity.CartItem;
import com.jewellary.app.Entity.Product;
import com.jewellary.app.Entity.User;
import com.jewellary.app.dto.UserAuthDTO;
import com.jewellary.app.exceptions.UnauthorizedException;
import com.jewellary.app.dto.UserDTO;
import com.jewellary.app.repository.UserRepository;
import com.jewellary.app.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            WishlistRepository wishlistRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String signup(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already taken";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Signup successful";
    }

    public ResponseEntity<?> login(String username, String password) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        if (!authentication.isAuthenticated()) {
            throw new RuntimeException("Invalid login");
        }
        String jwt = jwtService.generateToken(authentication.getName());
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserAuthDTO userAuth = new UserAuthDTO(user.getUsername(), jwt);
            if (passwordEncoder.matches(password, user.getPassword()))
                return ResponseEntity.ok(userAuth);
            return ResponseEntity.status(401).body("Invalid Credentials");
        } else {
            return ResponseEntity.status(401).body("User Not Found with username " + username);
        }
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> new UserDTO(user.getId(), user.getName(), user.getUsername()))
                .toList();
    }

    public UserDTO getUserById(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.map(user -> new UserDTO(user.getId(), user.getName(), user.getUsername())).orElse(null);
    }

    public UserDTO updateUser(int userId, User user) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            existingUser.setName(user.getName());
            userRepository.save(existingUser);
            return new UserDTO(existingUser.getId(), existingUser.getName(), existingUser.getUsername());
        }
        return null;
    }

    public String deleteUser(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(userId);
            return "User Deleted successfully";
        }
        return "No Record found with User Id " + userId;
    }
}
