package com.swp.group3.login.repository;

import com.swp.group3.login.pojo.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
    Optional<OrderDetails> findByOrderOrderID(int orderId);
}
