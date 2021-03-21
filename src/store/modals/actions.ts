import { Movie } from "models/movie.model";
import { createAction } from "@reduxjs/toolkit";
import { ModalTypes } from "shared/enums";

const prefix = "[Modals]";

interface SetModalInViewActionPeyload {
  modalType: ModalTypes;
  selectedMovie?: Movie;
}

export const setModalInViewAction = createAction<SetModalInViewActionPeyload>(
  `${prefix} Set Modal In View`
);
