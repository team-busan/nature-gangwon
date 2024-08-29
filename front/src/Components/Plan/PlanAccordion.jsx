import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useRecoilState } from "recoil";
import { planPhotoAccordianState } from "../../state/planState";

import { FaAngleDown } from "react-icons/fa6";
import PlanAccordionItem from "./PlanAccordionItem";
import { useEffect } from "react";

const PlanAccordion = ({ day, idx }) => {
  const [open, setOpen] = useRecoilState(planPhotoAccordianState);
  const control = useAnimationControls();

  const variants = {
    fold: { rotate: 0, backgroundColor: "#4b5563" },
    unfold: { rotate: 180, backgroundColor: "#00a05b" },
  };

  const handleClick = () => {
    setOpen(idx);
  };

  useEffect(() => {
    if (open === idx) {
      control.start("unfold");
    } else {
      control.start("fold");
    }
  }, [open]);

  return (
    <li className="flex flex-col gap-2.5">
      <div
        onClick={handleClick}
        className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow cursor-pointer"
      >
        <span className="text-lg">{idx + 1 + "일차"}</span>
        <motion.div
          variants={variants}
          animate={control}
          className={` w-8 h-8 flex items-center justify-center rounded-full ${
            open === idx ? "rotate-180 bg-green" : "bg-gray-600"
          }`}
        >
          <FaAngleDown className="text-2xl text-white" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open === idx && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "min-content" }}
            exit={{ height: 0 }}
            className="overflow-y-hidden shadow"
          >
            {day.map((item, idx2) => (
              <PlanAccordionItem key={idx2} item={item} idx2={idx2} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default PlanAccordion;
