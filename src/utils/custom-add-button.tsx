import { FaPlusCircle } from "react-icons/fa";

const CustomAddButton = ({
  title,
  handleClick,
}: {
  title: string;
  handleClick: () => void;
}) => {
  return (
    <button className="custom-btn" onClick={handleClick}>
      <FaPlusCircle />
      <span className="custom-btn-title">{title}</span>
    </button>
  );
};

export default CustomAddButton;
