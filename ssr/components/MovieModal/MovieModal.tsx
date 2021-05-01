import React, { useMemo } from "react";
import { ModalTypes } from "../../shared/enums";
import { renderModal } from "../../shared/helpers";
import { Movie } from "../../models";

interface MovieModalProps {
  modalInView: ModalTypes;
  movie: Movie;
  isSuccessAlert: boolean;
  alertMessage: string;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ 
  modalInView,
  movie,
  isSuccessAlert,
  alertMessage,
  onCloseModal,
  onCloseWithSaving,
}) => {

  const Modal = useMemo(() => renderModal(modalInView), [modalInView]);

  return (
    <Modal 
      movie={movie}
      isSuccessAlert={isSuccessAlert}
      alertMessage={alertMessage}
      onCloseModal={onCloseModal}
      onCloseWithSaving={onCloseWithSaving}
    />
  );
}

export default MovieModal;
