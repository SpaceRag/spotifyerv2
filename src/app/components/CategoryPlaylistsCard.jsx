import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import styles from "./featuredPlaylistsCard.module.css"

const CategoryPlaylistsCard = () => {
  const [categoryPlaylists, setCategoryPlaylists] = useState([]);

  useEffect(() => {
    async function fetchCategoryPlaylists() {
      try {
        const response = await fetch('https://api.spotify.com/v1/browse/categories/punk/playlists?country=FR&offset=0', {
          headers: {
            Authorization: 'Bearer BQBoMRumO11mjpcUc2njs_8CKhsLoXdUWMU-SG6rJna2hI3H_sZTgZJdrRb1RPyq4pUwS-LDkNlyB8NVrIp905w854M0KfYRcoi2f3SzAVAJrKdAU8Q'
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategoryPlaylists(data.playlists.items);
          console.log(data);
        } else {
          console.log('Une erreur s\'est produite lors de la récupération des playlists de la catégorie');
        }
      } catch (error) {
        console.log('Une erreur s\'est produite lors de la requête API', error);
      }
    }

    fetchCategoryPlaylists();
  }, []);

  const responsiveSettings = [
    { breakpoint: '1024px', numVisible: 6 },
    { breakpoint: '768px', numVisible: 2 },
    { breakpoint: '560px', numVisible: 1 },
  ];

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
