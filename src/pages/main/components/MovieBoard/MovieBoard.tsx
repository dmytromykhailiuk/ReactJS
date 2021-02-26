import React, { useState } from 'react';
import { CategoryPanel, SortPanel, MovieList } from '..';
import { Movie } from 'models';
import { Categories } from 'shared/enums';
import { filterMoviesByCategory, sortMovies } from 'shared/helpers';
import classes from "./MovieBoard.module.scss";

interface MovieBoardProps {
  movies?: Movie[];
}

const MovieBoard: React.FC<MovieBoardProps> = ({ 
  movies: allMovies = [],
}) => {
  const [category, setCategory] = useState<string | Categories>(Categories.ALL);
  const [isDownDirection, setSortingDirection] = useState<boolean>(true);

  const movies = sortMovies(filterMoviesByCategory(allMovies, category), isDownDirection);

  return (
    <div className={classes['movie-board']}>
      <div className={classes['movie-board__header']}>
        <CategoryPanel onChangeCategory={setCategory} selectedCategory={category}/>
        <SortPanel onChangeSortingDirection={setSortingDirection} isDownDirection={isDownDirection}/>
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
