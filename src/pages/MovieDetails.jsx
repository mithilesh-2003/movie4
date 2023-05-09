import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL, IMAGE_BASE_URL } from '../utils/api';

function MovieDetails() {
  const params = useParams();
  const [casts ,setCasts] = useState({});

  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideoDetails, setMovieVideoDetails] = useState({});
  const [trailers, setTrailers] = useState([]);


  const getCasts = async ()=>{
    try {
      const {data} = await axios.get(
        `${BASE_URL}/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      // console.log(data)
      setCasts(data)
    } catch (err) {
      console.log(err)
      
    }
  }

  const getMovieDetails = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      // console.log(data);
      setMovieDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieVideoDetails = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      );
      // console.log(data);
      setMovieVideoDetails(data);
      const vid = [];
      const v = data.results;
      v.map((el) => {
        if (el.type == 'Trailer') {
          vid.push(el);
        }
      });
      setTrailers(vid);
    } catch (err) {
      console.log(err);
    }
  };

 

  useEffect(() => {
    getMovieDetails();
    getCasts();
    getMovieVideoDetails();
  }, [params.id]);

  return (
    <div className="bg-gradient-to-b from-black/90 to-black min-h-screen">
      <div className="relative">
        <img
          src={`${IMAGE_BASE_URL}${movieDetails.backdrop_path} `} alt="poster"
          className="min-h-screen md:h-screen w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-black">
          <div className="max-w-7xl container mx-auto px-3 py-20">
            <p className="text-white text-3xl font-semibold">
              {movieDetails?.title}
            </p>
            <div className="py-2">
              {movieDetails?.genres && movieDetails?.genres?.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-2">
                    {movieDetails?.genres.map((gen) => {
                      return (
                        <button
                          key={gen?.id}
                          className="bg-gray-200 text-black px-4 py-1 rounded-sm text-sm"
                        >
                          {gen?.name}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <p className="text-white w-full md:w-1/2">
              {movieDetails?.overview}
            </p>
            <button className="bg-white text-black font-semibold px-5 py-2 text-sm mt-5 rounded">
              Watch Trailor
            </button>
            <div className="py-5">
              <div className="flex justify-between items-center w-[60%]">
                <p className="text-white pb-2 text-xl font-semibold">Casts</p>
                <a
                  href="#casts"
                  className="mb-2 px-4 py-1.5 border border-white text-white rounded-sm"
                >
                  view all
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>         
      <div>
                {
                  casts?.cast?.length > 0 && (
                    <div className='grid grid-cols-6'>{
                      casts?.cast?.map((cast) => {
                        return(
                          <>
                          <div>{cast.name}</div>
                          <div>
                            <img src={`${IMAGE_BASE_URL}${cast.profile_path}`} alt="cast" />
                          </div>
                          </>
                        )
                      })
                      }</div>
                  )
                }
              </div>


      <div className="py-10 bg-white px-5">
        {trailers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {trailers.map((v) => {
              return (
                <iframe
                  key={v.key}
                  src={`https://www.youtube.com/embed/${v.key}`}
                  className="h-[200px] lg:h-[500px] w-full"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              );
            })}
          </div>
        )}
      </div>
      {/* <pre className="bg-white text-black">
        {JSON.stringify(movieVideoDetails, null, 2)}
      </pre> */}
    </div>
  );
}

export default MovieDetails;
