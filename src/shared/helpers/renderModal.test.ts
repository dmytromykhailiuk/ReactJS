import { AlertMovieModal, CreateMovieModal, DeleteMovieModal, EditMovieModal } from '../components';
import { renderModal } from './renderModal';
import { ModalTypes } from '../enums';

describe('renderModal', () => {
  it("should return DeleteMovieModal if call with 'ModalTypes.DELETE'", () => {
    expect(renderModal(ModalTypes.DELETE)).toEqual(DeleteMovieModal);
  });

  it("should return EditMovieModal if call with 'ModalTypes.EDIT'", () => {
    expect(renderModal(ModalTypes.EDIT)).toEqual(EditMovieModal);
  });

  it("should return CreateMovieModal if call with 'ModalTypes.CREATE'", () => {
    expect(renderModal(ModalTypes.CREATE)).toEqual(CreateMovieModal);
  });

  it("should return AlertMovieModal if call with 'ModalTypes.ALERT'", () => {
    expect(renderModal(ModalTypes.ALERT)).toEqual(AlertMovieModal);
  });
});
