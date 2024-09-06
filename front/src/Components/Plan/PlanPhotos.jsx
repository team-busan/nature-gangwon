import { useRecoilState } from "recoil";
import { planList } from "../../state/planState";

import PlanAccordion from "./PlanAccordion";
import PlanViewPhotos from "./PlanViewPhotos";

const PlanPhotos = ({ setPlanStage }) => {
  const [plans, setPlans] = useRecoilState(planList);

  const handleNext = () => {
    setPlanStage(3);
  };

  return (
    <div className="w-full ml-[150px] p-6 bg-[#F3F3F7]">
      <h3>추억 저장소</h3>
      <div className="w-full flex flex-col">
        <div className="flex py-10 gap-10">
          <ul className="w-1/2 max-h-[1192px] flex flex-col gap-5">
            {plans.map((day, idx) => (
              <PlanAccordion key={idx} day={day} idx={idx} />
            ))}
          </ul>
          <div className="w-1/2 max-h-[1192px] overflow-y-scroll">
            <PlanViewPhotos />
          </div>
        </div>
        <button
          onClick={handleNext}
          className="bg-darkGreen py-2 px-3 rounded-lg text-white self-end"
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default PlanPhotos;
