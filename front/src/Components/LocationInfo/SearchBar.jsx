import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ keyword, setKeyword }) => {
  const [inputValue, setInputValue] = useState(keyword);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(inputValue);
  };

  return (
    <section className="w-full mt-3">
      <div className="w-1420 flex mx-auto">
        <div className="relative w-5/12 mr-5">
          <input
            className="w-full rounded-full p-3 border border-black pr-10"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="검색어를 입력하세요"
          />
          <span className="absolute top-1/2 transform -translate-y-1/2 right-3">
            <IoIosSearch className="text-2xl cursor-pointer" onClick={handleSearch} />
          </span>
        </div>
        <button className="bg-green rounded-full text-white p-3 w-20 font-bold" onClick={handleSearch}>
          검색
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
