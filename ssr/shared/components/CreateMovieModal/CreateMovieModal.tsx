import { Movie } from '../../../models';
import React from 'react';
import { ModalWrapper, MovieForm } from '../';

interface CreateMovieModalProps {
  movie?: Movie;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void
}

const CreateMovieModal: React.FC<CreateMovieModalProps> = ({
  onCloseModal, onCloseWithSaving
}) => {
  return (
    <ModalWrapper header="ADD MOVIE" onCloseModal={onCloseModal}>
      <MovieForm onSubmitForm={onCloseWithSaving} submitButtonLabel="SUBMIT"/>
    </ModalWrapper>
  )
}

export default CreateMovieModal;
