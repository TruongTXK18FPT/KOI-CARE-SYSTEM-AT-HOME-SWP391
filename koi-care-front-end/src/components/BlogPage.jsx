import React from 'react';
import BlogGrid from './BlogGrid'; // Ensure this component is correctly imported
import '../styles/BlogPage.css'; // Import the CSS file
import SearchBar from './SearchBar';


const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      title: 'Welcome to my website',
      content: 'This is the first blog post on my website...',
      author: 'John Doe',
      authorImage: require('../assets/author.jpeg'), // Ensure this image exists
      blogImage: require('../assets/slide1.jpg'), // Ensure this image exists
      createdDate: 'January 1, 2023',
      description: 'This is the first blog post on my website...',
    },
    {
      id: 2,
      title: 'Koi Care system at home',
      content: 'Overview of Koi Care system...',
      author: 'Jane',
      authorImage: require('../assets/author1.jpeg'), // Ensure this image exists
      blogImage: require('../assets/LogoWeb.jpg'), // Ensure this image exists
      createdDate: 'February 15, 2023',
      description: 'Overview of Koi Care system...',
    },
    {
      id: 3,
      title: 'How to use the calculator',
      content: 'Step-by-step guide to using the calculator...',
      author: 'Alice',
      authorImage: require('../assets/author2.jpg'), // Ensure this image exists
      blogImage: require('../assets/calcu.jpg'), // Ensure this image exists
      createdDate: 'March 30, 2023',
      description: 'Step-by-step guide to using the calculator...',
    },
    {
      id: 4,
      title: 'How to create an account',
      content: 'Instructions on creating an account...',
      author: 'Jack',
      authorImage: require('../assets/author3.jpg'), // Ensure this image exists
      blogImage: require('../assets/AccountIcon.jpg'), // Ensure this image exists
      createdDate: 'April 10, 2023',
      description: 'Instructions on creating an account...',
    },
    {
      id: 5,
      title: 'Receiving email notifications',
      content: 'Setting up email notifications...',
      author: 'MaiKa',
      authorImage: require('../assets/author4.jpg'), // Ensure this image exists
      blogImage: require('../assets/email.png'), // Ensure this image exists
      createdDate: 'May 20, 2023',
      description: 'Setting up email notifications...',
    },
    {
      id: 6,
      title: 'How to manage koi in the pond',
      content: 'Exploring the pond feature...',
      author: 'Maika',
      authorImage: require('../assets/author4.jpg'), // Ensure this image exists
      blogImage: require('../assets/blog6.jpeg'), // Ensure this image exists
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

  return (
    <div className="blog-page">
      <SearchBar/>
      <BlogGrid blogs={blogs} />
    </div>
  );
};

export default BlogPage;