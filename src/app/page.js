"use client"
import { useEffect, useState } from 'react';
import { getTopArtists, getTopPlaylists } from './pages/api';
import CardList from './components/CardList';

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

      <h1>Artist Top Traks</h1>
      <CardList data={topArtists} />

      <h1>Top Playlists</h1>
      <CardList data={topPlaylists} />
    </div>
  );
}
