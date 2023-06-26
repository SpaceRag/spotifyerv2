import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';
const ACCESS_TOKEN = 'BQBzXG2xsq1yEstWgxUkB4mopQbBE0crxhkq9L--hmHEHOuidGt6MbVJsdVb7mi2QCDDT05MLjNQjy-ajAxOAHlRyjOLP-4hjIygR3-BKJslKrSfcLk'

export async function getTopArtists() {
  try {
    const response = await axios.get(`${BASE_URL}/artists/1y1PK1PL2dgNh0TwQTpZMU/top-tracks?market=FR`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data.tracks;
  } catch (error) {
    console.error('Error retrieving top artists:', error);
    return [];
  }
}

export async function getTopPlaylists() {
  try {
    const response = await axios.get(`${BASE_URL}/browse/featured-playlists?country=Fr&offset=0`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data.playlists.items;
  } catch (error) {
    console.error('Error retrieving top playlists:', error);
    return [];
  }
}
