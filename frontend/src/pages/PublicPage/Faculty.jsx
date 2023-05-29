import React from 'react';
import CardContainer from './components/CardContainer';
import BottomDetails from './components/Bottom-Details';
import ProjectsNavbar from './components/ProjectsNavbar';

import './components/Projects.css';

// the images
// add a new folder for the images later
import img1 from './components/images/home_image1.png';
import img2 from './components/images/home_image2.png';
import img3 from './components/images/home_image3.png';
import arrow from './components/images/arrow.png';


const Faculty = () => {

  const cards = [
    {
      imageSrc: img1,
      title: 'Person 1',
      description: 'test-email@xu.edu.ph',
    },
    {
      imageSrc: img2,
      title: 'Person 2',
      description: 'test-email@xu.edu.ph',
    },
    {
      imageSrc: img3,
      title: 'Person 3',
      description: 'test-email@xu.edu.ph',
    },

    // Add more cards as needed
  ];



  return (
    <div>
     <ProjectsNavbar />
     <div className="generalContainer">
      <div className="Row">
        <h2>College of Agriculture</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {0} />
    </div>

    <div className="generalContainer">
      <div className="Row">
        <h2>College of Arts and Sciences</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {0} />
    </div>

    <div className="generalContainer">
      <div className="Row">
        <h2>College of Computer Studies</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {0} />
    </div>

    <div className="generalContainer">
      <div className="Row">
        <h2>College of Engineering</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {0} />
    </div>

     <div className="generalContainer">
      <div className="Row">
        <h2>College of Nursing</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {0} />
    </div>

    <div className="generalContainer">
      <div className="Row">
        <h2>School of Bussiness and Management</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {0} />
    </div>
 
    <div className="generalContainer">
      <div className="Row">
        <h2>School of Education</h2>
        <button className="button_white">see all...</button>
      </div>
      <CardContainer cards={cards} format = {0} />
    </div>
      <hr />

    <div className="bottom_details">
      <BottomDetails />
    </div>
    </div>
  );

};

export default Faculty;
