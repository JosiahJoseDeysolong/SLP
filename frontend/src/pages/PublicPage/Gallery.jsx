import React from 'react';
import CardContainer from './components/CardContainer';
import BottomDetails from './components/Bottom-Details';

import './components/Gallery.css'

// the images
// add a new folder for the images later
import img1 from './components/images/home_image1.png';
import img2 from './components/images/home_image2.png';
import img3 from './components/images/home_image3.png';
import arrow from './components/images/arrow.png';


const Gallery = () => {

  const cards = [
    {
      imageSrc: img1,
      title: 'Image',
      description: 'This is the description of Card 1.',
    },
    {
      imageSrc: img2,
      title: 'Image',
      description: 'This is the description of Card 2.',
    },
    {
      imageSrc: img3,
      title: 'Image',
      description: 'This is the description of Card 3.',
    },

    // Add more cards as needed
  ];



  return (
    <div className="generalContainer">
      <div className="Row">
        <h2>Gallery</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {1} />
      <CardContainer cards={cards} format = {1} />
      <CardContainer cards={cards} format = {1} />
      <hr />
      <BottomDetails />
    </div>
  );
};

export default Gallery;
