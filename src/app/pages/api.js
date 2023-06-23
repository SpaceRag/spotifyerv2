import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';
const ACCESS_TOKEN = 'BQDHZ9_JRWAF36TuZSdgrNvVCTBaorac9RgdnfarHt5P2EbqMpX4xkfOsS552mXjhqSL2i9-19E3YRLpbRo7bv-0xcc4Sn9yLJbHVx_Ii5QiYA9uibA'

export async function getTopArtists() {
  try {
    const response = await axios.get(`${BASE_URL}/artists/1y1PK1PL2dgNh0TwQTpZMU/top-tracks?market=FR`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data.items;
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
    return response.data.items;
  } catch (error) {
    console.error('Error retrieving top playlists:', error);
    return [];
  }
}
