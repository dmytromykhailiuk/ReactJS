import { ModalTypes, RouterPaths } from "shared/enums";
import { Movie } from "models/movie.model";
import React, { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalsAction, ModalsSelector, MoviesAction, MoviesSelector, Store } from "store";
import { MainPage } from "./";
import { useHistory, useParams, useRouteMatch } from "react-router";

interface Params {
  id: string; 
}

const MainPageContainer: React.FC = () => {
  const movies = useSelector<Store, Movie[]>(MoviesSelector.moviesDataSelector);
  const selectedMovie = useSelector<Store, Movie>(MoviesSelector.selectedMovieSelector);
  const modalInView = useSelector<Store, ModalTypes>(ModalsSelector.modalInViewSelector);
  const isSuccessAlert = useSelector<Store, boolean>(ModalsSelector.isSuccessAlertSelector);
  const alertMessage = useSelector<Store, string>(ModalsSelector.alertMessageSelector);
  const movieInOverview = useSelector<Store, Movie>(MoviesSelector.movieInOverviewSelector);
  const movieInOverviewLoaded = useSelector<Store, boolean>(MoviesSelector.movieInOverviewLoadedSelector);
  const { id: movieId } = useParams<Params>();
  const history = useHistory();
  const match = useRouteMatch();
  const movieBoard = useRef(null);

  const dispatch = useDispatch();
  
  useMemo(() => {
    if (match.path === RouterPaths.FILM) {
      dispatch(MoviesAction.loadMovieInOverviewAction(movieId))
    } else {
      dispatch(MoviesAction.clearMovieInOverviewAction())
    }
  }, [movieId, match.path])

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
  
  const onCreateMovie = useCallback(() => {
    dispatch(ModalsAction.setModalInViewAction({ modalType: ModalTypes.CREATE }));
  }, []);

  const onCloseModal = useCallback(() => {
    dispatch(ModalsAction.setModalInViewAction({ modalType: null }));
  }, []);

  const navigateToMainPage = useCallback(() => {
    history.push(RouterPaths.HOME);
  }, []);

  const navigateToSearchPage = useCallback(() => {
    history.push(RouterPaths.SEARCH + "?SearchQuery=");
  }, []);

  const setSearchingValue = useCallback((searchingValue: string) => {
    dispatch(MoviesAction.searchMoviesAction({ searchingValue, movieBoard: movieBoard.current }));
  }, []);

  return (
    <MainPage 
      modalInView={modalInView}
      movieInOverview={movieInOverview}
      movieBoard={movieBoard}
      movies={movies}
      isSuccessAlert={isSuccessAlert}
      selectedMovie={selectedMovie}
      alertMessage={alertMessage}
      movieInOverviewLoaded={movieInOverviewLoaded}
      navigateToMainPage={navigateToMainPage}
      onCreateMovie={onCreateMovie}
      navigateToSearchPage={navigateToSearchPage}
      setSearchingValue={setSearchingValue}
      onEditMovie={onEditMovie}
      onDeleteMovie={onDeleteMovie}
      onCloseModal={onCloseModal}
      onCloseWithSaving={onCloseWithSaving}
    />
  )
}

export default MainPageContainer;
