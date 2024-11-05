import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogGrid from './BlogGrid';
import '../styles/BlogPage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title'); // Default sort option to a valid property
  const navigate = useNavigate();

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/blogs/getAll', {
        params: { sort: sortOption }
      });
      setBlogs(response.data.content);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  }, [sortOption]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleNewBlog = () => {
    const userRole = localStorage.getItem('userRole') || 'guest'; // logic to check if user is logged in
    if (userRole === 'guest') {
      alert('Please login to write a blog');
      navigate('/login');
    } else {
      navigate('/blog-content');
    }
  };

  const filteredBlogs = blogs
    .filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'createdDate') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      return 0;
    });

  return (
    <div className="blog-page">
      <h1 className="blog-page-title">Blog Page</h1>
      <div className="blog-page-controls">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="blog-page-search"
        />
        <button onClick={() => {}} className="blog-page-search-button">Search</button>
        <div className="blog-page-sort">
          <label>Sort by: </label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="title">Title</option>
            <option value="createdDate">Created Date</option>
          </select>
        </div>
        <button onClick={handleNewBlog} className="blog-page-new-button">+ New Blog</button>
      </div>
      <BlogGrid blogs={filteredBlogs} />
    </div>
  );
};

export default BlogPage;