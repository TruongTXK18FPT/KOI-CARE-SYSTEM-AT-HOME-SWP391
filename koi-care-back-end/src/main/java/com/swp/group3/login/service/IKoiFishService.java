package com.swp.group3.login.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.swp.group3.login.pojo.KoiFish;

public interface IKoiFishService {
    Page<KoiFish> getAllKoiFish(Pageable pageable);
    Optional<KoiFish> getKoiFishById(Integer id);
    Page<KoiFish> getKoiFishByPondId(Integer pondId, Pageable pageable);
    KoiFish addKoiFish(KoiFish koiFish);
    Optional<KoiFish> updateKoiFish(Integer id, KoiFish koiFish);
    boolean deleteKoiFish(Integer id);
}
