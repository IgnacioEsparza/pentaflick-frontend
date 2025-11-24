import { configureStore } from '@reduxjs/toolkit';
import watchedMoviesReducer from './watchedMoviesSlice';
import recommendationsReducer from './recommendationsSlice';

export const store = configureStore({
  reducer: {
    watchedMovies: watchedMoviesReducer,
    recommendations: recommendationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
