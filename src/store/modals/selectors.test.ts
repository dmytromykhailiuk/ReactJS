import { modalInViewSelector, alertMessageSelector, isSuccessAlertSelector, errorMessagesSelector } from './selectors';
import { Store } from '..';

describe('Modals State Selectors', () => {
  let modalsStateMock: Store;

  beforeEach(() => {
    modalsStateMock = {
      modals: {
        modalInView: null,
        alertMessage: '',
        isSuccessAlert: true,
      },
    } as any;
  });

  describe('modalInViewSelector', () => {
    it("should return 'modalInView' value", () => {
      expect(modalInViewSelector(modalsStateMock)).toEqual(modalsStateMock.modals.modalInView);
    });
  });

  describe('errorMessagesSelector', () => {
    it("should return 'errorMessages' data", () => {
      expect(errorMessagesSelector(modalsStateMock)).toEqual(modalsStateMock.modals.errorMessages);
    });
  });

  describe('alertMessageSelector', () => {
    it("should return 'alertMessage' value", () => {
      expect(alertMessageSelector(modalsStateMock)).toEqual(modalsStateMock.modals.alertMessage);
    });
  });

  describe('isSuccessAlertSelector', () => {
    it("should return 'isSuccessAlert' value", () => {
      expect(isSuccessAlertSelector(modalsStateMock)).toEqual(modalsStateMock.modals.isSuccessAlert);
    });
  });
});
