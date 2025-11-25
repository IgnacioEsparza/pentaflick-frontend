import axios from 'axios';
import { Mood, Action, MovieRecommendationResponse, MovieType } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecommendations = async (
  mood: Mood,
  action: Action,
  movieType: MovieType,
  watchedMovies: string[] = []
): Promise<MovieRecommendationResponse> => {
  const response = await api.post<MovieRecommendationResponse>(
    '/recommendations',
    {
      mood,
      action,
      movieType,
      watchedMovies,
    }
  );
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
