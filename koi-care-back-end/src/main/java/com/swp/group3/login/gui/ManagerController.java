package com.swp.group3.login.gui;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.service.IOrderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    IOrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateOrder(@RequestBody Order order) {
        orderService.updateOrderStatus(order.getOrderID(), order.getStatus().toString());
        return ResponseEntity.ok(Map.of("message", "Order updated successfully"));
    }

    @GetMapping("/getOrder")
    public ResponseEntity<?> getOrder(@RequestParam int orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

}
