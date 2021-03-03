import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseMenuButton } from "../";
import classes from "./ModalWrapper.module.scss";

interface ModalWrapperProps {
  onCloseModal: () => void;
  header: string;
}

const portal = document.getElementById('portal');

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onCloseModal, header }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      if (portal.childNodes.length === 0) {
        document.body.style.overflow = "visible"
      }
    }
  }, []);

  return ReactDOM.createPortal((
    <div className={classes['modal-wrapper']}>
      <div className={classes['modal-wrapper__content-wrapper']}>
        <div className={classes['modal-wrapper__content']}>
          <CloseMenuButton onCloseButtonClicked={onCloseModal} />
          <h2 className={classes['modal-wrapper__header']} >{ header }</h2>
          <div className={classes['modal-wrapper__body']} >{ children }</div>
        </div>
      </div>
    </div>
    ), portal
  )
}

export default ModalWrapper;
