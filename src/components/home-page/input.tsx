import React from "react";

const Input = ({
  inputType,
  value,
  setValue,
}: {
  inputType: string;
  value: string;
  setValue: (_: string) => void;
}) => {
  if (inputType === "textarea") {
    return (
      <textarea
        className="textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  return (
    <input
      className="input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
