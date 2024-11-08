package com.swp.group3.login.service;

import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.pojo.Order.OrderStatus;
import com.swp.group3.login.pojo.OrderDetails;
import com.swp.group3.login.pojo.Product;
import com.swp.group3.login.dto.CartItem;
import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.repository.OrderRepository;
import com.swp.group3.login.repository.ProductRepository;
import com.swp.group3.login.repository.OrderDetailsRepository;
import com.swp.group3.login.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ICartService cartService;

    @Override
    @Transactional
    public Order createOrder(int accountId, String shippingAddress, String paymentMethod, List<CartItem> cartItems) {
        if (cartItems == null || cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        validateStockAvailability(cartItems);

        double totalAmount = calculateOrderTotal(cartItems);

        Order order = new Order();
        order.setAccount(account);
        order.setOrderDate(new Date());
        order.setTotalAmount(totalAmount);
        order.setStatus(Order.OrderStatus.pending);
        order.setShippingAddress(shippingAddress);
        order.setPaymentMethod(paymentMethod);

        order = orderRepository.save(order);

        List<OrderDetails> orderDetailsList = createOrderDetails(order, cartItems);
        order.setOrderDetails(orderDetailsList);

        cartService.clearCart(account.getAccountId());

        return order;
    }

    private List<OrderDetails> createOrderDetails(Order order, List<CartItem> cartItems) {
        List<OrderDetails> orderDetailsList = new ArrayList<>();

        for (CartItem item : cartItems) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setOrder(order);
            orderDetails.setProduct(product);
            orderDetails.setQuantity(item.getQuantity());
            orderDetails.setUnitPrice(item.getUnitPrice());
            orderDetailsList.add(orderDetails);

            updateProductStock(product, item.getQuantity());
        }

        return orderDetailsRepository.saveAll(orderDetailsList);
    }

    private void validateStockAvailability(List<CartItem> cartItems) {
        for (CartItem item : cartItems) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getProductName());
            }
        }
    }

    private void updateProductStock(Product product, int orderedQuantity) {
        int newStock = product.getStockQuantity() - orderedQuantity;
        if (newStock < 0) {
            throw new RuntimeException("Insufficient stock for product: " + product.getProductName());
        }
        product.setStockQuantity(newStock);
        productRepository.save(product);
    }

    @Override
    public double calculateOrderTotal(List<CartItem> cartItems) {
        return cartItems.stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();
    }

    @Override
    @Transactional
    public void cancelOrder(int orderId, int accountId) {
        // Get the order and verify it exists
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Verify the order belongs to the account
        if (order.getAccount().getAccountId() != accountId) {
            throw new RuntimeException("You are not authorized to cancel this order");
        }

        // Verify the order is in a cancellable state
        if (order.getStatus() != Order.OrderStatus.pending) {
            throw new RuntimeException("Order cannot be cancelled. Only pending orders can be cancelled.");
        }

        // Restore the product stock quantities
        for (OrderDetails detail : order.getOrderDetails()) {
            Product product = detail.getProduct();
            product.setStockQuantity(product.getStockQuantity() + detail.getQuantity());
            productRepository.save(product);
        }

        // Update order status to cancelled
        order.setStatus(Order.OrderStatus.cancel);
        orderRepository.save(order);
    }

    // view details order theo id cho manager and member
    @Override
    public Order getOrderById(int orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // get order history cua 1 account(member)
    @Override
    public List<Order> getOrdersByAccount(int accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        List<Order> orders = orderRepository.findByAccount(account);
        return orders;
    }

    // manager
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void updateOrderStatus(int orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.OrderStatus.valueOf(status.toLowerCase()));
        orderRepository.save(order);
    }
 @Override
    public Page<Order> sortOrdersByDate(String sortOrder, Pageable pageable) {
        if ("asc".equalsIgnoreCase(sortOrder)) {
            return orderRepository.findAllByOrderByOrderDateAsc(pageable);
        } else {
            return orderRepository.findAllByOrderByOrderDateDesc(pageable);
        }
    }

    @Override
    public Page<Order> filterOrdersByStatus(String status, Pageable pageable) {
        OrderStatus orderStatus = OrderStatus.valueOf(status.toLowerCase());
        return orderRepository.findByStatus(orderStatus, pageable);
    }

    @Override
    public Page<Order> searchOrders(String keyword, Pageable pageable) {
        return orderRepository.findByAccountFullNameContainingIgnoreCase(keyword, pageable);
    }
}
