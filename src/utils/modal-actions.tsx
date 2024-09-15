import React from "react";
import { ModalActionPropsType } from "./types";

const ModalActions: React.FC<ModalActionPropsType> = ({
  primaryButton,
  secondaryButton,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className="actions-container">
      <div>
        {primaryButton ? (
          <button onClick={primaryAction}>{primaryButton}</button>
        ) : (
          <></>
        )}
      </div>
      <div>
        {secondaryButton ? (
          <button onClick={secondaryAction}>{secondaryButton}</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ModalActions;
