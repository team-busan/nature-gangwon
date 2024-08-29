import { motion, useAnimationControls } from "framer-motion";
import { useRecoilState } from "recoil";
import { planPhotoAccordianItemState } from "../../state/planState";

import { FaAngleLeft } from "react-icons/fa6";
import { useEffect } from "react";

const PlanAccordionItem = ({ item, idx2 }) => {
  const [open, setOpen] = useRecoilState(planPhotoAccordianItemState);
  const control = useAnimationControls();

  const variants = {
    fold: { rotate: 0, backgroundColor: "#4b5563" },
    unfold: { rotate: 180, backgroundColor: "#00a05b" },
  };

  const handleClick = () => {
    setOpen(idx2);
  };

  useEffect(() => {
    if (open === idx2) {
      control.start("unfold");
    } else {
      control.start("fold");
    }
  }, [open]);

  return (
    <li
      onClick={handleClick}
      className="flex items-center justify-between bg-white p-4 w-full first:rounded-t-lg last:rounded-b-lg border-[1px] border-gray-200 cursor-pointer"
    >
      <span>{item.locationTitle}</span>
      <motion.div
        variants={variants}
        animate={control}
        className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-600"
      >
        <FaAngleLeft className="text-xl text-white" />
      </motion.div>
    </li>
  );
};

export default PlanAccordionItem;
