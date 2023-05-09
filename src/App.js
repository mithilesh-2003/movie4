import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/app/Header';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { fetchMovieGenreLists } from './utils/api';
import Upcoming from './pages/Upcoming';
import NowPlaying from './pages/NowPlaying';

function App() {
  const [gens, setGens] = useState([]);

  const getGensName = async () => {
    try {
      const { data } = await fetchMovieGenreLists();
      // console.log(data);
      setGens(data.genres);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGensName();
  }, []);

  return (
    <>
      <Header gen={gens} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path='/upcoming' element={<Upcoming/>} />
        <Route path='/nowPlaying' element= {<NowPlaying/>}/>
      </Routes>
    </>
  );
}

export default App;
