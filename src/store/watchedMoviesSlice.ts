import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WatchedMoviesState } from '../types';

const MAX_WATCHED_MOVIES = 50;

const loadFromLocalStorage = (): WatchedMoviesState => {
  try {
    const stored = localStorage.getItem('pentaflick_watched_movies');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading watched movies from localStorage:', error);
  }
  return {
    movies: [],
    excludeFromRecommendations: true,
    maxMovies: MAX_WATCHED_MOVIES,
  };
};

const saveToLocalStorage = (state: WatchedMoviesState) => {
  try {
    localStorage.setItem('pentaflick_watched_movies', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving watched movies to localStorage:', error);
  }
};

const initialState: WatchedMoviesState = loadFromLocalStorage();

const watchedMoviesSlice = createSlice({
  name: 'watchedMovies',
  initialState,
  reducers: {
    addWatchedMovie: (state, action: PayloadAction<string>) => {
      const title = action.payload.trim();
      if (!title) return;

      // Check if movie already exists
      const exists = state.movies.some(
        (movie) => movie.title.toLowerCase() === title.toLowerCase()
      );

      if (!exists) {
        // Remove oldest movie if at max capacity
        if (state.movies.length >= state.maxMovies) {
          state.movies.shift();
        }

        state.movies.push({
          title,
          addedAt: new Date().toISOString(),
        });

        saveToLocalStorage(state);
      }
    },
    removeWatchedMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(
        (movie) => movie.title !== action.payload
      );
      saveToLocalStorage(state);
    },
    toggleExcludeFromRecommendations: (state) => {
      state.excludeFromRecommendations = !state.excludeFromRecommendations;
      saveToLocalStorage(state);
    },
    clearWatchedMovies: (state) => {
      state.movies = [];
      saveToLocalStorage(state);
    },
  },
});

export const {
  addWatchedMovie,
  removeWatchedMovie,
  toggleExcludeFromRecommendations,
  clearWatchedMovies,
} = watchedMoviesSlice.actions;

export default watchedMoviesSlice.reducer;
