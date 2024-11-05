package com.swp.group3.login.service;

import com.swp.group3.login.dto.CartItem;
import java.util.List;

public interface ICartService {
    void addToCart(int accountId, int productId, int quantity);

    void removeFromCart(int accountId, int productId);

    void updateCartItemQuantity(int accountId, int productId, int quantity);

    List<CartItem> getCartItems(int accountId);

    void clearCart(int accountId);

    double getCartTotal(int accountId);

    boolean isProductInStock(int productId, int requestedQuantity);

}
