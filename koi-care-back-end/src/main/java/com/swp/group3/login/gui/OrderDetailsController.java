package com.swp.group3.login.gui;

import com.swp.group3.login.service.IOrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/orderdetails")
public class OrderDetailsController {
    @Autowired
    private IOrderDetailsService orderDetailsService;

    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderDetails(
            @RequestParam int accountId,
            @PathVariable int orderId) {
        try {
            var orderDetails = orderDetailsService.getOrderDetailsByOrderId(orderId);
            return ResponseEntity.ok().body(orderDetails);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{orderDetailsId}")
    public ResponseEntity<?> updateOrderDetails(
            @RequestParam int accountId,
            @PathVariable int orderDetailsId,
            @RequestBody Map<String, Object> request) {
        try {
            int quantity = (Integer) request.get("quantity");
            double unitPrice = (Double) request.get("unitPrice");

            orderDetailsService.updateOrderDetails(orderDetailsId, quantity, unitPrice);
            return ResponseEntity.ok().body(Map.of("message", "Order details updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{orderDetailsId}")
    public ResponseEntity<?> deleteOrderDetails(
            @RequestParam int accountId,
            @PathVariable int orderDetailsId) {
        try {
            orderDetailsService.deleteOrderDetails(orderDetailsId);
            return ResponseEntity.ok().body(Map.of("message", "Order details deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
