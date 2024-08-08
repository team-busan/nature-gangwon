import { useRecoilState } from "recoil";
import { planList } from "../../atoms";

import PlanItem from "./PlanItem";

const PlanMySelect = () => {
  const [plans, setPlans] = useRecoilState(planList);
  let pushIdx = 0;

  return (
    <div className="w-5/6 overflow-y-scroll">
      <h3 className="w-full text-center">내가 선택한 장소</h3>
      <div className="p-4">
        {plans.map((day, idx) => (
          <div key={idx}>
            <h4 className="">Day {idx + 1}</h4>
            <ul className="flex flex-col gap-4">
              {day.map((item) => (
                <PlanItem key={pushIdx++} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanMySelect;
