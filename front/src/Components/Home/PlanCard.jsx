const PlanCard = ({ date }) => {
  return (
    <div className="w-[430px] h-[400px] rounded-lg shadow-xl bg-white flex flex-col justify-end p-4">
      <p className="text-lg">제목</p>
      {date ? <p className="text-lg">{date}</p> : null}
    </div>
  );
};

export default PlanCard;
