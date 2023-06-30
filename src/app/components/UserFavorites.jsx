import styles from "./userFavorites.module.css";

export default function UserFavorites({ favoriteTracks }) {
  console.log("UserFavorite got it:", favoriteTracks);

  return (
    <div className={styles.userFavoritesContainer}>
      <h2>User Favorites</h2>
      <ul className={styles.favoritesList}>
        {favoriteTracks.map((track, index) => (
          <li key={index} className={styles.favoriteItem}>
            <p>Name: {track.name}</p>
            <p>Album: {track.album.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
