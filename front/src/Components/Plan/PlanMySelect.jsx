import { useRecoilState } from "recoil";
import { planList } from "../../atoms";

const PlanMySelect = () => {
  const [plans, setPlans] = useRecoilState(planList);

  return (
    <div className="w-5/6">
      <h3 className="w-full text-center">내가 선택한 장소</h3>
      <ul></ul>
    </div>
  );
};

export default PlanMySelect;
