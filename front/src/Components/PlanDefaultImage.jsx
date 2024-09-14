import Logo from "../img/logo.png";

const PlanDefaultImage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center rounded-lg">
      <img src={Logo} alt="Nature 여행 계획 기본 이미지" className="w-1/2" />
    </div>
  );
};

export default PlanDefaultImage;
