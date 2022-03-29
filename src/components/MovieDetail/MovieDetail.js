import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchAsyncMovieOrShowDetail,
  getMovieOrShowDetail,
  removeMovieOrShowDetail,
} from '../../features/movies/movieSlice';
import './MovieDetail.scss';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(getMovieOrShowDetail);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeMovieOrShowDetail());
    };
  }, [dispatch, imdbID]);

  console.log('details', detail);
  return (
    <div className='movie-section'>
      {Object.keys(detail).length === 0 ? (
        <div className='loading'>...Loading</div>
      ) : (
        <div className='movie-detail'>
          <div className='section-left'>
            <div className='movie-title'>{detail.Title}</div>
            <div className='movie-rating'>
              <span>
                IMDB Rating <i className='fa fa-star'></i> : {detail.imdbRating}
              </span>
              <span>
                IMDB Votes <i className='fa fa-thumbs-up'></i> :{' '}
                {detail.imdbVotes}
              </span>
              <span>
                Runtime <i className='fa fa-film'></i> : {detail.Runtime}
              </span>
              <span>
                Year <i className='fa fa-calendar'></i> : {detail.Released}
              </span>
            </div>
            <div className='movie-plot'>{detail.Plot}</div>
            <div className='movie-info'>
              <div>
                <span>Director</span>
                <span>{detail.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{detail.Actors}</span>
              </div>
              <div>
                <span>Genre</span>
                <span>{detail.Genre}</span>
              </div>
              <div>
                <span>Language</span>
                <span>{detail.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{detail.Awards}</span>
              </div>
            </div>
          </div>
          <div className='section-right'>
            <img src={detail.Poster} alt={detail.Title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
