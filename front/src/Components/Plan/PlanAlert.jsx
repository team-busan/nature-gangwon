import { motion, AnimatePresence } from "framer-motion";
import { alertState } from "../../state/alertState.js";
import { useRecoilState } from "recoil";

import { MdClose } from "react-icons/md";
import { useEffect } from "react";

const PlanAlert = () => {
  const [message, setMessage] = useRecoilState(alertState);

  useEffect(() => {
    console.log("alert");
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div className="absolute top-0 w-full pt-2 rounded-xl bg-red-300">
        <div className="relative">
          <div className="flex w-full justify-end">
            <MdClose
              className="text-3xl mr-2 cursor-pointer"
              onClick={() => setMessage("")}
            />
          </div>
          <p className="text-lg ml-2 mb-6">{message}</p>
          <div className="w-full bg-red-400 rounded-b-xl h-2"></div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute bottom-0 bg-red-500 h-2 rounded-b-xl"
          ></motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlanAlert;
