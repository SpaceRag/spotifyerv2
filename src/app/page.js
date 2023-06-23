"use client"
import { useEffect, useState } from 'react';
import { getTopArtists, getTopPlaylists } from './pages/api';

export default function Home() {
  const [topArtists, setTopArtists] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const artists = await getTopArtists();
      const playlists = await getTopPlaylists();

      setTopArtists(artists);
      setTopPlaylists(playlists);

      console.log(artists);
      console.log(playlists);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Top Artists</h1>
      <ul>
        {topArtists && topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>

      <h1>Top Playlists</h1>
      <ul>
        {topPlaylists && topPlaylists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}
