import React, { useCallback, useMemo } from 'react';
import { CategoryPanel, SortPanel, MovieList } from '..';
import { Movie } from 'models';
import { ButtonTypes, Categories, SortingOptionsProperties } from 'shared/enums';
import { filterMoviesByCategory, sortMovies } from 'shared/helpers';
import classes from "./MovieBoard.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { MoviesAction, MoviesSelector, Store } from 'store';
import { Button, Loader } from 'shared/components';

interface MovieBoardProps {
  movies: Movie[];
  movieBoardRef: React.MutableRefObject<any>;
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
}

const MovieBoard: React.FC<MovieBoardProps> = ({ 
  movies,
  movieBoardRef,
  onEditMovie,
  onDeleteMovie,
}) => {
  const dispatch = useDispatch();

  const category = useSelector<Store, Categories>(MoviesSelector.selectedCategorySelector);
  const loaded = useSelector<Store, boolean>(MoviesSelector.loadedSelector);
  const isDownDirection = useSelector<Store, boolean>(MoviesSelector.isDownDirectionSelector);
  const sortingOption = useSelector<Store, SortingOptionsProperties>(MoviesSelector.sortingOptionSelector);
  const moviesAmountInViewSelector = useSelector<Store, number>(MoviesSelector.moviesAmountInViewSelector);

  const setCategory = useCallback((category: Categories) => {
    dispatch(MoviesAction.setSelectedCategoryAction(category));
  }, []);

  const setIsDownDirectionValue = useCallback((value: boolean) => {
    dispatch(MoviesAction.setIsDownDirectionValueAction(value));
  }, []);

  const setSortingOption = useCallback((sortingOption: SortingOptionsProperties) => {
    dispatch(MoviesAction.setSortingOptionAction(sortingOption));
  }, []);

  const showMoreMovies = useCallback(() => {
    dispatch(MoviesAction.showMoreMoviesAction());
  }, []);

  const filteredMovies = useMemo(() => filterMoviesByCategory(movies, category), [category, movies]);

  const sortedMovies =  useMemo(() => sortMovies(filteredMovies, sortingOption, isDownDirection), [filteredMovies, sortingOption, isDownDirection, moviesAmountInViewSelector]);

  const moviesInView = useMemo(() => sortedMovies.slice(0, moviesAmountInViewSelector), [sortedMovies, moviesAmountInViewSelector]);

  return (
    <div className={classes['movie-board']}>
      <div className={classes['movie-board__header']} ref={movieBoardRef}>
        <CategoryPanel onChangeCategory={setCategory} selectedCategory={category}/>
        <SortPanel
          sortingOption={sortingOption}
          setSortingOption={setSortingOption}
          onChangeSortingDirection={setIsDownDirectionValue} 
          isDownDirection={isDownDirection}
        />
        <div className={classes['movie-board__header-underline']}></div>
      </div>
      { 
        filteredMovies.length ? (
        <>
          <h2 className={classes['movie-board__count']}>
            <span className={classes['movie-board__count-number']}>{ filteredMovies.length }</span>&nbsp;
            movie{ filteredMovies.length !== 1 && 's' } found
          </h2>
          <MovieList
            movies={moviesInView}
            onEditMovie={onEditMovie}
            onDeleteMovie={onDeleteMovie}
          />
          { moviesInView.length < filteredMovies.length && (
            <div className={classes['movie-board__show-more-button']}>
              <Button 
                type={ButtonTypes.SECONDARY}
                onButtonClicked={showMoreMovies}
              >
                SHOW MORE
              </Button>
            </div>
          ) }
        </>) : (
        <div className={classes['movie-board__no-movie-found']}>
          { loaded ? "No Movie Found" : <Loader /> }
        </div>)
      }
    </div>
  )
}

export default MovieBoard;
