package com.swp.group3.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp.group3.login.pojo.WaterParameter;
import com.swp.group3.login.repository.WaterParameterRepository;

import java.util.List;

@Service
public class WaterParameterService implements IWaterParameterService {

    @Autowired
    private WaterParameterRepository waterParameterRepository;

    @Override
    public WaterParameter addWaterParameter(WaterParameter waterParameter) {
        return waterParameterRepository.save(waterParameter);
    }

    @Override
    public WaterParameter updateWaterParameter(WaterParameter waterParameter) {
        return waterParameterRepository.save(waterParameter);
    }

    @Override
    public List<WaterParameter> getWaterParameterStatistics(Integer pondId) {
        return waterParameterRepository.findByPondId(pondId);
    }
    @Override
    public List<WaterParameter> getWaterParametersByPondId(Integer pondId) {
        return waterParameterRepository.findByPondId(pondId);
    }
}


