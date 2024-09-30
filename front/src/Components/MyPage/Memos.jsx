import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Memos = () => {
  const [memos, setMemos] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);

  const getMemos = async () => {
    const res = await axios.get("http://nature-gangwon.shop/plan/note-list", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    setMemos(res.data.myNoteList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["memos"],
    queryFn: getMemos,
  });

  const render = () => {
    const result = [];
    memos.map((plan, idx) => {
      plan.note.map((memo, idx2) => {
        if (memo === "") return;
        result.push(
          <motion.li
            initial={{ translateY: 0 }}
            whileHover={{ translateY: -3 }}
            key={idx.toString() + idx2.toString()}
          >
            <Link to={`/plan/${plan.planId}`} className="flex flex-col gap-2">
              <div className="w-full h-full aspect-square bg-paper bg-cover rounded-lg p-6 shadow-content overflow-y-hidden">
                <span>{memo}</span>
              </div>
              <p>{plan.planTitle}</p>
            </Link>
          </motion.li>
        );
      });
      plan.note2.map((memo2, idx3) => {
        if (memo2 === "") return;
        result.push(
          <motion.li
            initial={{ translateY: 0 }}
            whileHover={{ translateY: -3 }}
            key={idx.toString() + idx3.toString() + "2"}
          >
            <Link to={`/plan/${plan.planId}`} className="flex flex-col gap-2">
              <div className="w-full h-full aspect-square bg-paper bg-cover rounded-lg p-6 shadow-content overflow-y-hidden">
                <span>{memo2}</span>
              </div>
              <p>{plan.planTitle}</p>
            </Link>
          </motion.li>
        );
      });
    });
    return result;
  };

  return (
    <ul className="grid grid-cols-4 justify-between gap-6">
      {memos.length === 0 ? <div>아직 작성한 메모가 없습니다</div> : render()}
    </ul>
  );
};

export default Memos;
