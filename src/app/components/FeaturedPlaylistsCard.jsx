import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import styles from "./featuredPlaylistsCard.module.css";

const FeaturedPlaylistsCard = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  useEffect(() => {
    async function fetchFeaturedPlaylists() {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists?limit=10",
          {
            headers: {
              Authorization:
                "Bearer BQBoMRumO11mjpcUc2njs_8CKhsLoXdUWMU-SG6rJna2hI3H_sZTgZJdrRb1RPyq4pUwS-LDkNlyB8NVrIp905w854M0KfYRcoi2f3SzAVAJrKdAU8Q",
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
      }
    }

    fetchFeaturedPlaylists();
  }, []);

  const responsiveSettings = [
    { breakpoint: "1024px", numVisible: 4 },
    { breakpoint: "768px", numVisible: 2 },
    { breakpoint: "560px", numVisible: 1 },
  ];

  return (
    <div className={styles.featuredPlaylists}>
      <Carousel
        prevIconClassName="p-carousel-prev-icon"
        nextIconClassName="p-carousel-next-icon"
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
