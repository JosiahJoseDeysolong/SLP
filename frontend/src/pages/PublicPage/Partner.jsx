import React from 'react';

import ProjectsNavbar from './components/ProjectsNavbar';
import BottomDetails from './components/Bottom-Details';
import CardContainer from './components/CardContainer';

import './components/Articles.css';

import img1 from './components/images/home_image1.png';
import img2 from './components/images/home_image2.png';
import img3 from './components/images/home_image3.png';



const Partner = () => {
  const cards = [
    {
      imageSrc: img1,
      title: 'Partner n',
      description: 'This is the description of Card 1.',
    },
    {
      imageSrc: img2,
      title: 'Partner n',
      description: 'This is the description of Card 2.',
    },
    
    // Add more cards as needed
  ];



  return (
    <div>
      <ProjectsNavbar />
      <h1 className="aaa">Partner</h1>
      <hr />

      <div className="partner">
        
      <CardContainer className="partner_card" cards={cards} format = {0} />
      <CardContainer className="partner_card" cards={cards} format = {0} />
      </div>

      <div className="bottom_details">
        <BottomDetails />
      </div>
    </div>
  );
};

export default Partner;
