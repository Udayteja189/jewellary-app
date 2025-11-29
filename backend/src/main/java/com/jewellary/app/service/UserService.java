package com.jewellary.app.service;

import com.jewellary.app.Entity.User;
import com.jewellary.app.exceptions.UnauthorizedException;
import com.jewellary.app.UserDTO;
import com.jewellary.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    // @Autowired
    // private AuthenticationManager authManager;

    public String signup(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already taken";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Signup successful";
    }

    public String login(String username, String password) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword()))
                return "Login successful";
            throw new UnauthorizedException("Invalid credentials");
        } else {
            throw new UnauthorizedException("User Not Found");
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
