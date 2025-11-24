package com.springboot.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;


@Component
public class JwtUtil {
	// 실제 운영에서는 외부 설정(application.yml/env)에서 주입
    private final String secret = "verySecretKeyChangeThisToEnvVarForProd_AtLeast32Chars";
    private final long validityInMs = 1000L * 60 * 60 * 24; // 24h
    
    private Key getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    public String createToken(String username) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + validityInMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public String getUsername(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            return null;
        }
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
