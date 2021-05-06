import { Movie } from "./movie.model";

export interface MovieModalProps {
  movie?: Movie;
  isSuccessAlert?: boolean;
  alertMessage?: string;
  onCloseModal: () => void;
  onCloseWithSaving?: (movie: Movie) => void;
}
