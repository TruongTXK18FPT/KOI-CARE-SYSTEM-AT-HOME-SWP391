package com.swp.group3.login.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.swp.group3.login.pojo.KoiFish;

public interface KoiFishRepository extends JpaRepository<KoiFish, Integer> {
    Page<KoiFish> findByPondId(Integer pondId, Pageable pageable);
}
