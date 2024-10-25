package com.swp.group3.login.gui;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private IAdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<Account> users = adminService.getAllUsers();
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", users);
            response.put("message", "Users retrieved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to retrieve users: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        try {
            Account user = adminService.getUserById(id);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", user);
            response.put("message", "User details retrieved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to retrieve user details: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/users/add")
    public ResponseEntity<?> addMember(@RequestBody Account account) {
        try {
            Account newAccount = adminService.addMember(account);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", newAccount);
            response.put("message", "User added successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to add user: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody Account account) {
        try {
            Account updatedAccount = adminService.updateUser(id, account);
            if (updatedAccount == null) {
                return ResponseEntity.notFound().build();
            }
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", updatedAccount);
            response.put("message", "User updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to update user: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        try {
            boolean isDeleted = adminService.deleteUser(id);
            if (!isDeleted) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("status", "error");
                errorResponse.put("message", "Failed to delete user");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to delete user: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/users/inactive")
    public ResponseEntity<?> getInactiveUsers() {
        try {
            List<Account> inactiveUsers = adminService.getInactiveUsers();
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", inactiveUsers);
            response.put("message", "Inactive users retrieved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to retrieve inactive users: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PatchMapping("/users/reactivate/{id}")
    public ResponseEntity<?> reactivateUser(@PathVariable int id) {
        try {
            boolean isReactivated = adminService.reactivateUser(id);
            if (!isReactivated) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("status", "error");
                errorResponse.put("message", "Failed to reactivate user");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "User reactivated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to reactivate user: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
