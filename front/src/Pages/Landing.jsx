import LandingBody from "../Components/Landing/LandingBody";
import LandingCloseButton from "../Components/Landing/LandingCloseButton";
import LandingHeader from "../Components/Landing/LandingHeader";

const Landing = () => {
  return (
    <div className="w-lvw h-lvh flex flex-col p-10 gap-10">
      <LandingCloseButton />
      <LandingHeader />
      <LandingBody />
    </div>
  );
};

export default Landing;
