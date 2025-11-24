import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addWatchedMovie,
  removeWatchedMovie,
  toggleExcludeFromRecommendations,
  clearWatchedMovies,
} from '../store/watchedMoviesSlice';
import { Trash2, Plus, Film, AlertCircle, Check } from 'lucide-react';

export const WatchedMovies: React.FC = () => {
  const [newMovie, setNewMovie] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const dispatch = useAppDispatch();
  const { movies, excludeFromRecommendations, maxMovies } = useAppSelector(
    (state) => state.watchedMovies
  );

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMovie.trim()) {
      dispatch(addWatchedMovie(newMovie));
      setNewMovie('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleRemoveMovie = (title: string) => {
    dispatch(removeWatchedMovie(title));
  };

  const handleToggleExclude = () => {
    dispatch(toggleExcludeFromRecommendations());
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las películas vistas?')) {
      dispatch(clearWatchedMovies());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Film className="w-10 h-10 text-purple-400" />
            Películas Vistas
          </h1>
          <p className="text-gray-300">
            Gestiona tu lista de películas vistas para obtener mejores recomendaciones
          </p>
        </div>

        {/* Info Card */}
        <div className="card mb-6 bg-purple-500/10 border-purple-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="mb-2">
                <strong>Máximo de películas:</strong> {maxMovies} películas
              </p>
              <p>
                Cuando alcances el límite, las películas más antiguas se eliminarán automáticamente
                al agregar nuevas.
              </p>
            </div>
          </div>
        </div>

        {/* Add Movie Form */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4">Agregar Película</h2>
          <form onSubmit={handleAddMovie} className="flex gap-3">
            <input
              type="text"
              value={newMovie}
              onChange={(e) => setNewMovie(e.target.value)}
              placeholder="Nombre de la película..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
              maxLength={100}
            />
            <button
              type="submit"
              disabled={!newMovie.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </form>
          
          {showSuccess && (
            <div className="mt-3 flex items-center gap-2 text-green-400 animate-fade-in">
              <Check className="w-5 h-5" />
              <span>¡Película agregada exitosamente!</span>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-400">
            {movies.length} / {maxMovies} películas
          </div>
        </div>

        {/* Exclude Toggle */}
        <div className="card mb-6">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Excluir de recomendaciones
              </h3>
              <p className="text-sm text-gray-400">
                Las películas de esta lista no aparecerán en las recomendaciones
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={excludeFromRecommendations}
                onChange={handleToggleExclude}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
            </div>
          </label>
        </div>

        {/* Movies List */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Tu Lista ({movies.length})
            </h2>
            {movies.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Limpiar todo
              </button>
            )}
          </div>

          {movies.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No has agregado ninguna película todavía</p>
              <p className="text-sm mt-2">
                Agrega películas que ya hayas visto para mejorar tus recomendaciones
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {movies.map((movie, index) => (
                <div
                  key={`${movie.title}-${index}`}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-xs text-gray-400">
                      Agregada: {new Date(movie.addedAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveMovie(movie.title)}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                    aria-label="Eliminar película"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
