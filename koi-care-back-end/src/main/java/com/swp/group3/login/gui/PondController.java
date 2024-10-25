package com.swp.group3.login.gui;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.pojo.Pond;
import com.swp.group3.login.repository.AccountRepository;
import com.swp.group3.login.service.AccountService;
import com.swp.group3.login.service.IPondService;
import com.swp.group3.login.service.JwtService;

@RestController
@RequestMapping("/api/ponds")
public class PondController {

    @Autowired
    private IPondService pondService;
    @Autowired
    private AccountService accountService;
    @Autowired 
    private JwtService jwtService;
    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/getAll")
    public ResponseEntity<Page<Pond>> getAllPonds(Pageable pageable) {
        return ResponseEntity.ok(pondService.getAllPonds(pageable));
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Pond> getPondById(@PathVariable Integer id) {
        return pondService.getPondById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/account/getByAccountId/{accountId}")
    public ResponseEntity<Page<Pond>> getPondsByAccountId(@PathVariable Integer accountId, Pageable pageable) {
        Page<Pond> ponds = pondService.getPondsByAccountId(accountId, pageable);
        return ponds.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(ponds);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createPond(@RequestBody Pond pond) {
        try {
            // Fetch the account using the accountId
            Integer accountId = pond.getAccount().getAccountId();
            Optional<Account> accountOpt = accountRepository.findById(accountId);
    
            if (accountOpt.isPresent()) {
                Account account = accountOpt.get();
                pond.setAccount(account); // Set the Account object in the Pond
    
                Pond savedPond = pondService.addPond(pond); // Save the pond
                return ResponseEntity.ok(savedPond); // Return the saved pond
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Account not found with id: " + accountId));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error creating pond: " + e.getMessage()));
        }
    }
    

    @PutMapping("/update/{id}")
    public ResponseEntity<Pond> updatePond(@PathVariable Integer id, @RequestBody Pond pond) {
        return pondService.updatePond(id, pond)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePond(@PathVariable Integer id) {
        return pondService.deletePond(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
    @GetMapping("/account/details")
public ResponseEntity<?> getAccountDetails(@RequestHeader("Authorization") String authHeader) {
    try {
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        Optional<Account> accountOpt = accountService.findByEmail(email);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("accountId", account.getAccountId());
            response.put("email", account.getEmail());
            response.put("fullName", account.getFullName());
            response.put("role", account.getRole());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Error fetching account details: " + e.getMessage()));
    }
}
@GetMapping("/getTotalKoi/{pondId}")
    public ResponseEntity<Integer> getTotalKoi(@PathVariable Integer pondId) {
        int totalKoi = pondService.getTotalKoiByPondId(pondId);
        return ResponseEntity.ok(totalKoi);
    }
}
