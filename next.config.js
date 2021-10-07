module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  images: {
    domains: ["www.themoviedb.org"],
  },
};
