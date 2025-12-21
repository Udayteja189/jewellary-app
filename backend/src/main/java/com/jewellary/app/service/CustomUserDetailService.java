package com.jewellary.app.service;

import com.jewellary.app.Entity.User;
import com.jewellary.app.model.UserPrincipal;
import com.jewellary.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            UserPrincipal userPrincipal = new UserPrincipal(user.get());
            return userPrincipal;
        } else {
            System.out.printf("User not found");
            throw new UsernameNotFoundException("User not found with " + username);
        }
    }
}
