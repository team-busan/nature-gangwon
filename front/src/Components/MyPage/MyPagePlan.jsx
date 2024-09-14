import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PlanDefaultImage from "../PlanDefaultImage";

const MyPagePlan = ({ plan }) => {
  const render = () => {
    if (plan.PlanImage) {
      return (
        <div className="w-full h-full rounded-xl">
          <div className="w-full h-full rounded-xl bg-black/40 p-5 flex flex-col justify-between text-white">
            <p className="text-lg">{plan.planTitle}</p>
            <div>
              <p className="text-right">{plan.startDate.substring(0, 10)} ~</p>
              <p className="text-right">{plan.endDate.substring(0, 10)}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="max-w-[242.5px] h-full max-h-[242.5px] relative">
          <PlanDefaultImage />
          <div className="absolute left-0 top-0 p-5 w-full h-full flex flex-col justify-between">
            <p className="text-lg">{plan.planTitle}</p>
            <div>
              <p className="text-right">{plan.startDate.substring(0, 10)}</p>
              <p className="text-right">{plan.endDate.substring(0, 10)}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.li
      initial={{ translateY: 0 }}
      whileHover={{ translateY: -3 }}
      className="rounded-xl aspect-square shadow-content"
    >
      <Link to={`/plan/${plan.planId}`}>{render()}</Link>
    </motion.li>
  );
};

export default MyPagePlan;
