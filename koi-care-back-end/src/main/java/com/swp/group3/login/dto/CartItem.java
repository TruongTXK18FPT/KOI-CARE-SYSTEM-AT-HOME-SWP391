package com.swp.group3.login.dto;

public class CartItem {
    private int productId;
    private String productName;
    private String imageUrl;
    private int quantity;
    private double unitPrice;
    private int accountId;

    public CartItem() {
    }

    public CartItem(int productId, String productName, String imageUrl, int quantity, double unitPrice, int accountId) {
        this.productId = productId;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.accountId = accountId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    @Override
    public String toString() {
        return "CartItem [productId=" + productId + ", productName=" + productName + ", imageUrl=" + imageUrl
                + ", quantity=" + quantity + ", unitPrice=" + unitPrice + ", accountId=" + accountId + "]";
    }

}