"use client"
import React, { useState } from "react";
import { AccessTokenProvider } from "./pages/AccessTokenProvider";
import NavBar from "./components/NavBar";
import UserPlaylists from "./components/UserPlaylists";
import ArtistDetails from "./components/ArtistDetails";
import UserFavorites from "./components/UserFavorites";
import ArtistSearch from "./components/ArtistSearch";
import FeaturedPlaylistsCard from "./components/FeaturedPlaylistsCard";
import CategoryPlaylistsCard from "./components/CategoryPlaylistsCard";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [accessToken, setAccessToken] = useState(
    typeof localStorage !== "undefined" ? localStorage.getItem("accessToken") : ""
  );

  const [favoriteTracks, setFavoriteTracks] = useState([]);

  const handleAddToFavorites = (track) => {
    setFavoriteTracks([...favoriteTracks, track]);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AccessTokenProvider>
      <div>
        <NavBar />
      </div>
      <button className="collapseButton" onClick={handleToggleExpand}>
        {isExpanded ? "Collapse SideBar" : "Expand SideBar"}
      </button>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: isExpanded ? "20%" : "0%",
            height: "100vh",
            background: "#2b2b2b",
            marginTop: "20px",
            borderRadius: "5px",
            padding: "10px",
            flexGrow: isExpanded ? "0" : "1",
            flexBasis: isExpanded ? "20%" : "0%",
            transition: "flex-basis 0.3s ease",
            overflow: "hidden",
          }}
        >
          {isExpanded && (
            <>
              <UserPlaylists />
              <ArtistDetails
                accessToken={accessToken}
                handleAddToFavorites={handleAddToFavorites}
              />
              <UserFavorites favoriteTracks={favoriteTracks} />
            </>
          )}
        </div>
        <div
          style={{
            width: isExpanded ? "80%" : "100%",
            padding: "20px",
            transition: "width 0.3s ease",
          }}
        >
          <div>
            <ArtistSearch
              accessToken={accessToken}
              handleAddToFavorites={handleAddToFavorites}
            />
          </div>
          <div>
            <h1>Featured Playlists</h1>
            <FeaturedPlaylistsCard accessToken={accessToken} />
          </div>
          <div>
            <h1>Top Category Playlists</h1>
            <CategoryPlaylistsCard accessToken={accessToken} />
          </div>
        </div>
      </div>
    </AccessTokenProvider>
  );
}
