import LandingSelectItem from "./LandingSelectItem";

const LandingBody = () => {
  const worldCupList = [[], [], [], []];

  return (
    <div className="flex gap-20 mx-auto mt-6">
      <LandingSelectItem />
      <LandingSelectItem />
    </div>
  );
};

export default LandingBody;
