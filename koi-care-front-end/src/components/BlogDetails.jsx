import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogDetails.css'; // Import custom styles

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blogs/details/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError('Failed to fetch blog details. Please try again later.');
      }
    };
    fetchBlog();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-details-container">
      <h1 className="blog-details-title">{blog.title}</h1>
      <img src={blog.blogImage} alt={blog.title} className="blog-details-image" />
      <div className="blog-details-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <div className="author-info">
        <img src={blog.authorImage} alt={blog.author} className="author-image" />
        <p className="author-name">{blog.author}</p>
      </div>
    </div>
  );
};

export default BlogDetails;