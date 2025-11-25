export type Mood = 'Alegria' | 'Tristeza' | 'Miedo' | 'Enojo' | 'Asco';

export type Action = 'potenciar' | 'contrarrestar';

export type MovieType = 'live_action' | 'animation_3d' | 'animation_2d';

export interface StreamingProvider {
  name: string;
  logoPath?: string;
  type: 'flatrate' | 'rent' | 'buy' | 'ads' | 'free';
}

export interface Movie {
  id: number | string;
  title: string;
  overview: string;
  releaseYear: string;
  posterPath?: string;
  rating?: number;
  genres?: string[];
  tmdbUrl?: string;
  providers?: StreamingProvider[];
}

export interface MovieRecommendationResponse {
  movies: Movie[];
  mood: Mood;
  action: Action;
  movieType?: MovieType;
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
