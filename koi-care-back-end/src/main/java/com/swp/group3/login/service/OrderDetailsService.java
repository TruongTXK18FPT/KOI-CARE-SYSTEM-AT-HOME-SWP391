package com.swp.group3.login.service;

import com.swp.group3.login.pojo.Product;
import com.swp.group3.login.pojo.OrderDetails;
import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.repository.OrderDetailsRepository;
import com.swp.group3.login.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailsService implements IOrderDetailsService {
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    @Transactional
    public OrderDetails createOrderDetails(int orderId, Product product, int quantity, double unitPrice) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setOrder(order);
        orderDetails.setProduct(product);
        orderDetails.setQuantity(quantity);
        orderDetails.setUnitPrice(unitPrice);

        return orderDetailsRepository.save(orderDetails);
    }

    @Override
    public List<OrderDetails> getOrderDetailsByOrderId(int orderId) {
        if (orderId <= 0) {
            throw new IllegalArgumentException("Invalid order ID");
        }
        Optional<OrderDetails> orderDetailsOpt = orderDetailsRepository.findByOrderOrderID(orderId);
        return orderDetailsOpt.map(List::of).orElse(List.of());
    }

    @Override
    @Transactional
    public void updateOrderDetails(int orderDetailsId, int quantity, double unitPrice) {
        OrderDetails orderDetails = orderDetailsRepository.findById(orderDetailsId)
                .orElseThrow(() -> new IllegalArgumentException("OrderDetails not found"));

        orderDetails.setQuantity(quantity);
        orderDetails.setUnitPrice(unitPrice);
        orderDetailsRepository.save(orderDetails);
    }

    @Override
    @Transactional
    public void deleteOrderDetails(int orderDetailsId) {
        if (orderDetailsId <= 0) {
            throw new IllegalArgumentException("Invalid order details ID");
        }

        orderDetailsRepository.findById(orderDetailsId)
                .orElseThrow(() -> new IllegalArgumentException("OrderDetails not found: " + orderDetailsId));

        orderDetailsRepository.deleteById(orderDetailsId);
    }
}