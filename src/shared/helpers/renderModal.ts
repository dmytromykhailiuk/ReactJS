import {
  CreateMovieModal,
  DeleteMovieModal,
  EditMovieModal,
} from "shared/components";
import { MovieModalProps } from "models/movie-modal-props";
import { MainPageModes } from "shared/enums";

export function renderModal(mode: MainPageModes): React.FC<MovieModalProps> {
  switch (mode) {
    case MainPageModes.CREATE: {
      return CreateMovieModal;
    }
    case MainPageModes.EDIT: {
      return EditMovieModal;
    }
    default: {
      return DeleteMovieModal;
    }
  }
}
