package com.jewellary.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jewellary.app.model.AuthRequest;
import com.jewellary.app.service.JwtService;

@RestController
public class AuthController {

    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtService jwtService;

    @PostMapping("/auth")
    public String generateToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authentication.getName());
        } else {
            throw new RuntimeException("Invalid login");
        }
    }

}
