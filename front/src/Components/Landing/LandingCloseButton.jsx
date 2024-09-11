import { FaXmark } from "react-icons/fa6";

const LandingCloseButton = () => {
  return (
    <button className="self-end shadow-content flex gap-2 rounded-lg items-center py-3 px-4">
      <span>일주일간 보지 않기</span>
      <FaXmark className="text-xl" />
    </button>
  );
};

export default LandingCloseButton;
