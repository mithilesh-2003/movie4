import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const fetchMovieGenreLists = () => {
  return axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
  );
};

export const fetchTopRatedMovieLists = () => {
  return axios.get(
    `${BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
  );
};
export const fetchMoviesLists = () => {
  return axios.get(
    `${BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );
};
