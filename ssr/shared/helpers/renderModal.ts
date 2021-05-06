import {
  AlertMovieModal,
  CreateMovieModal,
  DeleteMovieModal,
  EditMovieModal,
} from "../components";
import { MovieModalProps } from "../../models/movie-modal-props";
import { ModalTypes } from "../enums";

export function renderModal(type: ModalTypes): React.FC<MovieModalProps> {
  switch (type) {
    case ModalTypes.CREATE: {
      return CreateMovieModal;
    }
    case ModalTypes.EDIT: {
      return EditMovieModal;
    }
    case ModalTypes.ALERT: {
      return AlertMovieModal;
    }
    default: {
      return DeleteMovieModal;
    }
  }
}
