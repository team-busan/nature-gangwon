import { motion } from "framer-motion";

const LandingSelectItem = ({
  item,
  index,
  worldCupIndex,
  setWorldCupIndex,
  setUserSelectList,
}) => {
  const handleClick = () => {
    setUserSelectList((prev) => {
      const userSelectListCopy = [...prev];
      userSelectListCopy[worldCupIndex] = index;
      return userSelectListCopy;
    });
    setWorldCupIndex((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}
      className="w-[460px] h-[510px] rounded-xl shadow-content p-8 gap-6 flex flex-col cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.text}
        className="bg-gray-200 h-3/4 rounded-xl"
      />
      <div className="bg-gray-200 h-1/4 rounded-xl flex items-center justify-center">
        {item.text}
      </div>
    </motion.div>
  );
};

export default LandingSelectItem;
