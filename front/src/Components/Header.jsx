import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";
import axios from "axios";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const fetchUserData = async () => {
      if (cookies.token && !user) { // 토큰이 있고 Recoil 상태에 사용자가 없는 경우에만 요청
        try {
          const response = await axios.get("http://localhost:8000/user", {
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
    setUser(null); // Recoil 상태 초기화
    window.location.reload(); // 로그아웃 후 페이지를 새로고침하여 변경 사항 반영
  };

  return (
    <header className="w-full mb-1 flex justify-center bg-white shadow-md">
      <div className="w-1420 flex h-20 p-3 items-center">
        <div className="text-black w-2/12">
          <Link to="/">
            <h1>Nature</h1>
          </Link>
        </div>
        <nav className="w-3/12">
          <ul className="flex justify-between">
            <li className="hover:text-green">
              <Link to="/destination/list">여행계획</Link>
            </li>
            <li className="hover:text-green">
              <Link to="/festival/list">축제정보</Link>
            </li>
            <li className="hover:text-green">
              <Link to="/">장소추천</Link>
            </li>
          </ul>
        </nav>
        <div className="w-6/12 flex justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="찾으시는 여행지가 있으신가요?"
              className="w-120 p-2 border-2 border-gray-400 rounded-lg"
            />
            <IoIosSearch className="text-2xl cursor-pointer absolute right-1 top-2" />
          </div>
        </div>
        <div className="w-4/12 flex justify-end items-center">
          {cookies.token ? (
            <>
              {user && (
                <Link to="./Mypage">
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
              <button>로그인</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
