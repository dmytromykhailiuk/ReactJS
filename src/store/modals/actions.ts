import { Movie } from "models/movie.model";
import { createAction } from "@reduxjs/toolkit";
import { ModalTypes } from "shared/enums";

const prefix = "[Modals]";

interface SetModalInViewActionPayload {
  modalType: ModalTypes;
  selectedMovie?: Movie;
}

export const setModalInViewAction = createAction<SetModalInViewActionPayload>(
  `${prefix} Set Modal In View`
);

export const setErrorMessagesAction = createAction<string[]>(
  `${prefix} Set Error Messages`
);
