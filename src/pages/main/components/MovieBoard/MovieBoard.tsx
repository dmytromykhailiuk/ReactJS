import React, { useMemo, useState } from 'react';
import { CategoryPanel, SortPanel, MovieList } from '..';
import { Movie } from 'models';
import { Categories, SortingOptionsProperties } from 'shared/enums';
import { filterMoviesByCategory, sortMovies } from 'shared/helpers';
import classes from "./MovieBoard.module.scss";

interface MovieBoardProps {
  movies?: Movie[];
  onEditMovie?: (movie: Movie) => void;
  onDeleteMovie?: (movie: Movie) => void;
}

const MovieBoard: React.FC<MovieBoardProps> = ({ 
  movies = [],
  onEditMovie = () => {},
  onDeleteMovie = () => {},
}) => {
  const [category, setCategory] = useState<string | Categories>(Categories.ALL);
  const [isDownDirection, setSortingDirection] = useState<boolean>(true);
  const [sortingOption, setSortingOption] = useState<SortingOptionsProperties>(SortingOptionsProperties.RELEASE_DATE);

  const filteredMovies = useMemo(() => filterMoviesByCategory(movies, category), [category, movies]);

  const sortedMovies =  useMemo(() => sortMovies(filteredMovies, sortingOption, isDownDirection), [filteredMovies, sortingOption, isDownDirection]);

  return (
    <div className={classes['movie-board']} id="movie-board">
      <div className={classes['movie-board__header']}>
        <CategoryPanel onChangeCategory={setCategory} selectedCategory={category}/>
        <SortPanel
          sortingOption={sortingOption}
          setSortingOption={setSortingOption}
          onChangeSortingDirection={setSortingDirection} 
          isDownDirection={isDownDirection}
        />
        <div className={classes['movie-board__header-underline']}></div>
      </div>
      { 
        sortedMovies.length ? (
        <>
          <h2 className={classes['movie-board__count']}>
            <span className={classes['movie-board__count-number']}>{ sortedMovies.length }</span>&nbsp;
            movie{ sortedMovies.length !== 1 && 's' } found
          </h2>
          <MovieList
            movies={sortedMovies}
            onEditMovie={onEditMovie}
            onDeleteMovie={onDeleteMovie}
          />
        </>) : (
        <div className={classes['movie-board__no-movie-found']}>
          No Movie Found
        </div>)
      }
    </div>
  )
}

export default MovieBoard;
