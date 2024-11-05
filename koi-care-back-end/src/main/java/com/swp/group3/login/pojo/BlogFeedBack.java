package com.swp.group3.login.pojo;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "BlogFeedback")
public class BlogFeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedbackID")
    private int feedbackID;

    @ManyToOne
    @JoinColumn(name = "blogID", nullable = false)
    @JsonIgnore
    private Blog blog;

    @ManyToOne
    @JoinColumn(name = "accountID", nullable = false)
    private Account account;

    @Column(name = "feedbackText", columnDefinition = "TEXT")
    private String feedbackText;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "feedbackDate", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date feedbackDate;

    @Transient
    private String authorName;

    public BlogFeedBack() {
    }

    public BlogFeedBack(Blog blog, Account account, String feedbackText, int rating, Date feedbackDate) {
        this.blog = blog;
        this.account = account;
        this.feedbackText = feedbackText;
        this.rating = rating;
        this.feedbackDate = feedbackDate;
        if (account != null) {
            this.authorName = account.getFullName();
        }
    }

    // Getters and Setters

    public int getFeedbackID() {
        return feedbackID;
    }

    public void setFeedbackID(int feedbackID) {
        this.feedbackID = feedbackID;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getFeedbackText() {
        return feedbackText;
    }

    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Date getFeedbackDate() {
        return feedbackDate;
    }

    public void setFeedbackDate(Date feedbackDate) {
        this.feedbackDate = feedbackDate;
    }

    @JsonProperty("authorName")
    public String getAuthorName() {
        if (account != null) {
            this.authorName = account.getFullName();
        }
        return this.authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
