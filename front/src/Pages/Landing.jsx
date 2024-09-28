import { useCookies } from "react-cookie";
import LandingBody from "../Components/Landing/LandingBody";
import LandingCloseButton from "../Components/Landing/LandingCloseButton";
import LandingHeader from "../Components/Landing/LandingHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["landing"]);
  const [worldCupIndex, setWorldCupIndex] = useState(0);

  useEffect(() => {
    if (cookie.landing === true) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-lvw h-lvh flex flex-col p-10 gap-10">
      <LandingCloseButton />
      <LandingHeader worldCupIndex={worldCupIndex} />
      <LandingBody
        worldCupIndex={worldCupIndex}
        setWorldCupIndex={setWorldCupIndex}
      />
    </div>
  );
};

export default Landing;
