import React, { useMemo } from "react";
import { MovieBoard } from "../";
import { renderModal } from "../../shared/helpers"
import { Movie } from "../../models/";
import { ModalTypes } from "../../shared/enums";

const bluredStyles = {
  filter: 'blur(7px)',
}

export interface MovieBoardWrapperViewProps {
  modalInView: ModalTypes;
  selectedMovie: Movie;
  movies: Movie[];
  isSuccessAlert: boolean;
  alertMessage: string;
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void;
}

const MovieBoardWrapperView: React.FC<MovieBoardWrapperViewProps> = ({ 
  modalInView, 
  movies, 
  isSuccessAlert, 
  selectedMovie, 
  alertMessage, 
  onEditMovie, 
  onDeleteMovie, 
  onCloseModal, 
  onCloseWithSaving,
}) => {

  const Modal = useMemo(() => renderModal(modalInView), [modalInView]);
  
  const contentStyles = modalInView ? bluredStyles: {};

  return (
    <>
      <main style={contentStyles}>
        <MovieBoard
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

export default MovieBoardWrapperView;
