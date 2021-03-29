import React, { useMemo } from "react";
import { Banner, MovieBoard } from "./components";
import { renderModal } from "shared/helpers"
import { Movie } from "models/";
import { ModalTypes } from "shared/enums";
import { SearchPanel, MovieItemDetails } from "./components";
import { Loader } from "shared/components";

const bluredStyles = {
  filter: 'blur(7px)',
}

const loaderWrapperStyles = { marginTop: "80px", marginBottom: "80px" };

export interface MainPageViewProps {
  modalInView: ModalTypes;
  movieInOverview: Movie;
  selectedMovie: Movie;
  movieBoard: React.MutableRefObject<any>;
  movies: Movie[];
  isSuccessAlert: boolean;
  alertMessage: string;
  movieInOverviewLoaded: boolean;
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
  movieInOverview, 
  movieBoard, 
  movieInOverviewLoaded, 
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
          isMovieInOverviewMode={Boolean(movieInOverview)}
          onCreateMovie={onCreateMovie}
          onLogoClicked={navigateToMainPage}
          onSearchIconClicked={navigateToSearchPage}
        >
          { movieInOverview && movieInOverviewLoaded ? (
            <MovieItemDetails movie={movieInOverview}/>
          ):(
            <>
              { movieInOverviewLoaded ? (
                <SearchPanel onChangeSearchingValue={setSearchingValue} />
              ):(
                <div style={loaderWrapperStyles}><Loader /></div>
              ) } 
            </>     
          )} 
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
