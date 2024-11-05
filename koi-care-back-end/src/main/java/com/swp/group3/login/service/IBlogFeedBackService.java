package com.swp.group3.login.service;

import java.util.List;
import java.util.Optional;

import com.swp.group3.login.pojo.BlogFeedBack;

public interface IBlogFeedBackService {
    BlogFeedBack createFeedback(BlogFeedBack feedback, Integer accountId);

    Optional<BlogFeedBack> getFeedbackById(int feedbackId);

    List<BlogFeedBack> getAllFeedbacksForBlog(int blogID);

    BlogFeedBack updateFeedback(BlogFeedBack feedback);

    void deleteFeedback(int feedbackId);

}
