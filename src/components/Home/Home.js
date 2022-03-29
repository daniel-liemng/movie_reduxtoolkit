import React, { useState, useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import MovieAxios from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';
import { useDispatch } from 'react-redux';
import {
  addMovie,
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../features/movies/movieSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
  }, [dispatch]);

  return (
    <div className=''>
      <div className='banner-img'></div>
      <MovieListing />
    </div>
  );
};

export default Home;
