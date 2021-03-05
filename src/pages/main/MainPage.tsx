import React, { useCallback, useMemo, useState } from "react";
import { Banner, MovieBoard, MovieModal } from "./components";
import { movies as allMovies } from "mocks";
import { filterMoviesBySearchingValue } from "shared/helpers"
import { Movie } from "models/";
import { MainPageModes } from "shared/enums";

const bluredStyles = {
  filter: 'blur(7px)',
}

interface ModeData {
  mode: MainPageModes;
  selectedMovie: Movie;
}

const MainPage: React.FC = () => {
  const [searchingValue, setSearchingValue] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>(allMovies);
  const [{ mode, selectedMovie }, setModeData] = useState<ModeData>({ mode: MainPageModes.OVERVIEW, selectedMovie: null });

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
        saveNewMovie(movie);
      }
      case MainPageModes.EDIT : {
        saveEditedMovie(movie);
      }
      case MainPageModes.DELETE : {
        deleteMovie(movie);
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
  
  const filteredMovies = useMemo(() => filterMoviesBySearchingValue(movies, searchingValue), [searchingValue, movies]);

  const contentStyles = mode !== MainPageModes.OVERVIEW ? bluredStyles: {};

  return (
    <>
      <header style={contentStyles}>
        <Banner
          onChangeSearchingValue={setSearchingValue}
          onCreateMovie={onCreateMovie}
        />
      </header>

      <main style={contentStyles}>
        <MovieBoard
          movies={filteredMovies}
          onEditMovie={onEditMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>

      <MovieModal 
        type={mode}
        selectedMovie={selectedMovie}
        onCloseModal={onCloseModal}
        onCloseWithSaving={onCloseWithSaving}
      />
    </>
  )
}

export default MainPage;
