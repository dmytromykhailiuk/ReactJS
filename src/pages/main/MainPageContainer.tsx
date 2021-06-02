import { ModalTypes, RouterPaths } from 'shared/enums';
import { Movie } from 'models/movie.model';
import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalsAction, ModalsSelector, MoviesAction, MoviesSelector, Store } from 'store';
import { useHistory } from 'react-router';
import { scrollToElement } from 'shared/helpers';
import { MainPageViewProps } from './MainPageView';

const MainPageContainer = (MainPageView: React.FC<MainPageViewProps>) => () => {
  const movies = useSelector<Store, Movie[]>(MoviesSelector.moviesDataSelector);
  const selectedMovie = useSelector<Store, Movie>(MoviesSelector.selectedMovieSelector);
  const modalInView = useSelector<Store, ModalTypes>(ModalsSelector.modalInViewSelector);
  const isSuccessAlert = useSelector<Store, boolean>(ModalsSelector.isSuccessAlertSelector);
  const alertMessage = useSelector<Store, string>(ModalsSelector.alertMessageSelector);
  const movieInOverview = useSelector<Store, Movie>(MoviesSelector.movieInOverviewSelector);
  const history = useHistory();
  const movieBoard = useRef(null);

  const dispatch = useDispatch();

  const onCloseWithSaving = useCallback(
    (movie: Movie) => {
      switch (modalInView) {
        case ModalTypes.CREATE: {
          return dispatch(MoviesAction.addMovieAction(movie));
        }
        case ModalTypes.EDIT: {
          return dispatch(MoviesAction.editMovieAction(movie));
        }
        case ModalTypes.DELETE: {
          return dispatch(
            MoviesAction.deleteMovieAction({
              id: movie.id,
              shouldNavigateToHome: movie.id === movieInOverview?.id,
            }),
          );
        }
      }
    },
    [modalInView, movieInOverview],
  );

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
    history.push(`${RouterPaths.SEARCH}?SearchQuery=`);
  }, []);

  const scrollToMovies = useCallback(() => {
    scrollToElement(movieBoard.current);
  }, []);

  const setSearchingValue = useCallback((searchingValue: string) => {
    dispatch(MoviesAction.searchMoviesAction({ searchingValue, scrollToMovies }));
  }, []);

  return (
    <MainPageView
      modalInView={modalInView}
      hasMovieInOverview={Boolean(movieInOverview)}
      movieBoard={movieBoard}
      movies={movies}
      isSuccessAlert={isSuccessAlert}
      selectedMovie={selectedMovie}
      alertMessage={alertMessage}
      navigateToMainPage={navigateToMainPage}
      onCreateMovie={onCreateMovie}
      navigateToSearchPage={navigateToSearchPage}
      setSearchingValue={setSearchingValue}
      onEditMovie={onEditMovie}
      onDeleteMovie={onDeleteMovie}
      onCloseModal={onCloseModal}
      onCloseWithSaving={onCloseWithSaving}
    />
  );
};

export default MainPageContainer;
