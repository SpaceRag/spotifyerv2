import React, { useEffect, useState } from "react";
import styles from "./artistDetails.module.css";

const ArtistDetails = ({ artistId, accessToken, onClose }) => {
  const [artistDetails, setArtistDetails] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const artistResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (artistResponse.ok) {
          const artistData = await artistResponse.json();
          setArtistDetails(artistData);
          console.log(artistData);
        } else {
          console.log(
            "Erreur lors de la récupération des détails de l'artiste"
          );
        }

        const topTracksResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (topTracksResponse.ok) {
          const topTracksData = await topTracksResponse.json();
          setTopTracks(topTracksData.tracks);
          console.log(topTracksData);
        } else {
          console.log(
            "Erreur lors de la récupération des top tracks de l'artiste"
          );
        }

        const relatedArtistsResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (relatedArtistsResponse.ok) {
          const relatedArtistsData = await relatedArtistsResponse.json();
          setRelatedArtists(relatedArtistsData.artists.slice(0, 2));
          console.log(relatedArtistsData);
        } else {
          console.log("Erreur lors de la récupération des artistes associés");
        }
      } catch (error) {
        console.log(
          "Une erreur s'est produite lors de la récupération des détails de l'artiste",
          error
        );
      }
    };

    if (artistId) {
      fetchArtistDetails();
    }
  }, [artistId, accessToken]);

  if (!artistDetails) {
    return null;
  }

  return (
    <div className={styles.artistDetailsContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        Fermer
      </button>
      <h2>{artistDetails.name}</h2>
      <div className={styles.artistInfo}>
        <div className={styles.artistImageContainer}>
          {artistDetails.images.length > 0 && (
            <img src={artistDetails.images[0].url} alt={artistDetails.name} />
          )}
          <div className={styles.relatedArtists}>
            <h3>Related Artists:</h3>
            <ul className={styles.relatedArtistList}>
              {relatedArtists.map((relatedArtist) => (
                <li key={relatedArtist.id} className={styles.relatedArtistItem}>
                  <div
                    className={`${styles.relatedArtistImageContainer} ${styles.artistImageContainer}`}
                  >
                    {relatedArtist.images.length > 0 && (
                      <img
                        src={relatedArtist.images[0].url}
                        alt={relatedArtist.name}
                      />
                    )}
                  </div>
                  <div className={styles.relatedArtistInfo}>
                    <span className={styles.relatedArtistName}>
                      {relatedArtist.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.artistTracks}>
          {artistDetails.genres.length > 0 && (
            <p>Genre: {artistDetails.genres.join(", ")}</p>
          )}
          <div className={styles.topTracks}>
            <h3>Top Tracks:</h3>
            <ul className={styles.trackList}>
              {topTracks.map((track) => (
                <li key={track.id} className={styles.trackItem}>
                  <div className={styles.trackImageContainer}>
                    {track.album.images.length > 0 && (
                      <img
                        src={track.album.images[0].url}
                        alt={track.album.name}
                      />
                    )}
                  </div>
                  <div className={styles.trackInfo}>
                    <span className={styles.trackName}>{track.name}</span>
                    <span className={styles.trackDuration}>
                      {formatDuration(track.duration_ms)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
