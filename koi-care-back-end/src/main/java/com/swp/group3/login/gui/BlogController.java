package com.swp.group3.login.gui;

import com.swp.group3.login.pojo.Blog;
import com.swp.group3.login.service.IBlogService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private IBlogService blogService;

    @PostMapping("/create")
    public ResponseEntity<?> createBlog(@RequestBody Blog blog, @RequestParam Integer accountId) {
        try {
            Blog createdBlog = blogService.createBlog(blog, accountId);
            return ResponseEntity.ok(createdBlog);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable int id) {
        return blogService.getBlogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<Blog>> getAllBlogs(Pageable pageable) {
        return ResponseEntity.ok(blogService.getAllBlogs(pageable));
    }
    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<Blog>> getBlogsByAuthor(@PathVariable int authorId) {
        return ResponseEntity.ok(blogService.getBlogsByAuthor(authorId));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable int id, @RequestBody Blog blog) {
        try {
            Blog updatedBlog = blogService.updateBlog(id, blog);
            return ResponseEntity.ok(updatedBlog);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable int id) {
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}