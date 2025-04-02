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
        if (user != null && BCrypt.checkpw(password, user.getPasswordHash())) {
            String token = UUID.randomUUID().toString();
            tokens.put(token, username);
            return token;
        }
        return null;
    }

    public boolean validateToken(String token) {
        return tokens.containsKey(token);
    }

    public String getUsernameFromToken(String token) {
        return tokens.get(token);
    }
}
