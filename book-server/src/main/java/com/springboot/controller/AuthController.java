package com.springboot.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.entity.User;
import com.springboot.repository.UserRepository;
import com.springboot.security.CustomUserDetailsService;
import com.springboot.security.JwtUtil;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = {"http://localhost:3000", "http://52.78.205.73:3000"})
@CrossOrigin(origins = "*")
public class AuthController {
	
	private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    
    //회원 가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    	String username = body.get("username");
        String password = body.get("password");
        String fullname = body.getOrDefault("fullname", username);

        if (userRepo.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 사용자입니다.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullname(fullname);
        user.setRole("ROLE_USER");
        userRepo.save(user);

        return ResponseEntity.ok("회원가입 완료");
    }
    
    // 로그인 -> 토큰 발급
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("로그인 실패");
        }

        String token = jwtUtil.createToken(username);
        return ResponseEntity.ok(Map.of("token", token));
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getMyInfo(Authentication auth) {

        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        String username = auth.getName();

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(new UserInfoResponse(
                user.getUsername(),
                user.getFullname(),
                user.getRole()
        ));
    }

    /**
     * 사용자 정보 응답 DTO
     */
    @Getter
    @AllArgsConstructor
    static class UserInfoResponse {
        private String username;
        private String fullname;
        private String role;
    }
}
