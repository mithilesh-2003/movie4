import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, IMAGE_BASE_URL } from '../utils/api';

function Upcoming() {
  const [upcoming ,setUpcoming] =useState({});

  
  const getUpcoming = async ()=>{
    try {
          const {data} = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setUpcoming(data)
    console.log(data)
    } catch (error) {
      console.log(error)      
    }
  }
  
  useEffect(() => {
    getUpcoming();
  }, []);

  return (
    <div className='max-w-7xl container mx-auto px-4'>
      <h1 className='text-black'>Upcoming</h1>
      <div>
        {
          upcoming?.results?.length > 0 && (
            <div className=' grid grid-cols-6 gap-5'>
              {upcoming?.results?.map((upcoming)=>{
                return(
                  <div key={upcoming.id}>
                    <div className='border-4 border-black'>
                      <img src={`${IMAGE_BASE_URL}${upcoming.poster_path}`} alt="upcoming"/>
                    </div>
                      <div className='text-black'>{upcoming.title}</div>
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

export default Upcoming
