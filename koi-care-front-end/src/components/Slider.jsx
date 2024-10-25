import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Slider.css'; // Import the CSS file
import Slide1 from '../assets/slide1.jpg'; // Import slide images
import Slide2 from '../assets/slide2.jpg';
import Slide3 from '../assets/slide3.jpg';
import Slide4 from '../assets/slide4.jpg';
import Slide5 from '../assets/slide5.jpg';

const Slider = () => {
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [nextSlide]);

  return (
    <div className="slider">
      <button className="slider-button prev" onClick={prevSlide}>
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <img key={index} src={slide} alt={`Slide ${index + 1}`} className="slide-image" />
        ))}
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
    </div>
  );
};

export default Slider;





