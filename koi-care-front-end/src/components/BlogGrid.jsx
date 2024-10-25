import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BlogGrid.css';

const BlogGrid = ({ blogs }) => {
  const navigate = useNavigate();

  const handleReadMore = (blogID) => {
    navigate(`/blog/${blogID}`);
  };

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <div key={blog.blogID} className="blog-post">
          <img src={blog.blogImage} alt={blog.title} className="blog-image" />
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <div className="author-info">
            <img src={blog.authorImage} alt={blog.author} className="author-image" />
            <p>{blog.author}</p>
          </div>
          <p className="created-date">{blog.createdDate}</p>
          <button className="read-more-button" onClick={() => handleReadMore(blog.blogID)}>
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;


