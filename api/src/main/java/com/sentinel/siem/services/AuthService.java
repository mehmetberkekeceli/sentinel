package com.sentinel.siem.services;

import com.sentinel.siem.dto.request.LoginRequest;
import com.sentinel.siem.dto.request.RegisterRequest;
import com.sentinel.siem.dto.response.LoginResponse;
import com.sentinel.siem.exceptions.CustomException;
import com.sentinel.siem.models.User;
import com.sentinel.siem.repositories.jpa.UserRepository;
import com.sentinel.siem.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new CustomException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new LoginResponse(token);
    }

    public void register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new CustomException("Username already exists");
        }

        User newUser = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()), request.getFullName(), request.getEmail());

        userRepository.save(newUser);
    }
}
