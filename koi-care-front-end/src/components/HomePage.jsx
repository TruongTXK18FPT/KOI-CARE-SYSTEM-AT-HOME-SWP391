import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from './Slider'; // Import the Slider component
import Footer from './Footer'; // Import the Footer component
import BlogGrid from './BlogGrid'; // Import the BlogGrid component
import '../styles/HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [fullName, setFullName] = useState('');
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('userFullName');
    if (storedName) {
      setFullName(storedName);
    }

    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/blogs/getAll', {
          params: { sort: 'createdDate', limit: 5 }
        });
        setLatestBlogs(response.data.content.slice(0, 5)); // Assuming response.data.content contains the blogs
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <div className="home-container">
      <div className="home-welcome-message">
        <h2>Welcome, {fullName || 'Guest'}</h2>
        <p>Explore our latest blogs and updates</p>
      </div>
      <Slider />
      <div className="latest-blogs">
        <h3>Latest Blogs</h3>
        <BlogGrid blogs={latestBlogs} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;







