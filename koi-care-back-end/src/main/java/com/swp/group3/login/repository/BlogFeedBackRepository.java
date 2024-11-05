package com.swp.group3.login.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swp.group3.login.pojo.BlogFeedBack;

@Repository
public interface BlogFeedBackRepository extends JpaRepository<BlogFeedBack, Integer> {
    List<BlogFeedBack> findByBlogBlogID(int blogID);
}
