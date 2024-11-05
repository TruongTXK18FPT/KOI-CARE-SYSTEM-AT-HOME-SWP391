package com.swp.group3.login.gui;

import com.swp.group3.login.pojo.BlogFeedBack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.swp.group3.login.service.IBlogFeedBackService;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/feedbacks")
public class BlogFeedBackController {

    @Autowired
    private IBlogFeedBackService blogFeedBackService;

    @PostMapping("/create")
    public ResponseEntity<?> createFeedback(@RequestBody BlogFeedBack feedback,
            @RequestParam Integer accountId) {
        System.out.println("Request body: " + feedback);
        System.out.println("Account ID: " + accountId);

        try {
            BlogFeedBack createdFeedback = blogFeedBackService.createFeedback(feedback, accountId);
            return ResponseEntity.ok(createdFeedback);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.internalServerError().body("An unexpected error occurred");
        }
    }

    @GetMapping("/getfeedback/{id}")
    public ResponseEntity<BlogFeedBack> getFeedbackById(@PathVariable int id) {
        return blogFeedBackService.getFeedbackById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/blog/{blogId}")
    public ResponseEntity<List<BlogFeedBack>> getAllFeedbacksForBlog(@PathVariable int blogId) {
        try {
            List<BlogFeedBack> feedbacks = blogFeedBackService.getAllFeedbacksForBlog(blogId);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFeedback(@PathVariable int id,
            @RequestBody BlogFeedBack feedback) {
        try {
            feedback.setFeedbackID(id);
            BlogFeedBack updatedFeedback = blogFeedBackService.updateFeedback(feedback);
            return ResponseEntity.ok(updatedFeedback);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable int id) {
        try {
            blogFeedBackService.deleteFeedback(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred");
        }
    }
}