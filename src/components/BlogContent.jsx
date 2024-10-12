import React from 'react';
import FeedbackBar from './FeedbackBar'; // Import the FeedbackBar component
import '../styles/BlogContent.css'; // Import the CSS file for styling

const BlogContent = ({ blog }) => {
  return (
    <div className="blog-content">
      <h1 className="blog-title">{blog.title}</h1>
      <img src={blog.blogImage} alt={blog.title} className="blog-image" />
      <div className="blog-body">
        <p>{blog.content}</p>
      </div>
      <FeedbackBar /> {/* Use the FeedbackBar component */}
    </div>
  );
};

export default BlogContent;