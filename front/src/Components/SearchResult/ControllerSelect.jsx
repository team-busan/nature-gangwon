import { forwardRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ControllerSelect = forwardRef(
  ({ label, id, value, setValue, open, setOpen, list }, ref) => {
    return (
      <div ref={ref} className="flex flex-col relative">
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
        <input
          className={`border-b-[1px] ${
            open ? "border-darkGreen" : "border-black"
          } cursor-pointer py-2`}
          id={id}
          type="button"
          value={value}
          onClick={() => setOpen(!open)}
        />
        <motion.div
          className="absolute right-0 top-8 cursor-pointer"
          animate={{ rotate: open ? 180 : 0 }}
        >
          <MdArrowDropDown className="text-3xl" />
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-full z-10 top-[65px] bg-white shadow border-[1px] border-[rgba(0, 0, 0, 0.1)] rounded-b-xl"
            >
              {list.map((item, idx) => (
                <motion.li
                  initial={{ backgroundColor: "#FFFFFF" }}
                  whileHover={{ backgroundColor: "#C7F7C6" }}
                  className="cursor-pointer p-2 last:rounded-b-xl"
                  key={idx}
                  onClick={() => {
                    setValue(item);
                    setOpen(!open);
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default ControllerSelect;
