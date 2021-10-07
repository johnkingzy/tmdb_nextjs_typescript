import axios from "axios";

export default axios.create({
  headers: {
    "Content-type": "application/json",
  },
  params: {
    api_key: process.env.TMDB_API_KEY,
    language:'en-US'
  },
});
