import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Plans = ({ plan }) => {
  return (
    <ul className="grid grid-cols-4 justify-between gap-6">
      {plan.map((item, idx) => (
        <motion.li
          initial={{ translateY: 0 }}
          whileHover={{ translateY: -3 }}
          className="rounded-xl aspect-square relative shadow-content"
          key={idx}
        >
          <Link to={"/"}>
            <div className="bg-random w-full h-full object-cover rounded-xl">
              <div className="absolute left-0 top-0 w-full h-full rounded-xl bg-black/40 p-5 flex flex-col justify-between text-white">
                <p className="text-lg">{item.plan_title}</p>
                <div>
                  <p className="text-right">
                    {item.start_date.toDateString()} ~
                  </p>
                  <p className="text-right">{item.end_date.toDateString()}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default Plans;
