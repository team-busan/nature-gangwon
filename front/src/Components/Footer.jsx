import { Link } from "react-router-dom";

const Footer = () => {
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full items-center gap-4 mt-6">
      <button
        onClick={() => MoveToTop()}
        className="bg-darkGreen w-full border-[1px] border-black text-white py-2"
      >
        Back to top
      </button>
      <Link to="/" className="text-4xl">
        Nature
      </Link>
      <div className="flex justify-between w-96">
        <span className="mr-2">Developers</span>
        <div className="flex justify-between w-full">
          <span>송은우</span>
          <span>이재형</span>
          <span>이철민</span>
          <span>정홍천</span>
        </div>
      </div>
      <div className="flex justify-between w-96">
        <span className="shrink-0 mr-10">Git Hub</span>
        <div className="flex justify-between w-full">
          <Link target="_blank" to="https://github.com/Eunoos">
            송은우
          </Link>
          <Link target="_blank" to="https://github.com/jaehyeong21">
            이재형
          </Link>
          <Link target="_blank" to="https://github.com/cheolmin99">
            이철민
          </Link>
          <Link target="_blank" to="https://github.com/gugonggu">
            정홍천
          </Link>
        </div>
      </div>
      <p>호스팅 제공관 : AWS</p>
      <p>데이터 제공관 : 한국 관광공사, 네이버, 구글, 기상청</p>
    </div>
  );
};

export default Footer;
