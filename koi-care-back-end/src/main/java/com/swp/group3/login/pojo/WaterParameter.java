package com.swp.group3.login.pojo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "WaterParameter")
public class WaterParameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "waterParameter_id")
    private int waterParameterId;  // Primary key

    @ManyToOne
    @JoinColumn(name = "pond_id", referencedColumnName = "id", nullable = false)
    private Pond pond;  // Foreign key to Pond

    @Column(name = "dateTime", nullable = false)
    private LocalDateTime dateTime;  // Date and time

    @Column(name = "NO2")
    private Float nitrogenDioxide;

    @Column(name = "O2")
    private Float oxygen;

    @Column(name = "NO3")
    private Float nitrate;

    @Column(name = "temperature")
    private Float temperature;

    @Column(name = "PO4")
    private Float phosphate;

    @Column(name = "pHValue")
    private Float pHValue;

    @Column(name = "NH4")
    private Float  ammonium;
    @Column(name = "KH")
    private Float potassiumHydride;

    @Column(name = "GH")
    private Float generalHardness;

    @Column(name = "CO2")
    private Float carbonDioxide;

    @Column(name = "salt")
    private Float salt;

    @Column(name = "totalChlorines")
    private Float totalChlorines;

    @Column(name = "outdoorTemp")
    private Float outdoorTemp;

    @Column(name = "amountFed")
    private Float amountFed;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    public int getWaterParameterId() {
        return waterParameterId;
    }

    public void setWaterParameterId(int waterParameterId) {
        this.waterParameterId = waterParameterId;
    }

    public Pond getPond() {
        return pond;
    }

    public void setPond(Pond pond) {
        this.pond = pond;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Float getNitrogenDioxide() {
        return nitrogenDioxide;
    }

    public void setNitrogenDioxide(Float nitrogenDioxide) {
        this.nitrogenDioxide = nitrogenDioxide;
    }

    public Float getOxygen() {
        return oxygen;
    }

    public void setOxygen(Float oxygen) {
        this.oxygen = oxygen;
    }

    public Float getNitrate() {
        return nitrate;
    }

    public void setNitrate(Float nitrate) {
        this.nitrate = nitrate;
    }

    public Float getTemperature() {
        return temperature;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public Float getPhosphate() {
        return phosphate;
    }

    public void setPhosphate(Float phosphate) {
        this.phosphate = phosphate;
    }

    public Float getpHValue() {
        return pHValue;
    }

    public void setpHValue(Float pHValue) {
        this.pHValue = pHValue;
    }

    public Float getAmmonium() {
        return ammonium;
    }

    public void setAmmonium(Float ammonium) {
        this.ammonium = ammonium;
    }

    public Float getPotassiumHydride() {
        return potassiumHydride;
    }

    public void setPotassiumHydride(Float potassiumHydride) {
        this.potassiumHydride = potassiumHydride;
    }

    public Float getGeneralHardness() {
        return generalHardness;
    }

    public void setGeneralHardness(Float generalHardness) {
        this.generalHardness = generalHardness;
    }

    public Float getCarbonDioxide() {
        return carbonDioxide;
    }

    public void setCarbonDioxide(Float carbonDioxide) {
        this.carbonDioxide = carbonDioxide;
    }

    public Float getSalt() {
        return salt;
    }

    public void setSalt(Float salt) {
        this.salt = salt;
    }

    public Float getTotalChlorines() {
        return totalChlorines;
    }

    public void setTotalChlorines(Float totalChlorines) {
        this.totalChlorines = totalChlorines;
    }

    public Float getOutdoorTemp() {
        return outdoorTemp;
    }

    public void setOutdoorTemp(Float outdoorTemp) {
        this.outdoorTemp = outdoorTemp;
    }

    public Float getAmountFed() {
        return amountFed;
    }

    public void setAmountFed(Float amountFed) {
        this.amountFed = amountFed;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    // Getters and Setters
    
}

