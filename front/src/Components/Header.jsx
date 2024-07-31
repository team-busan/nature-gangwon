import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full mb-1 flex justify-center bg-white shadow-md">
      <div className="w-1420 flex h-20 p-3 items-center">
        <div className="text-green w-3/12">
          <Link to = "/">
            <h1>Nature</h1>
          </Link>
        </div>
        <nav className="w-4/12">
          <ul className="flex justify-between">
            <li className = "hover:text-green">
              <Link to="/locationInfo">여행계획</Link>
            </li>
            <li className = "hover:text-green">
              <Link to="/">축제정보</Link>
            </li>
            <li className = "hover:text-green">
              <Link to="/">장소추천</Link>
            </li>
          </ul>
        </nav>
        <div className="w-6/12 flex justify-center">
          <div className="relative">
            <input
              type="text"
              placeholder="찾으시는 여행지가 있으신가요?"
              className="w-96 p-2"
            />
            <IoIosSearch className="text-2xl cursor-pointer absolute right-1 top-2" />
          </div>
        </div>
        <div className="w-2/12 flex justify-end">
          {/* <Link to="/Mypage/1">
            <span className="text-3xl cursor-pointer">
              <FaRegCircleUser />
            </span>
          </Link> */}
          <Link to = "/Login">
            <button>로그인</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
