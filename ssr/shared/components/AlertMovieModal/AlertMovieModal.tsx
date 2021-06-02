import React from 'react';
import { ModalWrapper } from '../';
import { CheckboxIcon } from '../CheckboxIcon';
import classes from './AlertMovieModal.module.scss';

interface AlertMovieModalProps {
  isSuccessAlert: boolean;
  alertMessage: string;
  onCloseModal: () => void;
}

const AlertMovieModal: React.FC<AlertMovieModalProps> = ({ onCloseModal, isSuccessAlert, alertMessage }) => {
  return (
    <ModalWrapper onCloseModal={onCloseModal}>
      <div className={classes['alert-movie-modal__logo']}>{isSuccessAlert ? <CheckboxIcon isLarge /> : '!'}</div>
      <div className={classes['alert-movie-modal__title']}>
        {isSuccessAlert ? 'CONGRADULATIONS !' : 'SOMETHING WENT WRONG !'}
      </div>
      <div className={classes['alert-movie-modal__message']}>{alertMessage}</div>
    </ModalWrapper>
  );
};

export default AlertMovieModal;
