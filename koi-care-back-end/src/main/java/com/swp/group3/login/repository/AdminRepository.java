package com.swp.group3.login.repository;

import com.swp.group3.login.pojo.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Account, Integer> {
    // Find all accounts that are not deleted (status is active)
    List<Account> findByStatusOrderByAccountIdDesc(Account.Status status);

    // Find account by ID and status
    Optional<Account> findByAccountIdAndStatus(int accountId, Account.Status status);
}
