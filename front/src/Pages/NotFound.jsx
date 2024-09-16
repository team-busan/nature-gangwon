import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-lvh flex flex-col justify-between">
      <Header />
      <div className="w-full flex flex-col items-center gap-6">
        <img src={Logo} alt="Nature 로고 이미지" className="w-1/4" />
        <h4>원하시는 페이지를 찾을 수 없습니다.</h4>
        <div className="text-center text-gray-300">
          <p>찾으려는 페이지의 주소가 잘못 입력되었거나,</p>
          <p>주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</p>
          <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</p>
        </div>
        <Link to="/" className="bg-darkGreen py-2 px-3 rounded-lg text-white">
          Nature 홈으로 가기
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
