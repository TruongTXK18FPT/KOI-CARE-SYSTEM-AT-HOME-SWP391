package com.swp.group3.login.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.swp.group3.login.pojo.Pond;

public interface PondRepository extends JpaRepository<Pond, Integer> {
    Page<Pond> findByAccountAccountId(Integer accountId, Pageable pageable);
    @Query("SELECT SUM(k.quantity) FROM KoiFish k WHERE k.pond.id = :pondId")
    Integer getTotalKoiByPondId(Integer pondId);
}
