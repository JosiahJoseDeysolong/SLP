import React from 'react';
import BottomDetails from './components/Bottom-Details';
import CardContainer from './components/CardContainer';
import './components/Articles.css';
import img1 from './components/images/home_image1.png';
import img2 from './components/images/home_image2.png';
import img3 from './components/images/home_image3.png';

const Articles = () => {
  const cards = [
    {
      imageSrc: img1,
      title: 'Article n',
      description: 'This is the description of Card 1.',
    },
    {
      imageSrc: img2,
      title: 'Article n',
      description: 'This is the description of Card 2.',
    },
    {
      imageSrc: img3,
      title: 'Article n',
      description: 'This is the description of Card 3.',
    },

    // Add more cards as needed
  ];



  return (

    <div>
      <h1 className="aaa">Articles</h1>
      <hr />

      <div>

        <CardContainer cards={cards} format={0} />
        <CardContainer cards={cards} format={0} />
        <CardContainer cards={cards} format={0} />
      </div>

      <div className="bottom_details">
        <BottomDetails />
      </div>
    </div>

  );

};

export default Articles;
