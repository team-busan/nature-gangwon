import { forwardRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import {
  optionChangedState,
  pageState,
} from "../../state/planSearchQueryStates";
import { useRecoilState } from "recoil";

const PlanSelect = forwardRef(
  ({ label, id, value, setValue, open, setOpen, list, refetch }, ref) => {
    const [page, setPage] = useRecoilState(pageState);
    const [optionChanged, setOptionChanged] =
      useRecoilState(optionChangedState);

    return (
      <div ref={ref} className="relative w-full">
        <label htmlFor={id} className="absolute left-2 top-2.5 cursor-pointer">
          {label}
        </label>
        <input
          type="button"
          id={id}
          value={value ? value : "전체"}
          onClick={() => setOpen(!open)}
          className={`w-full cursor-pointer py-2 border-[1px] rounded-lg ${
            open ? "border-darkGreen" : "border-black"
          }`}
        />
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          className="absolute right-0 top-1 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <MdArrowDropDown className="text-3xl" />
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-[1px] border-gray-300 rounded-xl absolute top-[40px] w-full bg-white z-10"
            >
              {list.map((item, idx) => (
                <motion.li
                  initial={{ backgroundColor: "#FFFFFF" }}
                  whileHover={{ backgroundColor: "#C7F7C6" }}
                  className="cursor-pointer p-2 first:rounded-t-xl last:rounded-b-xl"
                  key={idx}
                  onClick={() => {
                    setValue(item);
                    setPage(1);
                    setOptionChanged(true);
                    setOpen(!open);
                  }}
                >
                  {item ? item : "전체"}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default PlanSelect;
