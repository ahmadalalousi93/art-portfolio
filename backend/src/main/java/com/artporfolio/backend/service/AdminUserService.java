package com.artporfolio.backend.service;

import com.artporfolio.backend.model.AdminUser;
import com.artporfolio.backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AdminUserService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    private final ConcurrentHashMap<String, String> tokenStore = new ConcurrentHashMap<>();

    public String authenticate(String username, String password) {
        AdminUser user = adminUserRepository.findByUsername(username);
        if (user != null && BCrypt.checkpw(password, user.getPasswordHash())) {
            String token = UUID.randomUUID().toString();
            tokenStore.put(token, username);
            return token;
        }
        return null;
    }

    public boolean validateToken(String token) {
        return tokenStore.containsKey(token);
    }

    public String getUsernameFromToken(String token) {
        return tokenStore.get(token);
    }
}
