package com.swp.group3.login.service;

import com.swp.group3.login.pojo.OrderDetails;
import com.swp.group3.login.pojo.Product;
import java.util.List;

public interface IOrderDetailsService {
    OrderDetails createOrderDetails(int orderId, Product product, int quantity, double unitPrice);

    List<OrderDetails> getOrderDetailsByOrderId(int orderId);

    void updateOrderDetails(int orderDetailsId, int quantity, double unitPrice);

    void deleteOrderDetails(int orderDetailsId);
}
