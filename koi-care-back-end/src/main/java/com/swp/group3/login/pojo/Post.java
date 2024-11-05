package com.swp.group3.login.pojo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "Post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postID")
    private int postID;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    @JsonIgnore
    private Account account;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "postedDate", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date postedDate;

    @Column(name = "category", length = 100)
    private String category;

    public Post() {
    }

    public Post(int postID, String title, Account account, String content, String imageUrl, Date postedDate,
            String category) {
        this.postID = postID;
        this.title = title;
        this.account = account;
        this.content = content;
        this.imageUrl = imageUrl;
        this.postedDate = postedDate;
        this.category = category;
    }

    public int getPostID() {
        return postID;
    }

    public void setPostID(int postID) {
        this.postID = postID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
