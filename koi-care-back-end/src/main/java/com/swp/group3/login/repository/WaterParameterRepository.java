package com.swp.group3.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.swp.group3.login.pojo.Pond;
import com.swp.group3.login.pojo.WaterParameter;

import java.time.LocalDateTime;
import java.util.List;

public interface WaterParameterRepository extends JpaRepository<WaterParameter, Integer> {
    WaterParameter findByPondAndDateTime(Pond pond, LocalDateTime dateTime);
    List<WaterParameter> findByPondId(Integer pondId);
}

