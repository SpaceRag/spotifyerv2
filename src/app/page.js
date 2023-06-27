'use client'
import React, { useState } from "react";
import FeaturedPlaylistsCard from "./components/FeaturedPlaylistsCard";
import CategoryPlaylistsCard from "./components/CategoryPlaylistsCard";
import ArtistSearch from "./components/ArtistSearch";
import NavBar from "./components/NavBar";
import { AccessTokenProvider } from "./pages/AccessTokenProvider";
import ArtistDetails from "./components/ArtistDetails";

export default function Home() {
  const accessToken = localStorage.getItem("accessToken");
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <AccessTokenProvider>
      <div>
        <NavBar />
      </div>
      <div>
        <ArtistSearch accessToken={accessToken} setSelectedArtist={setSelectedArtist} />
      </div>
      <div>
        <ArtistDetails artist={selectedArtist} />
      </div>
      <div>
        <h1>Featured Playlists</h1>
        <FeaturedPlaylistsCard accessToken={accessToken} />
      </div>
      <div>
        <h1>Category</h1>
        <CategoryPlaylistsCard accessToken={accessToken} />
      </div>
    </AccessTokenProvider>
  );
}
