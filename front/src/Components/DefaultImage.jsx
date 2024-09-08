import Logo from "../img/logo.png";

const DefaultImage = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gray-200 rounded-lg shrink-0">
      <p className="">이미지 준비중</p>
      <img
        src={Logo}
        alt="Nature 로고"
        className="absolute top-0 left-0 w-1/3"
      />
    </div>
  );
};

export default DefaultImage;
