package com.swp.group3.login.service;

import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.dto.CartItem;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface IOrderService {
    Order createOrder(int accountId, String shippingAddress, String paymentMethod, List<CartItem> cartItems);

    Order getOrderById(int orderId);

    List<Order> getOrdersByAccount(int accountId);

    void updateOrderStatus(int orderId, String status);

    double calculateOrderTotal(List<CartItem> cartItems);

    List<Order> getAllOrders();

    void cancelOrder(int orderId, int accountId);
    
    Page<Order> sortOrdersByDate(String sortOrder, Pageable pageable); // Add this method
    Page<Order> filterOrdersByStatus(String status, Pageable pageable); // Add this method
    Page<Order> searchOrders(String keyword, Pageable pageable); // Add this method
}
