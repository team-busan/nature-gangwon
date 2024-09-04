import { Link } from "react-router-dom";

const PlanCard = ({ plan }) => {
  return (
    <Link
      to={`/plan/${plan.planId}`}
      className="w-[430px] h-[400px] rounded-lg shadow-xl bg-white flex flex-col justify-end p-4"
    >
      <p className="text-lg">{plan.planTitle}</p>
      {/* {plan ? <p className="text-lg">{plan.}</p> : null} */}
    </Link>
  );
};

export default PlanCard;
