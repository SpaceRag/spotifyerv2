import React, { useState } from "react";
import styles from "./userPlaylists.module.css";

const UserPlaylists = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [trackName, setTrackName] = useState("");
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      name: playlistName,
      tracks: [],
    };
    setPlaylists([...playlists, newPlaylist]);
    setPlaylistName("");
  };

  const handleTrackNameChange = (event) => {
    setTrackName(event.target.value);
  };

  const handleAddTrack = () => {
    if (trackName) {
      const updatedPlaylists = [...playlists];
      const currentPlaylist = updatedPlaylists[currentPlaylistIndex];
      currentPlaylist.tracks.push(trackName);
      setPlaylists(updatedPlaylists);
      setTrackName("");
    }
  };

  const handlePlaylistChange = (index) => {
    setCurrentPlaylistIndex(index);
  };

  return (
    <div className={styles.userPlaylistsContainer}>
      <h2>User Playlists</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={handlePlaylistNameChange}
          className={styles.playlistInput}
        />
        <button onClick={handleCreatePlaylist} className={styles.createButton}>
          Create Playlist
        </button>
      </div>
      <div className={styles.playlistSelection}>
        <h3>Playlists:</h3>
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className={`${styles.playlistOption} ${
              index === currentPlaylistIndex ? styles.active : ""
            }`}
            onClick={() => handlePlaylistChange(index)}
          >
            {playlist.name}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Track Name"
          value={trackName}
          onChange={handleTrackNameChange}
          className={styles.trackInput}
        />
        <button onClick={handleAddTrack} className={styles.createButton}>
          Add
        </button>
      </div>
      <div className={styles.playlist}>
        <h3>Current Playlist: {playlists[currentPlaylistIndex]?.name}</h3>
        <ul>
          {playlists[currentPlaylistIndex]?.tracks.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPlaylists;
