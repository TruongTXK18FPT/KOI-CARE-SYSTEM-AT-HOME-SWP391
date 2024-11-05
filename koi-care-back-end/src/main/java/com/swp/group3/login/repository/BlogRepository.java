package com.swp.group3.login.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.swp.group3.login.pojo.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {

    Page<Blog> findAll(Pageable pageable);

    Optional<Blog> findByBlogID(int blogID);

    List<Blog> findByAuthorAccountId(int accountId);

}
