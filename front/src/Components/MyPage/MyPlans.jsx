import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import MyPagePlan from "./MyPagePlan";

const MyPlans = () => {
  const [plans, setPlans] = useState([]);

  const [cookies, setCookie] = useCookies(["token"]);

  const getPlans = async () => {
    const res = await axios.get("/api/plan/my-list", {
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
      {plans.length === 0 ? (
        <div>아직 만든 계획이 없습니다</div>
      ) : (
        plans.map((item, idx) => <MyPagePlan key={idx} plan={item} />)
      )}
    </ul>
  );
};

export default MyPlans;
