import React, { useState, useEffect } from 'react';

import CardContainer from './CardContainer';

import './Home.css'

// the only use for this is a template to copy/paste (at least for now)
const CardContainerNaKanangNaayCharChar = ({cards}) => {
  return (
      <div className="generalContainer">
        <div className="Row">
          <h2>ContainerName</h2>
          <button className="button_white">see all...</button>
        </div>
      <CardContainer cards={cards} />
      </div>
  );
};

export default CardContainerNaKanangNaayCharChar;

