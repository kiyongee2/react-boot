package com.springboot.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
	private final JwtFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.cors();

        http.authorizeHttpRequests(auth -> auth
        		// 로그인 / 회원가입 허용
                .requestMatchers("/api/auth/**").permitAll()

                // 도서 조회는 누구나 허용 (GET 전용)
                .requestMatchers(HttpMethod.GET, "/api/books/**").permitAll()
                
                // 로그인된 상태 인증 필요
                .requestMatchers("/api/auth/me").authenticated()

                // 도서 등록/수정/삭제는 로그인 필요
                .requestMatchers(HttpMethod.POST, "/api/books/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/books/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/books/**").authenticated()

                // 리뷰는 로그인 필요
                .requestMatchers("/api/reviews/**").authenticated()

                // 기타 요청은 허용
                .anyRequest().permitAll()
        );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        ProviderManager manager = new ProviderManager(provider);
        return manager;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
