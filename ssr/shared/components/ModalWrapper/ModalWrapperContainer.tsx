import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { errorMessagesSelector } from "../../../store/modals/selectors";
import { ModalWrapperViewProps } from "./ModalWrapperView";

interface ModalWrapperContainerProps {
  header?: string;
  onCloseModal: () => void;
}

const ModalWrapperContainer = (View: React.FC<ModalWrapperViewProps>): React.FC<ModalWrapperContainerProps> => ({ header = null, onCloseModal, children }) => {

  const errorMessages: string[] = useSelector(errorMessagesSelector);
  const modalWrapperRef = useRef();

  useMemo(() => {
    if(errorMessages.length) {
      (modalWrapperRef?.current as HTMLElement).scrollTop = 0;
    }
  }, [errorMessages])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "visible"
    }
  }, []);

  return (
    <View
      modalWrapperRef={modalWrapperRef}
      errorMessages={errorMessages}
      header={header} 
      onCloseModal={onCloseModal}
    >
      { children }
    </View>
  )
}

export default ModalWrapperContainer;