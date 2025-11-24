export type Mood = 'Alegria' | 'Tristeza' | 'Miedo' | 'Enojo' | 'Asco';

export type Action = 'potenciar' | 'contrarrestar';

export interface Movie {
  id: number | string;
  title: string;
  overview: string;
  releaseYear: string;
  posterPath?: string;
  rating?: number;
  genres?: string[];
}

export interface MovieRecommendationResponse {
  movies: Movie[];
  mood: Mood;
  action: Action;
  source: 'tmdb' | 'ai';
}

export interface WatchedMovie {
  title: string;
  addedAt: string;
}

export interface WatchedMoviesState {
  movies: WatchedMovie[];
  excludeFromRecommendations: boolean;
  maxMovies: number;
}
