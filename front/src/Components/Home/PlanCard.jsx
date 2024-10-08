import { Link } from "react-router-dom";
import PlanDefaultImage from "../PlanDefaultImage";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const PlanCard = ({ plan }) => {
  return (
    <MotionLink
      initial={{ translateY: 0 }}
      whileHover={{ translateY: -10 }}
      to={`/plan/${plan.planId}`}
      className="w-[430px] h-[400px] rounded-lg shadow-xl bg-white flex flex-col justify-end p-4 relative"
    >
      {plan.plamImage ? (
        <img
          src={plan.plamImage}
          alt="여행 계획 대표 사진"
          className="absolute w-[430px] h-[430px] top-0 left-0 rounded-lg"
        />
      ) : (
        <PlanDefaultImage />
      )}
      <div className="text-lg text-white bg-black/50 z-10 rounded-lg py-2 px-4 w-fit">
        <p>{plan.planTitle}</p>
        <p>{plan.planUploadDate.substring(0, 10)}</p>
      </div>
    </MotionLink>
  );
};

export default PlanCard;
