import { Categories, SortingOptionsProperties } from "shared/enums";
import { Movie } from "models/movie.model";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoviesAction, MoviesSelector, Store } from "store";
import { MovieBoard } from "./";

interface MovieBoardContainerProps {
  movies: Movie[];
  movieBoardRef: React.MutableRefObject<any>;
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
}

const MovieBoardContainer: React.FC<MovieBoardContainerProps> = ({ 
  movies, movieBoardRef, onEditMovie, onDeleteMovie
}) => {

  const dispatch = useDispatch();

  const category = useSelector<Store, Categories>(MoviesSelector.selectedCategorySelector);
  const loaded = useSelector<Store, boolean>(MoviesSelector.loadedSelector);
  const isDownDirection = useSelector<Store, boolean>(MoviesSelector.isDownDirectionSelector);
  const moviesLoading = useSelector<Store, boolean>(MoviesSelector.moviesLoadingSelector);
  const moreMoviesLoaded = useSelector<Store, boolean>(MoviesSelector.moreMoviesLoadedSelector);
  const sortingOption = useSelector<Store, SortingOptionsProperties>(MoviesSelector.sortingOptionSelector);
  const moviesAmount = useSelector<Store, number>(MoviesSelector.moviesAmountSelector);

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
    dispatch(MoviesAction.loadMoreMoviesAction());
  }, []);

  return (
    <MovieBoard 
      movies={movies}
      movieBoardRef={movieBoardRef}
      category={category}
      sortingOption={sortingOption}
      isDownDirection={isDownDirection}
      moviesLoading={moviesLoading}
      moviesAmount={moviesAmount}
      moreMoviesLoaded={moreMoviesLoaded}
      loaded={loaded}
      onEditMovie={onEditMovie}
      onDeleteMovie={onDeleteMovie}
      setCategory={setCategory}
      setSortingOption={setSortingOption}
      setIsDownDirectionValue={setIsDownDirectionValue}
      showMoreMovies={showMoreMovies}
    />
  )
}

export default MovieBoardContainer;
