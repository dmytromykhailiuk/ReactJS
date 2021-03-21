import { Movie } from "./movie.model";

export interface MovieModalProps {
  movie?: Movie;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void;
}
