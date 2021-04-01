import { createReducer } from "@reduxjs/toolkit";
import { ModalTypes } from "shared/enums";
import { MoviesAction } from "store/movies";
import { setModalInViewAction } from "./actions";

export interface ModalsState {
  modalInView: ModalTypes;
  alertMessage: string;
  isSuccessAlert: boolean;
}

const modalsInitialState: ModalsState = {
  modalInView: null,
  alertMessage: "",
  isSuccessAlert: true,
};

export enum AlertMessages {
  SUCCESS_ADD = "The movie has been added to database successfully",
  SUCCESS_EDIT = "The movie has been edited in database successfully",
  SUCCESS_DELETE = "The movie has been deleted from database successfully",
  FAILED_ADD = "The movie has not been added to database. Please try again",
  FAILED_EDIT = "The movie has not been edited in database. Please try again",
  FAILED_DELETE = "The movie has not been deleted from database. Please try again",
}

export const modalsReducer = createReducer<ModalsState>(
  modalsInitialState,
  (builder) =>
    builder
      .addCase(
        setModalInViewAction,
        (state, { payload: { modalType: modalInView } }) => ({
          ...state,
          modalInView,
        })
      )
      .addCase(MoviesAction.addMovieSuccessAction, (state) => ({
        ...state,
        isSuccessAlert: true,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.SUCCESS_ADD,
      }))
      .addCase(MoviesAction.editMovieSuccessAction, (state) => ({
        ...state,
        isSuccessAlert: true,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.SUCCESS_EDIT,
      }))
      .addCase(MoviesAction.deleteMovieSuccessAction, (state) => ({
        ...state,
        isSuccessAlert: true,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.SUCCESS_DELETE,
      }))
      .addCase(MoviesAction.addMovieFaildAction, (state) => ({
        ...state,
        isSuccessAlert: false,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.FAILED_ADD,
      }))
      .addCase(MoviesAction.editMovieFaildAction, (state) => ({
        ...state,
        isSuccessAlert: false,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.FAILED_EDIT,
      }))
      .addCase(MoviesAction.deleteMovieFaildAction, (state) => ({
        ...state,
        isSuccessAlert: false,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.FAILED_DELETE,
      }))
);
