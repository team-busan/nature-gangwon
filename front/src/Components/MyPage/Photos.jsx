import { motion } from "framer-motion";

const Photos = ({ samplePhotos }) => {
  return (
    <ul className="grid grid-cols-4 justify-between gap-6">
      {samplePhotos.map((item, idx) => (
        <motion.li
          initial={{ translateY: 0 }}
          whileHover={{ translateY: -3 }}
          className="rounded-xl aspect-square relative cursor-pointer shadow-content"
          key={idx}
        >
          <div className="bg-random w-full h-full object-cover rounded-xl">
            <div className="absolute left-0 top-0 w-full h-full rounded-xl bg-black/40 p-5 flex flex-col justify-between text-white">
              <p className="text-lg">{item}</p>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

export default Photos;
