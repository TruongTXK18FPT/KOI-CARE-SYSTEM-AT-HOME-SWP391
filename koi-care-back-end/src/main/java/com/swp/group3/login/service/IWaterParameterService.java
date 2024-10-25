package com.swp.group3.login.service;

import com.swp.group3.login.pojo.WaterParameter;

import java.util.List;

public interface IWaterParameterService {
    WaterParameter addWaterParameter(WaterParameter waterParameter);
    WaterParameter updateWaterParameter(WaterParameter waterParameter);
    List<WaterParameter> getWaterParameterStatistics(Integer pondId);
    List<WaterParameter> getWaterParametersByPondId(Integer pondId);
}

