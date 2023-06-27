import React from "react";

const ArtistDetails = ({ artist }) => {
  if (!artist) {
    return null; 
  }

  return (
    <div>
      <h2>{artist.name}</h2>
      {artist.images.length > 0 && (
        <img src={artist.images[0].url} alt={artist.name} />
      )}
      <p>Genre: {artist.genre}</p>
      <p>Popularité: {artist.popularity}</p>
      {/* Afficher d'autres informations sur l'artiste ici */}
    </div>
  );
};

export default ArtistDetails;
