package com.artporfolio.backend.config;

import com.artporfolio.backend.model.AdminUser;
import com.artporfolio.backend.repository.AdminUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedAdmin(AdminUserRepository adminUserRepository) {
        return args -> {
            String defaultUsername = "admin";

            if (adminUserRepository.findByUsername(defaultUsername) == null) {
                AdminUser admin = new AdminUser();
                admin.setUsername(defaultUsername);
                admin.setPasswordHash(BCrypt.hashpw("secret123", BCrypt.gensalt()));

                adminUserRepository.save(admin);

                System.out.println("✅ Default admin user created:");
                System.out.println("   Username: admin");
                System.out.println("   Password: secret123");
            } else {
                System.out.println("ℹ️ Admin user already exists. Skipping seeding.");
            }
        };
    }
}
