import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import styles from "./categoryPlaylistsCard.module.css";

import { ProgressSpinner } from 'primereact/progressspinner';
 

const CategoryPlaylistsCard = ({ accessToken }) => {
  const [categoryPlaylists, setCategoryPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryPlaylists() {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/categories/punk/playlists?country=FR&offset=0",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCategoryPlaylists(data.playlists.items);
          console.log(data);
        } else {
          console.log(
            "Une erreur s'est produite lors de la récupération des playlists de la catégorie"
          );
        }
      } catch (error) {
        console.log("Une erreur s'est produite lors de la requête API", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryPlaylists();
  }, [accessToken]);

  const responsiveSettings = [
    { breakpoint: "1024px", numVisible: 6 },
    { breakpoint: "768px", numVisible: 2 },
    { breakpoint: "560px", numVisible: 1 },
  ];

    if (isLoading) {
      return (
          <div className='flex align-items-center justify-content-center min-h-screen bg-black-alpha-90'>
              <ProgressSpinner className='' animationDuration=".7s" />
          </div>
      );
  }

  return (
    <div className={styles.categoryPlaylists}>
      <h2 className={styles.categoryTitle}>Punk Playlists</h2>
      <Carousel
        value={categoryPlaylists}
        numVisible={6}
        numScroll={1}
        responsive={responsiveSettings}
        itemTemplate={(playlist) => (
          <div key={playlist.id} className={styles.playlistCard}>
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className={styles.playlistImage}
            />
            <h3 className={styles.playlistTitle}>{playlist.name}</h3>
          </div>
        )}
      />
    </div>
  );
};

export default CategoryPlaylistsCard;
