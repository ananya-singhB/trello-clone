const Input = ({
  inputType,
  value,
  setValue,
  placeholder
}: {
  inputType: string;
  value: string;
  setValue: (_: string) => void;
  placeholder: string;
}) => {
  if (inputType === "textarea") {
    return (
      <textarea
        className="textarea-card"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    );
  }

  return (
    <input
      className="input-list"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
