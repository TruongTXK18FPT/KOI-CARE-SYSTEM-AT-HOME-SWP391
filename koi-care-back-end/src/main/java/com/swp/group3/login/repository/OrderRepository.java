package com.swp.group3.login.repository;

import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.pojo.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByAccount(Account account);

    // If you want to find by accountId directly
    List<Order> findByAccountAccountId(Integer accountId);

    // Keep this for finding specific order status for an account
    Optional<Order> findByAccountAndStatus(Account account, Order.OrderStatus status);
}
