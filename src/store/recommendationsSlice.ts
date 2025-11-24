import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MovieRecommendationResponse, Mood, Action } from '../types';
import { getRecommendations } from '../services/api';

interface RecommendationsState {
  data: MovieRecommendationResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetch',
  async (
    {
      mood,
      action,
      watchedMovies,
    }: { mood: Mood; action: Action; watchedMovies: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await getRecommendations(mood, action, watchedMovies);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch recommendations'
      );
    }
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    clearRecommendations: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecommendations.fulfilled,
        (state, action: PayloadAction<MovieRecommendationResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRecommendations } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
