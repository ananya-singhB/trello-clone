import React from "react";
import { ModalActionPropsType } from "./types";

const ModalActions: React.FC<ModalActionPropsType> = ({
  primaryButton,
  secondaryButton,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <>
      <div>
        {secondaryButton ? (
          <button className="secondary-button" onClick={secondaryAction}>
            {secondaryButton}
          </button>
        ) : (
          ""
        )}
      </div>
      <div>
        {primaryButton ? (
          <button className="primary-button" onClick={primaryAction}>
            {primaryButton}
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ModalActions;
