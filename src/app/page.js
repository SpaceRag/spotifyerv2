'use client'
import React, { useEffect, useState } from 'react';
import { getTopArtists, getTopPlaylists } from './pages/api';
import FeaturedPlaylistsCard from './components/FeaturedPlaylistsCard';
import CategoryPlaylistsCard from './components/CategoryPlaylistsCard';
import NavBar from './components/NavBar';

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
      <>
      <NavBar />
      </>
      <h1>Featured Playlists</h1>
      <FeaturedPlaylistsCard />
      <>
      <h1>Top Artists</h1>
      <CategoryPlaylistsCard />
      </>
    </div>
  );
}
