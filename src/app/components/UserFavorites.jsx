import styles from "./userFavorites.module.css";

export default function UserFavorites({ favoriteTracks }) {
  // console.log("UserFavorite got it:", favoriteTracks);

  return (
    <div className={styles.userFavoritesContainer}>
      <h2>User Favorites</h2>
      <ul className={styles.favoritesList}>
        {favoriteTracks.map((track, index) => (
          <li key={index} className={styles.favoriteItem}>
            <div className={styles.albumImage}>
              <img src={track.album.images[0].url} alt="Album" />
            </div>
            <div className={styles.trackDetails}>
              <p>Artist: {track.artists[0].name}</p>
              <p>Name: {track.name}</p>
              <p>Album: {track.album.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
