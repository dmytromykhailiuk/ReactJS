import React from 'react';
import ReactDOM from 'react-dom';
import { CloseMenuButton } from '..';
import classes from './ModalWrapper.module.scss';

export interface ModalWrapperViewProps {
  modalWrapperRef: React.MutableRefObject<any>;
  errorMessages: string[];
  header?: string;
  onCloseModal: () => void;
}

const portal = document.getElementById('portal');

const ModalWrapperView: React.FC<ModalWrapperViewProps> = ({
  children,
  modalWrapperRef,
  errorMessages,
  header = null,
  onCloseModal,
}) =>
  ReactDOM.createPortal(
    <div className={classes['modal-wrapper']}>
      <div ref={modalWrapperRef} className={classes['modal-wrapper__content-wrapper']}>
        <div className={classes['modal-wrapper__content']}>
          <CloseMenuButton onCloseButtonClicked={onCloseModal} />
          {header && <h2 className={classes['modal-wrapper__header']}>{header}</h2>}
          {errorMessages.length > 0 && (
            <div className={classes['modal-wrapper__errors']}>
              {errorMessages.map((error) => (
                <div key={error} className={classes['modal-wrapper__error']}>
                  {error}
                </div>
              ))}
            </div>
          )}
          <div className={classes['modal-wrapper__body']}>{children}</div>
        </div>
      </div>
    </div>,
    portal,
  );

export default ModalWrapperView;
