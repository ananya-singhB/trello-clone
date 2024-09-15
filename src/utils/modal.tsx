import React from "react";
import { ModalPropTypes } from "./types";

const Modal: React.FC<ModalPropTypes> = ({ isOpen, onClose, children, title, actions }) => {
  if (!isOpen) return;

  //Under development 
  return (
    <div className="modal-container">
      <div className="modal-header">
        <div>{title}</div> 
        <div onClick={onClose}>close button</div>
      </div>
      <div className="modal-content">{children}</div>
      <div className="modal-actions">{actions}</div>
    </div>
  );
};

export default Modal;
