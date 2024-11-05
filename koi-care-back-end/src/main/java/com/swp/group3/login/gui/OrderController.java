package com.swp.group3.login.gui;

import com.swp.group3.login.dto.CartItem;
import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.service.IOrderService;
import com.swp.group3.login.service.ICartService;
import com.swp.group3.login.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @Autowired
    private ICartService cartService;

    @Autowired
    private AccountRepository accountRepository;

    private Account getAccountById(int accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with ID: " + accountId));
    }

    @PostMapping("/checkout/{accountId}")
    public ResponseEntity<?> checkout(
            @PathVariable int accountId,
            @RequestBody Map<String, String> checkoutDetails) {
        try {
            Account account = getAccountById(accountId);
            List<CartItem> cartItems = cartService.getCartItems(accountId);

            if (cartItems.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Cart is empty"));
            }

            String shippingAddress = checkoutDetails.get("shippingAddress");
            String paymentMethod = checkoutDetails.get("paymentMethod");

            Order order = orderService.createOrder(
                    accountId,
                    shippingAddress,
                    paymentMethod,
                    cartItems);

            return ResponseEntity.ok().body(Map.of(
                    "message", "Order created successfully",
                    "order", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/getorderid/{orderId}/account/{accountId}")
    public ResponseEntity<?> getOrder(
            @PathVariable int orderId,
            @PathVariable int accountId) {
        try {
            Account account = getAccountById(accountId);
            Order order = orderService.getOrderById(orderId);
            return ResponseEntity.ok().body(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history/{accountId}")
    public ResponseEntity<?> getOrderHistory(@PathVariable int accountId) {
        try {
            Account account = getAccountById(accountId);
            List<Order> orders = orderService.getOrdersByAccount(accountId);
            return ResponseEntity.ok().body(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{orderId}/status/account/{accountId}")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable int orderId,
            @PathVariable int accountId,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            Account account = getAccountById(accountId);
            orderService.updateOrderStatus(orderId, statusUpdate.get("status"));
            return ResponseEntity.ok()
                    .body(Map.of("message", "Order status updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

}