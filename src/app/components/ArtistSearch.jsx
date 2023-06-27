import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import styles from "./artistSearch.module.css";
import { ProgressSpinner } from "primereact/progressspinner";

const ArtistSearch = ({ accessToken }) => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);

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
        const foundArtists = data.artists.items.filter(
          (artist) => artist.images[0] && artist.name
        );

        setArtists(foundArtists);
        setSearchTerm(searchTerm);
        console.log(foundArtists);
      } else {
        console.log("Erreur lors de la recherche d'artistes");
      }
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors de la recherche d'artistes",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const responsiveSettings = [
    { breakpoint: "1024px", numVisible: 5 },
    { breakpoint: "768px", numVisible: 2 },
    { breakpoint: "560px", numVisible: 1 },
  ];

  const handleArtistClick = (artistId) => {
    setSelectedArtist(artistId);
    console.log(selectedArtist);
  };

  if (isLoading) {
    return (
      <div className="flex align-items-center justify-content-center min-h-screen bg-black-alpha-90">
        <ProgressSpinner className="" animationDuration=".7s" />
      </div>
    );
  }

  return (
    <div className={styles.artistSearch}>
      <form
        className="searchForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e.target.elements.searchTerm.value);
        }}
      >
        <input
          className="searchInput"
          type="text"
          name="searchTerm"
          placeholder="Search for an artist"
        />
        <button className="searchButton" type="submit">
          Search
        </button>
      </form>
      <h1 className={styles.categoryTitle}>{searchTerm}</h1>

      {artists.length > 0 && (
        <Carousel
          previconclassname="p-carousel-prev-icon"
          nexticonclassname="p-carousel-next-icon"
          value={artists}
          numVisible={5}
          numScroll={1}
          responsive={responsiveSettings}
          itemTemplate={(artist) => (
            <div
              key={artist.id}
              className={styles.artistCard}
              onClick={() => handleArtistClick(artist.id)}
            >
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className={styles.artistImage}
              />
              <h3 className={styles.artistTitle}>{artist.name}</h3>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ArtistSearch;
