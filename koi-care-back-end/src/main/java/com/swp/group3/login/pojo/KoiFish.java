package com.swp.group3.login.pojo;

import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "KoiFish")
public class KoiFish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fish_id;

    @ManyToOne
    @JoinColumn(name = "Pond_id", referencedColumnName = "id")
    private Pond pond;

    @Column(name = "nameFish")
    private String nameFish;
    @Column(name = "imageFish", length = 255)
    private String imageFish;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "physique", length = 255)
    private String physique;
    @Column(name = "age")
    private int age;
    @Column(name = "length")
    private float length;
    @Column(name = "weight")
    private float weight;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex", columnDefinition = "ENUM('male', 'female')")
    private Sex sex;
    @Column(name = "variety", length = 100)
    private String variety;
    @Column(name = "inPondSince")
    private Date inPondSince;
    @Column(name = "breeder", length = 100)
    private String breeder;
    @Column(name = "purchasePrice", precision = 10, scale = 2)
    private BigDecimal purchasePrice;

    public KoiFish() {
    }

    public KoiFish(Pond pond, String nameFish, String imageFish, int quantity, String physique, int age, float length,
            float weight, Sex sex, String variety, Date inPondSince, String breeder, BigDecimal purchasePrice) {
        this.pond = pond;
        this.nameFish = nameFish;
        this.imageFish = imageFish;
        this.quantity = quantity;
        this.physique = physique;
        this.age = age;
        this.length = length;
        this.weight = weight;
        this.sex = sex;
        this.variety = variety;
        this.inPondSince = inPondSince;
        this.breeder = breeder;
        this.purchasePrice = purchasePrice;
    }

    public Integer getFish_id() {
        return fish_id;
    }

    public void setFish_id(Integer fish_id) {
        this.fish_id = fish_id;
    }

    public Pond getPond() {
        return pond;
    }

    public void setPond(Pond pond) {
        this.pond = pond;
    }

    public String getNameFish() {
        return nameFish;
    }

    public void setNameFish(String nameFish) {
        this.nameFish = nameFish;
    }

    public String getImageFish() {
        return imageFish;
    }

    public void setImageFish(String imageFish) {
        this.imageFish = imageFish;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getPhysique() {
        return physique;
    }

    public void setPhysique(String physique) {
        this.physique = physique;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public Date getInPondSince() {
        return inPondSince;
    }

    public void setInPondSince(Date inPondSince) {
        this.inPondSince = inPondSince;
    }

    public String getBreeder() {
        return breeder;
    }

    public void setBreeder(String breeder) {
        this.breeder = breeder;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    // Getters and Setters
    public enum Sex{
        male, female
    }

}

