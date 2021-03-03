import { Movie } from 'models/';
import React from 'react';
import { ModalWrapper, MovieForm } from '../';

interface EditMovieModalProps {
  movie: Movie;
  onCloseModal: () => void;
  onSubmitForm: (movie: Movie) => void
}

const EditMovieModal: React.FC<EditMovieModalProps> = ({
  movie, onCloseModal, onSubmitForm
}) => {
  return (
    <ModalWrapper header="EDIT MOVIE" onCloseModal={onCloseModal}>
      <MovieForm onSubmitForm={onSubmitForm} movie={movie}/>
    </ModalWrapper>
  )
}

export default EditMovieModal
