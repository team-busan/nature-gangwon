import { useRecoilState } from "recoil";
import { planList } from "../../state/planState";

import PlanAccordion from "./PlanAccordion";

const PlanPhotos = () => {
  const [plans, setPlans] = useRecoilState(planList);

  return (
    <div className="h-lvh w-full ml-[135px] p-6">
      <h3>추억 저장소</h3>
      <div className="bg-blue-200 w-full h-full flex">
        <div className="w-1/2">
          {plans.map((day, idx) => (
            <PlanAccordion key={idx} day={day} idx={idx} />
          ))}
        </div>
        <div className="w-1/2">hello</div>
      </div>
    </div>
  );
};

export default PlanPhotos;
