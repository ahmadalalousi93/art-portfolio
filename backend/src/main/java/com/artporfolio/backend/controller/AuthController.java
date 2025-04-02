package com.artporfolio.backend.controller;

import com.artporfolio.backend.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend to access API
public class AuthController {

    @Autowired
    private AdminUserService adminUserService;

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        if (username == null || password == null) {
            return "Missing username or password.";
        }

        String token = adminUserService.authenticate(username, password);
        if (token != null) {
            return token;
        } else {
            return "Invalid credentials.";
        }
    }

    @GetMapping("/validate")
    public boolean validateToken(@RequestParam String token) {
        return adminUserService.validateToken(token);
    }
}
