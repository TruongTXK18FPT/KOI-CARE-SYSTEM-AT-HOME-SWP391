package com.swp.group3.login.pojo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "`Order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderID")
    private int orderID;
    // Fetch using for Delays loading the related entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accountID", nullable = false)
    @JsonIgnore
    private Account account;

    @Column(name = "orderDate", nullable = false)
    private Date orderDate;

    @Column(name = "totalAmount", nullable = false)
    private double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrderStatus status;

    @Column(name = "shippingAddress", nullable = false)
    private String shippingAddress;

    @Column(name = "paymentMethod", nullable = false)
    private String paymentMethod;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<OrderDetails> orderDetails;

    // Enum for OrderStatus
    public enum OrderStatus {
        pending, shipped, delivered, cancel
    }

    public enum PaymentMethod {
        cashOnDelivery, vnPay
    }

    // Constructors
    public Order() {
    }

    public Order(Account account, Date orderDate, double totalAmount, OrderStatus status,
            String shippingAddress,
            String paymentMethod) {
        this.account = account;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }
 @JsonProperty("customerFullName")
    public String getCustomerFullName() {
        return account != null ? account.getFullName() : null;
    }
}
