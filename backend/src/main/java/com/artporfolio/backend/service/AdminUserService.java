package com.artporfolio.backend.service;

import com.artporfolio.backend.model.AdminUser;
import com.artporfolio.backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AdminUserService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    // In-memory token store
    private final Map<String, String> tokens = new HashMap<>();

    public String authenticate(String username, String password) {
        AdminUser user = adminUserRepository.findByUsername(username);
        System.out.println("🧠 Found user: " + user);
        if (user != null) {
            System.out.println("🔍 Stored hash: " + user.getPasswordHash());
            System.out.println("🔍 Password match: " + BCrypt.checkpw(password, user.getPasswordHash()));
        }

        if (user != null && BCrypt.checkpw(password, user.getPasswordHash())) {
            String token = UUID.randomUUID().toString();
            tokens.put(token, username);
            System.out.println("✅ Login successful, token: " + token);
            return token;
        } else {
            System.out.println("❌ Login failed for user: " + username);
            return null;
        }
    }


    public boolean validateToken(String token) {
        System.out.println("🛡️ Validating token: " + token);
        System.out.println("📦 Current tokens: " + tokens.keySet());
        return tokens.containsKey(token);
    }

    public String getUsernameFromToken(String token) {
        return tokens.get(token);
    }

}
