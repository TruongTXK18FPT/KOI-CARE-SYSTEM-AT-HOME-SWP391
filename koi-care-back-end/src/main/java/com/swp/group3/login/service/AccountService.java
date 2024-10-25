package com.swp.group3.login.service;

import com.swp.group3.login.dto.LoginDTO;
import com.swp.group3.login.dto.RegisterDTO;
import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.repository.AccountRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public class EmailAlreadyExistsException extends RuntimeException {
        public EmailAlreadyExistsException(String message) {
            super(message);
        }
    }

    public class PasswordMismatchException extends RuntimeException {
        public PasswordMismatchException(String message) {
            super(message);
        }
    }

    public boolean checkEmailExists(String email) {
        return accountRepository.existsByEmail(email);
    }

    public Account register(RegisterDTO registerDTO) throws Exception {
        if (checkEmailExists(registerDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
            throw new PasswordMismatchException("Passwords do not match");
        }

        Account account = new Account();
        account.setEmail(registerDTO.getEmail());
        account.setPassword(registerDTO.getPassword()); // Note: In a real application, you should hash the password
        account.setFullName(registerDTO.getFullName());
        account.setGender(Account.Gender.valueOf(registerDTO.getGender().toLowerCase()));
        account.setPhone(registerDTO.getPhone());
        account.setAddress(registerDTO.getAddress());
        account.setStatus(Account.Status.active);
        account.setRole(Account.Role.member);
        //account.setAccountImg(registerDTO.getAccountImg()); // Set the image URL

        // Convert LocalDate to java.sql.Date
        LocalDate localDate = registerDTO.getBirthday();
        Date sqlDate = Date.valueOf(localDate);
        account.setBirthDay(sqlDate);

        return accountRepository.save(account);
    }

    public Optional<Account> login(LoginDTO loginDTO) {
        // Fetch account by accountName
        Optional<Account> accountOpt = accountRepository.findByEmail(loginDTO.getEmail());

        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();

            // Compare passwords (consider encoding passwords if needed)
            if (account.getPassword().equals(loginDTO.getPassword())) {
                return Optional.of(account); // Password matches
            } else {
                System.out.println("Password mismatch for: " + loginDTO.getEmail());
            }
        } else {
            System.out.println("Account not found for: " + loginDTO.getEmail());
        }

        // Return empty if login fails
        return Optional.empty();
    }

    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }
     public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }
    public Optional<Account> findById(Integer accountId) {
        return accountRepository.findById(accountId);
    }
}
