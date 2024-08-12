import PlanCard from "../Components/Home/PlanCard";

const Home = () => {
  return (
    <div className="w-[1420px]">
      <div className="w-full h-[500px] bg-random relative">
        <div className="flex justify-between w-full absolute -bottom-24">
          <PlanCard date="2024.06.25" />
          <PlanCard date="2024.06.25" />
          <PlanCard date="2024.06.25" />
        </div>
      </div>

      <div className="w-full mt-36">
        <h2 className="mb-6">강원도, 얼마나 알고 계세요?</h2>
        <div className="w-full h-[300px] bg-random p-6 flex flex-col justify-between rounded-lg">
          <p className="text-lg">강원도는 국내 최대의 커피 생산지</p>
          <p className="text-lg mx-auto w-[650px]">
            강원도 강릉은 한국에서 가장 큰 커피 생산지로, 다양한 커피 농장이
            있고, 매년 '강릉 커피 축제'가 열립니다.
          </p>
        </div>
      </div>

      <div className="flex justify-between w-full mt-20 mb-10">
        <PlanCard />
        <PlanCard />
        <PlanCard />
      </div>
    </div>
  );
};

export default Home;
