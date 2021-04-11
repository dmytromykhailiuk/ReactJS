import React, { useMemo } from "react";
import { Banner, MovieBoard } from "./components";
import { renderModal } from "shared/helpers"
import { Movie } from "models/";
import { ModalTypes, RouterPaths } from "shared/enums";
import { SearchPanel, MovieItemDetails } from "./components";
import { Switch, Route } from "react-router";

const bluredStyles = {
  filter: 'blur(7px)',
}

export interface MainPageViewProps {
  modalInView: ModalTypes;
  hasMovieInOverview: boolean;
  selectedMovie: Movie;
  movieBoard: React.MutableRefObject<any>;
  movies: Movie[];
  isSuccessAlert: boolean;
  alertMessage: string;
  navigateToMainPage: () => void;
  onCreateMovie: () => void;
  navigateToSearchPage: () => void;
  setSearchingValue: (searchingValue: string) => void;
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void;
}

const MainPageView: React.FC<MainPageViewProps> = ({ 
  modalInView, 
  hasMovieInOverview, 
  movieBoard,
  movies, 
  isSuccessAlert, 
  selectedMovie, 
  alertMessage, 
  navigateToMainPage, 
  onCreateMovie, 
  navigateToSearchPage, 
  setSearchingValue, 
  onEditMovie, 
  onDeleteMovie, 
  onCloseModal, 
  onCloseWithSaving
}) => {

  const Modal = useMemo(() => renderModal(modalInView), [modalInView]);
  
  const contentStyles = modalInView ? bluredStyles: {};

  return (
    <>
      <header style={contentStyles}>
        <Banner
          isMovieInOverviewMode={hasMovieInOverview}
          onCreateMovie={onCreateMovie}
          onLogoClicked={navigateToMainPage}
          onSearchIconClicked={navigateToSearchPage}
        >
          <Switch>
            <Route 
              path={RouterPaths.FILM} 
              component={MovieItemDetails} 
            />
            <Route path={[RouterPaths.HOME, RouterPaths.SEARCH]} exact>
              <SearchPanel onChangeSearchingValue={setSearchingValue} />
            </Route>
          </Switch>
        </Banner>
      </header>

      <main style={contentStyles}>
        <MovieBoard
          movieBoardRef={movieBoard}
          movies={movies}
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

export default MainPageView;
