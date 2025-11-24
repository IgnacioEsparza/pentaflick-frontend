import React from 'react';
import { Movie } from '../types';
import { Star, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="card hover:scale-105 transition-transform duration-300 animate-fade-in">
      <div className="flex flex-col h-full">
        {movie.posterPath && (
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="text-xl font-bold mb-2 text-white">{movie.title}</h3>
        
        <div className="flex items-center gap-4 mb-3 text-sm">
          {movie.rating && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          )}
          {movie.releaseYear && (
            <div className="flex items-center gap-1 text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>{movie.releaseYear}</span>
            </div>
          )}
        </div>

        <p className="text-gray-300 text-sm flex-grow line-clamp-3">
          {movie.overview}
        </p>

        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {movie.genres.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-200"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
