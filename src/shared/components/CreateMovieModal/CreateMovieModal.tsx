import { Movie } from 'models/';
import React from 'react';
import { ModalWrapper, MovieForm } from '../';

interface CreateMovieModalProps {
  onCloseModal: () => void;
  onSubmitForm: (movie: Movie) => void
}

const CreateMovieModal: React.FC<CreateMovieModalProps> = ({
  onCloseModal, onSubmitForm
}) => {
  return (
    <ModalWrapper header="ADD MOVIE" onCloseModal={onCloseModal}>
      <MovieForm onSubmitForm={onSubmitForm} submitButtonLabel="SUBMIT"/>
    </ModalWrapper>
  )
}

export default CreateMovieModal;
