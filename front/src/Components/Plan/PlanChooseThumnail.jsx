import { useRecoilState } from "recoil";
import { planList } from "../../state/planState";

const PlanChooseThumnail = ({ setPlanStage }) => {
  const [plans, setPlans] = useRecoilState(planList);

  const handleAddPhoto = () => {
    setPlanStage(2);
  };

  const handleSavePlan = () => {};

  const rendering = () => {
    const result = [];
    result.push(
      <div
        key="sample"
        className="w-52 h-52 rounded-lg bg-green cursor-pointer shadow"
      >
        샘플 이미지로
      </div>
    );
    for (let i = 0; i < plans.length; i++) {
      for (let j = 0; j < plans[i].length; j++) {
        for (let k = 0; k < plans[i][j].photoUrls.length; k++) {
          result.push(
            <img
              src={plans[i][j].photoUrls[k]}
              className="w-52 h-52 rounded-lg object-cover cursor-pointer shadow"
              key={i.toString() + j + k}
            />
          );
        }
      }
    }
    if (result.length !== 150) {
      result.push(
        <div
          onClick={handleAddPhoto}
          className="w-52 h-52 rounded-lg bg-gray-400 cursor-pointer shadow"
          key="plus"
        >
          사진 추가 ㄱㄱ
        </div>
      );
    }
    return result;
  };

  return (
    <div className="w-full min-h-[750px] ml-[150px] p-6 bg-[#F3F3F7] flex flex-col gap-10">
      <h3>썸네일 선택</h3>
      <div className="w-full flex flex-wrap gap-10">{rendering()}</div>
      <div className="flex h-full items-end justify-end">
        <button
          onClick={handleSavePlan}
          className="px-4 py-2 rounded-lg bg-darkGreen text-white"
        >
          계획 저장
        </button>
      </div>
    </div>
  );
};

export default PlanChooseThumnail;
