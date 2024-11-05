package com.swp.group3.login.pojo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "Blog")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blogID")
    private int blogID;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "authorID", referencedColumnName = "accountId", nullable = false)
    @JsonIgnore
    private Account author;

    @Column(name = "blogImage", length = 255)
    private String blogImage;

    @Column(name = "createdDate", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    // front-end sẽ lấy dùng tạm từ accountfullname nhưng ko lưu vào DB
    // chi tiết hơn ở BlogService
    @Transient
    private String authorName;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BlogFeedBack> feedbacks;

    public Blog() {
    }

    public Blog(int blogID, String title, String content, Account author, String blogImage, Date createdDate,
            String description, String authorName, List<BlogFeedBack> feedbacks) {
        this.blogID = blogID;
        this.title = title;
        this.content = content;
        this.author = author;
        this.blogImage = blogImage;
        this.createdDate = createdDate;
        this.description = description;
        this.authorName = authorName;
        this.feedbacks = feedbacks;
    }

    public int getBlogID() {
        return blogID;
    }

    public void setBlogID(int blogID) {
        this.blogID = blogID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // chú ý
    public Account getAuthor() {
        return author;
    }

    public void setAuthor(Account author) {
        this.author = author;
        if (author != null) {
            this.authorName = author.getFullName();
        }
    }

    public String getBlogImage() {
        return blogImage;
    }

    public void setBlogImage(String blogImage) {
        this.blogImage = blogImage;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<BlogFeedBack> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<BlogFeedBack> feedbacks) {
        this.feedbacks = feedbacks;
    }

    @JsonProperty("authorName")
    public String getAuthorName() {
        if (author != null) {
            this.authorName = author.getFullName();
        }
        return this.authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
