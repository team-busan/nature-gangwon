import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import MyPagePlan from "./MyPagePlan";

const MarkedPlans = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    const res = await axios.get("http://localhost:8000/plan/mark-list", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    setPlans(res.data.myMarkList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return (
    <ul className="grid grid-cols-4 gap-6 justify-between">
      {plans.map((plan, idx) => {
        return <MyPagePlan key={idx} plan={plan} />;
      })}
    </ul>
  );
};

export default MarkedPlans;
