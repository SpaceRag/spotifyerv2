// import React, { createContext, useState } from "react";

// export const MusicContext = createContext();

// export const MusicProvider = ({ children }) => {
//   const [favoriteMusic, setFavoriteMusic] = useState([]);

//   const addFavoriteMusic = (musicInfo) => {
//     setFavoriteMusic((prevFavorites) => [...prevFavorites, musicInfo]);
//   };

//   const removeFavoriteMusic = (musicInfo) => {
//     setFavoriteMusic((prevFavorites) =>
//       prevFavorites.filter((music) => music.id !== musicInfo.id)
//     );
//   };

//   return (
//     <MusicContext.Provider
//       value={{
//         favoriteMusic,
//         addFavoriteMusic,
//         removeFavoriteMusic,
//       }}
//     >
//       {children}
//     </MusicContext.Provider>
//   );
// };
