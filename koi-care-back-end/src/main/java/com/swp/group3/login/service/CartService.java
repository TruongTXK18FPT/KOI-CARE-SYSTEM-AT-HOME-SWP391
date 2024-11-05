package com.swp.group3.login.service;

import com.swp.group3.login.dto.CartItem;
import com.swp.group3.login.pojo.Product;
import com.swp.group3.login.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CartService implements ICartService {

    private final Map<Integer, Map<Integer, CartItem>> userCarts = new ConcurrentHashMap<>();

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addToCart(int accountId, int productId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!isProductInStock(productId, quantity)) {
            throw new RuntimeException("Product is out of stock or insufficient quantity");
        }

        Map<Integer, CartItem> userCart = userCarts.computeIfAbsent(accountId, k -> new HashMap<>());

        CartItem existingItem = userCart.get(productId);
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem(
                    productId,
                    product.getProductName(),
                    product.getImageUrl(),
                    quantity,
                    product.getPrice(),
                    accountId);
            userCart.put(productId, newItem);
        }
    }

    @Override
    public void removeFromCart(int accountId, int productId) {
        Map<Integer, CartItem> userCart = userCarts.get(accountId);
        if (userCart != null) {
            CartItem item = userCart.get(productId);
            if (item != null) {
                if (item.getQuantity() > 1) {
                    item.setQuantity(item.getQuantity() - 1);
                } else {
                    userCart.remove(productId);
                    if (userCart.isEmpty()) {
                        userCarts.remove(accountId);
                    }
                }
            }
        }
    }

    @Override
    public void updateCartItemQuantity(int accountId, int productId, int quantity) {
        if (quantity <= 0) {
            removeFromCart(accountId, productId);
            return;
        }

        if (!isProductInStock(productId, quantity)) {
            throw new RuntimeException("Requested quantity not available in stock");
        }

        Map<Integer, CartItem> userCart = userCarts.get(accountId);
        if (userCart != null && userCart.containsKey(productId)) {
            CartItem item = userCart.get(productId);
            item.setQuantity(quantity);
        }
    }

    @Override
    public List<CartItem> getCartItems(int accountId) {
        Map<Integer, CartItem> userCart = userCarts.get(accountId);
        return userCart != null ? new ArrayList<>(userCart.values()) : new ArrayList<>();
    }

    @Override
    public void clearCart(int accountId) {
        userCarts.remove(accountId);
    }

    @Override
    public double getCartTotal(int accountId) {
        Map<Integer, CartItem> userCart = userCarts.get(accountId);
        if (userCart == null) {
            return 0.0;
        }

        return userCart.values().stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();
    }

    @Override
    public boolean isProductInStock(int productId, int requestedQuantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return product.getStockQuantity() >= requestedQuantity;
    }
}