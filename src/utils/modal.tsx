import React from "react";
import { ModalPropTypes } from "./types";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  actions,
}: ModalPropTypes) => {
  if (!isOpen) return null;

  //Under development
  return (
    <div className="modal-container">
      <div className="modal-header">
        <div>{title}</div>
        <div onClick={onClose}>close button</div>
      </div>
      <div className="modal-content">{children}</div>
      {actions && <div className="modal-actions">{actions}</div>}
    </div>
  );
};

export default Modal;
