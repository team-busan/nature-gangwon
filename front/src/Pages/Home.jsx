import { useEffect, useState } from "react";
import PlanCard from "../Components/Home/PlanCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LocationCard from "../Components/Home/LocationCard";

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [locations, setLocations] = useState([]);

  const getTop3Plans = async () => {
    const res = await axios.get("http://localhost:8000/plan/top3");
    setPlans(res.data.top3List);
    return res.data;
  };

  const getRandom3Location = async () => {
    const res = await axios.get("http://localhost:8000/destination/random");
    setLocations(res.data.getDetailRandom3ListItemDto);
    return res.data;
  };

  const { top3PlanData, top3PlanError, top3PlanIsLoading } = useQuery({
    queryKey: ["top3Plans"],
    queryFn: getTop3Plans,
  });

  const {
    random3LocationData,
    random3LocationError,
    random3LocationIsLoading,
  } = useQuery({
    queryKey: ["random3Location"],
    queryFn: getRandom3Location,
  });

  return (
    <div className="w-[1420px] flex flex-col gap-10">
      <div className="w-full h-[500px] bg-random relative">
        <div className="flex justify-between w-full absolute -bottom-24">
          {plans.map((plan, idx) => (
            <PlanCard key={idx} plan={plan} />
          ))}
        </div>
      </div>

      <div className="w-full mt-36">
        <h2 className="mb-6">강원도, 얼마나 알고 계세요?</h2>
        <div className="w-full h-[300px] bg-random p-6 flex flex-col justify-between rounded-lg">
          <div className="text-lg text-white rounded-lg w-fit bg-black/50 py-2 px-4">
            <p>강원도는 국내 최대의 커피 생산지</p>
          </div>
          <div className="text-lg text-white mx-auto w-fit py-2 px-4 bg-black/50 rounded-lg">
            <p>
              강원도 강릉은 한국에서 가장 큰 커피 생산지로, 다양한 커피 농장이
              있고, 매년 '강릉 커피 축제'가 열립니다.
            </p>
          </div>
        </div>
      </div>
      <h2>이 관광지는 어떠신가요?</h2>
      <div className="flex justify-between w-full mb-10">
        {locations.map((location, idx) => (
          <LocationCard key={idx} location={location} />
        ))}
      </div>
    </div>
  );
};

export default Home;
