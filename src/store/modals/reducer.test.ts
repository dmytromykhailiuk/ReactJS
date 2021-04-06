import { modalsReducer, ModalsState, AlertMessages } from "./reducer";
import { ModalTypes } from "../../shared/enums";
import { setErrorMessagesAction, setModalInViewAction } from "./actions";
import { MoviesAction } from "../movies";

const modalsState: ModalsState = {
  modalInView: null,
  alertMessage: "",
  isSuccessAlert: true,
  errorMessages: [],
};

const UNEXPECTED_TYPE = "UNEXPECTED";

describe("modalsReducer", () => {
  describe("default case", () => {
    it("should return same state", () => {
      expect(modalsReducer(modalsState, { type: UNEXPECTED_TYPE })).toEqual(
        modalsState
      );
    });
  });

  describe("setModalInViewAction", () => {
    it("should return state with new modalInView data", () => {
      const modalInView = ModalTypes.CREATE;
      expect(
        modalsReducer(
          modalsState,
          setModalInViewAction({ modalType: modalInView })
        )
      ).toEqual({ ...modalsState, modalInView });
    });
  });

  describe("setErrorMessagesAction", () => {
    it("should return state with new errorMessages data", () => {
      const errorMessages = ["1"];
      expect(
        modalsReducer(modalsState, setErrorMessagesAction(errorMessages))
      ).toEqual({ ...modalsState, errorMessages });
    });
  });

  describe("MoviesAction.addMovieSuccessAction", () => {
    it("should return with new data", () => {
      expect(
        modalsReducer(
          modalsState,
          MoviesAction.addMovieSuccessAction({} as any)
        )
      ).toEqual({
        ...modalsState,
        isSuccessAlert: true,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.SUCCESS_ADD,
      });
    });
  });

  describe("MoviesAction.editMovieSuccessAction", () => {
    it("should return with new data", () => {
      expect(
        modalsReducer(
          modalsState,
          MoviesAction.editMovieSuccessAction({} as any)
        )
      ).toEqual({
        ...modalsState,
        isSuccessAlert: true,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.SUCCESS_EDIT,
      });
    });
  });

  describe("MoviesAction.deleteMovieSuccessAction", () => {
    it("should return with new data", () => {
      expect(
        modalsReducer(
          modalsState,
          MoviesAction.deleteMovieSuccessAction({} as any)
        )
      ).toEqual({
        ...modalsState,
        isSuccessAlert: true,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.SUCCESS_DELETE,
      });
    });
  });

  describe("MoviesAction.addMovieFaildAction", () => {
    it("should return with new data", () => {
      expect(
        modalsReducer(modalsState, MoviesAction.addMovieFaildAction())
      ).toEqual({
        ...modalsState,
        isSuccessAlert: false,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.FAILED_ADD,
      });
    });
  });

  describe("MoviesAction.editMovieFaildAction", () => {
    it("should return with new data", () => {
      expect(
        modalsReducer(modalsState, MoviesAction.editMovieFaildAction())
      ).toEqual({
        ...modalsState,
        isSuccessAlert: false,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.FAILED_EDIT,
      });
    });
  });

  describe("MoviesAction.deleteMovieFaildAction", () => {
    it("should return with new data", () => {
      expect(
        modalsReducer(modalsState, MoviesAction.deleteMovieFaildAction())
      ).toEqual({
        ...modalsState,
        isSuccessAlert: false,
        modalInView: ModalTypes.ALERT,
        alertMessage: AlertMessages.FAILED_DELETE,
      });
    });
  });
});
