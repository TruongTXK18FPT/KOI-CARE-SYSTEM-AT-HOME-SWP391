import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import '../styles/BlogContent.css'; // Import custom styles

const BlogContent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorID, setAuthorID] = useState(localStorage.getItem('accountId') || '');
  const [blogImage, setBlogImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { title, content, authorID, blogImage, description };
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      console.error('No auth token found');
      return;
    }
  
    try {
      await axios.post('http://localhost:8080/api/blogs/create', newBlog, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      navigate('/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-content-form">
      <h1>Write a New Blog</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="blog-content-input"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        placeholder="Write your content here..."
        className="blog-content-editor"
      />
      <input
        type="text"
        placeholder="Blog Image URL"
        value={blogImage}
        onChange={(e) => setBlogImage(e.target.value)}
        className="blog-content-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="blog-content-textarea"
      />
      <button type="submit" className="blog-content-submit">Submit</button>
    </form>
  );
};

export default BlogContent;