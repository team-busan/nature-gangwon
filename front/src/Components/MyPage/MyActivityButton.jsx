import { motion } from "framer-motion";

const MyActivityButton = ({
  Icon,
  title,
  notifCounter,
  selected,
  setContentNum,
}) => {
  const handleClick = setContentNum;

  const animationArray = notifCounter === 0 ? [0] : [0, -5, 0];

  return (
    <motion.div
      initial={{ translateY: 0 }}
      whileHover={{ translateY: -3 }}
      onClick={handleClick}
      className="flex flex-col items-center gap-3 relative cursor-pointer rounded-xl p-2"
    >
      <motion.div
        animate={{ backgroundColor: selected ? "#3BF17C" : "#FFFFFF" }}
        className="bg-white w-[100px] h-[100px] rounded-full flex items-center justify-center"
      >
        <Icon className="text-5xl" />
      </motion.div>
      <p>{title}</p>
      <motion.div
        animate={{ translateY: animationArray }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-white flex items-center justify-center absolute bg-paleGreen w-[25px] h-[25px] rounded-full right-0 top-0"
      >
        {notifCounter}
      </motion.div>
      {selected ? (
        <motion.div
          layout
          layoutId="selected"
          className="bg-paleGreen w-2 h-2 rounded-full"
        ></motion.div>
      ) : (
        <div className="w-2 h-2 bg-transparent"></div>
      )}
    </motion.div>
  );
};

export default MyActivityButton;
