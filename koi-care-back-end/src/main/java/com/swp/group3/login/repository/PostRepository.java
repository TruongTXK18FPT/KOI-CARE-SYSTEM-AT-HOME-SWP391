package com.swp.group3.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swp.group3.login.pojo.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

}
