import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import styles from "./featuredPlaylistsCard.module.css";

const ArtistSearch = ({ accessToken }) => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchTerm
        )}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const foundArtists = data.artists.items;
        setArtists(foundArtists);
      } else {
        console.log("Erreur lors de la recherche d'artistes");
      }
    } catch (error) {
      console.log("Une erreur s'est produite lors de la recherche d'artistes", error);
    } finally {
      setIsLoading(false);
    }
  };

  const responsiveSettings = [
    { breakpoint: "1024px", numVisible: 4 },
    { breakpoint: "768px", numVisible: 2 },
    { breakpoint: "560px", numVisible: 1 },
  ];

  return (
    <div className={styles.featuredPlaylists}>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(e.target.elements.searchTerm.value); }}>
        <input type="text" name="searchTerm" placeholder="Search for an artist" />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Carousel
          previconclassname="p-carousel-prev-icon"
          nexticonclassname="p-carousel-next-icon"
          value={artists}
          numVisible={4}
          numScroll={1}
          responsive={responsiveSettings}
          itemTemplate={(artist) => (
            <div key={artist.id} className={styles.playlistCard}>
              <img
                src={artist.images[0]?.url || "placeholder-image-url"}
                alt={artist.name}
                className={styles.playlistImage}
              />
              <h3 className={styles.playlistTitle}>{artist.name}</h3>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ArtistSearch;
