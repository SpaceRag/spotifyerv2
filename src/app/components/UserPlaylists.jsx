import React, { useState, useEffect } from "react";
import styles from "./userPlaylists.module.css";

export default function UserPlaylists() {
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("");

  useEffect(() => {
    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      setPlaylists(JSON.parse(storedPlaylists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

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

  // const handleAddTrack = () => {
  //   if (selectedPlaylist && selectedTrack) {
  //     const updatedPlaylists = playlists.map((playlist) => {
  //       if (playlist === selectedPlaylist) {
  //         const updatedTracks = [...playlist.tracks, selectedTrack];
  //         return { ...playlist, tracks: updatedTracks };
  //       }
  //       return playlist;
  //     });
  //     setPlaylists(updatedPlaylists);
  //     setSelectedTrack(null);
  //   }
  // };

  const handleDeletePlaylist = (index) => {
    const updatedPlaylists = [...playlists];
    updatedPlaylists.splice(index, 1);
    setPlaylists(updatedPlaylists);
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

      {playlists.map((playlist, index) => (
        <div className={styles.playlist} key={index}>
          <div className={styles.playlistHeader}>
            <h3>Playlist: {playlist.name}</h3>
            <button
              onClick={() => handleDeletePlaylist(index)}
              className={styles.deleteButton}
            >
              Delete
            </button>

            {/* <div className={styles.addTrackContainer}>
            <input
              type="text"
              placeholder="Track Name"
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className={styles.trackInput}
            />
            <button onClick={handleAddTrack} className={styles.addTrackButton}>
              Add Track
            </button>
          </div> */}
          </div>
          <ul>
            {playlist.tracks.map((track, trackIndex) => (
              <li key={trackIndex}>{track}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
