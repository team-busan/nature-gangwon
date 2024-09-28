import { useEffect, useState } from "react";
import PlanCard from "../Components/Home/PlanCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LocationCard from "../Components/Home/LocationCard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GANGWON_MAIN, GANGWON_TMI } from "../Stores/mockData.js";

const Home = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["landing"]);
  const [plans, setPlans] = useState([]);
  const [locations, setLocations] = useState([]);
  const [mainImage, setMainImage] = useState(
    GANGWON_MAIN[Math.floor(Math.random() * GANGWON_MAIN.length)]
  );
  const [tmi, setTmi] = useState(
    GANGWON_TMI[Math.floor(Math.random() * GANGWON_TMI.length)]
  );

  const handleWorldCup = () => {
    setCookie("landing", false, { path: "/" });
    navigate("/landing");
  };

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

  useEffect(() => {
    if (cookie.landing === undefined) {
      navigate("/landing");
    }
  }, []);

  return (
    <div className="w-[1420px] flex flex-col gap-10">
      <div className="w-full h-[500px] relative">
        <img
          src={mainImage}
          title="강원 관광 제공"
          alt="강원도 풍경 이미지"
          className="w-full h-full absolute object-cover"
        />
        <div className="flex justify-between w-full absolute -bottom-24">
          {plans.map((plan, idx) => (
            <PlanCard key={idx} plan={plan} />
          ))}
        </div>
      </div>

      <div className="w-full mt-36">
        <h2 className="mb-6">강원도, 얼마나 알고 계세요?</h2>
        <div className="w-full h-[300px] rounded-lg relative">
          <img
            src={tmi.image}
            alt="강원도 정보 이미지"
            title={tmi.image_source}
            className="w-full h-full absolute object-cover rounded-lg"
          />
          <div
            title={tmi.image_source}
            className="w-full h-full p-6 absolute flex flex-col justify-between"
          >
            <div className="text-lg text-white rounded-lg w-fit bg-black/50 py-2 px-4">
              <p>{tmi.title}</p>
            </div>
            <div className="text-lg text-white mx-auto w-fit py-2 px-4 bg-black/50 rounded-lg">
              <p>{tmi.text}</p>
            </div>
          </div>
        </div>
      </div>
      <h2>이 관광지는 어떠신가요?</h2>
      <div className="flex justify-between w-full mb-10">
        {locations.map((location, idx) => (
          <LocationCard key={idx} location={location} />
        ))}
      </div>

      <button
        onClick={handleWorldCup}
        className="w-fit self-center bg-darkGreen text-white rounded-lg py-2 px-3"
      >
        관광지 월드컵 하러 가기
      </button>
    </div>
  );
};

export default Home;
