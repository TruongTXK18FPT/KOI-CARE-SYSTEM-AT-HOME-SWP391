package com.swp.group3.login.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.pojo.Pond;

public interface IPondService {
    Page<Pond> getAllPonds(Pageable pageable);
    Optional<Pond> getPondById(Integer id);
    Page<Pond> getPondsByAccountId(Integer accountId, Pageable pageable);
    Pond addPond(Pond pond);
    Optional<Pond> updatePond(Integer id, Pond pond);
    boolean deletePond(Integer id);
     int getTotalKoiByPondId(Integer pondId); // Add this method
}
