import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";

const Root = () => {
  return (
    <div className="flex flex-col items-center scrollbar-track-slate-200 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
