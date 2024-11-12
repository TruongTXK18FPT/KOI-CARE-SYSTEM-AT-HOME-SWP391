package com.swp.group3.login.pojo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table(name = "Pond")
public class Pond {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "accountId", referencedColumnName = "accountId")
    private Account account;

    @Column(name ="name", nullable = false, length = 100)
    private String name;

    @Column(name = "image",nullable = false, length = 255)
    private String image;

    @Column(name ="numberOfFish",columnDefinition = "INT DEFAULT 0")
    private int numberOfFish;

    @Column(name = "size")
    private float size;
    @Column(name = "volume")
    private float volume;
    @Column(name = "drainCount")
    private int drainCount;
    @Column(name = "depth")
    private float depth;
    @Column(name = "skimmerCount")
    private int skimmerCount;

    @OneToMany(mappedBy = "pond",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KoiFish> koiFishList;

     @OneToMany(mappedBy = "pond", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WaterParameter> waterParameters;
    
    public Pond() {
    }
    public Pond(Account account, String name, String image, int numberOfFish, float size, float volume, int drainCount, float depth, int skimmerCount) {
        this.account = account;
        this.name = name;
        this.image = image;
        this.numberOfFish = numberOfFish;
        this.size = size;
        this.volume = volume;
        this.drainCount = drainCount;
        this.depth = depth;
        this.skimmerCount = skimmerCount;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public int getNumberOfFish() {
        return numberOfFish;
    }
    public void setNumberOfFish(int numberOfFish) {
        this.numberOfFish = numberOfFish;
    }
    public float getSize() {
        return size;
    }
    public void setSize(float size) {
        this.size = size;
    }
    public float getVolume() {
        return volume;
    }
    public void setVolume(float volume) {
        this.volume = volume;
    }
    public int getDrainCount() {
        return drainCount;
    }
    public void setDrainCount(int drainCount) {
        this.drainCount = drainCount;
    }
    public float getDepth() {
        return depth;
    }
    public void setDepth(float depth) {
        this.depth = depth;
    }
    public int getSkimmerCount() {
        return skimmerCount;
    }
    public void setSkimmerCount(int skimmerCount) {
        this.skimmerCount = skimmerCount;
    }
    
    // Getters and Setters
}

