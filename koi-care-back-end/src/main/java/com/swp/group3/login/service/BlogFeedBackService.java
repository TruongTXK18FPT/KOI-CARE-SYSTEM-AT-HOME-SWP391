package com.swp.group3.login.service;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.pojo.Blog;
import com.swp.group3.login.pojo.BlogFeedBack;
import com.swp.group3.login.repository.AccountRepository;
import com.swp.group3.login.repository.BlogFeedBackRepository;
import com.swp.group3.login.repository.BlogRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlogFeedBackService implements IBlogFeedBackService {

    @Autowired
    private BlogFeedBackRepository blogFeedBackRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public BlogFeedBack createFeedback(BlogFeedBack feedback, Integer accountId) {
        // Validate account
        if (accountId == null) {
            throw new IllegalArgumentException("Account ID cannot be null");
        }

        Account account = accountRepository.findById(feedback.getAccount().getAccountId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Account not found with ID: " + feedback.getAccount().getAccountId()));

        // Fetch the existing blog object from the database
        Blog existingBlog = blogRepository.findByBlogID(feedback.getBlog().getBlogID())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Blog not found with id: " + feedback.getBlog().getBlogID()));

        // Set the existing blog and account
        feedback.setBlog(existingBlog);
        feedback.setAccount(account);

        // Validate the feedback
        validateFeedback(feedback);

        // Set the feedback date
        feedback.setFeedbackDate(new Date());

        // Save the feedback
        return blogFeedBackRepository.save(feedback);
    }

    private void validateFeedback(BlogFeedBack feedback) {
        if (feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        if (feedback.getBlog() == null) {
            throw new IllegalArgumentException("Blog is required");
        }
        if (feedback.getAccount() == null) {
            throw new IllegalArgumentException("Account is required");
        }
        if (feedback.getFeedbackText() == null || feedback.getFeedbackText().trim().isEmpty()) {
            throw new IllegalArgumentException("Feedback text cannot be empty");
        }
    }

    @Override
    public Optional<BlogFeedBack> getFeedbackById(int feedbackId) {
        return blogFeedBackRepository.findById(feedbackId);
    }

    @Override
    public List<BlogFeedBack> getAllFeedbacksForBlog(int blogID) {
        return blogFeedBackRepository.findByBlogBlogID(blogID);
    }

    @Override
    public BlogFeedBack updateFeedback(BlogFeedBack feedback) {
        // Verify the feedback exists
        BlogFeedBack existingFeedback = blogFeedBackRepository.findById(feedback.getFeedbackID())
                .orElseThrow(
                        () -> new EntityNotFoundException("Feedback not found with ID: " + feedback.getFeedbackID()));

        // Validate account
        Account account = accountRepository.findById(feedback.getAccount().getAccountId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Account not found with ID: " + feedback.getAccount().getAccountId()));

        // Validate the feedback belongs to the account
        if (existingFeedback.getAccount().getAccountId() != account.getAccountId()) {
            throw new IllegalArgumentException("You can only update your own feedback");
        }

        // Validate feedback data
        if (feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        // Update the feedback
        existingFeedback.setFeedbackText(feedback.getFeedbackText());
        existingFeedback.setRating(feedback.getRating());
        existingFeedback.setFeedbackDate(new Date());

        return blogFeedBackRepository.save(existingFeedback);
    }

    @Override
    public void deleteFeedback(int feedbackId) {
        BlogFeedBack feedback = blogFeedBackRepository.findById(feedbackId)
                .orElseThrow(() -> new EntityNotFoundException("Feedback not found with ID: " + feedbackId));

        blogFeedBackRepository.deleteById(feedbackId);
    }
}
