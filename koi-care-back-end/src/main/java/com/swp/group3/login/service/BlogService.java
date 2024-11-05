package com.swp.group3.login.service;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.pojo.Blog;
import com.swp.group3.login.repository.AccountRepository;
import com.swp.group3.login.repository.BlogRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService implements IBlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Blog createBlog(Blog blog, Integer accountId) {
        if (accountId == null) {
            throw new IllegalArgumentException("Account ID cannot be null");
        }

        Account author = accountRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Author not found with ID: " + accountId));

        validateBlogFields(blog);
        blog.setAuthor(author);
        blog.setCreatedDate(new Date());

        return blogRepository.save(blog);
    }

    @Override
    public Optional<Blog> getBlogById(int blogId) {
        return blogRepository.findByBlogID(blogId);
    }

    @Override
    public Page<Blog> getAllBlogs(Pageable pageable) {
        return blogRepository.findAll(pageable);
    }

    @Override
    public List<Blog> getBlogsByAuthor(int accountId) {
        return blogRepository.findByAuthorAccountId(accountId);
    }

    @Override
    public Blog updateBlog(int blogId, Blog blog) {
        Blog existingBlog = blogRepository.findById(blogId)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with ID: " + blogId));

        validateBlogFields(blog);

        existingBlog.setTitle(blog.getTitle());
        existingBlog.setContent(blog.getContent());
        existingBlog.setDescription(blog.getDescription());
        existingBlog.setBlogImage(blog.getBlogImage());

        return blogRepository.save(existingBlog);
    }

    private void validateBlogFields(Blog blog) {
        if (blog == null) {
            throw new IllegalArgumentException("Blog object cannot be null");
        }
        if (blog.getTitle() == null || blog.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Blog title cannot be empty");
        }
        if (blog.getContent() == null || blog.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Blog content cannot be empty");
        }
        if (blog.getDescription() == null || blog.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Blog description cannot be empty");
        }
    }

    @Override
    public void deleteBlog(int blogId) {
        if (!blogRepository.existsById(blogId)) {
            throw new EntityNotFoundException("Blog not found with ID: " + blogId);
        }
        blogRepository.deleteById(blogId);
    }
}