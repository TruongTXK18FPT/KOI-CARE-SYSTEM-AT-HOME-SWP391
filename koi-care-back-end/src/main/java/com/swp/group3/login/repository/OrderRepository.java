package com.swp.group3.login.repository;

import com.swp.group3.login.pojo.Order;
import com.swp.group3.login.pojo.Order.OrderStatus;
import com.swp.group3.login.pojo.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByAccount(Account account);

    // If you want to find by accountId directly
    List<Order> findByAccountAccountId(Integer accountId);

    // Keep this for finding specific order status for an account
    Optional<Order> findByAccountAndStatus(Account account, Order.OrderStatus status);
 Page<Order> findAllByOrderByOrderDateAsc(Pageable pageable);
    Page<Order> findAllByOrderByOrderDateDesc(Pageable pageable);
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);
    Page<Order> findByAccountFullNameContainingIgnoreCase(String keyword, Pageable pageable);

}
