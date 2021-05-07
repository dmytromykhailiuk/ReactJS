import { Movie } from 'models/movie.model';
import React from 'react';
import { ModalWrapper } from '..';
import { Button } from '../Button';
import classes from './DeleteMovieModal.module.scss';

interface DeleteMovieModalProps {
  movie: Movie;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void;
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({ onCloseModal, onCloseWithSaving, movie }) => (
  <ModalWrapper header="DELETE MOVIE" onCloseModal={onCloseModal}>
    <div className={classes['delete-movie-modal__body']}>Are you sure you want to delete this movie?</div>
    <div className={classes['delete-movie-modal__control']}>
      <Button onButtonClicked={() => onCloseWithSaving(movie)}>Confirm</Button>
    </div>
  </ModalWrapper>
);

export default DeleteMovieModal;
