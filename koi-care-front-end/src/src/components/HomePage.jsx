/*import React from 'react';
import BlogGrid from './BlogGrid'; // Ensure this component is correctly imported
import Slider from './Slider'; // Import the Slider component
import Footer from './Footer'; // Import the Footer component
import '../styles/HomePage.css'; // Import the CSS file

const HomePage = () => {
  const blogs = [
    {
      id: 1,
      title: 'Welcome to my website',
      summary: 'This is the first blog post on my website...',
      image: require('../assets/slide1.jpg'), // Ensure this image exists
      author: 'John Doe',
      authorImage: require('../assets/author.jpeg'), // Ensure this image exists
      date: 'January 1, 2023',
    },
    {
      id: 2,
      title: 'Koi Care system at home',
      summary: 'Overview of Koi Care system...',
      image: require('../assets/LogoWeb.jpg'), // Ensure this image exists
      author: 'Jane',
      authorImage: require('../assets/author1.jpeg'), // Ensure this image exists
      date: 'February 15, 2023',
    },
    {
      id: 3,
      title: 'How to use the calculator',
      summary: 'Step-by-step guide to using the calculator...',
      image: require('../assets/calcu.jpg'), // Ensure this image exists
      author: 'Alice',
      authorImage: require('../assets/author2.jpg'), // Ensure this image exists
      date: 'March 30, 2023',
    },
    {
      id: 4,
      title: 'How to create an account',
      summary: 'Instructions on creating an account...',
      image: require('../assets/AccountIcon.jpg'), // Ensure this image exists
      author: 'Jack',
      authorImage: require('../assets/author3.jpg'), // Ensure this image exists
      date: 'April 10, 2023',
    },
    {
      id: 5,
      title: 'Receiving email notifications',
      summary: 'Setting up email notifications...',
      image: require('../assets/email.png'), // Ensure this image exists
      author: 'J97',
      authorImage: require('../assets/author4.jpg'), // Ensure this image exists
      date: 'May 20, 2023',
    },
    {
      id: 6,
      title: 'How to manage koi in the pond',
      summary: 'Exploring the pond feature...',
      image: require('../assets/blog6.jpeg'), // Ensure this image exists
      author: 'J97',
      authorImage: require('../assets/author4.jpg'), // Ensure this image exists
      date: 'June 30, 2023',
    }
  ];

  return (
    <div className="home-container">
      <Slider />
      <BlogGrid blogs={blogs} />
      <Footer />
    </div>
  );
};

export default HomePage;*/
import React, { useEffect, useState } from 'react';
import BlogGrid from './BlogGrid'; // Ensure this component is correctly imported
import Slider from './Slider'; // Import the Slider component
import Footer from './Footer'; // Import the Footer component
import '../styles/HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userFullName');
    if (storedName) {
      setFullName(storedName);
    }
  }, []);

  const blogs = [
    {
      id: 1,
      title: 'Welcome to my website',
      content: 'This is the first blog post on my website...',
      author: 'John Doe',
      blogImage: require('../assets/slide1.jpg'), // Ensure this image exists
      authorImage: require('../assets/author.jpeg'), // Ensure this image exists
      createdDate: 'January 1, 2023',
      description: 'This is the first blog post on my website...',
    },
    {
      id: 2,
      title: 'Koi Care system at home',
      content: 'Overview of Koi Care system...',
      author: 'Jane',
      blogImage: require('../assets/LogoWeb.jpg'), // Ensure this image exists
      authorImage: require('../assets/author1.jpeg'), // Ensure this image exists
      createdDate: 'February 15, 2023',
      description: 'Overview of Koi Care system...',
    },
    {
      id: 3,
      title: 'How to use the calculator',
      content: 'Step-by-step guide to using the calculator...',
      author: 'Alice',
      blogImage: require('../assets/calcu.jpg'), // Ensure this image exists
      authorImage: require('../assets/author2.jpg'), // Ensure this image exists
      createdDate: 'March 30, 2023',
      description: 'Step-by-step guide to using the calculator...',
    },
    {
      id: 4,
      title: 'How to create an account',
      content: 'Instructions on creating an account...',
      author: 'Jack',
      blogImage: require('../assets/AccountIcon.jpg'), // Ensure this image exists
      authorImage: require('../assets/author3.jpg'), // Ensure this image exists
      createdDate: 'April 10, 2023',
      description: 'Instructions on creating an account...',
    },
    {
      id: 5,
      title: 'Receiving email notifications',
      content: 'Setting up email notifications...',
      author: 'MaiKa',
      blogImage: require('../assets/email.png'), // Ensure this image exists
      authorImage: require('../assets/author4.jpg'), // Ensure this image exists
      createdDate: 'May 20, 2023',
      description: 'Setting up email notifications...',
    },
    {
      id: 6,
      title: 'How to manage koi in the pond',
      content: 'Exploring the pond feature...',
      author: 'Maika',
      blogImage: require('../assets/blog6.jpeg'), // Ensure this image exists
      authorImage: require('../assets/author4.jpg'), // Ensure this image exists
      createdDate: 'June 30, 2023',
      description: 'Exploring the pond feature...',
    },
    {
      id: 7,
      title: 'How to control salt levels',
      content: 'Salt levels in the pond...',
      author: 'Maika',
      blogImage: require('../assets/blog7.jpeg'), // Ensure this image exists
      authorImage: require('../assets/author4.jpg'), // Ensure this image exists
      createdDate: 'June 30, 2024',
      description: 'Salt levels in the pond...',
    }
  ];

  // Extract the latest blog

  return (
    <div className="home-container">
      <h1>Welcome, {fullName || 'Guest'}</h1>
      <Slider />
      <BlogGrid blogs={blogs} />
      <Footer />
    </div>
  );
};

export default HomePage;







