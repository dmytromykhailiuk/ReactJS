import React from 'react';
import { ModalWrapper } from '../';
import { Button } from '../Button';
import classes from "./DeleteMovieModal.module.scss";

interface DeleteMovieModalProps {
  onCloseModal: () => void;
  onConfirmedDeleting: () => void;
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({ onCloseModal, onConfirmedDeleting }) => {
  return (
    <ModalWrapper header="DELETE MOVIE" onCloseModal={onCloseModal}>
      <div className={classes['delete-movie-modal__body']}>Are you sure you want to delete this movie?</div>
      <div className={classes['delete-movie-modal__control']}>
        <Button onButtonClicked={onConfirmedDeleting}>Confirm</Button>
      </div>
    </ModalWrapper>
  )
}

export default DeleteMovieModal;
