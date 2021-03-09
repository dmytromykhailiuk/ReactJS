import React, { useCallback, useMemo, useRef, useState } from "react";
import { Banner, MovieBoard } from "./components";
import { movies as allMovies } from "mocks";
import { filterMoviesBySearchingValue, renderModal, scrollToElement } from "shared/helpers"
import { Movie } from "models/";
import { MainPageModes, RouterPaths } from "shared/enums";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router";
import { useSearchQuery } from "shared/hooks";

const bluredStyles = {
  filter: 'blur(7px)',
}

interface ModeData {
  mode: MainPageModes;
  selectedMovie: Movie;
}

interface Params {
  id: string; 
}

const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(allMovies);
  const searchingValue = useSearchQuery();
  const [{ mode, selectedMovie }, setModeData] = useState<ModeData>({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  const { id: movieId } = useParams<Params>();
  const history = useHistory();
  const match = useRouteMatch();
  const movieBoard = useRef(null);

  const movieInOverview = useMemo(() => movies.find(movie => movie.id === movieId), [movieId, movies]);

  if (!movieInOverview && match.path === RouterPaths.FILM) {
    return <Redirect to={RouterPaths.ERROR}/>
  }

  const saveNewMovie = useCallback((newMovie: Movie) => {
    setMovies([newMovie, ...movies]);
    setModeData({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  },[movies]);

  const saveEditedMovie = useCallback((editedMovie: Movie) => {
    const index = movies.findIndex((movie) => movie.id === editedMovie.id);
    setMovies([...movies.slice(0, index), editedMovie, ...movies.slice(index + 1)]);
    setModeData({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  },[movies]);

  const deleteMovie = useCallback((deletedMovie: Movie) => {
    const index = movies.findIndex((movie) => movie.id === deletedMovie.id);
    setMovies([...movies.slice(0, index), ...movies.slice(index + 1)]);
    setModeData({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  }, [movies]);

  const onCloseWithSaving = useCallback((movie) => {
    switch(mode) {
      case MainPageModes.CREATE : {
        return saveNewMovie(movie);
      }
      case MainPageModes.EDIT : {
        return saveEditedMovie(movie);
      }
      case MainPageModes.DELETE : {
        return deleteMovie(movie);
      }
    }
  }, [mode, movies])

  const onEditMovie = useCallback((movie: Movie) => {
    setModeData({ mode: MainPageModes.EDIT, selectedMovie: movie });
  }, []);

  const onDeleteMovie = useCallback((movie: Movie) => {
    setModeData({ mode: MainPageModes.DELETE, selectedMovie: movie });
  }, []);
  
  const onCreateMovie = useCallback(() => {
    setModeData({ mode: MainPageModes.CREATE, selectedMovie: null });
  }, []);

  const onCloseModal = useCallback(() => {
    setModeData({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  }, []);

  const navigateToMainPage = useCallback(() => {
    history.push("/");
  }, []);

  const navigateToSearchPage = useCallback(() => {
    history.push("/search?Search%20Query=");
  }, []);

  const setSearchingValue = useCallback((searchingValue) => {
    history.push("/search?Search%20Query=" + searchingValue);
    scrollToElement(movieBoard.current);
  }, [])
  
  const filteredMovies = useMemo(() => filterMoviesBySearchingValue(movies, searchingValue), [searchingValue, movies]);

  const MovieModal = useMemo(() => renderModal(mode), [mode]);
  
  const contentStyles = mode !== MainPageModes.OVERVIEW ? bluredStyles: {};

  return (
    <>
      <header style={contentStyles}>
        <Banner
          movieInOverview={movieInOverview}
          onChangeSearchingValue={setSearchingValue}
          onCreateMovie={onCreateMovie}
          onLogoClicked={navigateToMainPage}
          onSearchIconClicked={navigateToSearchPage}
        />
      </header>

      <main style={contentStyles}>
        <MovieBoard
          movieBoardRef={movieBoard}
          movies={filteredMovies}
          onEditMovie={onEditMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>

      { mode !== MainPageModes.OVERVIEW && (
        <MovieModal 
          movie={selectedMovie}
          onCloseModal={onCloseModal}
          onCloseWithSaving={onCloseWithSaving}
        />) }
    </>
  )
}

export default MainPage;
