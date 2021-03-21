import React, { useCallback, useMemo, useRef } from "react";
import { Banner, MovieBoard } from "./components";
import { filterMoviesBySearchingValue, renderModal, scrollToElement } from "shared/helpers"
import { Movie } from "models/";
import { ModalTypes, RouterPaths } from "shared/enums";
import { Redirect, useHistory, useParams, useRouteMatch } from "react-router";
import { useSearchQuery } from "shared/hooks";
import { useDispatch, useSelector } from "react-redux";
import { MoviesAction, ModalsAction, Store, ModalsSelector, MoviesSelector } from "store";
import { SearchPanel, MovieItemDetails } from "./components";

const bluredStyles = {
  filter: 'blur(7px)',
}

interface Params {
  id: string; 
}

const MainPage: React.FC = () => {
  const movies = useSelector<Store, Movie[]>(MoviesSelector.moviesDataSelector);
  const selectedMovie = useSelector<Store, Movie>(MoviesSelector.selectedMovieSelector);
  const modalInView = useSelector<Store, ModalTypes>(ModalsSelector.modalInViewSelector);
  const isSuccessAlert = useSelector<Store, boolean>(ModalsSelector.isSuccessAlertSelector);
  const alertMessage = useSelector<Store, string>(ModalsSelector.alertMessageSelector);
  const searchingValue = useSearchQuery();
  const { id: movieId } = useParams<Params>();
  const history = useHistory();
  const match = useRouteMatch();
  const movieBoard = useRef(null);

  const dispatch = useDispatch();

  const movieInOverview = useMemo(() => movies.find(movie => movie.id === Number(movieId)), [movieId, movies]);

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
    history.push("/");
  }, []);

  const navigateToSearchPage = useCallback(() => {
    history.push("/search?SearchQuery=");
  }, []);

  const setSearchingValue = useCallback((searchingValue) => {
    history.push("/search?SearchQuery=" + searchingValue);
    scrollToElement(movieBoard.current);
  }, [])
  
  const filteredMovies = useMemo(() => filterMoviesBySearchingValue(movies, searchingValue), [searchingValue, movies]);

  const Modal = useMemo(() => renderModal(modalInView), [modalInView]);
  
  const contentStyles = modalInView ? bluredStyles: {};

  if (!movieInOverview && movies.length && match.path === RouterPaths.FILM) {
    return <Redirect to={RouterPaths.ERROR}/>
  }

  return (
    <>
      <header style={contentStyles}>
        <Banner
          isMovieInOverviewMode={Boolean(movieInOverview)}
          onCreateMovie={onCreateMovie}
          onLogoClicked={navigateToMainPage}
          onSearchIconClicked={navigateToSearchPage}
        >
          { movieInOverview ? <MovieItemDetails movie={movieInOverview}/> : <SearchPanel onChangeSearchingValue={setSearchingValue} /> }
        </Banner>
      </header>

      <main style={contentStyles}>
        <MovieBoard
          movieBoardRef={movieBoard}
          movies={filteredMovies}
          onEditMovie={onEditMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>

      { modalInView && (
        <Modal 
          movie={selectedMovie}
          isSuccessAlert={isSuccessAlert}
          alertMessage={alertMessage}
          onCloseModal={onCloseModal}
          onCloseWithSaving={onCloseWithSaving}
        />) }
    </>
  )
}

export default MainPage;
