require('dotenv').config();

module.exports = {
  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
};
