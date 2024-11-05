package com.swp.group3.login.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.swp.group3.login.pojo.Blog;

public interface IBlogService {
    Blog createBlog(Blog blog, Integer accountId);

    Optional<Blog> getBlogById(int blogId);

    Page<Blog> getAllBlogs(Pageable pageable);

    List<Blog> getBlogsByAuthor(int accountId);

    Blog updateBlog(int blogId, Blog blog);

    void deleteBlog(int blogId);
}
