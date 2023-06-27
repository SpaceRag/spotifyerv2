import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import styles from "./featuredPlaylistsCard.module.css";

const FeaturedPlaylistsCard = ({ accessToken }) => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPlaylists() {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists?limit=10",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFeaturedPlaylists(data.playlists.items);
        } else {
          console.log(
            "Une erreur s'est produite lors de la récupération des playlists en vedette"
          );
        }
      } catch (error) {
        console.log("Une erreur s'est produite lors de la requête API", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedPlaylists();
  }, [accessToken]);

  const responsiveSettings = [
    { breakpoint: "1024px", numVisible: 4 },
    { breakpoint: "768px", numVisible: 2 },
    { breakpoint: "560px", numVisible: 1 },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.featuredPlaylists}>
      <Carousel
        previconclassname="p-carousel-prev-icon"
        nexticonclassname="p-carousel-next-icon"
        value={featuredPlaylists}
        numVisible={4}
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

export default FeaturedPlaylistsCard;
