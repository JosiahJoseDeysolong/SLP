import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Carousel from './components/Homepage_carousel';
import BottomDetails from './components/Bottom-Details';
import CardContainer from './components/CardContainer';

import './components/Home.css'

// the images
// add a new folder for the images later
import img1 from './components/images/home_image1.png';
import img2 from './components/images/home_image2.png';
import img3 from './components/images/home_image3.png';
import arrow from './components/images/arrow.png';


const Home = () => {

    
  const cards = [
    <img src={img1} alt="Image 1" className="homeImages" />,
    <img src={img2} alt="Image 2" className="homeImages" />,
    <img src={img3} alt="Image 3" className="homeImages" />,
  ];

  const articles_cards = [
    {
      imageSrc: img1,
      title: 'Article 1',
      description: 'This is the description of Article 1.',
    },
    {
      imageSrc: img2,
      title: 'Article 2',
      description: 'This is the description of Article 2.',
    },
    {
      imageSrc: img3,
      title: 'Article 3',
      description: 'This is the description of Article 3.',
    },

    {
      imageSrc: arrow,
      title: 'See All',
      description: 'Click here to see all Articles.',
    },
    // Add more cards as needed
  ];

  const projects_cards = [
    {
      imageSrc: img1,
      title: 'Project 1',
      description: 'This is the description of Project 1.',
    },
    {
      imageSrc: img2,
      title: 'Project 2',
      description: 'This is the description of Project 2.',
    },
    {
      imageSrc: img3,
      title: 'Project 3',
      description: 'This is the description of Project 3.',
    },

    {
      imageSrc: arrow,
      title: 'See All',
      description: 'Click here to see all Projects.',
    },
    // Add more cards as needed
  ];
  return (
    <div className="center-this-div">
      <div className="carousel">
        <Carousel cards={cards} autoSwitchTime={3000} className="carouselA" />
      </div>
      <div className="generalContainer">
        <div className="Row">
          <h2>Articles</h2>

          <Link to="/articles" className="button_white">
            <button className="button_white">see all...</button>
          </Link>

        </div>
        <CardContainer cards={articles_cards} format = {0} />
      </div>
      <div className="generalContainer">
        <div className="Row">
          <h2>Projects</h2>

          <Link to="/projects" className="button_white">
            <button className="button_white">see all...</button>
          </Link>

        </div>
      <CardContainer cards={projects_cards} format = {0} />
      </div>
      <div className="bottom_details">
        <BottomDetails />
      </div>
    </div>
  );
};

export default Home;
