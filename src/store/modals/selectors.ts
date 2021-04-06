import { createSelector } from "reselect";
import { ModalsState } from "./reducer";

const modalsSelector = (state: { modals: ModalsState }) => state.modals;

export const modalInViewSelector = createSelector(
  modalsSelector,
  (modals) => modals.modalInView
);

export const alertMessageSelector = createSelector(
  modalsSelector,
  (modals) => modals.alertMessage
);

export const isSuccessAlertSelector = createSelector(
  modalsSelector,
  (modals) => modals.isSuccessAlert
);

export const errorMessagesSelector = createSelector(
  modalsSelector,
  (modals) => modals.errorMessages
);
