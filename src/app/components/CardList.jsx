import React from 'react';
import Card from './Card';

const CardList = ({ data }) => {
  return (
    <div className="card-container">
      {data.map(item => (
        <Card
          key={item.id}
          title={item.name}
          image={item.images && item.images.url} // Vérification de nullité
        />
      ))}
    </div>
  );
};

export default CardList;
