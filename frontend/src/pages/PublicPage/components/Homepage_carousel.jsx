import React, { useState, useEffect } from 'react';
import './Home.css';

const Carousel = ({ cards, autoSwitchTime }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, autoSwitchTime);

    return () => clearInterval(interval);
  }, [cards.length, autoSwitchTime]);



  return (
    <div className="carousel">
      <div className="carousel_card">{cards[currentIndex]}</div>
      
    </div>
  );

 
};

export default Carousel;
