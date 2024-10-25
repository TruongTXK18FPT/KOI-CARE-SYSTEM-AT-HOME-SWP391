package com.swp.group3.login.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.pojo.Pond;
import com.swp.group3.login.repository.AccountRepository;
import com.swp.group3.login.repository.PondRepository;

@Service
public class PondService implements IPondService {

    @Autowired
    private PondRepository pondRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public Page<Pond> getAllPonds(Pageable pageable) {
        return pondRepository.findAll(pageable);
    }

    @Override
    public Optional<Pond> getPondById(Integer id) {
        return pondRepository.findById(id);
    }

    @Override
    public Pond addPond(Pond pond) {
        return pondRepository.save(pond);
    }

    @Override
    public Optional<Pond> updatePond(Integer id, Pond updatedPond) {
        return pondRepository.findById(id)
                .map(pond -> {
                    pond.setName(updatedPond.getName());
                    pond.setImage(updatedPond.getImage());
                    pond.setNumberOfFish(updatedPond.getNumberOfFish());
                    pond.setSize(updatedPond.getSize());
                    pond.setVolume(updatedPond.getVolume());
                    pond.setDrainCount(updatedPond.getDrainCount());
                    pond.setDepth(updatedPond.getDepth());
                    pond.setSkimmerCount(updatedPond.getSkimmerCount());
                    return pondRepository.save(pond);
                });
    }

    @Override
    public boolean deletePond(Integer id) {
        return pondRepository.findById(id)
                .map(pond -> {
                    pondRepository.delete(pond);
                    return true;
                })
                .orElse(false);
    }

    @Override
    public Page<Pond> getPondsByAccountId(Integer accountId, Pageable pageable) {
        return pondRepository.findByAccountAccountId(accountId, pageable);
    }
     @Override
     public int getTotalKoiByPondId(Integer pondId) {
        Integer totalKoi = pondRepository.getTotalKoiByPondId(pondId);
        return totalKoi != null ? totalKoi : 0;
    }
}
