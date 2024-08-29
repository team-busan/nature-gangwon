import { motion } from "framer-motion";
import { PLAN_STATUSBAR_WIDTH } from "../../Constants/constants";
import { useRecoilState } from "recoil";
import { planList, planTitleState } from "../../state/planState";
import { alertState } from "../../state/alertState";

const PlanStatusBar = ({
  planStage,
  setPlanStage,
  control1,
  control2,
  control3,
  control4,
}) => {
  const variants = {
    active: { scale: 1.2 },
    inactive: { scale: 1 },
  };

  const [plan, setPlan] = useRecoilState(planList);
  const [message, setMessage] = useRecoilState(alertState);
  const [planTitle, setPlanTitle] = useRecoilState(planTitleState);

  return (
    <div
      className={`absolute left-0 top-0 h-full z-[102] bg-white flex rounded-r-xl w-[${PLAN_STATUSBAR_WIDTH}px] border-r-[1px] border-lightGreen}`}
    >
      <div className="flex flex-col w-full h-full gap-10">
        <motion.div
          animate={control1}
          variants={variants}
          onClick={() => setPlanStage(0)}
          className={`cursor-pointer p-6 w-full  ${
            planStage === 0 ? "text-paleGreen" : "text-gray-400"
          }`}
        >
          1. 날짜 선택
        </motion.div>
        <motion.div
          animate={control2}
          variants={variants}
          onClick={() => setPlanStage(1)}
          className={`cursor-pointer p-6 w-full  ${
            planStage === 1 ? "text-paleGreen" : "text-gray-400"
          }`}
        >
          2. 장소 선택
        </motion.div>
        <motion.div
          animate={control3}
          variants={variants}
          onClick={() => {
            for (let i = 0; i < plan.length; i++) {
              if (plan[i].length === 0) {
                setMessage("하루에 최소 한 곳 이상의 여행지를 추가해주세요.");
                setPlanStage(1);
                return;
              }
            }
            if (!planTitle) {
              setMessage("여행 제목을 입력해주세요.");
              setPlanStage(1);
              return;
            }
            setPlanStage(2);
          }}
          className={`cursor-pointer p-6 w-full  ${
            planStage === 2 ? "text-paleGreen" : "text-gray-400"
          }`}
        >
          3. 사진 추가
        </motion.div>
        <motion.div
          animate={control4}
          variants={variants}
          onClick={() => setPlanStage(3)}
          className={`cursor-pointer p-6 w-full  ${
            planStage === 3 ? "text-paleGreen" : "text-gray-400"
          }`}
        >
          4. 썸네일 선택
        </motion.div>
      </div>
    </div>
  );
};

export default PlanStatusBar;
