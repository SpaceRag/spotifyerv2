'use client'
import React, { useEffect, useState } from 'react';
// import { getTopArtists, getTopPlaylists } from './pages/api';
import FeaturedPlaylistsCard from './components/FeaturedPlaylistsCard';
import CategoryPlaylistsCard from './components/CategoryPlaylistsCard';
import ArtistSearch from './components/ArtistSearch';
import NavBar from './components/NavBar';
import { AccessTokenProvider } from './pages/AccessTokenProvider';

export default function Home() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <AccessTokenProvider>
      <div>
        <NavBar /> <ArtistSearch accessToken={accessToken} />
        <h1>Featured Playlists</h1>
        <FeaturedPlaylistsCard accessToken={accessToken} />
        <h1>Category</h1>
        <CategoryPlaylistsCard accessToken={accessToken} />
      </div>
    </AccessTokenProvider>
  );
}