import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';
const ACCESS_TOKEN = 'BQA_v3CQpFVTMvd1Q1Sg0Xj_2w4KCZcAcUFhlnkrf0NNpiDGSGGX9_BMcrDeovp8kUcz3Lji3tbTlRxn-Uygm5KVFP5S919MWeDIWZnl1eeQN4JEfUA'

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
