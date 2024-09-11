import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyPagePlan = ({ plan }) => {
  return (
    <motion.li
      initial={{ translateY: 0 }}
      whileHover={{ translateY: -3 }}
      className="rounded-xl aspect-square relative shadow-content"
    >
      <Link to={`/plan/${plan.planId}`}>
        <div className="w-full h-full object-cover rounded-xl">
          <div className="absolute left-0 top-0 w-full h-full rounded-xl bg-black/40 p-5 flex flex-col justify-between text-white">
            <p className="text-lg">{plan.planTitle}</p>
            <div>
              <p className="text-right">{plan.startDate.substring(0, 10)} ~</p>
              <p className="text-right">{plan.endDate.substring(0, 10)}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};

export default MyPagePlan;
