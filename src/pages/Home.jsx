import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/ui/MovieCard';
import {
  fetchMoviesLists, fetchTopRatedMovieLists,
  IMAGE_BASE_URL,
} from '../utils/api';

function Home() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([]);
  const [topRatedMovie, setTopRatedMovies] = useState([]);

  const getTopRatedMoviesLists =async ()=>{
    try {
      const res = await fetchTopRatedMovieLists();
      setTopRatedMovies(res.results);
      
    } catch (error) {
      console.log(error)
      
    }
  }

  const goToDetailsPage = (id) => {
    navigate(`/movies/${id}`)
  }

  const getMovies = async () => {
    try {
      const { data } = await fetchMoviesLists();
      // console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };





  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-600 via-gray-800 to-black">
      <div className="max-w-7xl container mx-auto px-3 py-5">
        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 lg:gap-5">
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  image={`${IMAGE_BASE_URL}${movie?.poster_path}`}
                  name={movie?.title}
                  seeDetails={() => goToDetailsPage(movie.id)}
                />
              );
            })}
          </div>
        )}

        <hr className="mt-5" />
        <div className="py-5">
          {topRatedMovie.length > 0 && (
            <>
              <h3 className="font-semibold text-xl text-white pb-3">
                Top Rated
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 lg:gap-5">
                {topRatedMovie.map((movie) => {
                  return (
                    <MovieCard
                      key={movie.id}
                      image={`${IMAGE_BASE_URL}${movie?.poster_path}`}
                      name={movie?.title}
                      seeDetails={() => goToDetailsPage(movie.id)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
