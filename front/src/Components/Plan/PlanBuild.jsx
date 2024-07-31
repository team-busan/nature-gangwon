import NaverMap from "../NaverMap.js";

const PlanBuild = () => {
  const lat = "37.5665";
  const lng = "126.9780";

  return (
    <div className="h-lvh w-full relative">
      <NaverMap lat={lat} lng={lng} className="w-full" />
    </div>
  );
};

export default PlanBuild;
