import React from "react";
import { ModalPropTypes } from "./types";
import "./styles.css";
import { FaTimes } from "react-icons/fa";

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
        <h3 className="title">{title}</h3>
        <button className="btn" onClick={onClose} type="button">
          <FaTimes />
        </button>
      </div>
      <div className="modal-content">{children}</div>
      {actions && <div className="modal-actions">{actions}</div>}
    </div>
  );
};

export default Modal;
