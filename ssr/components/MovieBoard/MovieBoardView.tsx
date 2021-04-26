import React from 'react';
import { CategoryPanel, SortPanel, MovieList } from '..';
import { Movie } from '../../models';
import { ButtonTypes, Categories, SortingOptionsProperties } from '../../shared/enums';
import classes from "./MovieBoard.module.scss";
import { Button, Loader } from '../../shared/components';

export interface MovieBoardViewProps {
  movies: Movie[];
  category: Categories;
  sortingOption: SortingOptionsProperties;
  isDownDirection: boolean;
  moviesLoading: boolean;
  moviesAmount: number;
  moreMoviesLoaded: boolean;
  loaded: boolean;
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
  setCategory: (category: Categories) => void;
  setSortingOption: (category: SortingOptionsProperties) => void;
  setIsDownDirectionValue: (isDownDirection: boolean) => void;
  showMoreMovies: () => void;
}

const MovieBoardView: React.FC<MovieBoardViewProps> = ({ 
  movies,
  category,
  sortingOption,
  isDownDirection,
  moviesLoading,
  moviesAmount,
  moreMoviesLoaded,
  loaded,
  onEditMovie,
  onDeleteMovie,
  setCategory,
  setSortingOption,
  setIsDownDirectionValue,
  showMoreMovies,
}) => {
  return (
    <div className={classes['movie-board']}>
      <div className={classes['movie-board__header']}>
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
        moviesAmount && !moviesLoading ? (
        <>
          <h2 className={classes['movie-board__count']}>
            <span className={classes['movie-board__count-number']}>{ moviesAmount }</span>&nbsp;
            movie{ moviesAmount !== 1 && 's' } found
          </h2>
          <MovieList
            movies={movies}
            onEditMovie={onEditMovie}
            onDeleteMovie={onDeleteMovie}
          />
          { movies.length < moviesAmount && (
            <div className={classes['movie-board__show-more-button']}>
              { moreMoviesLoaded ? (
                <Button 
                  type={ButtonTypes.SECONDARY}
                  onButtonClicked={showMoreMovies}
                >
                  SHOW MORE
                </Button>
              ):(
                <Loader />
              )}
              
            </div>
          ) }
        </>) : (
        <div className={classes['movie-board__no-movie-found']}>
          { loaded && !moviesLoading ? "No Movie Found" : <Loader /> }
        </div>)
      }
    </div>
  )
}

export default MovieBoardView;
