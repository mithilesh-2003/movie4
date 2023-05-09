import React from 'react';

function MovieCard({ image, name, seeDetails }) {
  return (
    <div className="w-52 bg-black rounded-sm">
      <div className="p-1">
        <img
          src={image}
          alt={`${name} poster`}
          className="w-full object-contain hover:animate-pulse hover:cursor-pointer"
          onClick={seeDetails}
        />
        <h3
          className="text-sm font-semibold text-white py-1 cursor-pointer hover:text-yellow-400"
          onClick={seeDetails}
        >
          {name}
        </h3>
      </div>
    </div>
  );
}

export default MovieCard;
