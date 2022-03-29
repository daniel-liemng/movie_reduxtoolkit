import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MovieAxios from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

const movieText = 'Harry';
const seriesText = 'Friends';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const res = await MovieAxios.get(
      `/?apiKey=${APIKey}&s=${movieText}&type=movie`,
    );
    return res.data;
  },
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async () => {
    const res = await MovieAxios.get(
      `/?apiKey=${APIKey}&s=${seriesText}&type=series`,
    );
    return res.data;
  },
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const res = await MovieAxios.get(`/?apiKey=${APIKey}&i=${id}&plot=full`);
    return res.data;
  },
);

const initialState = {
  movies: {},
  shows: {},
  selectedDetail: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // addMovie: (state, action) => {
    //   state.movies = action.payload;
    // },
    removeMovieOrShowDetail: (state, _) => {
      state.selectedDetail = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('Pending');
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('Fetched successfully');
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('Rejected');
    },

    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('Fetched Successfully');
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log('Fetched successfully');
      return { ...state, selectedDetail: payload };
    },
  },
});

// export const { addMovie } = movieSlice.actions;

export const { removeMovieOrShowDetail } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getMovieOrShowDetail = (state) => state.movies.selectedDetail;

export default movieSlice.reducer;
