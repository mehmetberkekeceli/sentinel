package com.sentinel.siem.controllers;

import com.sentinel.siem.dto.request.LoginRequest;
import com.sentinel.siem.dto.request.RegisterRequest;
import com.sentinel.siem.dto.response.LoginResponse;
import com.sentinel.siem.services.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        logger.info("Login attempt for username: {}", request.getUsername());
        LoginResponse response = authService.login(request);
        logger.info("Login successful for username: {}", request.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        logger.info("Register attempt for username: {}", request.getUsername());
        authService.register(request);
        logger.info("Registration successful for username: {}", request.getUsername());
        return ResponseEntity.ok().build();
    }
}
