import React from 'react';
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({type}) => (
  <section className="w-full mt-3">
    <div className="w-1420 flex mx-auto">
      <div className="relative w-5/12 mr-5">
        <input
          placeholder={`강원도 ${type}을 검색 해보세요!`}
          className="w-full rounded-full p-3 border border-black pr-10"
        />
        <span className="absolute top-1/2 transform -translate-y-1/2 right-3">
          <IoIosSearch className = "text-2xl cursor-pointer"/>
        </span>
      </div>
      <button className="bg-green rounded-full text-white p-3 w-20 font-bold">
        검색
      </button>
    </div>
  </section>
);

export default SearchBar;