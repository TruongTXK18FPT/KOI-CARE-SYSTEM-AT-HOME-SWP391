import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BlogGrid.css';

const BlogGrid = ({ blogs }) => {
  const navigate = useNavigate();

  const handleReadMore = (blogID) => {
    navigate(`/blog/${blogID}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <div key={blog.blogID} className="blog-post">
          <img src={blog.blogImage} alt={blog.title} className="blog-image" />
          <div className="blog-content">
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
            <div className="blog-meta">
              <span className="blog-author">{blog.author}</span>
              <span className="blog-date">{formatDate(blog.createdDate)}</span>
            </div>
            <button className="read-more-button" onClick={() => handleReadMore(blog.blogID)}>
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;