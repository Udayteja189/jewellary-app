package com.jewellary.app.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.Date;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private String secretKey = "c13jsksk-auth-secret-token-key-1234567890abcdefg";

    public String generateToken(String username) {

        return Jwts
                .builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String extractUserNameFromToken(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean validateToken(String username, UserDetails userDetails, String jwtToken) {
        return username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken);
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private boolean isTokenExpired(String jwtToken) {
        Date expiration = extractClaims(jwtToken).getExpiration();
        return expiration.before(new Date());
    }

}
