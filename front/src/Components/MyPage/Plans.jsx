import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

const Plans = () => {
  const [plans, setPlans] = useState([]);

  const [cookies, setCookie] = useCookies(["token"]);

  const getPlans = async () => {
    const res = await axios.get("http://localhost:8000/plan/my-list", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    setPlans(res.data.myList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return (
    <ul className="grid grid-cols-4 justify-between gap-6">
      {plans.map((item, idx) => (
        <motion.li
          initial={{ translateY: 0 }}
          whileHover={{ translateY: -3 }}
          className="rounded-xl aspect-square relative shadow-content"
          key={idx}
        >
          <Link to={`/plan/${item.planId}`}>
            <div className="w-full h-full object-cover rounded-xl">
              <div className="absolute left-0 top-0 w-full h-full rounded-xl bg-black/40 p-5 flex flex-col justify-between text-white">
                <p className="text-lg">{item.planTitle}</p>
                <div>
                  <p className="text-right">
                    {item.startDate.substring(0, 10)} ~
                  </p>
                  <p className="text-right">{item.endDate.substring(0, 10)}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default Plans;
