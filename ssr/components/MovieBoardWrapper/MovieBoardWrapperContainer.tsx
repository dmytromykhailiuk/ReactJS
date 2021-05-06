import { ModalTypes } from "../../shared/enums";
import { Movie } from "../../models/movie.model";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalsAction, ModalsSelector, MoviesAction, MoviesSelector, Store } from "../../store";
import { MovieBoardWrapperViewProps } from "./MovieBoardWrapperView";

const MovieBoardWrapperContainer = (MovieBoardWrapperView: React.FC<MovieBoardWrapperViewProps>) => () => {
  const movies = useSelector<Store, Movie[]>(MoviesSelector.moviesDataSelector);
  const selectedMovie = useSelector<Store, Movie>(MoviesSelector.selectedMovieSelector);
  const modalInView = useSelector<Store, ModalTypes>(ModalsSelector.modalInViewSelector);
  const isSuccessAlert = useSelector<Store, boolean>(ModalsSelector.isSuccessAlertSelector);
  const alertMessage = useSelector<Store, string>(ModalsSelector.alertMessageSelector);
  const movieInOverview = useSelector<Store, Movie>(MoviesSelector.movieInOverviewSelector);

  const dispatch = useDispatch();

  const onCloseWithSaving = useCallback((movie: Movie) => {
    switch(modalInView) {
      case ModalTypes.CREATE : {
        return dispatch(MoviesAction.addMovieAction(movie))
      }
      case ModalTypes.EDIT : {
        return dispatch(MoviesAction.editMovieAction(movie))
      }
      case ModalTypes.DELETE : {
        return dispatch(MoviesAction.deleteMovieAction({ 
          id: movie.id, 
          shouldNavigateToHome: movie.id === movieInOverview?.id 
        }));
      }
    }
  }, [modalInView, movieInOverview])

  const onEditMovie = useCallback((movie: Movie) => {
    dispatch(ModalsAction.setModalInViewAction({ modalType: ModalTypes.EDIT, selectedMovie: movie }));
  }, []);

  const onDeleteMovie = useCallback((movie: Movie) => {
    dispatch(ModalsAction.setModalInViewAction({ modalType: ModalTypes.DELETE, selectedMovie: movie }));
  }, []);

  const onCloseModal = useCallback(() => {
    dispatch(ModalsAction.setModalInViewAction({ modalType: null }));
  }, []);

  return (
    <MovieBoardWrapperView 
      modalInView={modalInView}
      movies={movies}
      isSuccessAlert={isSuccessAlert}
      selectedMovie={selectedMovie}
      alertMessage={alertMessage}
      onEditMovie={onEditMovie}
      onDeleteMovie={onDeleteMovie}
      onCloseModal={onCloseModal}
      onCloseWithSaving={onCloseWithSaving}
    />
  )
}

export default MovieBoardWrapperContainer;
