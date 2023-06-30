"use client";
import FeaturedPlaylistsCard from "./components/FeaturedPlaylistsCard";
import CategoryPlaylistsCard from "./components/CategoryPlaylistsCard";
import ArtistSearch from "./components/ArtistSearch";
import NavBar from "./components/NavBar";
import { AccessTokenProvider } from "./pages/AccessTokenProvider";
// import { MusicProvider } from "./components/MusicContext";
import UserPlaylists from "./components/UserPlaylists";
import UserFavorites from "./components/UserFavorites";
import ArtistDetails from "./components/ArtistDetails";
import { useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("accessToken") : ""
  );
 
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  const handleAddToFavorites = (track) => {
    setFavoriteTracks([...favoriteTracks, track]);
    console.log("Set Favs in Home", setFavoriteTracks);
  };

  return (
    // <MusicProvider>
    <AccessTokenProvider>
      <div>
        <NavBar />
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "20%",
            height: "90vh",
            backgroundColor: "#2b2b2b",
            marginTop: "20px",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <UserPlaylists />
          <ArtistDetails
            accessToken={accessToken}
            handleAddToFavorites={handleAddToFavorites}
           
          />

          <UserFavorites favoriteTracks={favoriteTracks} />
        </div>
        <div style={{ width: "80%", padding: "20px" }}>
          <div>
            <ArtistSearch accessToken={accessToken} />
          </div>
          <div>
            <h1>Featured Playlists</h1>
            <FeaturedPlaylistsCard accessToken={accessToken} />
          </div>
          <div>
            <h1>Category</h1>
            <CategoryPlaylistsCard accessToken={accessToken} />
          </div>
        </div>
      </div>
    </AccessTokenProvider>
    // </MusicProvider>
  );
}
