import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";
import axios from "axios";
import { CiLogin } from "react-icons/ci";
import Logo from "../img/logo.png";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation(); // 현재 경로를 가져오는 useLocation 사용
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (cookies.token && !user) {
        try {
          const response = await axios.get("https://nature-gangwon.shop/user", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          setUser({
            userEmail: response.data.userEmail,
            userNickname: response.data.userNickname,
            userProfile: response.data.userProfile,
          });
        } catch (error) {
          console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
          handleLogout();
        }
      }
    };

    fetchUserData();
  }, [cookies.token, setUser, user]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setUser(null);
    window.location.reload();
  };

  const handleSearch = () => {
    navigate(`/search?query=${searchValue}`);
  };

  return (
    <header className="w-full mb-1 flex justify-center bg-white shadow-md">
      <div className="w-1420 flex h-20 py-3 items-center">
        <div className="text-black w-2/12">
          <Link to="/" className="inline-block">
            <img src={Logo} alt="Nature Logo" />
          </Link>
        </div>
        <nav className="w-3/12">
          <ul className="flex justify-between">
            <li
              className={`hover:text-green ${
                location.pathname === "/plan/list"
                  ? "border-b-2 border-green"
                  : ""
              }`}
            >
              <Link to="/plan/list">여행계획</Link>
            </li>
            <li
              className={`hover:text-green ${
                location.pathname === "/festival/list"
                  ? "border-b-2 border-green"
                  : ""
              }`}
            >
              <Link to="/festival/list">축제정보</Link>
            </li>
            <li
              className={`hover:text-green ${
                location.pathname === "/destination/list"
                  ? "border-b-2 border-green"
                  : ""
              }`}
            >
              <Link to="/destination/list">장소추천</Link>
            </li>
          </ul>
        </nav>
        <div className="w-5/12 flex justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="찾으시는 여행지가 있으신가요?"
              className="w-120 p-2 border-2 border-gray-400 rounded-lg"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <IoIosSearch
              className="text-2xl cursor-pointer absolute right-1 top-2"
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className="w-4/12 flex justify-end items-center">
          {cookies.token ? (
            <>
              {user && (
                <Link to={`./myPage/${user.userNickname}`}>
                  <p>{user.userNickname}님 환영합니다</p>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="ml-4 p-2 bg-red-500 text-white rounded-md"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/Login">
              <span className="flex items-center">
                <CiLogin className="text-2xl mr-2" />
                <button>로그인</button>
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
