import React from 'react';

const Card = ({ title, image }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
