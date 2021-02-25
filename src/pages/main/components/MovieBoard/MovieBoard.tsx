import React from 'react';
import { CategoryPanel, SortPanel, MovieList } from '..';
import { Movie } from '../../../../models';
import classes from "./MovieBoard.module.scss";

interface MovieBoardProps {
  onChangeCategories?: (categories: string) => void;
  onChangeSortingDirection?: (isDownDirection: boolean) => void;
  movies?: Movie[]
}

const MovieBoard: React.FC<MovieBoardProps> = ({ 
  movies = [],
  onChangeCategories = () => {}, 
  onChangeSortingDirection = () => {}
}) => {
  return (
    <div className={classes['movie-board']}>
      <div className={classes['movie-board__header']}>
        <CategoryPanel onChangeCategories={onChangeCategories}/>
        <SortPanel onChangeSortingDirection={onChangeSortingDirection}/>
        <div className={classes['movie-board__header-underline']}></div>
      </div>
      { 
        movies.length ? (
        <>
          <h2 className={classes['movie-board__count']}>
            <span className={classes['movie-board__count-number']}>{ movies.length }</span>&nbsp;
            movie{ movies.length !== 1 && 's' } found
          </h2>
          <MovieList movies={movies} />
        </>) : (
        <div className={classes['movie-board__no-movie-found']}>
          No Movie Found
        </div>)
      }
    </div>
  )
}

export default MovieBoard;
