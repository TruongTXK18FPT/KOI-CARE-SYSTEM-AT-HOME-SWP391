package com.swp.group3.login.gui;

import com.swp.group3.login.dto.CartItem;
import com.swp.group3.login.repository.AccountRepository;
import com.swp.group3.login.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private ICartService cartService;

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam Integer accountId,
            @RequestBody Map<String, Object> request) {
        try {
            int productId = (Integer) request.get("productId");
            int quantity = (Integer) request.get("quantity");

            if (quantity <= 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "Quantity must be greater than 0"));
            }

            accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            cartService.addToCart(accountId, productId, quantity);
            return ResponseEntity.ok(Map.of(
                    "message", "Item added to cart successfully",
                    "cartItems", cartService.getCartItems(accountId),
                    "cartTotal", cartService.getCartTotal(accountId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@RequestParam Integer accountId,
            @PathVariable int productId) {
        try {
            accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            cartService.removeFromCart(accountId, productId);
            return ResponseEntity.ok().body(Map.of(
                    "message", "Item removed from cart successfully",
                    "cartItems", cartService.getCartItems(accountId),
                    "cartTotal", cartService.getCartTotal(accountId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/getCart")
    public ResponseEntity<?> getCart(@RequestParam Integer accountId) {
        try {
            accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<CartItem> cartItems = cartService.getCartItems(accountId);
            double cartTotal = cartService.getCartTotal(accountId);

            return ResponseEntity.ok().body(Map.of(
                    "cartItems", cartItems,
                    "cartTotal", cartTotal));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestParam Integer accountId) {
        try {
            accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            cartService.clearCart(accountId);
            return ResponseEntity.ok().body(Map.of("message", "Cart cleared successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}