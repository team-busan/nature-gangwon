import { motion } from "framer-motion";

const LandingSelectItem = () => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="w-[460px] h-[510px] rounded-xl shadow-content p-8 gap-6 flex flex-col cursor-pointer"
    >
      <div className="bg-gray-200 h-3/4 rounded-xl">사진</div>
      <div className="bg-gray-200 h-1/4 rounded-xl">글자</div>
    </motion.div>
  );
};

export default LandingSelectItem;
