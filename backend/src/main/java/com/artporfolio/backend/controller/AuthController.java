package com.artporfolio.backend.controller;

import com.artporfolio.backend.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")  // Allow frontend access
public class AuthController {

    @Autowired
    private AdminUserService adminUserService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        System.out.println("🔐 Login attempt for: " + username);

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Missing username or password.");
        }

        String token = adminUserService.authenticate(username, password);
        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials.");
        }
    }

    @GetMapping("/validate")
    public boolean validateToken(@RequestParam String token) {
        System.out.println("🔁 /validate called with: " + token);
        return adminUserService.validateToken(token);
    }
}
