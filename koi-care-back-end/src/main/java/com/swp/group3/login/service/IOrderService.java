package com.swp.group3.login.service;

import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.dto.CartItem;
import java.util.List;

public interface IOrderService {
    Order createOrder(int accountId, String shippingAddress, String paymentMethod, List<CartItem> cartItems);

    Order getOrderById(int orderId);

    List<Order> getOrdersByAccount(int accountId);

    void updateOrderStatus(int orderId, String status);

    double calculateOrderTotal(List<CartItem> cartItems);

    List<Order> getAllOrders();

    void cancelOrder(int orderId, int accountId);
}
