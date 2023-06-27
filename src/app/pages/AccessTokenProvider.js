import React, { createContext, useEffect, useState } from "react";

export const AccessTokenContext = createContext();

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const clientId = "d001a849cc664ee7af9693ae3d5d79c6";
        const clientSecret = "e9645dedff224e50b2e073f7fb69df84";
        const credentials = `${clientId}:${clientSecret}`;
        const encodedCredentials = Buffer.from(credentials).toString("base64");

        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.access_token;
          const expiresIn = data.expires_in;
          setNewAccessToken(newAccessToken, expiresIn);
          console.log("Le token est bien récuperer depuis le fetchAcessToken");
        } else {
          console.log("Échec de la récupération de l'access token");
        }
      } catch (error) {
        console.log("Une erreur s'est produite lors de la récupération de l'access token", error);
      }
    }

    fetchAccessToken();
  }, []);

  function setNewAccessToken(newAccessToken, expiresIn) {
    setAccessToken(newAccessToken);

    const expirationTime = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("tokenExpirationTime", expirationTime);
  }

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken: setNewAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
