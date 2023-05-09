import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ gen }) {
  const location = useLocation()
  const [showGen, setShowGen] = useState(false);

  return (
    <div className="bg-black h-20 sticky top-0 z-20">
      <nav className="max-w-7xl container mx-auto px-3 flex items-center h-full">
        <div className="flex gap-8">
          <Link to="/" className={location.pathname === "/" ? "text-yellow-500" : "text-white"}>
            Home
          </Link>
          <Link to="/nowPlaying" className={location.pathname === "/nowPlaying" ? "text-yellow-500" : "text-white"}>
            Now Playing
          </Link>
          <Link to="/upcoming" className={location.pathname === "/upcoming" ? "text-yellow-500" : "text-white"}>Upcoming</Link>
          <div className="relative">
            <div
              className="text-white cursor-pointer"
              onClick={() => setShowGen(!showGen)}
            >
              Genre
            </div>
            <div
              className={
                !showGen
                  ? 'hidden'
                  : 'absolute top-8 -left-5 bg-gray-900 bg-opacity-80 rounded text-white px-5 py-2'
              }
            >
              <ul className="flex flex-col gap-y-1">
                {gen.map((g) => {
                  return (
                    <li
                      key={g.id}
                      className="cursor-pointer text-white hover:text-yellow-500"
                    >
                      {g.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
