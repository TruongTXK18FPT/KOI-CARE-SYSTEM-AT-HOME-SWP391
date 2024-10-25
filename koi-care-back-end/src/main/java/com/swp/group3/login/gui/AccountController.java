package com.swp.group3.login.gui;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.swp.group3.login.dto.LoginDTO;
import com.swp.group3.login.dto.RegisterDTO;
import com.swp.group3.login.dto.ResetPasswordDTO;
import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.service.AccountService;
import com.swp.group3.login.service.AccountService.EmailAlreadyExistsException;
import com.swp.group3.login.service.BlacklistedTokenService;
import com.swp.group3.login.service.JwtService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/auth")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BlacklistedTokenService blacklistedTokenService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO) {
        try {
            Account newAccount = accountService.register(registerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAccount);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already exists. Please use a different email."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "An error occurred while registering the account: "
                            + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<Account> accountOpt = accountService.login(loginDTO);

        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            String token = jwtService.generateToken(account.getEmail(), account.getRole().toString());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", account.getEmail());
            response.put("role", account.getRole());
            response.put("fullName", account.getFullName());

            return ResponseEntity.ok().body(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid email or password."));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            blacklistedTokenService.blacklistToken(token);
            return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "No token provided"));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            String email = jwtService.extractEmail(token);

            Optional<Account> accountOpt = accountService.findByEmail(email);
            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();
                Map<String, Object> response = new HashMap<>();
                response.put("email", account.getEmail());
                response.put("fullName", account.getFullName());
                response.put("gender", account.getGender());
                response.put("phone", account.getPhone());
                response.put("birthday", account.getBirthDay());
                response.put("role", account.getRole());
                response.put("accountImg", account.getAccountImg());
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error fetching profile: " + e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAccount(@RequestHeader("Authorization") String authHeader, @RequestBody Account updatedAccount) {
        try {
            String token = authHeader.substring(7);
            String email = jwtService.extractEmail(token);

            Optional<Account> accountOpt = accountService.findByEmail(email);
            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();
                account.setAccountImg(updatedAccount.getAccountImg());
                account.setFullName(updatedAccount.getFullName());
                account.setGender(updatedAccount.getGender());
                account.setBirthDay(updatedAccount.getBirthDay());
                account.setPhone(updatedAccount.getPhone());
                account.setAddress(updatedAccount.getAddress());

                Account savedAccount = accountService.updateAccount(account);
                return ResponseEntity.ok(savedAccount);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error updating account: " + e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO) {
        try {
            if (!resetPasswordDTO.getNewPassword().equals(resetPasswordDTO.getConfirmPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "Passwords do not match."));
            }

            Optional<Account> accountOpt = accountService.findByEmail(resetPasswordDTO.getEmail());
            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();
                account.setPassword(resetPasswordDTO.getNewPassword()); // Ensure to hash the password before saving
                accountService.updateAccount(account);
                return ResponseEntity.ok(Map.of("message", "Password reset successfully."));
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Email not found."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error resetting password: " + e.getMessage()));
        }
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<Account> accountOpt = accountService.findByEmail(email);
        if (accountOpt.isPresent()) {
            return ResponseEntity.ok(Map.of("exists", true));
        } else {
            return ResponseEntity.ok(Map.of("exists", false));
        }
    }
}
