import { useRecoilState } from "recoil";
import { planList } from "../../state/planState";

import PlanAccordion from "./PlanAccordion";
import PlanViewPhotos from "./PlanViewPhotos";

const PlanPhotos = () => {
  const [plans, setPlans] = useRecoilState(planList);
  console.log(plans);

  return (
    <div className="w-full ml-[150px] p-6 bg-[#F3F3F7]">
      <h3>추억 저장소</h3>
      <div className="w-full h-full flex py-10 gap-10">
        <ul className="w-1/2 max-h-[1192px] flex flex-col gap-5">
          {plans.map((day, idx) => (
            <PlanAccordion key={idx} day={day} idx={idx} />
          ))}
        </ul>
        <div className="w-1/2 max-h-[1192px] overflow-y-scroll">
          <PlanViewPhotos />
        </div>
      </div>
    </div>
  );
};

export default PlanPhotos;
