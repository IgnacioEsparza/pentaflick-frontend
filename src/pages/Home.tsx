import React, { useState } from 'react';
import { MoodButton } from '../components/MoodButton';
import { MovieCard } from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Mood, Action } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchRecommendations, clearRecommendations } from '../store/recommendationsSlice';
import { ArrowLeft, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.recommendations);
  const { movies: watchedMovies, excludeFromRecommendations } = useAppSelector(
    (state) => state.watchedMovies
  );

  const moods: Mood[] = ['Alegria', 'Tristeza', 'Miedo', 'Enojo', 'Asco'];

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleActionSelect = (action: Action) => {
    setSelectedAction(action);
    
    const watchedTitles = excludeFromRecommendations
      ? watchedMovies.map((m) => m.title)
      : [];

    dispatch(
      fetchRecommendations({
        mood: selectedMood!,
        action,
        watchedMovies: watchedTitles,
      })
    );
  };

  const handleReset = () => {
    setSelectedMood(null);
    setSelectedAction(null);
    dispatch(clearRecommendations());
  };

  if (loading && selectedMood && selectedAction) {
    const actionLabel = selectedAction === 'potenciar' ? 'potenciar' : 'contrarrestar';
    return (
      <div className="container mx-auto px-4 py-12 animate-fade-in">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Cancelar y elegir otro estado</span>
        </button>

        <div className="card">
          <LoadingSpinner
            message={`Obteniendo películas para ${actionLabel} tu ${selectedMood.toLowerCase()}...`}
            subtitle="Esto puede tardar unos segundos mientras encontramos coincidencias perfectas"
          />
        </div>
      </div>
    );
  }

  if (data && selectedAction) {
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a seleccionar estado de ánimo</span>
        </button>

        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">
              Películas para {selectedAction === 'potenciar' ? 'potenciar' : 'contrarrestar'} tu{' '}
              {selectedMood}
            </h2>
          </div>
          <p className="text-gray-300">
            {data.source === 'tmdb' ? '🎬 Recomendaciones de TMDB' : '🤖 Recomendaciones de IA'}
          </p>
          {excludeFromRecommendations && watchedMovies.length > 0 && (
            <p className="text-sm text-purple-300 mt-2">
              ✓ Excluyendo {watchedMovies.length} película(s) ya vista(s)
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={handleReset} className="btn-primary">
            Buscar más películas
          </button>
        </div>
      </div>
    );
  }

  if (selectedMood && !selectedAction) {
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <button
          onClick={() => setSelectedMood(null)}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Seleccionaste: <span className="text-purple-400">{selectedMood}</span>
          </h2>
          <p className="text-gray-300 text-center mb-8">
            ¿Qué quieres hacer con este estado de ánimo?
          </p>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleActionSelect('potenciar')}
                className="card hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center gap-4"
              >
                <TrendingUp className="w-16 h-16 text-green-400" />
                <h3 className="text-2xl font-bold">Potenciar</h3>
                <p className="text-gray-300 text-center">
                  Intensifica y celebra este estado emocional
                </p>
              </button>

              <button
                onClick={() => handleActionSelect('contrarrestar')}
                className="card hover:scale-105 transition-all duration-300 p-8 flex flex-col items-center gap-4"
              >
                <TrendingDown className="w-16 h-16 text-blue-400" />
                <h3 className="text-2xl font-bold">Contrarrestar</h3>
                <p className="text-gray-300 text-center">
                  Equilibra y mejora este estado emocional
                </p>
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-center">
              <p className="text-red-200">Error: {error}</p>
              <button onClick={handleReset} className="btn-secondary mt-4">
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          ¿Cómo te sientes hoy?
        </h1>
        <p className="text-xl text-gray-300">
          Selecciona tu estado de ánimo y te recomendaremos películas perfectas para ti
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {moods.map((mood) => (
          <MoodButton key={mood} mood={mood} onClick={() => handleMoodSelect(mood)} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block card max-w-md">
          <h3 className="text-lg font-semibold mb-2">💡 Consejo</h3>
          <p className="text-gray-300 text-sm">
            Puedes gestionar tus películas vistas desde el menú para obtener recomendaciones más
            personalizadas
          </p>
        </div>
      </div>
    </div>
  );
};
