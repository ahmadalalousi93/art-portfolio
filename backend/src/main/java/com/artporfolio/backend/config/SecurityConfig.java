package com.artporfolio.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in REST APIs
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/admin/**").authenticated()  // Require auth for admin endpoints
                        .anyRequest().permitAll() // Allow everything else
                )
                .httpBasic(Customizer.withDefaults()); // Enable basic auth only for admin

        return http.build();
    }
}
