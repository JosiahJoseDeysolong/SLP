import React from 'react';

const Card = ({ imageSrc, title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageSrc} alt={title} className="cardImage" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Card_format2 = ({ imageSrc, title, description, onClick }) => {
  return (
    <div className="card1" onClick={onClick}>
      <h3>{title}</h3>
      <img src={imageSrc} alt={title} className="cardImage" />
    </div>
  );
};

const CardContainer = ({ cards,format }) => {
  const handleClick = (index) => {
    // click hehe
    console.log(`Card ${index} clicked!`);
    // Example click handler action
  };


  return (
    <div>
      <div className="card-container">
        {cards.map((card, index) => (
            format === 0 ? (
                <Card
                  key={index}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleClick(index)}
                />
              ) : (
                <Card_format2
                  key={index}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  description={card.description}
                  onClick={() => handleClick(index)}
                />

              )
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
