import React from 'react';

const SearchBar = () => (
  <section className="w-screen">
    <div className="w-1420 mx-auto p-2">
      <input
        placeholder="강원도 관광지를 검색 해보세요!"
        className="w-5/12 rounded-full mr-5 p-3 border border-black"
      />
      <button className="bg-green rounded-full text-white p-3 w-20">
        검색
      </button>
    </div>
  </section>
);

export default SearchBar;
