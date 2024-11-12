package com.swp.group3.login.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.swp.group3.login.pojo.KoiFish;
import com.swp.group3.login.repository.KoiFishRepository;

@Service
public class KoiFishService implements IKoiFishService {

    @Autowired
    private KoiFishRepository koiFishRepository;

    @Override
    public Page<KoiFish> getAllKoiFish(Pageable pageable) {
        return koiFishRepository.findAll(pageable);
    }

    @Override
    public Optional<KoiFish> getKoiFishById(Integer id) {
        return koiFishRepository.findById(id);
    }

    @Override
    public Page<KoiFish> getKoiFishByPondId(Integer pondId, Pageable pageable) {
        return koiFishRepository.findByPondId(pondId, pageable);
    }

    @Override
    public KoiFish addKoiFish(KoiFish koiFish) {
        return koiFishRepository.save(koiFish);
    }

    @Override
    public Optional<KoiFish> updateKoiFish(Integer id, KoiFish updatedKoiFish) {
        return koiFishRepository.findById(id)
                .map(koiFish -> {
                    koiFish.setNameFish(updatedKoiFish.getNameFish());
                    koiFish.setImageFish(updatedKoiFish.getImageFish());
                    koiFish.setQuantity(updatedKoiFish.getQuantity());
                    koiFish.setPhysique(updatedKoiFish.getPhysique());
                    koiFish.setAge(updatedKoiFish.getAge());
                    koiFish.setLength(updatedKoiFish.getLength());
                    koiFish.setWeight(updatedKoiFish.getWeight());
                    koiFish.setSex(updatedKoiFish.getSex());
                    koiFish.setVariety(updatedKoiFish.getVariety());
                    koiFish.setInPondSince(updatedKoiFish.getInPondSince());
                    koiFish.setBreeder(updatedKoiFish.getBreeder());
                    koiFish.setPurchasePrice(updatedKoiFish.getPurchasePrice());
                    koiFish.setPond(updatedKoiFish.getPond());
                    koiFish.setStatus(updatedKoiFish.getStatus());
                    return koiFishRepository.save(koiFish);
                });
    }

    @Override
    public boolean deleteKoiFish(Integer id) {
        return koiFishRepository.findById(id)
                .map(koiFish -> {
                    koiFishRepository.delete(koiFish);
                    return true;
                })
                .orElse(false);
    }
}
