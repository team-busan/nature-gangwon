import { useState } from "react";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ControllerModal = () => {
  const [modalState, setModalState] = useState(false);

  const mainCategories = [
    "자연",
    "인문(문화/예술/역사)",
    "레포츠",
    "쇼핑",
    "음식",
    "숙박",
    "추천코스",
  ];

  const Category = ({ title, list }) => {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <div className="bg-slate-100 flex justify-center items-center rounded py-2">
          {title}
        </div>
        <ul className="flex flex-col gap-2">
          {list?.map((item, idx) => (
            <motion.li
              className="flex justify-center items-center text-center border-[1px] border-slate-300 py-1 px-2 rounded-lg cursor-pointer"
              initial={{ backgroundColor: "#FFFFFF" }}
              whileHover={{ backgroundColor: "#C7F7C6" }}
              key={idx}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <label>서비스 분류</label>
      <input
        className="border-b-[1px] border-black cursor-pointer py-2"
        type="button"
        onClick={() => setModalState(!modalState)}
        value={"test"}
      />
      <motion.div
        className="absolute right-0 top-9 cursor-pointer"
        animate={{ rotate: modalState ? 180 : 0 }}
      >
        <MdArrowDropDown className="text-3xl" />
      </motion.div>
      <AnimatePresence>
        {modalState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalState(!modalState)}
            className="fixed left-0 top-0 bg-black/25 w-screen h-screen flex justify-center items-center"
          >
            <div className="bg-white w-[550px] h-[700px] rounded-xl flex flex-col">
              <div className="bg-softGreen h-[8%] rounded-t-xl flex justify-center items-center relative">
                <h4 className="text-white">서비스 분류 선택</h4>
                <div className="absolute w-8 h-8 rounded-full bg-white right-4 cursor-pointer flex justify-center items-center">
                  <MdClose className="text-2xl" />
                </div>
              </div>
              <div className="h-[92%] p-8 flex gap-8 justify-between">
                <Category title="대분류" list={mainCategories} />
                <Category title="중분류" />
                <Category title="소분류" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControllerModal;
