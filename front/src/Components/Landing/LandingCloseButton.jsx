import { useCookies } from "react-cookie";
import { FaXmark } from "react-icons/fa6";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";

const LandingCloseButton = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["landing"]);

  const handleClose = () => {
    setCookie("landing", true, { path: "/", expires: addDays(new Date(), 7) });
    navigate("/");
  };

  return (
    <button
      onClick={handleClose}
      className="self-end shadow-content flex gap-2 rounded-lg items-center py-3 px-4"
    >
      <span>일주일간 보지 않기</span>
      <FaXmark className="text-xl" />
    </button>
  );
};

export default LandingCloseButton;
