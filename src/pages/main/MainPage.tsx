import React, { useCallback, useMemo, useState } from "react";
import { Banner, MovieBoard } from "./components";
import { movies as allMovies } from "mocks";
import { filterMoviesBySearchingValue } from "shared/helpers"
import { Movie } from "models/";
import { CreateMovieModal, DeleteMovieModal, EditMovieModal, ModalWrapper, MovieForm } from "shared/components";

enum MainPageModes {
  OVERVIEW = 'overview',
  EDIT = 'edit',
  CREATE = 'create',
  DELETE = 'delete',
}

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

  const onSaveNewMovie = useCallback((newMovie: Movie) => {
    setMovies([newMovie, ...movies]);
    setModeData({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  },[movies]);

  const onSaveEditedMovie = useCallback((editedMovie: Movie) => {
    const index = movies.findIndex((movie) => movie.id === editedMovie.id);
    setMovies([...movies.slice(0, index), editedMovie, ...movies.slice(index + 1)]);
    setModeData({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  },[movies]);

  const onCompleteDeleteMovie = useCallback(() => {
    const index = movies.findIndex((movie) => movie.id === selectedMovie.id);
    setMovies([...movies.slice(0, index), ...movies.slice(index + 1)]);
    setModeData({ mode: MainPageModes.OVERVIEW, selectedMovie: null });
  }, [selectedMovie, movies]);

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

      {mode === MainPageModes.DELETE && <DeleteMovieModal onCloseModal={onCloseModal} onConfirmedDeleting={onCompleteDeleteMovie} />}

      {mode === MainPageModes.EDIT && <EditMovieModal onCloseModal={onCloseModal} onSubmitForm={onSaveEditedMovie} movie={selectedMovie} />}

      {mode === MainPageModes.CREATE && <CreateMovieModal onCloseModal={onCloseModal} onSubmitForm={onSaveNewMovie}/>}
    </>
  )
}

export default MainPage;
