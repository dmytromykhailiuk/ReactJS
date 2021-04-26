import { Movie } from '../../../models';
import React from 'react';
import { ModalWrapper, MovieForm } from '../';

interface EditMovieModalProps {
  movie: Movie;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void
}

const EditMovieModal: React.FC<EditMovieModalProps> = ({
  movie, onCloseModal, onCloseWithSaving
}) => {
  return (
    <ModalWrapper header="EDIT MOVIE" onCloseModal={onCloseModal}>
      <MovieForm onSubmitForm={onCloseWithSaving} movie={movie}/>
    </ModalWrapper>
  )
}

export default EditMovieModal
