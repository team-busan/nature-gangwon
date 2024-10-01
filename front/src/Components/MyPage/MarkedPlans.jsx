import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import MyPagePlan from "./MyPagePlan";
import { Link } from "react-router-dom";

const MarkedPlans = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    const res = await axios.get("https://nature-gangwon.shop/plan/mark-list", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    setPlans(res.data.myMarkList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["planMarkList"],
    queryFn: getPlans,
  });

  return (
    <ul className="grid grid-cols-4 gap-6 justify-between">
      {plans.length === 0 ? (
        <Link to="/plan/list">아직 즐겨찾기한 계획이 없습니다</Link>
      ) : (
        plans.map((plan, idx) => {
          return <MyPagePlan key={idx} plan={plan} />;
        })
      )}
    </ul>
  );
};

export default MarkedPlans;
