import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { BASE_URL , IMAGE_BASE_URL} from '../utils/api';

function NowPlaying() {
    const [nowPlaying ,setNowPlaying] = useState({});

    const getNowPlaying = async ()=>{
        try {
            const {data} = await axios.get(
              `${BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`
            )
            console.log(data)
            setNowPlaying(data)
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
      getNowPlaying();
    },[])
  return (
    <div className='max-w-7xl container mx-auto px-4'>
      <h1 className='text-black'>NowPlaying</h1>
      <div>
        {
          nowPlaying?.results?.length > 0 && (
            <div className=' grid grid-cols-6 gap-5'>
              {nowPlaying?.results?.map((movie)=>{
                return(
                  <div key={movie.id}>
                    <div className='border-4 border-black'>
                      <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt="movie"/>
                    </div>
                    <div className='text-black'>{movie.title}</div>
                  </div>
                )
              })}
            </div>
          )
        }    
      </div>
    </div>
  )
}
export default NowPlaying
