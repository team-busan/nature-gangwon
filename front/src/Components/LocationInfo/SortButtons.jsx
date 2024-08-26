import React from 'react';

const SortButtons = ({setSortOption}) => (
  <section className="w-scree h-16 mb-1">
    <div className="w-1420 h-full mx-auto flex items-center p-2 bg-smLightGreen shadow-lg text-black">
      <button className="mr-5 p-3">전체</button>
      <button className="mr-5 p-3">인기순</button>
      <button className="mr-5 p-3">후기순</button>
    </div>
  </section>
);

export default SortButtons;
