const LandingHeader = ({ worldCupIndex }) => {
  return (
    <div className="w-fit mx-auto">
      <div className="py-6 px-10">
        <h1>
          {worldCupIndex < 4
            ? "어떤 분위기의 휴양지를 원하시나요?"
            : "최종적으로 선택된 결과는 다음과 같습니다!"}
        </h1>
      </div>
    </div>
  );
};

export default LandingHeader;
