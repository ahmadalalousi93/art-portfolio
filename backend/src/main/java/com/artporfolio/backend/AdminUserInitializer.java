package com.artporfolio.backend;

import com.artporfolio.backend.model.AdminUser;
import com.artporfolio.backend.repository.AdminUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Configuration
public class AdminUserInitializer {

    @Bean
    CommandLineRunner initAdminUser(AdminUserRepository adminUserRepository) {
        return args -> {
            String defaultUsername = "admin";
            String defaultPassword = "admin123";

            if (adminUserRepository.findByUsername(defaultUsername) == null) {
                String hashed = BCrypt.hashpw(defaultPassword, BCrypt.gensalt());
                AdminUser user = new AdminUser(defaultUsername, hashed);
                adminUserRepository.save(user);
                System.out.println("✅ Bootstrapped default admin user.");
            } else {
                System.out.println("ℹ️ Admin user already exists. Skipping bootstrap.");
            }
        };
    }
}
