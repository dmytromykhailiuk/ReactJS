import { MainPageModes } from "shared/enums";
import React, { useCallback } from "react";
import { CreateMovieModal, DeleteMovieModal, EditMovieModal } from "shared/components";
import { Movie } from "models/movie.model";

interface MovieModalProps {
  type: MainPageModes;
  selectedMovie: Movie;
  onCloseModal: () => void;
  onCloseWithSaving: (movie: Movie) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ type, selectedMovie, onCloseModal, onCloseWithSaving }) => {
  
  const onConfirmedDeleting = useCallback(() => {
    onCloseWithSaving(selectedMovie);
  }, [selectedMovie]);

  switch(type) {
    case MainPageModes.CREATE : {
      return <CreateMovieModal onCloseModal={onCloseModal} onSubmitForm={onCloseWithSaving}/>
    }
    case MainPageModes.EDIT : {
      return <EditMovieModal onCloseModal={onCloseModal} onSubmitForm={onCloseWithSaving} movie={selectedMovie} />
    }
    case MainPageModes.DELETE : {
      return <DeleteMovieModal onCloseModal={onCloseModal} onConfirmedDeleting={onConfirmedDeleting} />
    }
    default : {
      return <></>
    }
  }
}

export default MovieModal;
